import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ClientsPage from './pages/ClientsPage';
import RoomsPage from './pages/RoomsPage';
import InstructorsPage from './pages/InstructorsPage';
import BookingsPage from './pages/BookingsPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/instructors" element={<InstructorsPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
