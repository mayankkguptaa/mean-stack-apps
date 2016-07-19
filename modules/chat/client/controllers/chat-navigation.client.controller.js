(function () {
  'use strict';

  angular
    .module('chat')
    .controller('ChatNavigationController', ChatNavigationController);

  ChatNavigationController.$inject = ['ExpertsService'];

  function ChatNavigationController(ExpertsService) {
    var vm = this;

    vm.experts = ExpertsService.query();
  }
}());
