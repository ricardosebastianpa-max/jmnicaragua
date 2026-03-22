import { getStore } from "@netlify/blobs";
import type { Config, Context } from "@netlify/functions";

const OBJECT_ENTITIES = ["settings", "branches"];

export default async (req: Request, context: Context) => {
  const entity = context.params?.entity;
  if (!entity) {
    return Response.json({ error: "Entity required" }, { status: 400 });
  }

  const store = getStore("jm-data");
  const data = await store.get(entity, { type: "json" });

  if (OBJECT_ENTITIES.includes(entity)) {
    return Response.json(data || {});
  }

  let items: any[] = data || [];

  if (entity === "events") {
    items = items
      .filter((i) => !i.archived)
      .sort(
        (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
  }

  if (entity === "team") {
    items = items
      .filter((i) => i.active !== false)
      .sort((a, b) => (a.order || 99) - (b.order || 99));
  }

  if (entity === "resources") {
    items = items.sort((a, b) => (a.order || 99) - (b.order || 99));
  }

  return Response.json(items);
};

export const config: Config = {
  path: "/api/public/:entity",
  method: "GET",
};
