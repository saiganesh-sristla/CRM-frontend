import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({ name: '', industry: '', address: '', website: '' });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const res = await API.get('/companies');
    setCompanies(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/companies', form);
    setForm({ name: '', industry: '', address: '', website: '' })
    fetchCompanies();
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-4">Companies</h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-2xl">
        <input
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Industry"
          value={form.industry}
          onChange={e => setForm({ ...form, industry: e.target.value })}
        />
        <input
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Address"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
        />
        <input
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Website"
          value={form.website}
          onChange={e => setForm({ ...form, website: e.target.value })}
        />
        <button
          className="col-span-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          type="submit"
        >
          Add Company
        </button>
      </form>

      <ul className="space-y-2">
        {companies.map(c => (
          <li key={c._id} className="bg-white p-4 rounded shadow border">
            <p className="font-semibold text-lg">{c.name}</p>
            <p className="text-sm text-gray-600">Industry: {c.industry}</p>
            <p className="text-sm text-gray-600">Address: {c.address}</p>
            <p className="text-sm text-blue-600">{c.website}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Companies;