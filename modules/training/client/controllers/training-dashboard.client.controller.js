(function () {
  'use strict';

  angular
    .module('training')
    .controller('TrainingDashboardController', TrainingDashboardController);

  TrainingDashboardController.$inject = ['userCourseResolve'];

  function TrainingDashboardController(userCourse) {
    var vm = this;

    vm.cost = userCourse.cost;
    vm.userCourse = userCourse;
  }
}());
