import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import StudentPage from "./pages/StudentPage";
import TutorPage from "./pages/TutorPage";
import CoursePage from "./pages/CoursePage";
import PaymentPage from "./pages/PaymentPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/students" element={<StudentPage />} />
          <Route path="/tutors" element={<TutorPage />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/payments" element={<PaymentPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
