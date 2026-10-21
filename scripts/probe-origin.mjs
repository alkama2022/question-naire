import http from "node:http";

/** Send a sign-up request with an exact Host + Origin, and report the status. */
function signUp(host, origin) {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      email: `probe.${Date.now()}.${Math.random().toString(36).slice(2)}@example.com`,
      password: "probe-pass-2026",
      name: "Probe",
    });
    const request = http.request(
      {
        host: "127.0.0.1",
        port: Number(process.argv[2] ?? 8080),
        path: "/api/auth/sign-up/email",
        method: "POST",
        headers: {
          host,
          origin,
          "content-type": "application/json",
          "content-length": Buffer.byteLength(body),
        },
      },
      (response) => {
        let text = "";
        response.on("data", (chunk) => (text += chunk));
        response.on("end", () => resolve({ status: response.statusCode, text: text.slice(0, 160) }));
      },
    );
    request.on("error", (err) => resolve({ status: 0, text: err.message }));
    request.end(body);
  });
}

const port = process.argv[2] ?? "8080";
console.log("--- same origin (host matches origin):", await signUp("127.0.0.1:8081", "http://127.0.0.1:8081"));
console.log("--- cross origin (different origin):", await signUp("127.0.0.1:8081", "https://evil.example"));
console.log("--- no origin header:", await signUp("127.0.0.1:8081", ""));
