import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isPublicStudy, recruitmentSnapshot, researcherActions } from "./metrics.ts";
import type { ResponseRecord, StudyStatus } from "./types.ts";
import { registerSchema, validateFullStudy, validateStep } from "./validators.ts";
import { emptyStudyForm } from "./validators.ts";

function response(partial: Partial<ResponseRecord> & Pick<ResponseRecord, "id" | "quality">): ResponseRecord {
  return {
    studyId: "stu-1",
    code: partial.id,
    createdAt: "2026-10-01T08:00:00.000Z",
    withdrawn: false,
    note: "",
    origin: "sample",
    ...partial,
  };
}

describe("recruitment metrics", () => {
  it("keeps recruited, completed, and accepted as different counts", () => {
    const snapshot = recruitmentSnapshot({ targetCount: 10 }, [
      response({ id: "a", quality: "accepted", completedAt: "2026-10-01T10:00:00.000Z" }),
      response({ id: "b", quality: "pending", completedAt: "2026-10-02T10:00:00.000Z" }),
      response({ id: "c", quality: "pending" }),
      response({ id: "d", quality: "excluded", completedAt: "2026-10-03T10:00:00.000Z" }),
      response({ id: "e", quality: "needs_review", completedAt: "2026-10-04T10:00:00.000Z" }),
      response({
        id: "f",
        quality: "accepted",
        completedAt: "2026-10-04T10:00:00.000Z",
        withdrawn: true,
      }),
    ]);
    assert.equal(snapshot.eligible, 5);
    assert.equal(snapshot.completed, 4);
    assert.equal(snapshot.accepted, 1);
    assert.equal(snapshot.awaiting, 1);
    assert.equal(snapshot.excluded, 1);
    assert.equal(snapshot.needsReview, 1);
    assert.equal(snapshot.withdrawn, 1);
    assert.equal(snapshot.remaining, 9);
    assert.equal(snapshot.acceptedPercent, 10);
  });
});

describe("study actions", () => {
  it("only offers actions that match the status", () => {
    const cases: Array<[StudyStatus, string[]]> = [
      ["draft", ["view", "edit", "submit"]],
      ["pending_review", ["view"]],
      ["approved", ["view", "open"]],
      ["active", ["view", "progress", "pause", "complete"]],
      ["paused", ["view", "progress", "resume", "complete"]],
      ["completed", ["view", "progress"]],
      ["rejected", ["view", "edit", "submit"]],
    ];
    for (const [status, actions] of cases) {
      assert.deepEqual(researcherActions(status), actions);
    }
    assert.equal(isPublicStudy("active"), true);
    assert.equal(isPublicStudy("draft"), false);
    assert.equal(isPublicStudy("pending_review"), false);
  });
});

describe("registration validation", () => {
  it("rejects short passwords, mismatched confirmation, and admin role", () => {
    const admin = registerSchema.safeParse({
      name: "Ada Okafor",
      email: "ada@example.com",
      password: "study-demo",
      confirm: "study-demo",
      role: "admin",
      institution: "",
      programme: "",
      acceptTerms: true,
    });
    assert.equal(admin.success, false);

    const mismatch = registerSchema.safeParse({
      name: "Ada Okafor",
      email: "ada@example.com",
      password: "short",
      confirm: "other-value",
      role: "researcher",
      institution: "",
      programme: "",
      acceptTerms: true,
    });
    assert.equal(mismatch.success, false);
    const messages = mismatch.error?.issues.map((issue) => issue.message).join(" ");
    assert.match(messages ?? "", /at least 8/);
    assert.match(messages ?? "", /do not match/);
  });
});

describe("study form validation", () => {
  it("requires a real questionnaire link and a future deadline before submit", () => {
    const values = {
      ...emptyStudyForm(),
      title: "Library confidence among first-year students",
      purpose: "Learn whether first-year students can find a journal for coursework.",
      description:
        "A short education questionnaire about finding books and journals in the university library.",
      category: "Education",
      targetPopulation: "First-year undergraduates in Abuja",
      inclusion: "Currently enrolled first-year student",
      targetCount: "40",
      deadline: "2020-01-01",
      method: "Open listing on ResearchConnect",
      completionMinutes: "10",
      questionnaireUrl: "not-a-link",
      informationStatement:
        "Participation is voluntary. You can stop at any time. The questionnaire is hosted outside this platform.",
      privacyAck: true,
      approvalAck: true,
    };
    const stepErrors = validateStep(2, values);
    assert.match(stepErrors.questionnaireUrl ?? "", /https/);
    assert.match(stepErrors.deadline ?? "", /today or later/);
    const all = validateFullStudy(values);
    assert.ok(all.questionnaireUrl);
    assert.equal(validateStep(0, values).title, undefined);
  });
});
