import express from "express";
import db from "../models/db.js";
const router = express.Router();

router.get("/", async (_, res) => {
  const rows = await db.all("SELECT * FROM students");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { name, email, course } = req.body;
  await db.run("INSERT INTO students (name, email, course) VALUES (?, ?, ?)", [name, email, course]);
  res.json({ message: "Student added" });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, course } = req.body;
  await db.run("UPDATE students SET name=?, email=?, course=? WHERE id=?", [name, email, course, id]);
  res.json({ message: "Student updated" });
});

router.delete("/:id", async (req, res) => {
  await db.run("DELETE FROM students WHERE id=?", [req.params.id]);
  res.json({ message: "Student deleted" });
});

export default router;
