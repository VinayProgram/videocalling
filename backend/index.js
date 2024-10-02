const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const websocket = require("socket.io");
const cors = require("cors");
app.use(cors());
const socket = new websocket.Server(server, {
  cors: {
    origin: [
      "https://458b930f-39a8-4080-a98a-e934a38e3df0-00-3vtwnjjwwfgq1.sisko.replit.dev",
      "https://57eb3a8e-021c-47f6-8b40-509420af1b4b-00-3moefh80yktlp.sisko.replit.dev",
    ],
  },
});

app.get("/", (req, res) => {
  res.json("Welcome");
});

socket.on("connection", (event) => {
  event.on("iceCandidate", (id, room, ices, type) => {
    event.join(room);
    console.log(room);
    event.to(room).emit("ices", id, room, ices, type);
  });
});

server.listen(5698, () => {
  console.log("i am runnning on 5698");
});
