import React, { useState } from 'react';
import axios from 'axios';
import './BookTransport.css';

const VEHICLE_TYPES = ['Mini Truck', 'Truck', 'Large Truck', 'Heavy Vehicle', 'Trailer'];
const GOODS_TYPES = ['Electronics', 'Furniture', 'Machinery', 'Household Goods', 'Automobile', 'Perishable Goods', 'Textile / Garments', 'Agricultural Products', 'Construction Material', 'Chemical / Industrial', 'Other'];
const INDIAN_STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh','Chandigarh','Puducherry'];

const COST_MAP = { 'Mini Truck': 8000, 'Truck': 15000, 'Large Truck': 22000, 'Heavy Vehicle': 35000, 'Trailer': 50000 };

const empty = {
  sender_name: '', sender_phone: '', sender_email: '',
  pickup_address: '', pickup_city: '', pickup_state: '',
  receiver_name: '', receiver_phone: '',
  delivery_address: '', delivery_city: '', delivery_state: '',
  goods_type: '', goods_weight: '', vehicle_type: '', notes: ''
};

export default function BookTransport() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validateStep = () => {
    if (step === 1) {
      if (!form.sender_name || !form.sender_phone || !form.pickup_address || !form.pickup_city || !form.pickup_state)
        return 'Please fill all pickup details.';
    }
    if (step === 2) {
      if (!form.receiver_name || !form.receiver_phone || !form.delivery_address || !form.delivery_city || !form.delivery_state)
        return 'Please fill all delivery details.';
    }
    if (step === 3) {
      if (!form.goods_type || !form.vehicle_type)
        return 'Please select goods type and vehicle type.';
    }
    return '';
  };

  const nextStep = () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError('');
    setStep(s => s + 1);
  };

  const submit = async () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/api/bookings', form);
      setResult(res.data);
      setStep(4);
    } catch (e) {
      setError(e.response?.data?.error || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => { setForm(empty); setStep(1); setResult(null); setError(''); };

  const estCost = COST_MAP[form.vehicle_type];

  return (
    <div>
      <div className="page-banner">
        <div className="container">
          <h1>Book Transport Service</h1>
          <p>Fill in the details below and we'll confirm your booking shortly.</p>
        </div>
      </div>

      <section className="section">
        <div className="container book-layout">
          <div className="book-form-col">
            {/* Progress */}
            {step < 4 && (
              <div className="step-indicator">
                {[['1','Pickup Details'],['2','Delivery Details'],['3','Goods & Vehicle']].map(([n, l]) => (
                  <div key={n} className={`step-dot ${parseInt(n) === step ? 'active' : parseInt(n) < step ? 'done' : ''}`}>
                    <div className="dot">{parseInt(n) < step ? '✓' : n}</div>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            )}

            {error && <div className="alert alert-error">{error}</div>}

            {/* Step 4: Success */}
            {step === 4 && result && (
              <div className="booking-success">
                <div className="success-icon">✅</div>
                <h2>Booking Confirmed!</h2>
                <p>Your shipment has been booked successfully. Please save your Booking ID.</p>
                <div className="booking-id-box">
                  <span>Your Booking ID</span>
                  <strong>{result.booking_id}</strong>
                </div>
                <div className="booking-details-grid">
                  <div><span>Estimated Cost</span><strong>₹{result.estimated_cost?.toLocaleString()}</strong></div>
                  <div><span>Expected Delivery</span><strong>{result.expected_delivery}</strong></div>
                </div>
                <p className="success-note">Our team will call you on <strong>{form.sender_phone}</strong> to confirm pickup details.</p>
                <div className="success-actions">
                  <a href={`/track?id=${result.booking_id}`} className="btn btn-primary">Track This Booking</a>
                  <button className="btn btn-outline" onClick={resetForm}>Book Another</button>
                </div>
              </div>
            )}

            {/* Step 1: Pickup */}
            {step === 1 && (
              <div className="form-section">
                <h3 className="form-section-title">📍 Pickup / Sender Details</h3>
                <div className="form-row">
                  <div className="form-group"><label>Sender Name *</label><input value={form.sender_name} onChange={e => set('sender_name', e.target.value)} placeholder="Full Name" /></div>
                  <div className="form-group"><label>Phone Number *</label><input value={form.sender_phone} onChange={e => set('sender_phone', e.target.value)} placeholder="10-digit mobile" maxLength={10} /></div>
                </div>
                <div className="form-group"><label>Email (Optional)</label><input type="email" value={form.sender_email} onChange={e => set('sender_email', e.target.value)} placeholder="email@example.com" /></div>
                <div className="form-group"><label>Pickup Address *</label><textarea value={form.pickup_address} onChange={e => set('pickup_address', e.target.value)} rows={2} placeholder="House/Plot No, Street, Area..." /></div>
                <div className="form-row">
                  <div className="form-group"><label>City *</label><input value={form.pickup_city} onChange={e => set('pickup_city', e.target.value)} placeholder="City" /></div>
                  <div className="form-group"><label>State *</label>
                    <select value={form.pickup_state} onChange={e => set('pickup_state', e.target.value)}>
                      <option value="">Select State</option>
                      {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <button className="btn btn-primary" onClick={nextStep}>Next: Delivery Details →</button>
              </div>
            )}

            {/* Step 2: Delivery */}
            {step === 2 && (
              <div className="form-section">
                <h3 className="form-section-title">🚚 Delivery / Receiver Details</h3>
                <div className="form-row">
                  <div className="form-group"><label>Receiver Name *</label><input value={form.receiver_name} onChange={e => set('receiver_name', e.target.value)} placeholder="Full Name" /></div>
                  <div className="form-group"><label>Receiver Phone *</label><input value={form.receiver_phone} onChange={e => set('receiver_phone', e.target.value)} placeholder="10-digit mobile" maxLength={10} /></div>
                </div>
                <div className="form-group"><label>Delivery Address *</label><textarea value={form.delivery_address} onChange={e => set('delivery_address', e.target.value)} rows={2} placeholder="House/Plot No, Street, Area..." /></div>
                <div className="form-row">
                  <div className="form-group"><label>City *</label><input value={form.delivery_city} onChange={e => set('delivery_city', e.target.value)} placeholder="City" /></div>
                  <div className="form-group"><label>State *</label>
                    <select value={form.delivery_state} onChange={e => set('delivery_state', e.target.value)}>
                      <option value="">Select State</option>
                      {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="btn-row">
                  <button className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn btn-primary" onClick={nextStep}>Next: Goods Details →</button>
                </div>
              </div>
            )}

            {/* Step 3: Goods */}
            {step === 3 && (
              <div className="form-section">
                <h3 className="form-section-title">📦 Goods & Vehicle Details</h3>
                <div className="form-row">
                  <div className="form-group"><label>Type of Goods *</label>
                    <select value={form.goods_type} onChange={e => set('goods_type', e.target.value)}>
                      <option value="">Select Goods Type</option>
                      {GOODS_TYPES.map(g => <option key={g}>{g}</option>)}
                    </select>
                  </div>
                  <div className="form-group"><label>Approx. Weight (kg)</label><input type="number" value={form.goods_weight} onChange={e => set('goods_weight', e.target.value)} placeholder="e.g. 500" /></div>
                </div>
                <div className="form-group"><label>Vehicle Required *</label>
                  <div className="vehicle-options">
                    {VEHICLE_TYPES.map(v => (
                      <div key={v} className={`vehicle-opt ${form.vehicle_type === v ? 'selected' : ''}`} onClick={() => set('vehicle_type', v)}>
                        <span className="v-name">{v}</span>
                        <span className="v-cost">~₹{COST_MAP[v]?.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-group"><label>Special Instructions (Optional)</label><textarea value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Fragile items, special handling instructions..." /></div>
                {form.vehicle_type && (
                  <div className="cost-estimate">
                    <span>Estimated Cost for <strong>{form.vehicle_type}</strong></span>
                    <span className="est-price">~₹{estCost?.toLocaleString()}</span>
                  </div>
                )}
                <div className="btn-row">
                  <button className="btn btn-outline" onClick={() => setStep(2)}>← Back</button>
                  <button className="btn btn-primary" onClick={submit} disabled={loading}>
                    {loading ? <><span className="spinner"></span> Booking...</> : 'Confirm Booking'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="book-sidebar">
            <div className="card sidebar-card">
              <h4>📞 Prefer to call?</h4>
              <p>Call us directly and we'll book your transport over the phone.</p>
              <a href="tel:8882443540" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: 12 }}>Call: 8882443540</a>
            </div>
            <div className="card sidebar-card" style={{ marginTop: 16 }}>
              <h4>Vehicle Guide</h4>
              <table className="vehicle-table">
                <tbody>
                  <tr><td>Mini Truck</td><td>Up to 1 Ton</td><td>~₹8,000</td></tr>
                  <tr><td>Truck</td><td>1–5 Ton</td><td>~₹15,000</td></tr>
                  <tr><td>Large Truck</td><td>5–12 Ton</td><td>~₹22,000</td></tr>
                  <tr><td>Heavy Vehicle</td><td>12–20 Ton</td><td>~₹35,000</td></tr>
                  <tr><td>Trailer</td><td>20+ Ton</td><td>~₹50,000</td></tr>
                </tbody>
              </table>
              <p style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 8 }}>* Prices vary by distance and route</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
