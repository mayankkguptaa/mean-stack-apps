(function () {
  'use strict';

  angular
    .module('chat')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$scope', '$state', 'Authentication', 'Socket', 'ChatResolve', 'MessagesService'];

  function ChatController($scope, $state, Authentication, Socket, Chat, MessagesService) {
    var vm = this;

    vm.messages = MessagesService.get({ roomName: Chat.roomName });
    vm.messageText = '';
    vm.sendMessage = sendMessage;

    init();

    function init() {
      // If user is not signed in then redirect back home
      if (!Authentication.user) {
        $state.go('home');
      }

      // Make sure the Socket is connected
      if (!Socket.socket) {
        Socket.connect();
      }

      Socket.on('connect', function () {
        Socket.emit('room', Chat.roomName);
      });

      // Add an event listener to the 'chatMessage' event
      Socket.on('chatMessage', function (message) {
        vm.messages.unshift(message);
      });

      // Remove the event listener when the controller instance is destroyed
      $scope.$on('$destroy', function () {
        Socket.removeListener('chatMessage');
      });
    }

    // Create a controller method for sending messages
    function sendMessage() {
      // Create a new message object
      var message = {
        content: vm.messageText,
        created: Date.now()
      };

      message = new MessagesService(message);
      message.$update({ roomName: Chat.roomName }, function (message) {
        // Emit a 'chatMessage' message event
        Socket.emit('chatMessage', { message: message, room: Chat.roomName });

        // Clear the message text
        vm.messageText = '';
      }, function (res) {
        vm.messageText = res.data.message;
      });
    }
  }
}());
