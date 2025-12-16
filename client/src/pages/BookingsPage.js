import React, { useState, useEffect } from 'react';
import {
  getAllBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getAllClients,
  getAllRooms,
  getAllInstructors
} from '../api';

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [clients, setClients] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    clientId: '',
    roomId: '',
    instructorId: '',
    date: '',
    time: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [bookingsRes, clientsRes, roomsRes, instructorsRes] = await Promise.all([
        getAllBookings(),
        getAllClients(),
        getAllRooms(),
        getAllInstructors()
      ]);
      setBookings(bookingsRes.data);
      setClients(clientsRes.data);
      setRooms(roomsRes.data);
      setInstructors(instructorsRes.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateBooking(editingId, formData);
      } else {
        await createBooking(formData);
      }
      setFormData({ clientId: '', roomId: '', instructorId: '', date: '', time: '' });
      setEditingId(null);
      fetchAllData();
    } catch (err) {
      setError('Failed to save booking');
    }
  };

  const handleEdit = (booking) => {
    setFormData({
      clientId: booking.clientId?._id || '',
      roomId: booking.roomId?._id || '',
      instructorId: booking.instructorId?._id || '',
      date: booking.date,
      time: booking.time
    });
    setEditingId(booking._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteBooking(id);
        fetchAllData();
      } catch (err) {
        setError('Failed to delete booking');
      }
    }
  };

  const handleCancel = () => {
    setFormData({ clientId: '', roomId: '', instructorId: '', date: '', time: '' });
    setEditingId(null);
  };

  if (loading) return <div className="container loading">Loading...</div>;

  return (
    <div className="container">
      <h1>Bookings Management</h1>

      <div className="form-container">
        <h2>{editingId ? 'Edit Booking' : 'Add New Booking'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Client:</label>
            <select
              value={formData.clientId}
              onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
              required
            >
              <option value="">Select Client</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name} - {client.email}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Room:</label>
            <select
              value={formData.roomId}
              onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
              required
            >
              <option value="">Select Room</option>
              {rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  {room.roomName} (Capacity: {room.capacity})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Instructor:</label>
            <select
              value={formData.instructorId}
              onChange={(e) => setFormData({ ...formData, instructorId: e.target.value })}
              required
            >
              <option value="">Select Instructor</option>
              {instructors.map((instructor) => (
                <option key={instructor._id} value={instructor._id}>
                  {instructor.name} - {instructor.specialty}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Time:</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Update Booking' : 'Add Booking'}
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
        <h2>Bookings List</h2>
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Room</th>
              <th>Instructor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>No bookings found</td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.clientId?.name || 'Unknown Client'}</td>
                  <td>{booking.roomId?.roomName || 'Unknown Room'}</td>
                  <td>{booking.instructorId?.name || 'Unknown Instructor'}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-success" onClick={() => handleEdit(booking)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(booking._id)}>
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

export default BookingsPage;
