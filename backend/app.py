from flask import (
    Flask,
    jsonify,
    render_template,
    request
)
from system_monitor import (
    get_system_stats,
    get_top_processes,
    get_network_stats
)

app = Flask(
    __name__,
    template_folder="../frontend/templates",
    static_folder="../frontend/static"
)

esp32_data = {}
wifi_scan_data = []

@app.route("/api/wifi_scan", methods=["POST"])
def receive_wifi_scan():

    global wifi_scan_data

    wifi_scan_data = request.get_json()

    return {"status": "received"}

@app.route("/api/wifi_scan")
def get_wifi_scan():

    return jsonify(wifi_scan_data)

@app.route("/api/esp32", methods=["POST"])
def receive_esp32_data():

    global esp32_data

    esp32_data = request.get_json()

    print("ESP32 HIT API")
    print(esp32_data)

    return {"status": "received"}

@app.route("/api/esp32")
def get_esp32_data():

    return jsonify(esp32_data)


@app.route("/")
def dashboard():
    return render_template("dashboard.html")


@app.route("/api/system")
def system_data():
    return jsonify(get_system_stats())


@app.route("/api/processes")
def process_data():
    return jsonify(get_top_processes())

@app.route("/api/network")
def network_data():
    return jsonify(get_network_stats())


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)