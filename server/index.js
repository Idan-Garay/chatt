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
  const users = [];

  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
      messages: [],
    });
  }

  // socket.on("disconnecting", (reason) => {
  //   for (const user of users) {
  //     if (user !== socket.id) socket.to(user).emit("user has left", socket.id);
  //   }
  // });

  // socket.on("disconnect", () => {
  //   console.log("user disconnected");
  // });

  socket.on("private message", ({ username, message, recipient }) => {
    recipient = users.findIndex((user) => {
      return user.username === recipient;
    });

    recipient.messages.push({ to: recipient, content: message });

    io.to(recipient.userID).emit("private message", {
      from: username,
      content: message,
    });
  });

  io.emit("users", users);
  console.log(users);
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
