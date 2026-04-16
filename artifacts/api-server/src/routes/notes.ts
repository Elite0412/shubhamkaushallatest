import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, notesTable } from "@workspace/db";
import {
  CreateNoteBody,
  UpdateNoteBody,
  UpdateNoteParams,
  GetNoteParams,
  DeleteNoteParams,
  AdminLoginBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

const ADMIN_PASSWORD = "ShubhamKaushal01010101";
const ADMIN_TOKEN = "sk_admin_ShubhamKaushal01010101";

function verifyAdminToken(token: string | undefined): boolean {
  return token === ADMIN_TOKEN;
}

router.post("/admin/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  if (parsed.data.password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  res.json({ token: ADMIN_TOKEN, success: true });
});

router.get("/notes", async (_req, res): Promise<void> => {
  const notes = await db
    .select()
    .from(notesTable)
    .orderBy(notesTable.createdAt);
  res.json(notes);
});

router.post("/notes", async (req, res): Promise<void> => {
  const parsed = CreateNoteBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  if (!verifyAdminToken(parsed.data.adminToken)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { adminToken: _token, ...noteData } = parsed.data;

  const [note] = await db
    .insert(notesTable)
    .values(noteData)
    .returning();

  res.status(201).json(note);
});

router.get("/notes/:id", async (req, res): Promise<void> => {
  const params = GetNoteParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [note] = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.id, params.data.id));

  if (!note) {
    res.status(404).json({ error: "Note not found" });
    return;
  }

  res.json(note);
});

router.put("/notes/:id", async (req, res): Promise<void> => {
  const params = UpdateNoteParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateNoteBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  if (!verifyAdminToken(parsed.data.adminToken)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { adminToken: _token, ...updateData } = parsed.data;

  const [note] = await db
    .update(notesTable)
    .set({ ...updateData, updatedAt: new Date() })
    .where(eq(notesTable.id, params.data.id))
    .returning();

  if (!note) {
    res.status(404).json({ error: "Note not found" });
    return;
  }

  res.json(note);
});

router.delete("/notes/:id", async (req, res): Promise<void> => {
  const params = DeleteNoteParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const raw = Array.isArray(req.query.adminToken)
    ? req.query.adminToken[0]
    : req.query.adminToken;

  const bodyToken = typeof req.body?.adminToken === "string" ? req.body.adminToken : undefined;
  const token = bodyToken || raw;

  if (!verifyAdminToken(token as string | undefined)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const [note] = await db
    .delete(notesTable)
    .where(eq(notesTable.id, params.data.id))
    .returning();

  if (!note) {
    res.status(404).json({ error: "Note not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
