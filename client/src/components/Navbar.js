import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/clients" className={location.pathname === '/clients' ? 'active' : ''}>
            Clients
          </Link>
        </li>
        <li>
          <Link to="/rooms" className={location.pathname === '/rooms' ? 'active' : ''}>
            Rooms
          </Link>
        </li>
        <li>
          <Link to="/instructors" className={location.pathname === '/instructors' ? 'active' : ''}>
            Instructors
          </Link>
        </li>
        <li>
          <Link to="/bookings" className={location.pathname === '/bookings' ? 'active' : ''}>
            Bookings
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
