import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', tag: '', company: '' });
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    API.get('/companies').then(res => setCompanies(res.data));
    API.get('/contacts').then(res => setContacts(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/contacts', form);
    const res = await API.get('/contacts');
    setContacts(res.data);
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-4">Contacts</h3>
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input className="w-full border border-gray-300 rounded p-2" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="w-full border border-gray-300 rounded p-2" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border border-gray-300 rounded p-2" placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />
        <select className="w-full border border-gray-300 rounded p-2" onChange={e => setForm({ ...form, tag: e.target.value })}>
          <option value="">Select Tag</option>
          <option value="Cold">Cold</option>
          <option value="Warm">Warm</option>
          <option value="Hot">Hot</option>
        </select>
        <select className="w-full border border-gray-300 rounded p-2" onChange={e => setForm({ ...form, company: e.target.value })}>
          <option value="">Select Company</option>
          {companies.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700" type="submit">Add Contact</button>
      </form>

      <ul className="space-y-2">
        {contacts.map(c => (
          <li key={c._id} className="bg-white p-4 rounded shadow border">
            <p className="font-semibold">{c.name}</p>
            <p className="text-sm text-gray-500">{c.email} | {c.phone} | {c.tag}</p>
            <p className="text-sm text-gray-400">Company: {c.company?.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;