import React, { useState, useEffect } from 'react';
import { getAllRooms, createRoom, updateRoom, deleteRoom } from '../api';

function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ roomName: '', capacity: '', equipment: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await getAllRooms();
      setRooms(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateRoom(editingId, formData);
      } else {
        await createRoom(formData);
      }
      setFormData({ roomName: '', capacity: '', equipment: '' });
      setEditingId(null);
      fetchRooms();
    } catch (err) {
      setError('Failed to save room');
    }
  };

  const handleEdit = (room) => {
    setFormData({ roomName: room.roomName, capacity: room.capacity, equipment: room.equipment });
    setEditingId(room._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await deleteRoom(id);
        fetchRooms();
      } catch (err) {
        setError('Failed to delete room');
      }
    }
  };

  const handleCancel = () => {
    setFormData({ roomName: '', capacity: '', equipment: '' });
    setEditingId(null);
  };

  if (loading) return <div className="container loading">Loading...</div>;

  return (
    <div className="container">
      <h1>Rooms Management</h1>

      <div className="form-container">
        <h2>{editingId ? 'Edit Room' : 'Add New Room'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Room Name:</label>
            <input
              type="text"
              value={formData.roomName}
              onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Capacity:</label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Equipment:</label>
            <input
              type="text"
              value={formData.equipment}
              onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Update Room' : 'Add Room'}
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
        <h2>Rooms List</h2>
        <table>
          <thead>
            <tr>
              <th>Room Name</th>
              <th>Capacity</th>
              <th>Equipment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No rooms found</td>
              </tr>
            ) : (
              rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room.roomName}</td>
                  <td>{room.capacity}</td>
                  <td>{room.equipment}</td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-success" onClick={() => handleEdit(room)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(room._id)}>
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

export default RoomsPage;
