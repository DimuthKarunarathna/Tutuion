// frontend/src/pages/PaymentPage.jsx
import { useEffect, useState } from "react";
import API from "../services/api";

export default function PaymentPage() {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ studentId: "", amount: "", date: "" });
  const [editId, setEditId] = useState(null);

  const fetchPayments = async () => {
    setPayments((await API.get("/payments")).data);
  };

  useEffect(() => { fetchPayments(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/payments/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/payments", form);
    }
    setForm({ studentId: "", amount: "", date: "" });
    fetchPayments();
  };

  const handleEdit = (p) => {
    setForm({ studentId: p.studentId, amount: p.amount, date: p.date });
    setEditId(p.id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/payments/${id}`);
    fetchPayments();
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Payments</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input value={form.studentId} onChange={e => setForm({ ...form, studentId: e.target.value })} placeholder="Student ID" />
        <input value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="Amount" />
        <input value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="Date" />
        <button type="submit" className="bg-green-500 text-white px-4">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <table className="border w-full">
        <thead>
          <tr className="bg-gray-200"><th>Student ID</th><th>Amount</th><th>Date</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id}>
              <td>{p.studentId}</td>
              <td>{p.amount}</td>
              <td>{p.date}</td>
              <td>
                <button onClick={() => handleEdit(p)} className="text-blue-500">Edit</button> | 
                <button onClick={() => handleDelete(p.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
