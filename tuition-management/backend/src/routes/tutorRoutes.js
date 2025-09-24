import express from "express";
import db from "../models/db.js";
const router = express.Router();

router.get("/", async (_, res) => {
  res.json(await db.all("SELECT * FROM tutors"));
});

router.post("/", async (req, res) => {
  const { name, subject } = req.body;
  await db.run("INSERT INTO tutors (name, subject) VALUES (?, ?)", [name, subject]);
  res.json({ message: "Tutor added" });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, subject } = req.body;
  await db.run("UPDATE tutors SET name=?, subject=? WHERE id=?", [name, subject, id]);
  res.json({ message: "Tutor updated" });
});

router.delete("/:id", async (req, res) => {
  await db.run("DELETE FROM tutors WHERE id=?", [req.params.id]);
  res.json({ message: "Tutor deleted" });
});

export default router;
