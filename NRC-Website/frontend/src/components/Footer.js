import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container footer-grid">

          <div className="footer-col footer-about">
            <div className="footer-logo">
              <span className="footer-logo-box">NRC</span>
              <div>
                <span className="footer-company">National Resolve Carrier</span>
                <span className="footer-reg">Registered Transport Company</span>
              </div>
            </div>
            <p>Providing reliable, safe and affordable transport services across all states of India since 2016. Trusted by 700+ satisfied clients.</p>
            <div className="footer-achievement">
              <span>🏆 700+ Transports Completed</span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/book">Book Transport</Link></li>
              <li><Link to="/track">Track Shipment</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Our Services</h4>
            <ul>
              <li>Mini Truck Transport</li>
              <li>Full Truck Load (FTL)</li>
              <li>Part Truck Load (PTL)</li>
              <li>Heavy Machinery Transport</li>
              <li>Household Shifting</li>
              <li>Express Delivery</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Information</h4>
            <ul className="contact-list">
              <li>
                <span className="ci-icon">📞</span>
                <div>
                  <strong>Phone</strong>
                  <a href="tel:8882443540">8882443540</a>
                </div>
              </li>
              <li>
                <span className="ci-icon">✉</span>
                <div>
                  <strong>Email</strong>
                  <a href="mailto:prabhuahirwar9717@gmail.com">prabhuahirwar9717@gmail.com</a>
                </div>
              </li>
              <li>
                <span className="ci-icon">📍</span>
                <div>
                  <strong>Office Address</strong>
                  <span>H No-441, Gali No-3, Krishna Kunj,<br />Naya Goan, Bhondsi,<br />Gurugram - 122102, Haryana</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} National Resolve Carrier. All Rights Reserved.</span>
          <span>Transport Services | Pan India Operations</span>
        </div>
      </div>
    </footer>
  );
}
