import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const SERVICES = [
  {
    icon: '🚛',
    title: 'Full Truck Load (FTL)',
    desc: 'Complete truck dedicated to your shipment. Best option for bulk cargo. The entire vehicle is allocated for your goods, ensuring faster delivery and better security.',
    features: ['Dedicated truck', 'Faster transit', 'Best for 5+ tonnes', 'Direct delivery', 'Lower risk of damage'],
    price: '₹15,000 onwards'
  },
  {
    icon: '📦',
    title: 'Part Truck Load (PTL)',
    desc: 'Share truck space with other consignments. Economical choice for smaller loads that don\'t require a full truck. Ideal for 100 kg to 5 tonnes.',
    features: ['Cost effective', 'Flexible weight', 'Ideal for small businesses', 'Pan-India coverage'],
    price: '₹3,000 onwards'
  },
  {
    icon: '⚙️',
    title: 'Heavy Machinery Transport',
    desc: 'Specialized transport for industrial machines, generators, transformers, boilers, and other heavy equipment. Our team handles all loading and unloading with proper equipment.',
    features: ['Cranes & loading equipment', 'Industrial vehicles', 'Safety certified', 'Permit handling', 'Oversized load support'],
    price: '₹35,000 onwards'
  },
  {
    icon: '🏠',
    title: 'Household Shifting',
    desc: 'Complete household relocation service. We carefully pack, load, transport, unload, and arrange your household goods at the new location anywhere in India.',
    features: ['Proper packing', 'Fragile item care', 'Furniture dismantling', 'Door-to-door service'],
    price: '₹12,000 onwards'
  },
  {
    icon: '🚀',
    title: 'Express / Urgent Delivery',
    desc: 'Time-sensitive shipments delivered on priority. Dedicated vehicle for urgent cargo with minimal stoppage and real-time updates. Delivery within 24–72 hours.',
    features: ['Priority dispatch', 'Real-time tracking', 'Direct route', '24x7 support'],
    price: '₹18,000 onwards'
  },
  {
    icon: '🏭',
    title: 'Industrial Goods Transport',
    desc: 'Bulk movement of raw materials, finished products, automotive parts, chemicals, and commercial goods for factories and warehouses across India.',
    features: ['Bulk handling', 'Warehouse pickup', 'Pan-India network', 'Regular contracts available'],
    price: '₹10,000 onwards'
  },
  {
    icon: '🚗',
    title: 'Vehicle / Automobile Transport',
    desc: 'Safe transport of cars, two-wheelers, trucks, and other vehicles on specialized carriers. Fully insured with GPS tracking throughout the journey.',
    features: ['Enclosed & open carriers', 'GPS tracked', 'Insured transport', 'All vehicle types'],
    price: '₹8,000 onwards'
  },
  {
    icon: '🌾',
    title: 'Agricultural Products',
    desc: 'Transport of grains, fruits, vegetables, fertilizers, and other agricultural goods. Temperature-controlled options available for perishable produce.',
    features: ['Perishable goods handling', 'Temperature control (on request)', 'Bulk grain transport'],
    price: '₹6,000 onwards'
  },
];

export default function Services() {
  return (
    <div>
      <div className="page-banner">
        <div className="container">
          <h1>Our Transport Services</h1>
          <p>Comprehensive logistics solutions for individuals and businesses — Pan India.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="services-page-grid">
            {SERVICES.map((s, i) => (
              <div className="service-page-card" key={i}>
                <div className="spc-icon">{s.icon}</div>
                <div className="spc-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <ul>
                    {s.features.map((f, fi) => <li key={fi}><span className="check-icon">✔</span> {f}</li>)}
                  </ul>
                </div>
                <div className="spc-footer">
                  <span className="spc-price">{s.price}</span>
                  <Link to="/book" className="btn btn-outline">Book Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section coverage-section">
        <div className="container">
          <h2 className="section-title">Pan India Coverage</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">We serve all major states and cities across India. Here are some key routes we regularly operate:</p>
          <div className="routes-grid">
            {[
              'Delhi ↔ Mumbai', 'Delhi ↔ Bangalore', 'Delhi ↔ Chennai', 'Delhi ↔ Hyderabad',
              'Delhi ↔ Kolkata', 'Mumbai ↔ Pune', 'Mumbai ↔ Ahmedabad', 'Bangalore ↔ Chennai',
              'Gurugram ↔ All India', 'Haryana ↔ All States', 'NCR ↔ South India', 'NCR ↔ East India',
            ].map((r, i) => (
              <div className="route-item" key={i}>{r}</div>
            ))}
          </div>
          <p style={{ marginTop: 20, color: 'var(--text-light)', fontSize: 14 }}>
            Don't see your route? Call us at <a href="tel:8882443540"><strong>8882443540</strong></a> — we cover remote locations too.
          </p>
        </div>
      </section>

      <div className="section" style={{ background: 'var(--green-dark)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--white)' }}>Need a Custom Transport Solution?</h2>
          <p style={{ color: 'rgba(255,255,255,0.72)', marginTop: 10, marginBottom: 24 }}>
            Contact us for bulk contracts, regular shipment agreements, or special requirements.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn btn-gold">Book Transport</Link>
            <Link to="/contact" className="btn btn-outline-white">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
