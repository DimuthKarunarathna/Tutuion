import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Users, DollarSign, Calendar, BookOpen } from 'lucide-react';

const TuitionDashboard = () => {
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);

  // Load data from memory on component mount
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('tuition_students') || '[]');
    const savedPayments = JSON.parse(localStorage.getItem('tuition_payments') || '[]');
    setStudents(savedStudents);
    setPayments(savedPayments);
  }, []);

  // Save data to memory whenever students or payments change
  useEffect(() => {
    localStorage.setItem('tuition_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('tuition_payments', JSON.stringify(payments));
  }, [payments]);

  const [studentForm, setStudentForm] = useState({
    id: '',
    name: '',
    class: '',
    subject: '',
    phone: '',
    monthlyFee: '',
    joinDate: ''
  });

  const [paymentForm, setPaymentForm] = useState({
    studentId: '',
    amount: '',
    month: '',
    year: new Date().getFullYear().toString(),
    date: new Date().toISOString().split('T')[0]
  });

  const resetStudentForm = () => {
    setStudentForm({
      id: '',
      name: '',
      class: '',
      subject: '',
      phone: '',
      monthlyFee: '',
      joinDate: ''
    });
  };

  const resetPaymentForm = () => {
    setPaymentForm({
      studentId: '',
      amount: '',
      month: '',
      year: new Date().getFullYear().toString(),
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (students.find(s => s.id === studentForm.id)) {
      alert('Student ID already exists!');
      return;
    }
    
    const newStudent = {
      ...studentForm,
      monthlyFee: parseFloat(studentForm.monthlyFee),
      createdAt: new Date().toISOString()
    };
    
    setStudents([...students, newStudent]);
    resetStudentForm();
    setShowAddStudent(false);
  };

  const handleEditStudent = (student) => {
    setStudentForm(student);
    setEditingStudent(student.id);
    setShowAddStudent(true);
  };

  const handleUpdateStudent = (e) => {
    e.preventDefault();
    setStudents(students.map(s => 
      s.id === editingStudent 
        ? { ...studentForm, monthlyFee: parseFloat(studentForm.monthlyFee) }
        : s
    ));
    resetStudentForm();
    setEditingStudent(null);
    setShowAddStudent(false);
  };

  const handleDeleteStudent = (studentId) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== studentId));
      setPayments(payments.filter(p => p.studentId !== studentId));
    }
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    const student = students.find(s => s.id === paymentForm.studentId);
    if (!student) {
      alert('Student not found!');
      return;
    }

    const newPayment = {
      id: Date.now().toString(),
      ...paymentForm,
      amount: parseFloat(paymentForm.amount),
      studentName: student.name,
      createdAt: new Date().toISOString()
    };

    setPayments([...payments, newPayment]);
    resetPaymentForm();
    setShowAddPayment(false);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStudentPayments = (studentId) => {
    return payments.filter(p => p.studentId === studentId);
  };

  const getTotalRevenue = () => {
    return payments.reduce((sum, payment) => sum + payment.amount, 0);
  };

  const getMonthlyRevenue = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return payments
      .filter(p => {
        const paymentDate = new Date(p.date);
        return paymentDate.getMonth() === currentMonth && 
               paymentDate.getFullYear() === currentYear;
      })
      .reduce((sum, payment) => sum + payment.amount, 0);
  };

  const getPendingStudents = () => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentYear = new Date().getFullYear();
    
    return students.filter(student => {
      const studentPayments = payments.filter(p => 
        p.studentId === student.id && 
        p.month === currentMonth && 
        p.year === currentYear.toString()
      );
      return studentPayments.length === 0;
    });
  };

  const DashboardView = () => (
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
              <p className="text-2xl font-bold text-orange-800">{getPendingStudents().length}</p>
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
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Pending This Month</h3>
          <div className="space-y-3">
            {getPendingStudents().slice(0, 5).map(student => (
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
          </div>
        </div>
      </div>
    </div>
  );

  const StudentsView = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Fee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map(student => {
                const currentMonth = new Date().toLocaleString('default', { month: 'long' });
                const currentYear = new Date().getFullYear().toString();
                const hasPaid = payments.some(p => 
                  p.studentId === student.id && 
                  p.month === currentMonth && 
                  p.year === currentYear
                );
                
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">ID: {student.id}</div>
                        <div className="text-sm text-gray-500">{student.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{student.class}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{student.subject}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹{student.monthlyFee}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        hasPaid 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {hasPaid ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditStudent(student)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
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
      </div>
    </div>
  );

  const PaymentsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Payment Records</h2>
        <button
          onClick={() => setShowAddPayment(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Payment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map(payment => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{payment.studentName}</div>
                        <div className="text-sm text-gray-500">ID: {payment.studentId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-green-600">₹{payment.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{payment.month} {payment.year}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{new Date(payment.date).toLocaleDateString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Tuition Management</h1>
            </div>
            <div className="flex space-x-8">
              {['dashboard', 'students', 'payments'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`capitalize px-3 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'students' && <StudentsView />}
        {activeTab === 'payments' && <PaymentsView />}
      </main>

      {/* Add/Edit Student Modal */}
      {showAddStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingStudent ? 'Edit Student' : 'Add New Student'}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Student ID"
                value={studentForm.id}
                onChange={(e) => setStudentForm({...studentForm, id: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={editingStudent}
              />
              <input
                type="text"
                placeholder="Student Name"
                value={studentForm.name}
                onChange={(e) => setStudentForm({...studentForm, name: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                placeholder="Class"
                value={studentForm.class}
                onChange={(e) => setStudentForm({...studentForm, class: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                placeholder="Subject"
                value={studentForm.subject}
                onChange={(e) => setStudentForm({...studentForm, subject: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={studentForm.phone}
                onChange={(e) => setStudentForm({...studentForm, phone: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="number"
                placeholder="Monthly Fee"
                value={studentForm.monthlyFee}
                onChange={(e) => setStudentForm({...studentForm, monthlyFee: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="date"
                placeholder="Join Date"
                value={studentForm.joinDate}
                onChange={(e) => setStudentForm({...studentForm, joinDate: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={editingStudent ? handleUpdateStudent : handleAddStudent}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingStudent ? 'Update Student' : 'Add Student'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddStudent(false);
                    setEditingStudent(null);
                    resetStudentForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Modal */}
      {showAddPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Payment</h2>
            <div className="space-y-4">
              <select
                value={paymentForm.studentId}
                onChange={(e) => setPaymentForm({...paymentForm, studentId: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Student</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} (ID: {student.id})
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Amount"
                value={paymentForm.amount}
                onChange={(e) => setPaymentForm({...paymentForm, amount: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <select
                value={paymentForm.month}
                onChange={(e) => setPaymentForm({...paymentForm, month: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Month</option>
                {['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Year"
                value={paymentForm.year}
                onChange={(e) => setPaymentForm({...paymentForm, year: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="date"
                value={paymentForm.date}
                onChange={(e) => setPaymentForm({...paymentForm, date: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleAddPayment}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Payment
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddPayment(false);
                    resetPaymentForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TuitionDashboard;