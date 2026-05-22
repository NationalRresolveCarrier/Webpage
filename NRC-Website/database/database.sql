-- National Resolve Carrier - Database Schema
-- Run this file in MySQL to set up the database

CREATE DATABASE IF NOT EXISTS nrc_transport;
USE nrc_transport;

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id VARCHAR(20) UNIQUE NOT NULL,
    sender_name VARCHAR(100) NOT NULL,
    sender_phone VARCHAR(15) NOT NULL,
    sender_email VARCHAR(100),
    pickup_address TEXT NOT NULL,
    pickup_city VARCHAR(100) NOT NULL,
    pickup_state VARCHAR(100) NOT NULL,
    receiver_name VARCHAR(100) NOT NULL,
    receiver_phone VARCHAR(15) NOT NULL,
    delivery_address TEXT NOT NULL,
    delivery_city VARCHAR(100) NOT NULL,
    delivery_state VARCHAR(100) NOT NULL,
    goods_type VARCHAR(100) NOT NULL,
    goods_weight DECIMAL(10,2),
    vehicle_type VARCHAR(50) NOT NULL,
    estimated_distance DECIMAL(10,2),
    estimated_cost DECIMAL(10,2),
    status ENUM('pending','confirmed','in_transit','delivered','cancelled') DEFAULT 'pending',
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    expected_delivery DATE,
    notes TEXT
);

-- Contacts / Enquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(100),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

-- Tracking Updates Table
CREATE TABLE IF NOT EXISTS tracking_updates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id VARCHAR(20) NOT NULL,
    status VARCHAR(100) NOT NULL,
    location VARCHAR(200),
    update_message TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);

-- Insert sample data
INSERT INTO bookings (booking_id, sender_name, sender_phone, sender_email, pickup_address, pickup_city, pickup_state, receiver_name, receiver_phone, delivery_address, delivery_city, delivery_state, goods_type, goods_weight, vehicle_type, estimated_cost, status, expected_delivery) VALUES
('NRC20240001', 'Ramesh Kumar', '9876543210', 'ramesh@email.com', 'H No 441, Krishna Kunj', 'Gurugram', 'Haryana', 'Suresh Sharma', '9988776655', '45, MG Road', 'Mumbai', 'Maharashtra', 'Electronics', 250.00, 'Truck', 18500.00, 'delivered', '2024-01-15'),
('NRC20240002', 'Priya Singh', '9871234567', 'priya@email.com', '12, Sector 18', 'Noida', 'Uttar Pradesh', 'Amit Patel', '9765432109', '78, CG Road', 'Ahmedabad', 'Gujarat', 'Furniture', 800.00, 'Large Truck', 25000.00, 'in_transit', '2024-02-20'),
('NRC20240003', 'Vijay Mehta', '8765432109', NULL, '34, Anna Nagar', 'Chennai', 'Tamil Nadu', 'Neha Gupta', '9654321098', '56, Banjara Hills', 'Hyderabad', 'Telangana', 'Machinery', 1200.00, 'Heavy Vehicle', 32000.00, 'confirmed', '2024-02-25');

INSERT INTO tracking_updates (booking_id, status, location, update_message) VALUES
('NRC20240001', 'Goods Picked Up', 'Gurugram, Haryana', 'Goods have been picked up from sender location'),
('NRC20240001', 'In Transit', 'Jaipur, Rajasthan', 'Vehicle crossing Jaipur checkpoint'),
('NRC20240001', 'In Transit', 'Surat, Gujarat', 'Vehicle en route to Mumbai'),
('NRC20240001', 'Delivered', 'Mumbai, Maharashtra', 'Goods successfully delivered to receiver'),
('NRC20240002', 'Goods Picked Up', 'Noida, Uttar Pradesh', 'Goods have been picked up'),
('NRC20240002', 'In Transit', 'Agra, Uttar Pradesh', 'Vehicle passing through Agra');
