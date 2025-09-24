// frontend/src/pages/TutorPage.jsx
import { useEffect, useState } from "react";
import API from "../services/api";

export default function TutorPage() {
  const [tutors, setTutors] = useState([]);
  const [form, setForm] = useState({ name: "", subject: "" });
  const [editId, setEditId] = useState(null);

  const fetchTutors = async () => {
    setTutors((await API.get("/tutors")).data);
  };

  useEffect(() => { fetchTutors(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/tutors/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/tutors", form);
    }
    setForm({ name: "", subject: "" });
    fetchTutors();
  };

  const handleEdit = (t) => {
    setForm({ name: t.name, subject: t.subject });
    setEditId(t.id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/tutors/${id}`);
    fetchTutors();
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Tutors</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
        <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Subject" />
        <button type="submit" className="bg-green-500 text-white px-4">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <table className="border w-full">
        <thead>
          <tr className="bg-gray-200"><th>Name</th><th>Subject</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {tutors.map(t => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.subject}</td>
              <td>
                <button onClick={() => handleEdit(t)} className="text-blue-500">Edit</button> | 
                <button onClick={() => handleDelete(t.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
