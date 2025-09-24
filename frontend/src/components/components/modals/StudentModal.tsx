import React from 'react';
import type { Student } from '../../components/TuitionDashboard';

type Props = {
  studentForm: Omit<Student, 'monthlyFee'> & { monthlyFee: number | string };
  setStudentForm: (v: any) => void;
  editingStudent: string | null;
  onSave: () => void;
  onCancel: () => void;
};

const StudentModal: React.FC<Props> = ({ studentForm, setStudentForm, editingStudent, onSave, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
        <div className="space-y-4">
          <input type="text" placeholder="Student ID" value={studentForm.id} onChange={(e) => setStudentForm({ ...studentForm, id: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required disabled={!!editingStudent} />
          <input type="text" placeholder="Student Name" value={studentForm.name} onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          <input type="text" placeholder="Class" value={studentForm.class} onChange={(e) => setStudentForm({ ...studentForm, class: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          <input type="text" placeholder="Subject" value={studentForm.subject} onChange={(e) => setStudentForm({ ...studentForm, subject: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          <input type="tel" placeholder="Phone Number" value={studentForm.phone} onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          <input type="number" placeholder="Monthly Fee" value={studentForm.monthlyFee} onChange={(e) => setStudentForm({ ...studentForm, monthlyFee: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          <input type="date" placeholder="Join Date" value={studentForm.joinDate} onChange={(e) => setStudentForm({ ...studentForm, joinDate: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onSave} className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">{editingStudent ? 'Update Student' : 'Add Student'}</button>
            <button type="button" onClick={onCancel} className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;


