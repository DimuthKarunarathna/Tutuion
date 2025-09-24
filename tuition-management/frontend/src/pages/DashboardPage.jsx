import { useEffect, useState } from "react";
import API from "../services/api";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRevenue: 0,
    thisMonth: 0,
    pendingFees: 0
  });
  const [recentPayments, setRecentPayments] = useState([]);
  const [pendingThisMonth, setPendingThisMonth] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard data from API
      const [statsRes, recentPaymentsRes, pendingRes] = await Promise.all([
        API.get("/dashboard/stats"),
        API.get("/dashboard/recent-payments"),
        API.get("/dashboard/pending-this-month")
      ]);

      setStats(statsRes.data);
      setRecentPayments(recentPaymentsRes.data);
      setPendingThisMonth(pendingRes.data);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-3xl text-gray-400">
          {icon}
        </div>
      </div>
    </div>
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tuition Management</h1>
        <p className="text-gray-600 mt-2">Overview of your tuition center</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon="👥"
          color="bg-blue-50"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon="💰"
          color="bg-green-50"
        />
        <StatCard
          title="This Month"
          value={formatCurrency(stats.thisMonth)}
          icon="📅"
          color="bg-purple-50"
        />
        <StatCard
          title="Pending Fees"
          value={stats.pendingFees}
          icon="📚"
          color="bg-orange-50"
        />
      </div>

      {/* Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Payments</h2>
          </div>
          <div className="p-6">
            {recentPayments.length > 0 ? (
              <div className="space-y-4">
                {recentPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{payment.studentName || `Student ID: ${payment.studentId}`}</p>
                      <p className="text-sm text-gray-600">{payment.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{formatCurrency(payment.amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No recent payments</p>
              </div>
            )}
          </div>
        </div>

        {/* Pending This Month */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Pending This Month</h2>
          </div>
          <div className="p-6">
            {pendingThisMonth.length > 0 ? (
              <div className="space-y-4">
                {pendingThisMonth.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">ID: {student.id}</p>
                      <p className="text-sm text-gray-500">{student.course}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-600">LKR 5,000</p>
                      <p className="text-xs text-gray-500">Monthly Fee</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">All fees are up to date</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
