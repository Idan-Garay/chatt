const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const users = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/App.js');
});

io.on('connection', socket => {
  socket.on('message', ({name, message}) => {
    io.emit('message', {name, message});
  })
})

server.listen(3000, () => {
  console.log('listening on port 3000');
})


// io.on('connection', (socket) => {
//   users.push({...socket, nickname: ""});

//   socket.on('get nickname', (nickname) => {
//     var userIndex = users.findIndex(user => user.id === socket.id);
//     users[userIndex].nickname = nickname;
//   });

//   socket.on('chat message', ({nickname, text}) => {
//     socket.broadcast.emit('chat message', text);
//   });

//   socket.on('disconnect', () => {
//     var dcUser = users.splice(users.indexOf(user => user.id === socket.id), 1);
//     console.log(dcUser, dcUser.nickname);
//     io.emit('user disconnect', `${dcUser.nickname} disconnected!`);
//   })
// });
// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });