import mqtt from "mqtt";

let client = mqtt.connect("wss://broker.emqx.io:8084/mqtt");

client.on("connect", () => {
  console.log("Mqtt connected");
});

setInterval(() => {
  let message = JSON.stringify({
    hum: Math.random() * 100,
    temp: Math.random() * 100,
    updatedAt: new Date().toISOString(),
  });
  client.publish("monitor/device1", message);
}, 1000);
