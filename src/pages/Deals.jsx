import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const statuses = ['Open', 'Won', 'Lost'];

function Deals() {
  const [deals, setDeals] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ title: '', amount: '', status: 'Open', company: '', contact: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDeals();
    fetchCompanies();
    fetchContacts();
  }, []);

  const fetchDeals = async () => {
    try {
      const res = await API.get('/deals');
      setDeals(res.data);
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const res = await API.get('/companies');
      setCompanies(res.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await API.get('/contacts');
      setContacts(res.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleAddDeal = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      await API.post('/deals', form);
      setForm({ title: '', amount: '', status: 'Open', company: '', contact: '' });
      await fetchDeals();
    } catch (error) {
      console.error('Error adding deal:', error);
      alert('Failed to add deal');
    } finally {
      setLoading(false);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    
    // Check if the item was dropped outside a droppable area
    if (!destination) {
      console.log('Dropped outside droppable area');
      return;
    }
    
    // Check if the item was dropped in the same column
    if (source.droppableId === destination.droppableId) {
      console.log('Dropped in same column');
      return;
    }

    const newStatus = destination.droppableId;
    const dealToUpdate = deals.find((deal) => deal._id.toString() === draggableId);
    
    if (!dealToUpdate) {
      console.error('Deal not found:', draggableId);
      return;
    }

    console.log(`Moving deal "${dealToUpdate.title}" from ${dealToUpdate.status} to ${newStatus}`);

    // Optimistically update the UI
    setDeals(prevDeals => 
      prevDeals.map(deal => 
        deal._id.toString() === draggableId 
          ? { ...deal, status: newStatus }
          : deal
      )
    );

    try {
      // Update the deal status on the server
      const response = await API.put(`/deals/${draggableId}`, { 
        ...dealToUpdate, 
        status: newStatus 
      });
      console.log('Deal updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating deal status:', error);
      // Revert the optimistic update if the API call fails
      setDeals(prevDeals => 
        prevDeals.map(deal => 
          deal._id.toString() === draggableId 
            ? { ...deal, status: dealToUpdate.status }
            : deal
        )
      );
      alert('Failed to update deal status');
    }
  };

  const getColumnColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-50 border-blue-200';
      case 'Won':
        return 'bg-green-50 border-green-200';
      case 'Lost':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-100 border-gray-200';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-100 text-blue-800';
      case 'Won':
        return 'bg-green-100 text-green-800';
      case 'Lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Deals Board</h2>

      <form onSubmit={handleAddDeal} className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-6">
        <input
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Deal Title *"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Amount *"
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
        <select
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        >
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company._id} value={company._id}>{company.name}</option>
          ))}
        </select>
        <select
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
        >
          <option value="">Select Contact</option>
          {contacts.map((contact) => (
            <option key={contact._id} value={contact._id}>{contact.name}</option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Adding...' : 'Add Deal'}
        </button>
      </form>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${getColumnColor(status)} rounded-xl p-4 min-h-[400px] shadow-md border-2 transition-colors ${
                    snapshot.isDraggingOver ? 'border-blue-400 bg-blue-100' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{status}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(status)}`}>
                      {deals.filter((deal) => deal.status === status).length}
                    </span>
                  </div>
                  
                  {deals
                    .filter((deal) => deal.status === status)
                    .map((deal, index) => (
                      <Draggable 
                        key={deal._id} 
                        draggableId={deal._id.toString()} 
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white p-3 rounded-lg mb-2 shadow border border-gray-200 hover:bg-gray-50 cursor-grab active:cursor-grabbing transition-all ${
                              snapshot.isDragging ? 'rotate-2 shadow-lg scale-105 z-50' : ''
                            }`}
                            style={{
                              ...provided.draggableProps.style,
                            }}
                          >
                            <p className="font-medium text-gray-900 mb-1">{deal.title}</p>
                            <p className="text-sm font-semibold text-green-600 mb-2">
                              ₹{parseInt(deal.amount || 0).toLocaleString()}
                            </p>
                            <div className="space-y-1">
                              <p className="text-xs text-gray-500">
                                <span className="font-medium">Company:</span> {deal.company?.name || 'N/A'}
                              </p>
                              <p className="text-xs text-gray-500">
                                <span className="font-medium">Contact:</span> {deal.contact?.name || 'N/A'}
                              </p>
                            </div>
                            <div className="mt-2">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(deal.status)}`}>
                                {deal.status}
                              </span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                  
                  {deals.filter((deal) => deal.status === status).length === 0 && (
                    <div className="text-center text-gray-400 mt-8 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                      <p className="text-sm">No deals in {status.toLowerCase()}</p>
                      <p className="text-xs mt-1">Drag deals here to update status</p>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Deals;