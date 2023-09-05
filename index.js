//! Ini hanya berjalan di backend
//! kalau mau langsung connect ke frontend, harus menggunakan websocket

import { connect } from "mqtt"; // import connect from mqtt
import { data } from "./data.js";

let client = connect("mqtt://test.mosquitto.org"); // create a client

client.on("connect", () => {
  console.log("MQTT connected");
});

client.subscribe("suhuTopik", { qos: 2 }, (error, granted) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`${granted[0].topic} was subcribe`);
  }
});

client.on("message", (topic, payload, packet) => {
  // Payload is Buffer
  // console.log(`Topic: ${topic}, Message: ${payload.toString()}, QoS: ${packet.qos}`);
  data.suhu = payload.toString();

  console.log(`Suhu: ${data.suhu}`);
});
