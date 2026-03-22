import { getStore } from "@netlify/blobs";
import type { Config, Context } from "@netlify/functions";

const OBJECT_ENTITIES = ["settings", "branches"];

export default async (req: Request, context: Context) => {
  const password = req.headers.get("X-Admin-Token");
  const adminPassword = Netlify.env.get("ADMIN_PASSWORD");

  if (!adminPassword || password !== adminPassword) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const entity = context.params?.entity;
  const id = context.params?.id;

  if (!entity) {
    return Response.json({ error: "Entity required" }, { status: 400 });
  }

  const store = getStore({ name: "jm-data", consistency: "strong" });
  const isObject = OBJECT_ENTITIES.includes(entity);

  if (req.method === "GET") {
    const data = await store.get(entity, { type: "json" });
    if (isObject) return Response.json(data || {});
    if (id) {
      const items: any[] = data || [];
      const item = items.find((i) => i.id === id);
      return item
        ? Response.json(item)
        : Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json(data || []);
  }

  if (req.method === "POST") {
    const body = await req.json();
    if (isObject) {
      await store.setJSON(entity, body);
      return Response.json(body);
    }
    body.id = body.id || crypto.randomUUID();
    body.createdAt = body.createdAt || new Date().toISOString();
    const items: any[] = (await store.get(entity, { type: "json" })) || [];
    items.push(body);
    await store.setJSON(entity, items);
    return Response.json(body, { status: 201 });
  }

  if (req.method === "PUT") {
    if (isObject) {
      const body = await req.json();
      const existing = (await store.get(entity, { type: "json" })) || {};
      const merged = { ...(existing as object), ...body };
      await store.setJSON(entity, merged);
      return Response.json(merged);
    }
    if (!id) return Response.json({ error: "ID required" }, { status: 400 });
    const body = await req.json();
    const items: any[] = (await store.get(entity, { type: "json" })) || [];
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1)
      return Response.json({ error: "Not found" }, { status: 404 });
    items[idx] = { ...items[idx], ...body, id };
    await store.setJSON(entity, items);
    return Response.json(items[idx]);
  }

  if (req.method === "DELETE") {
    if (!id) return Response.json({ error: "ID required" }, { status: 400 });
    const items: any[] = (await store.get(entity, { type: "json" })) || [];
    const filtered = items.filter((i) => i.id !== id);
    await store.setJSON(entity, filtered);
    return Response.json({ ok: true });
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 });
};

export const config: Config = {
  path: ["/api/admin/:entity", "/api/admin/:entity/:id"],
};
