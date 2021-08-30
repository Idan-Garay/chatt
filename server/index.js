const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
  },
});

app.get("/", (req, res) => {
  res.send("hello world");
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) return next(new Error("invalid username"));

  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  const rooms = [];

  for (let [id, socket] of io.of("/").sockets) {
    rooms.push({
      userID: id,
      username: socket.username,
    });
  }

  // socket.emit("users", rooms);

  // socket.on("disconnecting", (reason) => {
  //   for (const room of rooms) {
  //     if (room !== socket.id) socket.to(room).emit("user has left", socket.id);
  //   }
  // });

  // socket.on("disconnect", () => {
  //   console.log("user disconnected");
  // });

  socket.on("private message", ({ username, message, recipient }) => {
    recipient = rooms.find((room) => {
      console.log(room, 2);
      return room.username === recipient;
    });

    io.to(recipient.userID).emit("private message", {
      from: username,
      content: message,
    });
  });

  io.emit("rooms", rooms);
  console.log(rooms);
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
