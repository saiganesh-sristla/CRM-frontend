import React, { useState, useEffect } from 'react';
import API from '../services/api';

function Invoices() {
  const [dealId, setDealId] = useState('');
  const [amount, setAmount] = useState('');
  const [deals, setDeals] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    API.get('/deals').then(res => setDeals(res.data));
    API.get('/invoices').then(res => setInvoices(res.data));
  }, []);

  const createInvoice = async () => {
    await API.post('/invoices', {
      deal: dealId,
      amount,
      date: new Date()
    });
    setDealId('')
    setAmount('')
    const res = await API.get('/invoices');
    setInvoices(res.data);
  };

  const downloadPDF = (id) => {
    window.open(`http://localhost:5000/api/invoices/download/${id}`, '_blank');
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-4">Invoices</h3>

      <div className="space-y-3 max-w-xl">
        <select
          className="w-full border border-gray-300 rounded p-2"
          value={dealId}
          onChange={e => setDealId(e.target.value)}
        >
          <option value="">Select Deal</option>
          {deals.map(d => (
            <option key={d._id} value={d._id}>{d.title}</option>
          ))}
        </select>
        <input
          type="number"
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={createInvoice}
        >
          Create Invoice
        </button>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-medium mb-2">Generated Invoices</h4>
        <ul className="space-y-2">
          {invoices.map(inv => (
            <li key={inv._id} className="bg-white p-4 rounded shadow border">
              <p className="font-medium">Invoice #{inv.invoiceNumber}</p>
              <p className="text-sm text-gray-600">Amount: ₹{inv.amount}</p>
              <p className="text-sm text-gray-500">Date: {new Date(inv.date).toLocaleDateString()}</p>
              <button
                className="text-blue-600 underline mt-1 text-sm"
                onClick={() => downloadPDF(inv._id)}
              >
                Download PDF
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Invoices;
