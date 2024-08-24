import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../styles/navbar.css';

const NavBar: React.FC = () => {
  return (
        <nav className="navbar">
        <div className="navbar-container">
            <div className="navbar-logo">
                <Link to="/">
                    <img src="/images/mathlearnlogo.png" alt="Math Tutoring Logo in Fayetteville, AR" className="logo-image" />
                </Link>
            </div>
            <ul className="navbar-menu">
            <li><Link to="/courses/primary">Primary</Link></li>
            <li><Link to="/courses/algebra">Algebra</Link></li>
            <li><Link to="/courses/geometry">Geometry</Link></li>
            <li><Link to="/about">About</Link></li>
            </ul>
        </div>
        </nav>

  );
};

export default NavBar;