import React, { useState, useEffect } from 'react';
import { getAllInstructors, createInstructor, updateInstructor, deleteInstructor } from '../api';

function InstructorsPage() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', specialty: '', availability: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      setLoading(true);
      const response = await getAllInstructors();
      setInstructors(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch instructors');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateInstructor(editingId, formData);
      } else {
        await createInstructor(formData);
      }
      setFormData({ name: '', specialty: '', availability: '' });
      setEditingId(null);
      fetchInstructors();
    } catch (err) {
      setError('Failed to save instructor');
    }
  };

  const handleEdit = (instructor) => {
    setFormData({
      name: instructor.name,
      specialty: instructor.specialty,
      availability: instructor.availability
    });
    setEditingId(instructor._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this instructor?')) {
      try {
        await deleteInstructor(id);
        fetchInstructors();
      } catch (err) {
        setError('Failed to delete instructor');
      }
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', specialty: '', availability: '' });
    setEditingId(null);
  };

  if (loading) return <div className="container loading">Loading...</div>;

  return (
    <div className="container">
      <h1>Instructors Management</h1>

      <div className="form-container">
        <h2>{editingId ? 'Edit Instructor' : 'Add New Instructor'}</h2>
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
            <label>Specialty:</label>
            <input
              type="text"
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Availability:</label>
            <input
              type="text"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              placeholder="e.g., Mon-Fri 9AM-5PM"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Update Instructor' : 'Add Instructor'}
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
        <h2>Instructors List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialty</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {instructors.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No instructors found</td>
              </tr>
            ) : (
              instructors.map((instructor) => (
                <tr key={instructor._id}>
                  <td>{instructor.name}</td>
                  <td>{instructor.specialty}</td>
                  <td>{instructor.availability}</td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-success" onClick={() => handleEdit(instructor)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(instructor._id)}>
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

export default InstructorsPage;
