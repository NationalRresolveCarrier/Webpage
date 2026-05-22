import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <div>
      <div className="page-banner">
        <div className="container">
          <h1>About National Resolve Carrier</h1>
          <p>Learn about our journey, values, and commitment to transport excellence.</p>
        </div>
      </div>

      <section className="section">
        <div className="container about-layout">
          <div className="about-main">
            <h2 className="section-title">Our Story</h2>
            <div className="section-divider"></div>
            <p>National Resolve Carrier was founded in 2016 with a simple mission: to provide honest, reliable, and affordable transport services to businesses and individuals across India. Starting with a single truck and a resolve to serve customers with integrity, we have grown into a trusted logistics partner with over 700 successful transports completed.</p>
            <p style={{ marginTop: 14 }}>Based in Bhondsi, Gurugram, Haryana, we have built our operations to serve all corners of India. Whether you need to transport a household's worth of furniture from Delhi to Chennai, or move industrial machinery from Gujarat to West Bengal, our experienced team handles it professionally.</p>
            <p style={{ marginTop: 14 }}>We believe transport is not just about moving goods — it is about trust. Every booking is treated with care, every consignment is handled with responsibility, and every client is treated like a long-term partner.</p>

            <h3 style={{ marginTop: 36, marginBottom: 12 }}>Our Values</h3>
            <div className="values-grid">
              {[
                { icon: '🤝', title: 'Trust & Integrity', desc: 'Transparent pricing, honest communication, no hidden charges.' },
                { icon: '⏰', title: 'Punctuality', desc: 'On-time pickup and delivery is our primary commitment.' },
                { icon: '🛡️', title: 'Safety First', desc: 'Proper loading, safe driving, and insured transport always.' },
                { icon: '📞', title: 'Customer Service', desc: 'Responsive support throughout the journey, 7 days a week.' },
              ].map((v, i) => (
                <div className="value-card" key={i}>
                  <div className="val-icon">{v.icon}</div>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-sidebar">
            <div className="card achievement-box">
              <h4>🏆 Our Achievements</h4>
              <ul>
                <li><span className="ach-num">700+</span><span>Transports Completed</span></li>
                <li><span className="ach-num">500+</span><span>Happy Clients</span></li>
                <li><span className="ach-num">150+</span><span>Cities Covered</span></li>
                <li><span className="ach-num">8+</span><span>Years in Business</span></li>
                <li><span className="ach-num">28</span><span>States Served</span></li>
              </ul>
            </div>

            <div className="card" style={{ marginTop: 18 }}>
              <h4 style={{ marginBottom: 12 }}>📍 Office Location</h4>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>
                <strong>National Resolve Carrier</strong><br />
                H No-441, Gali No-3,<br />
                Krishna Kunj, Naya Goan,<br />
                Bhondsi, Gurugram - 122102<br />
                Haryana, India
              </p>
              <div style={{ marginTop: 14 }}>
                <p style={{ fontSize: 14 }}><strong>Phone:</strong> <a href="tel:8882443540">8882443540</a></p>
                <p style={{ fontSize: 14, marginTop: 4 }}><strong>Email:</strong> <a href="mailto:prabhuahirwar9717@gmail.com" style={{ fontSize: 13 }}>prabhuahirwar9717@gmail.com</a></p>
              </div>
            </div>

            <div className="card" style={{ marginTop: 18 }}>
              <h4 style={{ marginBottom: 10 }}>Working Hours</h4>
              <table className="hours-table">
                <tbody>
                  <tr><td>Monday – Saturday</td><td>8:00 AM – 8:00 PM</td></tr>
                  <tr><td>Sunday</td><td>10:00 AM – 4:00 PM</td></tr>
                  <tr><td>Emergency Calls</td><td>24 x 7</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--gray-100)' }}>
        <div className="container">
          <h2 className="section-title">Why Clients Trust Us</h2>
          <div className="section-divider"></div>
          <div className="trust-grid">
            {[
              { n: '01', title: 'Licensed & Registered', desc: 'Fully registered transport company operating under all applicable government regulations.' },
              { n: '02', title: 'Insured Goods', desc: 'Goods are transported under insurance coverage, ensuring peace of mind for every client.' },
              { n: '03', title: 'Experienced Team', desc: 'Our drivers and logistics staff have years of experience handling all types of cargo safely.' },
              { n: '04', title: 'Transparent Billing', desc: 'You get a clear price upfront. What we quote is what you pay — no surprises.' },
              { n: '05', title: 'Modern Fleet', desc: 'Well-maintained vehicles regularly serviced to ensure reliability and on-time delivery.' },
              { n: '06', title: 'End-to-End Service', desc: 'From pickup to delivery, we handle everything. You simply book and track.' },
            ].map((item, i) => (
              <div className="trust-card" key={i}>
                <div className="trust-num">{item.n}</div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--green-dark)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--white)' }}>Ready to Work With Us?</h2>
          <p style={{ color: 'rgba(255,255,255,0.72)', marginTop: 10, marginBottom: 24 }}>Book your transport today or contact us for a custom quote.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn btn-gold">Book Transport</Link>
            <Link to="/contact" className="btn btn-outline-white">Get In Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
