(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['ExpertsService'];

  function HomeController(ExpertsService) {
    var vm = this;

    vm.experts = ExpertsService.query();
  }
}());
