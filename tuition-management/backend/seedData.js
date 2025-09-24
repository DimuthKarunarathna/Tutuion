import db from "./src/models/db.js";

const seedData = async () => {
  try {
    // Add sample students
    await db.run("INSERT OR IGNORE INTO students (name, email, course) VALUES (?, ?, ?)", 
      ["John Doe", "john@example.com", "Mathematics"]);
    await db.run("INSERT OR IGNORE INTO students (name, email, course) VALUES (?, ?, ?)", 
      ["Jane Smith", "jane@example.com", "Physics"]);
    await db.run("INSERT OR IGNORE INTO students (name, email, course) VALUES (?, ?, ?)", 
      ["Mike Johnson", "mike@example.com", "Chemistry"]);
    await db.run("INSERT OR IGNORE INTO students (name, email, course) VALUES (?, ?, ?)", 
      ["Sarah Wilson", "sarah@example.com", "Biology"]);

    // Add sample tutors
    await db.run("INSERT OR IGNORE INTO tutors (name, subject) VALUES (?, ?)", 
      ["Dr. Smith", "Mathematics"]);
    await db.run("INSERT OR IGNORE INTO tutors (name, subject) VALUES (?, ?)", 
      ["Prof. Brown", "Physics"]);
    await db.run("INSERT OR IGNORE INTO tutors (name, subject) VALUES (?, ?)", 
      ["Ms. Davis", "Chemistry"]);

    // Add sample courses
    await db.run("INSERT OR IGNORE INTO courses (title, description, tutorId) VALUES (?, ?, ?)", 
      ["Advanced Mathematics", "Calculus and Algebra", 1]);
    await db.run("INSERT OR IGNORE INTO courses (title, description, tutorId) VALUES (?, ?, ?)", 
      ["Physics Fundamentals", "Mechanics and Thermodynamics", 2]);
    await db.run("INSERT OR IGNORE INTO courses (title, description, tutorId) VALUES (?, ?, ?)", 
      ["Organic Chemistry", "Chemical Reactions and Structures", 3]);

    // Add sample payments
    const currentDate = new Date().toISOString().split('T')[0];
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthDate = lastMonth.toISOString().split('T')[0];

    await db.run("INSERT OR IGNORE INTO payments (studentId, amount, date) VALUES (?, ?, ?)", 
      [1, 5000, currentDate]);
    await db.run("INSERT OR IGNORE INTO payments (studentId, amount, date) VALUES (?, ?, ?)", 
      [2, 6000, currentDate]);
    await db.run("INSERT OR IGNORE INTO payments (studentId, amount, date) VALUES (?, ?, ?)", 
      [3, 4500, lastMonthDate]);
    await db.run("INSERT OR IGNORE INTO payments (studentId, amount, date) VALUES (?, ?, ?)", 
      [4, 5500, lastMonthDate]);

    console.log("✅ Sample data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seedData();
