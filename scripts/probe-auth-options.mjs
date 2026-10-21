import { betterAuth } from "better-auth";

const auth = betterAuth({
  baseURL: "http://127.0.0.1:8080",
  secret: "test-secret-test-secret-test-secret",
  database: { type: "memory" },
  emailAndPassword: { enabled: true },
  trustedOrigins: ["http://localhost:8080"],
});

console.log("has options:", Boolean(auth.options));
console.log("trustedOrigins before:", JSON.stringify(auth.options?.trustedOrigins));
try {
  auth.options.trustedOrigins = async (request) => {
    const host = request?.headers?.get("host") ?? "none";
    return ["http://localhost:8080", `http://${host}`];
  };
  console.log("mutation ok ->", typeof auth.options.trustedOrigins);
} catch (err) {
  console.log("mutation FAILED:", err.message);
}

const request = new Request("http://myapp.local:8080/api/auth/sign-up/email", {
  method: "POST",
  headers: {
    host: "myapp.local:8080",
    origin: "http://myapp.local:8080",
    "content-type": "application/json",
  },
  body: JSON.stringify({ email: `t${Date.now()}@example.com`, password: "password123", name: "T" }),
});
const response = await auth.handler(request);
console.log("status:", response.status);
console.log("body:", (await response.text()).slice(0, 200));
