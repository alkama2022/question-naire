import { test } from "node:test";
import assert from "node:assert/strict";

// `DATABASE_URL` is set before the module loads so the embedded database is
// never started: this file tests the query builder, not the driver.
process.env.DATABASE_URL = "postgres://builder-test";

const { toSql } = await import("./db.ts");

/** Capture the SQL and parameters a call would send. */
function capture() {
  const calls: Array<{ text: string; params: unknown[] }> = [];
  const sql = toSql(async (text, params) => {
    calls.push({ text, params });
    return [];
  });
  return { sql, calls };
}

test("values are bound as numbered parameters", async () => {
  const { sql, calls } = capture();
  await sql`select * from studies where owner_id = ${"usr-1"} and status = ${"active"}`;
  assert.equal(calls[0].text, "select * from studies where owner_id = $1 and status = $2");
  assert.deepEqual(calls[0].params, ["usr-1", "active"]);
});

test("raw() inlines static SQL without binding it", async () => {
  const { sql, calls } = capture();
  await sql`select ${sql.raw("id, owner_id as \"ownerId\"")} from rc_studies where id = ${"stu-1"}`;
  assert.equal(
    calls[0].text,
    'select id, owner_id as "ownerId" from rc_studies where id = $1',
  );
  assert.deepEqual(calls[0].params, ["stu-1"]);
});

test("join() binds the list instead of pasting it into the SQL", async () => {
  const { sql, calls } = capture();
  await sql`select id from rc_profiles where user_id in (${sql.join(["a", "b", "c"])})`;
  assert.equal(calls[0].text, "select id from rc_profiles where user_id in ($1, $2, $3)");
  assert.deepEqual(calls[0].params, ["a", "b", "c"]);
});

test("a value containing a question mark does not shift the numbering", async () => {
  const { sql, calls } = capture();
  await sql`select ${sql.raw("id")} from rc_profiles where user_id in (${sql.join(["who?"])}) and name = ${"x?"}`;
  assert.equal(
    calls[0].text,
    "select id from rc_profiles where user_id in ($1) and name = $2",
  );
  assert.deepEqual(calls[0].params, ["who?", "x?"]);
});

test("a joined list after another value keeps the numbering in step", async () => {
  const { sql, calls } = capture();
  await sql`select * from x where a = ${1} and b in (${sql.join(["p", "q"])}) and c = ${2}`;
  assert.equal(calls[0].text, "select * from x where a = $1 and b in ($2, $3) and c = $4");
  assert.deepEqual(calls[0].params, [1, "p", "q", 2]);
});
