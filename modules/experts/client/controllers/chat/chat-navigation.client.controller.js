(function () {
  'use strict';

  angular
    .module('experts')
    .controller('ExpertChatNavigationController', ExpertChatNavigationController);

  ExpertChatNavigationController.$inject = ['ChatUserService'];

  function ExpertChatNavigationController(ChatUserService) {
    var vm = this;

    vm.chatRooms = [];

    ChatUserService.query(function (res) {
      vm.chatRooms = res;
    });
  }
}());
