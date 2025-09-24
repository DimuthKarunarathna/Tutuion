import express from "express";
import cors from "cors";
import studentRoutes from "./src/routes/studentRoutes.js";
import tutorRoutes from "./src/routes/tutorRoutes.js";
import courseRoutes from "./src/routes/courseRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/tutors", tutorRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = 5001;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
