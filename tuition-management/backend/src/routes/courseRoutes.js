import express from "express";
import db from "../models/db.js";
const router = express.Router();

router.get("/", async (_, res) => {
  res.json(await db.all("SELECT * FROM courses"));
});

router.post("/", async (req, res) => {
  const { title, description, tutorId } = req.body;
  await db.run("INSERT INTO courses (title, description, tutorId) VALUES (?, ?, ?)", [title, description, tutorId]);
  res.json({ message: "Course added" });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, tutorId } = req.body;
  await db.run("UPDATE courses SET title=?, description=?, tutorId=? WHERE id=?", [title, description, tutorId, id]);
  res.json({ message: "Course updated" });
});

router.delete("/:id", async (req, res) => {
  await db.run("DELETE FROM courses WHERE id=?", [req.params.id]);
  res.json({ message: "Course deleted" });
});

export default router;
