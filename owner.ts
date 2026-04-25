import { Router, type IRouter } from "express";
import { db, projectsTable, filesTable } from "@workspace/db";
import { eq, desc, count } from "drizzle-orm";

const router: IRouter = Router();

// YOUR SECRET MASTER PASSWORD
const OWNER_KEY = process.env["OWNER_KEY"] || "GOD##KAI(9992286240)";

function checkOwner(req: any) {
  const headerKey = req.headers["x-owner-key"];
  const queryKey = req.query["key"];
  const provided = (Array.isArray(headerKey) ? headerKey[0] : headerKey) || queryKey;
  return typeof provided === "string" && provided === OWNER_KEY;
}

// Secret Login Route
router.post("/owner/login", (req, res) => {
  const { key } = (req.body as { key?: string }) || {};
  if (key === OWNER_KEY) return res.json({ ok: true, message: "Welcome, Boss." });
  return res.status(401).json({ ok: false, error: "Access Denied: You are not the Owner." });
});

// See all projects uploaded by anyone
router.get("/owner/projects", async (req, res, next) => {
  if (!checkOwner(req)) return res.status(401).json({ error: "Unauthorized" });
  try {
    const all = await db.select().from(projectsTable).orderBy(desc(projectsTable.createdAt));
    const enriched = await Promise.all(all.map(async (p) => {
      const [{ value: fc }] = await db.select({ value: count() }).from(filesTable).where(eq(filesTable.projectId, p.id));
      return { ...p, fileCount: Number(fc), createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString(), deletedAt: p.deletedAt?.toISOString() ?? null };
    }));
    res.json({ projects: enriched });
  } catch (err) { next(err); }
});

// Spy Mode: See the codes inside someone's project
router.get("/owner/projects/:id/files", async (req, res, next) => {
  if (!checkOwner(req)) return res.status(401).json({ error: "Unauthorized" });
  const files = await db.select().from(filesTable).where(eq(filesTable.projectId, req.params.id)).orderBy(filesTable.path);
  res.json(files);
});

export default router;
