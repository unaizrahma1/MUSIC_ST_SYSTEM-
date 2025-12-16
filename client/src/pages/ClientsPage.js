import React, { useState, useEffect } from 'react';
import { getAllClients, createClient, updateClient, deleteClient } from '../api';

function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await getAllClients();
      setClients(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch clients');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateClient(editingId, formData);
      } else {
        await createClient(formData);
      }
      setFormData({ name: '', email: '', phone: '' });
      setEditingId(null);
      fetchClients();
    } catch (err) {
      setError('Failed to save client');
    }
  };

  const handleEdit = (client) => {
    setFormData({ name: client.name, email: client.email, phone: client.phone });
    setEditingId(client._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await deleteClient(id);
        fetchClients();
      } catch (err) {
        setError('Failed to delete client');
      }
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '', phone: '' });
    setEditingId(null);
  };

  if (loading) return <div className="container loading">Loading...</div>;

  return (
    <div className="container">
      <h1>Clients Management</h1>

      <div className="form-container">
        <h2>{editingId ? 'Edit Client' : 'Add New Client'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Update Client' : 'Add Client'}
          </button>
          {editingId && (
            <button type="button" className="btn btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </form>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="table-container">
        <h2>Clients List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No clients found</td>
              </tr>
            ) : (
              clients.map((client) => (
                <tr key={client._id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-success" onClick={() => handleEdit(client)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(client._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientsPage;
