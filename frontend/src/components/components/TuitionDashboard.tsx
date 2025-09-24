import React, { useEffect, useState } from 'react';
import DashboardView from './views/DashboardView';
import StudentsView from './views/StudentsView';
import PaymentsView from './views/PaymentsView';
import StudentModal from './modals/StudentModal';
import PaymentModal from './modals/PaymentModal';

export type Student = {
  id: string;
  name: string;
  class: string;
  subject: string;
  phone: string;
  monthlyFee: number;
  joinDate: string;
  createdAt?: string;
};

export type Payment = {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  month: string;
  year: string;
  date: string;
  createdAt?: string;
};

const TuitionDashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'payments'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStudent, setEditingStudent] = useState<string | null>(null);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);

  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('tuition_students') || '[]');
    const savedPayments = JSON.parse(localStorage.getItem('tuition_payments') || '[]');
    setStudents(savedStudents);
    setPayments(savedPayments);
  }, []);

  useEffect(() => {
    localStorage.setItem('tuition_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('tuition_payments', JSON.stringify(payments));
  }, [payments]);

  const [studentForm, setStudentForm] = useState<Omit<Student, 'monthlyFee'> & { monthlyFee: number | string }>({
    id: '',
    name: '',
    class: '',
    subject: '',
    phone: '',
    monthlyFee: '',
    joinDate: ''
  });

  const [paymentForm, setPaymentForm] = useState<Omit<Payment, 'id' | 'studentName' | 'createdAt' | 'amount'> & { amount: number | string }>({
    studentId: '',
    amount: '',
    month: '',
    year: new Date().getFullYear().toString(),
    date: new Date().toISOString().split('T')[0]
  });

  const resetStudentForm = () => {
    setStudentForm({ id: '', name: '', class: '', subject: '', phone: '', monthlyFee: '', joinDate: '' });
  };

  const resetPaymentForm = () => {
    setPaymentForm({ studentId: '', amount: '', month: '', year: new Date().getFullYear().toString(), date: new Date().toISOString().split('T')[0] });
  };

  const handleAddStudent = () => {
    if (students.find(s => s.id === studentForm.id)) {
      alert('Student ID already exists!');
      return;
    }
    const newStudent: Student = { ...studentForm, monthlyFee: Number(studentForm.monthlyFee) || 0, createdAt: new Date().toISOString() } as Student;
    setStudents([...students, newStudent]);
    resetStudentForm();
    setShowAddStudent(false);
  };

  const handleEditStudent = (student: Student) => {
    setStudentForm(student);
    setEditingStudent(student.id);
    setShowAddStudent(true);
  };

  const handleUpdateStudent = () => {
    setStudents(students.map(s => (s.id === editingStudent ? { ...studentForm, monthlyFee: Number(studentForm.monthlyFee) || 0 } as Student : s)));
    resetStudentForm();
    setEditingStudent(null);
    setShowAddStudent(false);
  };

  const handleDeleteStudent = (studentId: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== studentId));
      setPayments(payments.filter(p => p.studentId !== studentId));
    }
  };

  const handleAddPayment = () => {
    const student = students.find(s => s.id === paymentForm.studentId);
    if (!student) {
      alert('Student not found!');
      return;
    }
    const newPayment: Payment = {
      id: Date.now().toString(),
      ...paymentForm,
      amount: Number(paymentForm.amount) || 0,
      studentName: student.name,
      createdAt: new Date().toISOString()
    } as Payment;
    setPayments([...payments, newPayment]);
    resetPaymentForm();
    setShowAddPayment(false);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTotalRevenue = () => payments.reduce((sum, p) => sum + p.amount, 0);

  const getMonthlyRevenue = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return payments
      .filter(p => {
        const d = new Date(p.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, p) => sum + p.amount, 0);
  };

  const getPendingStudents = () => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentYear = new Date().getFullYear().toString();
    return students.filter(student => !payments.some(p => p.studentId === student.id && p.month === currentMonth && p.year === currentYear));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Tuition Management</h1>
            </div>
            <div className="flex space-x-8">
              {(['dashboard', 'students', 'payments'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`capitalize px-3 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            students={students}
            payments={payments}
            getTotalRevenue={getTotalRevenue}
            getMonthlyRevenue={getMonthlyRevenue}
            getPendingStudents={getPendingStudents}
          />
        )}
        {activeTab === 'students' && (
          <StudentsView
            students={filteredStudents}
            payments={payments}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setShowAddStudent={setShowAddStudent}
            handleEditStudent={handleEditStudent}
            handleDeleteStudent={handleDeleteStudent}
          />
        )}
        {activeTab === 'payments' && <PaymentsView payments={payments} setShowAddPayment={setShowAddPayment} />}
      </main>

      {showAddStudent && (
        <StudentModal
          studentForm={studentForm}
          setStudentForm={setStudentForm}
          editingStudent={editingStudent}
          onSave={editingStudent ? handleUpdateStudent : handleAddStudent}
          onCancel={() => {
            setShowAddStudent(false);
            setEditingStudent(null);
            resetStudentForm();
          }}
        />
      )}

      {showAddPayment && (
        <PaymentModal
          paymentForm={paymentForm}
          setPaymentForm={setPaymentForm}
          students={students}
          onSave={handleAddPayment}
          onCancel={() => {
            setShowAddPayment(false);
            resetPaymentForm();
          }}
        />
      )}
    </div>
  );
};

export default TuitionDashboard;


