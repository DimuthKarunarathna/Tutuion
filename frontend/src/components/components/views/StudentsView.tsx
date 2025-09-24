import React from 'react';
import { Search, Plus, Edit2, Trash2, Users } from 'lucide-react';
import type { Student, Payment } from '../TuitionDashboard';

type Props = {
  students: Student[];
  payments: Payment[];
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  setShowAddStudent: (v: boolean) => void;
  handleEditStudent: (s: Student) => void;
  handleDeleteStudent: (id: string) => void;
};

const StudentsView: React.FC<Props> = ({ students, payments, searchTerm, setSearchTerm, setShowAddStudent, handleEditStudent, handleDeleteStudent }) => {
  const hasStudentPaid = (studentId: string) => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentYear = new Date().getFullYear().toString();
    return payments.some(p => p.studentId === studentId && p.month === currentMonth && p.year === currentYear);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search students by name, ID, or class..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </div>
        <button
          onClick={() => setShowAddStudent(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Student
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academic Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Fee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map(student => {
                const hasPaid = hasStudentPaid(student.id);
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">ID: {student.id}</div>
                        <div className="text-sm text-gray-500">📱 {student.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">Class: {student.class}</div>
                        <div className="text-sm text-gray-500">Subject: {student.subject}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{student.monthlyFee}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${hasPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {hasPaid ? '✅ Paid' : '⏳ Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEditStudent(student)} className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded" title="Edit Student">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDeleteStudent(student.id)} className="text-red-600 hover:text-red-800 transition-colors p-1 rounded" title="Delete Student">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {students.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
            <p className="mt-1 text-sm text-gray-500">{searchTerm ? 'Try adjusting your search' : 'Get started by adding your first student'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsView;


