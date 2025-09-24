import express from "express";
import db from "../models/db.js";
const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    // Get all data
    const students = await db.all("SELECT * FROM students");
    const payments = await db.all("SELECT * FROM payments");

    // Calculate statistics
    const totalStudents = students.length;
    const totalRevenue = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
    
    // This month's revenue
    const currentMonth = new Date().toISOString().slice(0, 7);
    const thisMonth = payments
      .filter(payment => payment.date && payment.date.startsWith(currentMonth))
      .reduce((sum, payment) => sum + (payment.amount || 0), 0);

    // Pending fees (simplified calculation)
    const pendingFees = students.length;

    res.json({
      totalStudents,
      totalRevenue,
      thisMonth,
      pendingFees
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/recent-payments", async (req, res) => {
  try {
    const payments = await db.all(`
      SELECT p.*, s.name as studentName 
      FROM payments p 
      LEFT JOIN students s ON p.studentId = s.id 
      ORDER BY p.date DESC 
      LIMIT 5
    `);
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/pending-this-month", async (req, res) => {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const students = await db.all(`
      SELECT s.* 
      FROM students s 
      LEFT JOIN payments p ON s.id = p.studentId AND p.date LIKE ?
      WHERE p.id IS NULL
      LIMIT 5
    `, [`${currentMonth}%`]);
    
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
