from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import os
import random
import string
from datetime import datetime, date, timedelta
import json

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://localhost:5173"])

# ----- Database Config -----
DB_CONFIG = {
    'host': os.environ.get('DB_HOST', 'localhost'),
    'database': os.environ.get('DB_NAME', 'nrc_transport'),
    'user': os.environ.get('DB_USER', 'root'),
    'password': os.environ.get('DB_PASSWORD', ''),
    'port': int(os.environ.get('DB_PORT', 3306))
}

def get_db():
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except Error as e:
        print(f"DB Connection Error: {e}")
        return None

def generate_booking_id():
    year = datetime.now().year
    rand = ''.join(random.choices(string.digits, k=6))
    return f"NRC{year}{rand}"

def serialize(obj):
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} not serializable")

# ----- Routes -----

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "National Resolve Carrier API", "status": "running"})

# --- Bookings ---

@app.route('/api/bookings', methods=['POST'])
def create_booking():
    data = request.get_json()
    required = ['sender_name','sender_phone','pickup_address','pickup_city','pickup_state',
                'receiver_name','receiver_phone','delivery_address','delivery_city','delivery_state',
                'goods_type','vehicle_type']
    for field in required:
        if not data.get(field):
            return jsonify({"error": f"'{field}' is required"}), 400

    booking_id = generate_booking_id()
    expected_delivery = (datetime.now() + timedelta(days=random.randint(3,10))).date()

    # Simple cost estimate: based on vehicle type
    cost_map = {
        'Mini Truck': 8000,
        'Truck': 15000,
        'Large Truck': 22000,
        'Heavy Vehicle': 35000,
        'Trailer': 50000
    }
    estimated_cost = cost_map.get(data.get('vehicle_type'), 12000)

    conn = get_db()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO bookings (booking_id, sender_name, sender_phone, sender_email,
                pickup_address, pickup_city, pickup_state,
                receiver_name, receiver_phone,
                delivery_address, delivery_city, delivery_state,
                goods_type, goods_weight, vehicle_type,
                estimated_cost, expected_delivery, notes)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """, (
            booking_id, data['sender_name'], data['sender_phone'], data.get('sender_email'),
            data['pickup_address'], data['pickup_city'], data['pickup_state'],
            data['receiver_name'], data['receiver_phone'],
            data['delivery_address'], data['delivery_city'], data['delivery_state'],
            data['goods_type'], data.get('goods_weight', 0), data['vehicle_type'],
            estimated_cost, expected_delivery, data.get('notes', '')
        ))
        # Initial tracking entry
        cursor.execute("""
            INSERT INTO tracking_updates (booking_id, status, location, update_message)
            VALUES (%s, %s, %s, %s)
        """, (booking_id, 'Booking Confirmed', data['pickup_city'], 'Your booking has been confirmed. Our team will contact you shortly.'))
        conn.commit()
        return jsonify({
            "success": True,
            "booking_id": booking_id,
            "estimated_cost": estimated_cost,
            "expected_delivery": expected_delivery.isoformat(),
            "message": "Booking created successfully!"
        }), 201
    except Error as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/bookings/<booking_id>', methods=['GET'])
def get_booking(booking_id):
    conn = get_db()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM bookings WHERE booking_id = %s", (booking_id.upper(),))
        booking = cursor.fetchone()
        if not booking:
            return jsonify({"error": "Booking not found"}), 404

        cursor.execute("SELECT * FROM tracking_updates WHERE booking_id = %s ORDER BY updated_at ASC", (booking_id.upper(),))
        updates = cursor.fetchall()

        # Serialize dates
        for key, val in booking.items():
            if isinstance(val, (datetime, date)):
                booking[key] = val.isoformat()
        for u in updates:
            for key, val in u.items():
                if isinstance(val, (datetime, date)):
                    u[key] = val.isoformat()

        return jsonify({"booking": booking, "tracking": updates})
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# --- Tracking ---

@app.route('/api/track', methods=['GET'])
def track_shipment():
    booking_id = request.args.get('id', '').strip().upper()
    if not booking_id:
        return jsonify({"error": "Booking ID is required"}), 400
    return get_booking(booking_id)

# --- Contact / Enquiry ---

@app.route('/api/enquiries', methods=['POST'])
def submit_enquiry():
    data = request.get_json()
    if not data.get('name') or not data.get('phone') or not data.get('message'):
        return jsonify({"error": "Name, phone, and message are required"}), 400

    conn = get_db()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    try:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO enquiries (name, phone, email, subject, message)
            VALUES (%s,%s,%s,%s,%s)
        """, (data['name'], data['phone'], data.get('email'), data.get('subject'), data['message']))
        conn.commit()
        return jsonify({"success": True, "message": "Thank you! We will contact you shortly."}), 201
    except Error as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# --- Stats for homepage ---

@app.route('/api/stats', methods=['GET'])
def get_stats():
    conn = get_db()
    if not conn:
        return jsonify({"transports_done": 700, "happy_clients": 500, "cities_covered": 150, "years_experience": 8})
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT COUNT(*) as total FROM bookings WHERE status='delivered'")
        delivered = cursor.fetchone()['total']
        return jsonify({
            "transports_done": max(700, delivered),
            "happy_clients": max(500, delivered - 50),
            "cities_covered": 150,
            "years_experience": 8
        })
    except:
        return jsonify({"transports_done": 700, "happy_clients": 500, "cities_covered": 150, "years_experience": 8})
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
