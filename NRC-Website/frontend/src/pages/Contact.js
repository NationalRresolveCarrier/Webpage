import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.name || !form.phone || !form.message) {
      setError('Name, phone, and message are required.'); return;
    }
    setLoading(true); setError(''); setSuccess('');
    try {
      const res = await axios.post('/api/enquiries', form);
      setSuccess(res.data.message);
      setForm({ name: '', phone: '', email: '', subject: '', message: '' });
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to send message. Please call us directly.');
    } finally { setLoading(false); }
  };

  return (
    <div>
      <div className="page-banner">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We're here to help. Reach out for bookings, enquiries, or support.</p>
        </div>
      </div>

      <section className="section">
        <div className="container contact-layout">
          <div className="contact-info">
            <h2 className="section-title">Get In Touch</h2>
            <div className="section-divider"></div>
            <p style={{ fontSize: 15, color: 'var(--text-light)', marginBottom: 28 }}>
              Whether you want to book a transport, get a price quote, or have any query about our services — our team is ready to assist you.
            </p>

            <div className="contact-cards">
              <div className="cinfo-card">
                <div className="ci-big-icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <a href="tel:8882443540" className="ci-main">8882443540</a>
                  <p>Mon–Sat: 8AM–8PM | Sun: 10AM–4PM</p>
                  <p>Emergency: 24x7</p>
                </div>
              </div>
              <div className="cinfo-card">
                <div className="ci-big-icon">✉</div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:prabhuahirwar9717@gmail.com" className="ci-main" style={{ fontSize: 14 }}>prabhuahirwar9717@gmail.com</a>
                  <p>We respond within 24 hours</p>
                </div>
              </div>
              <div className="cinfo-card">
                <div className="ci-big-icon">📍</div>
                <div>
                  <h4>Office Address</h4>
                  <p className="ci-main" style={{ fontSize: 14, fontWeight: 500 }}>
                    H No-441, Gali No-3,<br />
                    Krishna Kunj, Naya Goan,<br />
                    Bhondsi, Gurugram - 122102<br />
                    Haryana, India
                  </p>
                </div>
              </div>
            </div>

            <div className="faq-box">
              <h3>Frequently Asked Questions</h3>
              {[
                { q: 'How do I book a transport?', a: 'You can book online through our Book Transport page, or call us at 8882443540.' },
                { q: 'How long does delivery take?', a: 'Transit time depends on distance. Typically 3–10 business days for pan-India shipments.' },
                { q: 'How can I track my shipment?', a: 'Use the Track Shipment page and enter your Booking ID to get real-time status updates.' },
                { q: 'Are goods insured during transport?', a: 'Yes, all shipments are handled under insurance. Ask our team for details.' },
                { q: 'Do you provide loading/unloading?', a: 'Loading and unloading assistance is available. Please mention it at the time of booking.' },
              ].map((item, i) => (
                <div className="faq-item" key={i}>
                  <strong>Q: {item.q}</strong>
                  <p>A: {item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-col">
            <div className="card">
              <h3 className="form-section-title" style={{ marginBottom: 20 }}>Send Us a Message</h3>
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-error">{error}</div>}
              <div className="form-row">
                <div className="form-group"><label>Your Name *</label><input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Full Name" /></div>
                <div className="form-group"><label>Phone Number *</label><input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="Mobile Number" maxLength={10} /></div>
              </div>
              <div className="form-group"><label>Email Address</label><input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@example.com" /></div>
              <div className="form-group"><label>Subject</label>
                <select value={form.subject} onChange={e => set('subject', e.target.value)}>
                  <option value="">Select Subject</option>
                  <option>Booking Enquiry</option>
                  <option>Price Quote</option>
                  <option>Track My Shipment</option>
                  <option>Complaint / Feedback</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group"><label>Message *</label>
                <textarea value={form.message} onChange={e => set('message', e.target.value)} rows={5} placeholder="Describe your requirement or question in detail..." />
              </div>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={submit} disabled={loading}>
                {loading ? <><span className="spinner"></span> Sending...</> : 'Send Message'}
              </button>
              <p style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 10, textAlign: 'center' }}>
                Or call directly: <a href="tel:8882443540"><strong>8882443540</strong></a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
