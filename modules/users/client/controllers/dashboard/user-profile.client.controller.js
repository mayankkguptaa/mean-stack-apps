(function () {
  'use strict';

  angular
    .module('users')
    .controller('UserProfileController', UserProfileController);

  UserProfileController.$inject = ['Authentication', '$state'];

  function UserProfileController(Authentication, $state) {
    var vm = this;
    vm.user = Authentication.user;
  }
}());
