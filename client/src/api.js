import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Clients API
export const getAllClients = () => axios.get(`${API_URL}/clients`);
export const getClientById = (id) => axios.get(`${API_URL}/clients/${id}`);
export const createClient = (data) => axios.post(`${API_URL}/clients`, data);
export const updateClient = (id, data) => axios.put(`${API_URL}/clients/${id}`, data);
export const deleteClient = (id) => axios.delete(`${API_URL}/clients/${id}`);

// Rooms API
export const getAllRooms = () => axios.get(`${API_URL}/rooms`);
export const getRoomById = (id) => axios.get(`${API_URL}/rooms/${id}`);
export const createRoom = (data) => axios.post(`${API_URL}/rooms`, data);
export const updateRoom = (id, data) => axios.put(`${API_URL}/rooms/${id}`, data);
export const deleteRoom = (id) => axios.delete(`${API_URL}/rooms/${id}`);

// Instructors API
export const getAllInstructors = () => axios.get(`${API_URL}/instructors`);
export const getInstructorById = (id) => axios.get(`${API_URL}/instructors/${id}`);
export const createInstructor = (data) => axios.post(`${API_URL}/instructors`, data);
export const updateInstructor = (id, data) => axios.put(`${API_URL}/instructors/${id}`, data);
export const deleteInstructor = (id) => axios.delete(`${API_URL}/instructors/${id}`);

// Bookings API
export const getAllBookings = () => axios.get(`${API_URL}/bookings`);
export const getBookingById = (id) => axios.get(`${API_URL}/bookings/${id}`);
export const createBooking = (data) => axios.post(`${API_URL}/bookings`, data);
export const updateBooking = (id, data) => axios.put(`${API_URL}/bookings/${id}`, data);
export const deleteBooking = (id) => axios.delete(`${API_URL}/bookings/${id}`);
