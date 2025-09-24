import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Tuition Management System</h1>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
          <Link to="/students" className="hover:text-blue-200">Students</Link>
          <Link to="/tutors" className="hover:text-blue-200">Tutors</Link>
          <Link to="/courses" className="hover:text-blue-200">Courses</Link>
          <Link to="/payments" className="hover:text-blue-200">Payments</Link>
        </div>
      </div>
    </nav>
  );
}