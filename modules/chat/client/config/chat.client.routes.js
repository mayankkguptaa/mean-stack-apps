(function () {
  'use strict';

  angular
    .module('chat.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('chat', {
        url: '/chat/:expertId',
        templateUrl: 'modules/chat/client/views/chat.client.view.html',
        controller: 'ChatController',
        controllerAs: 'vm',
        resolve: {
          ChatResolve: newThread
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Chat - {{ ChatResolve.expert.user.username }}'
        }
      });
  }
}());

newThread.$inject = ['$stateParams', 'ThreadsService'];

function newThread($stateParams, ThreadsService) {
  return ThreadsService.get({ expertId: $stateParams.expertId }).$promise;
}
