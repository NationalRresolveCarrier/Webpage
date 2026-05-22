import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const SERVICES = [
  { icon: '🚛', title: 'Full Truck Load (FTL)', desc: 'Dedicated truck for your full load. Best for large shipments across India.' },
  { icon: '📦', title: 'Part Truck Load (PTL)', desc: 'Share the truck space. Cost-effective solution for smaller shipments.' },
  { icon: '⚙️', title: 'Heavy Machinery', desc: 'Specialized transport for industrial equipment, generators, and heavy machinery.' },
  { icon: '🏠', title: 'Household Shifting', desc: 'Safe and secure relocation of household goods to any city in India.' },
  { icon: '🚀', title: 'Express Delivery', desc: 'Urgent shipments delivered on priority with real-time tracking.' },
  { icon: '🏭', title: 'Industrial Goods', desc: 'Transport of raw materials, finished goods, and commercial consignments.' },
];

const TESTIMONIALS = [
  { name: 'Rajesh Sharma', city: 'Delhi', text: 'Excellent service! My machinery reached Bangalore in perfect condition. The team was very professional and kept me updated throughout.', stars: 5 },
  { name: 'Kavita Patel', city: 'Ahmedabad', text: 'Used NRC for household shifting from Noida to Pune. Very reliable and the goods were packed carefully. Highly recommend.', stars: 5 },
  { name: 'Sunil Mishra', city: 'Lucknow', text: 'Cost effective and timely delivery. Third time using their service and never disappointed. Great coordination.', stars: 5 },
];

export default function Home() {
  const [stats, setStats] = useState({ transports_done: 700, happy_clients: 500, cities_covered: 150, years_experience: 8 });
  const [trackId, setTrackId] = useState('');

  useEffect(() => {
    axios.get('/api/stats').then(r => setStats(r.data)).catch(() => {});
  }, []);

  return (
    <div className="home">

      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="hero-badge">Est. 2016 · Pan India Operations</div>
          <h1>National Resolve Carrier</h1>
          <p className="hero-sub">Trusted Transport Services Across All States of India</p>
          <p className="hero-desc">
            From small parcels to heavy industrial machinery — we deliver safely, on time, every time.
            Covering 150+ cities with dedicated fleet and professional drivers.
          </p>
          <div className="hero-actions">
            <Link to="/book" className="btn btn-gold">Book Transport Now</Link>
            <Link to="/track" className="btn btn-outline-white">Track Your Shipment</Link>
          </div>
          {/* Quick track */}
          <div className="hero-track">
            <input
              type="text"
              placeholder="Enter Booking ID to track (e.g. NRC20240001)"
              value={trackId}
              onChange={e => setTrackId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && trackId && (window.location.href = `/track?id=${trackId}`)}
            />
            <Link to={`/track?id=${trackId}`} className="btn btn-primary" onClick={e => { if(!trackId) e.preventDefault(); }}>
              Track
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="container stats-grid">
          <div className="stat-item">
            <span className="stat-num">{stats.transports_done}+</span>
            <span className="stat-label">Transports Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">{stats.happy_clients}+</span>
            <span className="stat-label">Happy Clients</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">{stats.cities_covered}+</span>
            <span className="stat-label">Cities Covered</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">{stats.years_experience}+</span>
            <span className="stat-label">Years Experience</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Our Transport Services</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">Comprehensive logistics solutions for every requirement — nationwide.</p>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div className="service-card" key={i}>
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to="/services" className="btn btn-outline">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section why-section">
        <div className="container">
          <div className="why-grid">
            <div className="why-text">
              <h2 className="section-title">Why Choose National Resolve Carrier?</h2>
              <div className="section-divider"></div>
              <p style={{ marginBottom: 20, color: 'var(--text-light)' }}>
                With over 8 years of experience in the transport industry and 700+ successful deliveries,
                we have built our reputation on trust, reliability, and professionalism.
              </p>
              <ul className="why-list">
                {[
                  { icon: '✔', text: 'Fully insured and licensed transport operations' },
                  { icon: '✔', text: 'Real-time tracking for every shipment' },
                  { icon: '✔', text: 'Experienced and verified drivers' },
                  { icon: '✔', text: 'Transparent pricing — no hidden charges' },
                  { icon: '✔', text: 'Dedicated customer support 7 days a week' },
                  { icon: '✔', text: 'Pan-India coverage including remote areas' },
                  { icon: '✔', text: 'Safe loading and unloading practices' },
                  { icon: '✔', text: 'On-time delivery commitment' },
                ].map((item, i) => (
                  <li key={i}><span className="check-icon">{item.icon}</span> {item.text}</li>
                ))}
              </ul>
              <Link to="/book" className="btn btn-primary" style={{ marginTop: 24 }}>Book Now →</Link>
            </div>
            <div className="why-info-box">
              <div className="info-card">
                <div className="info-icon">📍</div>
                <h4>Our Base Location</h4>
                <p>H No-441, Gali No-3, Krishna Kunj<br />Naya Goan, Bhondsi<br />Gurugram - 122102, Haryana</p>
              </div>
              <div className="info-card">
                <div className="info-icon">📞</div>
                <h4>Call Us Anytime</h4>
                <p><a href="tel:8882443540">8882443540</a></p>
                <p style={{ fontSize: 13, color: 'var(--text-light)' }}>Available Mon–Sat, 8AM–8PM</p>
              </div>
              <div className="info-card">
                <div className="info-icon">✉</div>
                <h4>Email Us</h4>
                <p><a href="mailto:prabhuahirwar9717@gmail.com" style={{ fontSize: 13 }}>prabhuahirwar9717@gmail.com</a></p>
              </div>
              <div className="info-card achievement-card">
                <div style={{ fontSize: 32 }}>🏆</div>
                <h4>700+ Transports Done</h4>
                <p>Across India, on time, safely delivered.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section steps-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>How It Works</h2>
          <div className="section-divider" style={{ margin: '10px auto 30px' }}></div>
          <div className="steps-grid">
            {[
              { num: '01', title: 'Book Online or Call', desc: 'Fill the booking form or give us a call. Provide pickup, delivery details and goods information.' },
              { num: '02', title: 'Get Confirmation', desc: 'Receive booking confirmation with a unique Booking ID within minutes.' },
              { num: '03', title: 'Goods Pickup', desc: 'Our team arrives at your location for safe pickup and loading of goods.' },
              { num: '04', title: 'Track & Receive', desc: 'Track your shipment in real-time and receive your goods safely at the destination.' },
            ].map((step, i) => (
              <div className="step-card" key={i}>
                <div className="step-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="section-divider"></div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="stars">{'★'.repeat(t.stars)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <strong>{t.name}</strong>
                  <span>{t.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Ship? Book Your Transport Today!</h2>
          <p>Get a quick quote and confirm your booking in minutes. Available across all states of India.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
            <Link to="/book" className="btn btn-gold">Book Transport</Link>
            <a href="tel:8882443540" className="btn btn-outline-white">Call: 8882443540</a>
          </div>
        </div>
      </section>

    </div>
  );
}
