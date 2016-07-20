(function () {
  'use strict';

  angular
    .module('experts')
    .controller('ExpertProfileShowController', ExpertProfileShowController);

  ExpertProfileShowController.$inject = ['Authentication', 'ExpertsService'];

  function ExpertProfileShowController(Authentication, ExpertsService) {
    var vm = this;

    vm.user = Authentication.user;
    vm.expert = {};

    getExpert();

    function getExpert() {
      ExpertsService.get(function (res) {
        vm.expert = res;
      });
    }
  }
}());
