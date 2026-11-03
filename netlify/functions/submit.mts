import { getStore } from "@netlify/blobs";
import type { Config } from "@netlify/functions";

export default async (req: Request) => {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: real people never fill the hidden "website" field.
  if (body.website) {
    return Response.json({ ok: true });
  }

  const clip = (value: unknown, max: number) =>
    String(value ?? "").trim().slice(0, max);

  const store = getStore({ name: "jm-data", consistency: "strong" });

  const submission = {
    id: crypto.randomUUID(),
    name: clip(body.name, 120),
    phone: clip(body.phone, 40),
    interest: clip(body.interest, 60),
    source: clip(body.source, 40) || "website",
    extra: clip(body.extra, 1000),
    date: new Date().toISOString(),
    read: false,
    notes: "",
  };

  const submissions: any[] =
    (await store.get("submissions", { type: "json" })) || [];
  submissions.unshift(submission);
  await store.setJSON("submissions", submissions);

  // "Ya somos X llamas": sign-ups from the landing plus an optional base
  // (members who joined before the landing existed), set as LLAMAS_BASE.
  let count: number | undefined;
  if (submission.source === "inscripciones") {
    const base = Number(Netlify.env.get("LLAMAS_BASE")) || 0;
    count =
      base + submissions.filter((s) => s.source === "inscripciones").length;
  }

  return Response.json({ ok: true, id: submission.id, count });
};

export const config: Config = {
  path: "/api/submit",
  method: "POST",
};
