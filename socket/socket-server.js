const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (socket) => {
  console.log('Client connected');
  socket.send('Hello, client! from server---3');
  setTimeout(() => {
    socket.send('Hello, client! from server in setTimeout');
  }, 5000)
  
  socket.on('message', (data) => {
    console.log(`Received message from client: ${data}`);
    socket.send('this is server')
  })
  
  socket.on('error', (err) => {
    console.log('ws on error', err)
  })
  
  socket.on('close', (err) => {
    console.log('disconnected', err);
  });
});
