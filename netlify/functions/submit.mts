import { getStore } from "@netlify/blobs";
import type { Config } from "@netlify/functions";

export default async (req: Request) => {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const store = getStore({ name: "jm-data", consistency: "strong" });

  const submission = {
    id: crypto.randomUUID(),
    name: String(body.name || ""),
    phone: String(body.phone || ""),
    interest: String(body.interest || ""),
    source: String(body.source || "website"),
    extra: String(body.extra || ""),
    date: new Date().toISOString(),
    read: false,
    notes: "",
  };

  const submissions: any[] =
    (await store.get("submissions", { type: "json" })) || [];
  submissions.unshift(submission);
  await store.setJSON("submissions", submissions);

  return Response.json({ ok: true, id: submission.id });
};

export const config: Config = {
  path: "/api/submit",
  method: "POST",
};
