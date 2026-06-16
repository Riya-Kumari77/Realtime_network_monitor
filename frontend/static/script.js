const cpuData = [];
const ramData = [];
const labels = [];

/* =========================
   CPU CHART
========================= */

const cpuChart = new Chart(document.getElementById("cpuChart"), {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "CPU %",
        data: cpuData,
        tension: 0.4,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
});

/* =========================
   RAM CHART
========================= */

const ramChart = new Chart(document.getElementById("ramChart"), {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "RAM %",
        data: ramData,
        tension: 0.4,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
});

/* =========================
   SYSTEM DATA
========================= */

async function updateSystemData() {
  try {
    const response = await fetch("/api/system");

    const data = await response.json();

    const cpuElement = document.getElementById("cpu");

    cpuElement.innerText = data.cpu_percent + "%";

    if (data.cpu_percent > 80) cpuElement.style.color = "#ef4444";
    else if (data.cpu_percent > 50) cpuElement.style.color = "#f59e0b";
    else cpuElement.style.color = "#22c55e";

    const ramElement = document.getElementById("ram");

    ramElement.innerText = data.ram_percent + "%";

    if (data.ram_percent > 80) ramElement.style.color = "#ef4444";
    else if (data.ram_percent > 50) ramElement.style.color = "#f59e0b";
    else ramElement.style.color = "#22c55e";

    document.getElementById("ram-details").innerText =
      data.ram_used_gb + " GB / " + data.ram_total_gb + " GB";

    const currentTime = new Date().toLocaleTimeString();

    labels.push(currentTime);

    cpuData.push(data.cpu_percent);

    ramData.push(data.ram_percent);

    if (labels.length > 20) {
      labels.shift();
      cpuData.shift();
      ramData.shift();
    }

    cpuChart.update();
    ramChart.update();
  } catch (error) {
    console.error("System Update Error:", error);
  }
}

/* =========================
   PROCESSES
========================= */

async function updateProcesses() {
  try {
    const response = await fetch("/api/processes");

    const data = await response.json();

    const tbody = document.querySelector("#processTable tbody");

    tbody.innerHTML = "";

    data.forEach((process) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                <td>${process.name}</td>
                <td>${process.pid}</td>
                <td>${process.cpu_percent}</td>
                <td>${process.ram_mb}</td>
                <td>${process.status}</td>
            `;

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Process Update Error:", error);
  }
}

/* =========================
   NETWORK DATA
========================= */

async function updateNetworkData() {
  try {
    const response = await fetch("/api/network");

    const data = await response.json();

    document.getElementById("ip-address").innerText = data.ip_address;

    document.getElementById("bytes-sent").innerText =
      (data.bytes_sent / 1024 / 1024).toFixed(2) + " MB";

    document.getElementById("bytes-received").innerText =
      (data.bytes_recv / 1024 / 1024).toFixed(2) + " MB";
  } catch (error) {
    console.error("Network Update Error:", error);
  }
}

/* =========================
   ESP32 STATUS
========================= */

async function updateESP32() {
  try {
    const response = await fetch("/api/esp32");

    const data = await response.json();

    document.getElementById("esp-device").innerText = data.device_name || "-";

    document.getElementById("esp-device-status").innerText =
      data.device_name || "-";

    document.getElementById("esp-ip").innerText = data.ip || "-";

    document.getElementById("esp-ssid").innerText = data.ssid || "-";

    document.getElementById("esp-rssi").innerText =
      data.rssi !== undefined ? data.rssi + " dBm" : "-";

    document.getElementById("esp-channel").innerText = data.channel || "-";

    document.getElementById("esp-uptime").innerText =
      data.uptime !== undefined ? data.uptime + " sec" : "-";
  } catch (error) {
    console.error("ESP32 Update Error:", error);
  }
}

/* =========================
   WIFI NETWORKS
========================= */

async function updateWiFiNetworks() {
  try {
    const response = await fetch("/api/wifi_scan");

    const data = await response.json();

    const tbody = document.querySelector("#wifiTable tbody");

    tbody.innerHTML = "";

    data.sort((a, b) => b.rssi - a.rssi);

    data.forEach((network) => {
      let quality = "Weak";

      if (network.rssi > -60) {
        quality = "Excellent";
      } else if (network.rssi > -75) {
        quality = "Good";
      }

      const row = document.createElement("tr");

      row.innerHTML = `
                <td>${network.ssid}</td>
                <td>${network.rssi} dBm</td>
                <td>${network.channel}</td>
                <td>${quality}</td>
            `;

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("WiFi Update Error:", error);
  }
}

/* =========================
   INITIAL LOAD
========================= */

updateSystemData();
updateNetworkData();
updateProcesses();
updateESP32();
updateWiFiNetworks();

/* =========================
   AUTO REFRESH
========================= */

setInterval(() => {
  updateSystemData();
  updateNetworkData();
}, 1000);

setInterval(() => {
  updateProcesses();
}, 3000);

setInterval(() => {
  updateESP32();
  updateWiFiNetworks();
}, 5000);
