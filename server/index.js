const httpServer = require('http').createServer()
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

io.on('connection', socket => {
  console.log(socket.id + ' just connected')

  socket.on('disconnect', () => {
    console.log('a user disconnected')
  })

})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

httpServer.listen(3000, () => {
  console.log('Listening to port 3000')
})