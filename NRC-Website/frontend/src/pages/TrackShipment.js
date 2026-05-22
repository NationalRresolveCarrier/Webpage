import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './TrackShipment.css';

const STATUS_ORDER = ['Booking Confirmed', 'Goods Picked Up', 'In Transit', 'Delivered'];

function statusIndex(s) {
  if (s?.toLowerCase().includes('delivered')) return 3;
  if (s?.toLowerCase().includes('transit')) return 2;
  if (s?.toLowerCase().includes('pick')) return 1;
  return 0;
}

export default function TrackShipment() {
  const [params] = useSearchParams();
  const [trackId, setTrackId] = useState(params.get('id') || '');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.get('id')) doTrack(params.get('id'));
  }, []);

  const doTrack = async (id) => {
    const bid = (id || trackId).trim().toUpperCase();
    if (!bid) { setError('Please enter a Booking ID.'); return; }
    setLoading(true); setError(''); setData(null);
    try {
      const res = await axios.get(`/api/track?id=${bid}`);
      setData(res.data);
    } catch (e) {
      setError(e.response?.data?.error || 'Booking not found. Please check the ID.');
    } finally { setLoading(false); }
  };

  const badge = (status) => {
    const cls = status?.toLowerCase().replace(/\s+/g, '_');
    return <span className={`badge badge-${cls}`}>{status}</span>;
  };

  const curStep = data ? statusIndex(data.booking?.status) : -1;

  return (
    <div>
      <div className="page-banner">
        <div className="container">
          <h1>Track Your Shipment</h1>
          <p>Enter your Booking ID to get real-time status of your transport.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="track-search-box">
            <h3>Enter Booking ID</h3>
            <div className="track-input-row">
              <input
                type="text"
                value={trackId}
                onChange={e => setTrackId(e.target.value)}
                placeholder="e.g. NRC20240001"
                onKeyDown={e => e.key === 'Enter' && doTrack()}
                style={{ textTransform: 'uppercase' }}
              />
              <button className="btn btn-primary" onClick={() => doTrack()} disabled={loading}>
                {loading ? <><span className="spinner"></span> Tracking...</> : '🔍 Track'}
              </button>
            </div>
            {error && <div className="alert alert-error" style={{ marginTop: 12 }}>{error}</div>}
          </div>

          {data && (
            <div className="track-results">
              {/* Booking Summary */}
              <div className="track-summary card">
                <div className="track-summary-header">
                  <div>
                    <span className="track-label">Booking ID</span>
                    <strong className="track-bid">{data.booking.booking_id}</strong>
                  </div>
                  <div>{badge(data.booking.status?.replace('_', ' '))}</div>
                </div>
                <div className="track-info-grid">
                  <div>
                    <span className="ti-label">From</span>
                    <span className="ti-val">{data.booking.pickup_city}, {data.booking.pickup_state}</span>
                  </div>
                  <div className="arrow-col">→</div>
                  <div>
                    <span className="ti-label">To</span>
                    <span className="ti-val">{data.booking.delivery_city}, {data.booking.delivery_state}</span>
                  </div>
                  <div>
                    <span className="ti-label">Sender</span>
                    <span className="ti-val">{data.booking.sender_name}</span>
                  </div>
                  <div></div>
                  <div>
                    <span className="ti-label">Receiver</span>
                    <span className="ti-val">{data.booking.receiver_name}</span>
                  </div>
                  <div>
                    <span className="ti-label">Goods</span>
                    <span className="ti-val">{data.booking.goods_type}</span>
                  </div>
                  <div></div>
                  <div>
                    <span className="ti-label">Vehicle</span>
                    <span className="ti-val">{data.booking.vehicle_type}</span>
                  </div>
                  <div>
                    <span className="ti-label">Expected Delivery</span>
                    <span className="ti-val">{data.booking.expected_delivery}</span>
                  </div>
                  <div></div>
                  <div>
                    <span className="ti-label">Booking Date</span>
                    <span className="ti-val">{data.booking.booking_date?.split('T')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="card track-progress-card">
                <h4>Shipment Progress</h4>
                <div className="track-progress">
                  {STATUS_ORDER.map((s, i) => (
                    <div key={s} className={`progress-step ${i <= curStep ? 'done' : ''} ${i === curStep ? 'current' : ''}`}>
                      <div className="p-dot">{i < curStep ? '✓' : i === curStep ? '●' : ''}</div>
                      <span>{s}</span>
                      {i < STATUS_ORDER.length - 1 && <div className="p-line"></div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline updates */}
              <div className="card track-timeline-card">
                <h4>Tracking Updates</h4>
                {data.tracking?.length === 0 && <p style={{ color: 'var(--text-light)', fontSize: 14 }}>No updates yet.</p>}
                <div className="timeline">
                  {[...data.tracking].reverse().map((t, i) => (
                    <div className={`timeline-item ${i === 0 ? 'latest' : ''}`} key={t.id}>
                      <div className="tl-dot"></div>
                      <div className="tl-body">
                        <div className="tl-status">{t.status}</div>
                        {t.location && <div className="tl-location">📍 {t.location}</div>}
                        <div className="tl-msg">{t.update_message}</div>
                        <div className="tl-time">{t.updated_at?.replace('T', ' ').slice(0,16)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!data && !loading && (
            <div className="track-placeholder">
              <div className="tp-icon">🚛</div>
              <h3>Track your shipment</h3>
              <p>Enter your booking ID above to see the current status and location of your goods.</p>
              <p style={{ fontSize: 13, marginTop: 8 }}>Don't have a Booking ID? <a href="/book">Book a transport first</a> or call us at <a href="tel:8882443540">8882443540</a>.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
