import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="../../images/f.png" alt="Logo" />
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        </nav>
    </header>
  );
}

export default Header;