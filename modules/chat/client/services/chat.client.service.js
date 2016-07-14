(function () {
  'use strict';

  angular
    .module('chat.service').factory('MessagesService', MessagesService);

  MessagesService.$inject = ['$resource'];

  function MessagesService($resource) {
    return $resource('api/messages/:roomName', {
      roomName: '@_name'
    }, {
      update: {
        method: 'POST',
        params: { roomName: '@_name' }
      },
      get: {
        method: 'GET',
        isArray: true
      }
    });
  }

  angular
    .module('chat.service').factory('ThreadsService', ThreadsService);

  ThreadsService.$inject = ['$resource'];

  function ThreadsService($resource) {
    return $resource('api/chatCreate/:expertId', {
      expertId: '@_id'
    });
  }
}());
