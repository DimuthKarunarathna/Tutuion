import type { Student } from '../../components/TuitionDashboard';

type PaymentForm = {
  studentId: string;
  amount: number | string;
  month: string;
  year: string;
  date: string;
};

type Props = {
  paymentForm: PaymentForm;
  setPaymentForm: (v: any) => void;
  students: Student[];
  onSave: () => void;
  onCancel: () => void;
};

const PaymentModal: React.FC<Props> = ({ paymentForm, setPaymentForm, students, onSave, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Payment</h2>
        <div className="space-y-4">
          <select value={paymentForm.studentId} onChange={(e) => setPaymentForm({ ...paymentForm, studentId: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
            <option value="">Select Student</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.name} (ID: {student.id})
              </option>
            ))}
          </select>
          <input type="number" placeholder="Amount" value={paymentForm.amount} onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          <select value={paymentForm.month} onChange={(e) => setPaymentForm({ ...paymentForm, month: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
            <option value="">Select Month</option>
            {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <input type="number" placeholder="Year" value={paymentForm.year} onChange={(e) => setPaymentForm({ ...paymentForm, year: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          <input type="date" value={paymentForm.date} onChange={(e) => setPaymentForm({ ...paymentForm, date: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onSave} className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">Add Payment</button>
            <button type="button" onClick={onCancel} className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;


