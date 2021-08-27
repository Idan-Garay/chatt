// const app = require('express')()
// const http = require('http').createServer(app) 1
const httpServer = require("http").createServer();

// const io = require('socket.io')(http, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["my-custom-header"],
//     credentials: true
//   }
// }) 1

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8080",
  },
});

// io.on('connection', socket => {
//   socket.on('message', ({ name, message }) => {
//     io.emit('message', { name, message })
//   })
// }) 1

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

// send all existing users to client
io.on("connection", (socket) => {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);
  // ...
});

// http.listen(3000, function() {
//   console.log('listening on port 3000')
// }) 1

