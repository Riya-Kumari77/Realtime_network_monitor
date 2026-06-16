# Real-Time Network & System Monitoring Dashboard

A real-time monitoring platform that combines system performance analytics, network monitoring, and IoT device integration using Python Flask and XIAO ESP32-C6.

The dashboard provides live insights into CPU usage, RAM utilization, running processes, network traffic, ESP32 device status, and nearby WiFi networks through an interactive web interface.

---

## Features

### System Monitoring

* Real-time CPU usage monitoring
* Real-time RAM usage monitoring
* Live CPU usage graph
* Live RAM usage graph
* RAM consumption details
* Automatic dashboard refresh

### Process Monitoring

* Running processes list
* Process ID (PID)
* CPU usage per process
* RAM usage per process
* Process status monitoring

### Network Monitoring

* Local IP address monitoring
* Bytes sent statistics
* Bytes received statistics
* Real-time network activity tracking

### ESP32-C6 Monitoring

* Device identification
* ESP32 IP address
* Connected WiFi SSID
* WiFi signal strength (RSSI)
* WiFi channel information
* Device uptime monitoring

### WiFi Network Analysis

* Nearby WiFi network discovery
* SSID detection
* Signal strength analysis
* Channel information
* Automatic sorting by signal quality
* Live WiFi environment monitoring

---

## Technology Stack

### Backend

* Python
* Flask
* psutil

### Frontend

* HTML5
* CSS3
* JavaScript
* Chart.js

### Hardware

* Seeed Studio XIAO ESP32-C6

---

## Project Architecture

ESP32-C6
↓
REST API (HTTP POST)
↓
Flask Backend
↓
JSON APIs
↓
Web Dashboard

---

## Project Structure

```text
Realtime_network_monitor/
│
├── backend/
│   ├── app.py
│   ├── system_monitor.py
│
├── frontend/
│   ├── templates/
│   │   └── dashboard.html
│   │
│   └── static/
│       ├── style.css
│       └── script.js
│
└── README.md
```

---

## API Endpoints

### System Information

```http
GET /api/system
```

Returns:

```json
{
  "cpu_percent": 18.5,
  "ram_percent": 52.3
}
```

### Running Processes

```http
GET /api/processes
```

### Network Statistics

```http
GET /api/network
```

### ESP32 Status

```http
GET /api/esp32
POST /api/esp32
```

### WiFi Scan Results

```http
GET /api/wifi_scan
POST /api/wifi_scan
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/realtime-network-monitor.git
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

Windows:

```bash
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install flask psutil
```

### Run Application

```bash
cd backend

python app.py
```

Open:

```text
http://127.0.0.1:5000
```

---

## ESP32 Setup

1. Install ESP32 board package in Arduino IDE.
2. Connect XIAO ESP32-C6.
3. Configure WiFi credentials.
4. Update Flask server IP address.
5. Upload ESP32 firmware.
6. Start monitoring.

---

## Dashboard Preview

The dashboard displays:

* CPU utilization
* RAM utilization
* Live performance charts
* Running processes
* Network statistics
* ESP32-C6 status
* Nearby WiFi networks

---

## Future Improvements

* Device discovery on local network
* Historical data storage using SQLite
* WebSocket-based real-time updates
* Alert notifications
* Export reports to CSV/PDF
* Multi-device ESP32 monitoring
* Sensor integration (temperature, distance, motion)

---

## Learning Outcomes

This project demonstrates:

* Python backend development
* REST API design
* System monitoring using psutil
* IoT communication using ESP32-C6
* Frontend dashboard development
* Network monitoring concepts
* Real-time data visualization
* Client-server architecture

---

## Author

Riya Kumari

BCA Student | Software Development | IoT | Python | Web Development
