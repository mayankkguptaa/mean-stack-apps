'use strict';

// Create the chat configuration
module.exports = function (io, socket) {
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
