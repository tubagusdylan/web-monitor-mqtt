import mqtt from "mqtt";

let client = mqtt.connect("ws://broker.emqx.io:8083/mqtt");

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
}, 2000);
