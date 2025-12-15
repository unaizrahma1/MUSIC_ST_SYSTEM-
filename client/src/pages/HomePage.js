import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container home">
      <div className="hero-section">
        <h1>Music Studio Information System</h1>
        <p className="subtitle">
          Manage your clients, rooms, instructors, and bookings all in one
          place.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3>Clients</h3>
          <p>
            Manage your client database with contact information and booking
            history.
          </p>
          <Link to="/clients" className="feature-link">
            Manage Clients →
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎵</div>
          <h3>Rooms</h3>
          <p>
            Keep track of studio rooms, their capacity, and available equipment.
          </p>
          <Link to="/rooms" className="feature-link">
            Manage Rooms →
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎓</div>
          <h3>Instructors</h3>
          <p>
            Organize instructor information, specialties, and availability
            schedules.
          </p>
          <Link to="/instructors" className="feature-link">
            Manage Instructors →
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📅</div>
          <h3>Bookings</h3>
          <p>
            Schedule and manage studio bookings with clients and instructors.
          </p>
          <Link to="/bookings" className="feature-link">
            Manage Bookings →
          </Link>
        </div>
      </div>

      <div className="info-section">
        <h2>Welcome to Your Studio Management Hub</h2>
        <p>
          This system helps you streamline your music studio operations.
          Navigate through the sections above to get started.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
