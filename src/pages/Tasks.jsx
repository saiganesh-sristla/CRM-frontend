import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending',
    relatedTo: '',
    relationModel: 'Company',
  });
  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetchTasks();
    API.get('/companies').then((res) => setCompanies(res.data));
    API.get('/contacts').then((res) => setContacts(res.data));
    API.get('/deals').then((res) => setDeals(res.data));
  }, []);

  const fetchTasks = async () => {
    const res = await API.get('/tasks');
    setTasks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/tasks', form);
    fetchTasks();
  };

  const getOptions = () => {
    const map = {
      Company: companies,
      Contact: contacts,
      Deal: deals,
    };
    return map[form.relationModel] || [];
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-4">Tasks</h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="date"
          className="w-full border border-gray-300 rounded p-2"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />
        <textarea
          className="w-full border border-gray-300 rounded p-2 col-span-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>
        <select
          className="w-full border border-gray-300 rounded p-2"
          value={form.relationModel}
          onChange={(e) => setForm({ ...form, relationModel: e.target.value, relatedTo: '' })}
        >
          <option value="Company">Company</option>
          <option value="Contact">Contact</option>
          <option value="Deal">Deal</option>
        </select>
        <select
          className="w-full border border-gray-300 rounded p-2"
          value={form.relatedTo}
          onChange={(e) => setForm({ ...form, relatedTo: e.target.value })}
        >
          <option value="">Select {form.relationModel}</option>
          {getOptions().map((item) => (
            <option key={item._id} value={item._id}>
              {item.name || item.title}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="col-span-full bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Add Task
        </button>
      </form>

      <ul className="space-y-4">
        {tasks.map((t) => (
          <li
            key={t._id}
            className="bg-white p-4 rounded shadow border border-gray-200"
          >
            <p className="font-semibold">{t.title}</p>
            <p className="text-sm text-gray-500">{t.description}</p>
            <p className="text-sm text-gray-400">
              Due: {new Date(t.dueDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-green-600">Status: {t.status}</p>
            <p className="text-sm text-gray-500">
              Related To: {t.relationModel} ({t.relatedTo?.name || t.relatedTo?.title || 'N/A'})
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;