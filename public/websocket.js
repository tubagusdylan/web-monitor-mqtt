let mqttClient;

import { dataMonitor } from "./data.js";

window.onload = () => {
  connectMqtt();
};

const connectMqtt = () => {
  const clientId = "client" + Math.random().toString(36).substring(7);

  // Change this to point to your MQTT broker
  const host = "wss://broker.emqx.io:8084/mqtt";

  const options = {
    keepalive: 60,
    clientId: clientId,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
  };

  mqttClient = mqtt.connect(host, options);

  mqttClient.on("error", (err) => {
    console.log("Error: ", err);
    mqttClient.end();
  });

  mqttClient.on("reconnect", () => {
    console.log("Reconnecting...");
  });

  mqttClient.on("connect", () => {
    console.log("client connected: ", clientId);

    mqttClient.subscribe("monitor/device1", { qos: 0 }, (err, granted) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Subcribing on topic: ${granted[0].topic}`);
      }
    });
  });

  mqttClient.on("message", (topic, message, packet) => {
    const msg = JSON.parse(message);
    document.getElementById("temp").innerHTML = msg.temp.toFixed(0);
    document.getElementById("hum").innerHTML = msg.hum.toFixed(0);

    dataMonitor.hum = msg.hum.toFixed(0);
    dataMonitor.temp = msg.temp.toFixed(0);
    dataMonitor.updatedAt = msg.updatedAt;

    console.log(dataMonitor);
  });
};
