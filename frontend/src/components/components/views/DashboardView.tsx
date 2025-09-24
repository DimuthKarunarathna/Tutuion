import React from 'react';
import { Users, DollarSign, Calendar, BookOpen } from 'lucide-react';
import type { Student, Payment } from '../TuitionDashboard';

type Props = {
  students: Student[];
  payments: Payment[];
  getTotalRevenue: () => number;
  getMonthlyRevenue: () => number;
  getPendingStudents: () => Student[];
};

const DashboardView: React.FC<Props> = ({ students, payments, getTotalRevenue, getMonthlyRevenue, getPendingStudents }) => {
  const pendingStudents = getPendingStudents();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Students</p>
              <p className="text-2xl font-bold text-blue-800">{students.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-green-800">₹{getTotalRevenue()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">This Month</p>
              <p className="text-2xl font-bold text-purple-800">₹{getMonthlyRevenue()}</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Pending Fees</p>
              <p className="text-2xl font-bold text-orange-800">{pendingStudents.length}</p>
            </div>
            <BookOpen className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Payments</h3>
          <div className="space-y-3">
            {payments
              .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
              .slice(0, 5)
              .map(payment => (
                <div key={payment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{payment.studentName}</p>
                    <p className="text-sm text-gray-600">{payment.month} {payment.year}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">₹{payment.amount}</p>
                    <p className="text-xs text-gray-500">{new Date(payment.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            {payments.length === 0 && (
              <p className="text-gray-500 text-center py-4">No payments recorded yet</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Pending This Month</h3>
          <div className="space-y-3">
            {pendingStudents.slice(0, 5).map(student => (
              <div key={student.id} className="flex justify-between items-center p-3 bg-red-50 rounded">
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-gray-600">ID: {student.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600">₹{student.monthlyFee}</p>
                  <p className="text-xs text-gray-500">{student.class}</p>
                </div>
              </div>
            ))}
            {pendingStudents.length === 0 && (
              <p className="text-green-500 text-center py-4">All fees collected for this month! 🎉</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;


