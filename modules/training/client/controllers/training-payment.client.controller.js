(function () {
  'use strict';

  angular
    .module('training')
    .controller('TrainingPaymentController', TrainingPaymentController);

  TrainingPaymentController.$inject = ['userCourseResolve'];

  function TrainingPaymentController(userCourse) {
    var vm = this;
    
    vm.userCourse = userCourse;
  }
}());
