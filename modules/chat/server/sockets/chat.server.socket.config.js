'use strict';

// Create the chat configuration
module.exports = function (io, socket) {

  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', function(data){
    var username =  data.username;
    // store the room name in the socket session for this client
    socket.room = data.room;
    // send client to room 1
    socket.join(data.room);
    // echo to client they've connected
    socket.emit('updatechat', 'SERVER', 'you have connected to ' + room);
    // echo to room 1 that a person has connected to their room
    socket.broadcast.to(data.room).emit('updatechat', 'SERVER', username + ' has connected to this room');
  });

// Send a chat messages to all connected sockets when a message is received
  socket.on('chatMessage', function (data) {
    data.message.type = 'message';

    // Emit the 'chatMessage' event
    io.to(data.room).emit('chatMessage', data.message);
  });

  socket.on('room', function (room) {
    socket.join(room);
  });

  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function () {
    io.emit('chatMessage', {
      type: 'status',
      content: 'disconnected'
    });
  });
};
