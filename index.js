const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // your frontend
    methods: ["GET", "POST"]
  },
});

io.on("connection", (socket) => {
  console.log("?? A user connected");

  socket.on("send_message", (data) => {
    console.log("?? Message received:", data);
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("?? A user disconnected");
  });
});

server.listen(3001, () => {
  console.log("? Backend running on port 3001");
});
