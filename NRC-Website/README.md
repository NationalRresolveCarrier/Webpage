# National Resolve Carrier — Website

A full-stack transport company website with React frontend, Flask backend, and MySQL database.

---

## Project Structure

```
nrc-website/
├── database.sql          ← MySQL schema + sample data
├── backend/
│   ├── app.py            ← Flask API server
│   ├── requirements.txt
│   └── .env.example      ← Copy to .env and fill your DB credentials
└── frontend/
    ├── package.json
    ├── public/index.html
    └── src/
        ├── App.js
        ├── index.js / index.css
        ├── components/  (Navbar, Footer)
        └── pages/       (Home, BookTransport, TrackShipment, Services, About, Contact)
```

---

## Setup Instructions

### Step 1 — MySQL Database

```bash
# Open MySQL and run the schema
mysql -u root -p < database.sql
```

### Step 2 — Backend (Flask)

```bash
cd backend

# Copy and edit environment config
cp .env.example .env
# Edit .env with your MySQL username and password

# Install Python dependencies
pip install -r requirements.txt

# Start the Flask server
python app.py
# Runs on http://localhost:5000
```

### Step 3 — Frontend (React)

```bash
cd frontend

# Install Node dependencies
npm install

# Start development server
npm start
# Opens http://localhost:3000
```

The React app proxies API calls to Flask at port 5000 (configured in package.json).

---

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page with hero, stats, services, testimonials |
| Services | `/services` | Full services listing with pricing |
| Book Transport | `/book` | 3-step booking form |
| Track Shipment | `/track` | Real-time tracking by Booking ID |
| About | `/about` | Company info, achievements, values |
| Contact | `/contact` | Contact form + FAQ |

---

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/bookings` | Create a new booking |
| GET | `/api/bookings/:id` | Get booking details |
| GET | `/api/track?id=NRC...` | Track a shipment |
| POST | `/api/enquiries` | Submit a contact message |
| GET | `/api/stats` | Get company stats for homepage |

---

## Deployment

### Backend (Production)
```bash
# Using Gunicorn (Linux server / VPS)
gunicorn -w 4 -b 0.0.0.0:5000 app:app

# Set environment variables:
DB_HOST=your_db_host
DB_NAME=nrc_transport
DB_USER=your_db_user
DB_PASSWORD=your_db_password
```

### Frontend (Production)
```bash
cd frontend
npm run build
# Serve the 'build' folder using Nginx or any static host
```

### Nginx Config (example)
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # React frontend
    location / {
        root /var/www/nrc/frontend/build;
        try_files $uri /index.html;
    }

    # Flask API
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
    }
}
```

---

## Environment Variables (.env)

```
DB_HOST=localhost
DB_NAME=nrc_transport
DB_USER=root
DB_PASSWORD=your_password
DB_PORT=3306
```

---

## Company Details

- **Company:** National Resolve Carrier
- **Phone:** 8882443540
- **Email:** prabhuahirwar9717@gmail.com
- **Address:** H No-441, Gali No-3, Krishna Kunj, Naya Goan, Bhondsi, Gurugram - 122102
- **Achievement:** 700+ Transports Completed
