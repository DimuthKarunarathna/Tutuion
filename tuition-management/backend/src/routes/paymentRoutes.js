import express from "express";
import db from "../models/db.js";
const router = express.Router();

router.get("/", async (_, res) => {
  res.json(await db.all("SELECT * FROM payments"));
});

router.post("/", async (req, res) => {
  const { studentId, amount, date } = req.body;
  await db.run("INSERT INTO payments (studentId, amount, date) VALUES (?, ?, ?)", [studentId, amount, date]);
  res.json({ message: "Payment added" });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { studentId, amount, date } = req.body;
  await db.run("UPDATE payments SET studentId=?, amount=?, date=? WHERE id=?", [studentId, amount, date, id]);
  res.json({ message: "Payment updated" });
});

router.delete("/:id", async (req, res) => {
  await db.run("DELETE FROM payments WHERE id=?", [req.params.id]);
  res.json({ message: "Payment deleted" });
});

export default router;
