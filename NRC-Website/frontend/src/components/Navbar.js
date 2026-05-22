import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      {/* Top bar */}
      <div className="navbar-topbar">
        <div className="container topbar-inner">
          <span>📞 8882443540</span>
          <span>✉ prabhuahirwar9717@gmail.com</span>
          <span>📍 Bhondsi, Gurugram - 122102</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="navbar-main">
        <div className="container navbar-inner">
          <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
            <div className="brand-logo">NRC</div>
            <div className="brand-text">
              <span className="brand-name">National Resolve Carrier</span>
              <span className="brand-tagline">Pan India Transport Services</span>
            </div>
          </Link>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>

          <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
            {[
              { to: '/', label: 'Home' },
              { to: '/services', label: 'Services' },
              { to: '/track', label: 'Track Shipment' },
              { to: '/about', label: 'About Us' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} end={to === '/'} onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to="/book" className="btn btn-primary nav-book-btn" onClick={() => setMenuOpen(false)}>
                Book Transport
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
