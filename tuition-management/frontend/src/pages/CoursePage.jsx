// frontend/src/pages/CoursePage.jsx
import { useEffect, useState } from "react";
import API from "../services/api";

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", tutorId: "" });
  const [editId, setEditId] = useState(null);

  const fetchCourses = async () => {
    setCourses((await API.get("/courses")).data);
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/courses/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/courses", form);
    }
    setForm({ title: "", description: "", tutorId: "" });
    fetchCourses();
  };

  const handleEdit = (c) => {
    setForm({ title: c.title, description: c.description, tutorId: c.tutorId });
    setEditId(c.id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/courses/${id}`);
    fetchCourses();
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Courses</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" />
        <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" />
        <input value={form.tutorId} onChange={e => setForm({ ...form, tutorId: e.target.value })} placeholder="Tutor ID" />
        <button type="submit" className="bg-green-500 text-white px-4">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <table className="border w-full">
        <thead>
          <tr className="bg-gray-200"><th>Title</th><th>Description</th><th>Tutor ID</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {courses.map(c => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td>{c.description}</td>
              <td>{c.tutorId}</td>
              <td>
                <button onClick={() => handleEdit(c)} className="text-blue-500">Edit</button> | 
                <button onClick={() => handleDelete(c.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
