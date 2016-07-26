(function () {
  'use strict';

  angular
    .module('training')
    .controller('TrainingMonthsController', TrainingMonthsController);

  TrainingMonthsController.$inject = ['CategoriesService', 'months', '_', '$state', 'UserCoursesService', 'Authentication'];

  function TrainingMonthsController(CategoriesService, months, _, $state, UserCoursesService, Authentication) {
    var vm = this;

    vm.user = Authentication.user;
    vm.categories = [];
    vm.months = months;
    vm.choices = parseInt(vm.months, 10);
    vm.selectCategory = selectCategory;
    vm.chosen = [];
    vm.selectError = false;
    vm.enableProceed = enableProceed;
    vm.cost = 0;
    vm.getCost = getCost;
    vm.createUserCourse = createUserCourse;


    CategoriesService.query(function (res) {
      _.map(res, function (val) {
        val.check = false;
        if (vm.choices === '6') {
          val.check = true;
        }
        this.push(val);
      }, vm.categories);
    });

    switch (parseInt(vm.months, 10)) {
      case 1: vm.discount = 0;
        break;
      case 3: vm.discount = 10;
        break;
      case 6: vm.discount = 20;
        break;
      default: vm.discount = 0;
    }

    function getCost() {
      var totalPrice = 0;

      for (var i = 0; i < vm.chosen.length; i++) {
        totalPrice += vm.chosen[i].price;
      }

      totalPrice = totalPrice - (totalPrice * vm.discount) / 100;
      vm.cost = totalPrice;
    }

    function selectCategory(category) {
      if (vm.chosen.length < vm.choices && !category.check) {
        category.check = true;
        vm.chosen.push(category);
      } else if (category.check) {
        category.check = false;
        vm.chosen.splice(vm.chosen.indexOf(category), 1);
      } else {
        vm.selectError = true;
      }
      if (vm.chosen.length < vm.choices) {
        vm.selectError = false;
      }
    }

    function enableProceed() {
      if (vm.chosen.length === vm.choices) {
        return false;
      } else {
        return true;
      }
    }

    function createUserCourse() {
      var userCourse = new UserCoursesService();
      userCourse.user = vm.user._id;
      userCourse.categories = _.pluck(vm.chosen, '_id');
      userCourse.cost = vm.cost;
      userCourse.months = vm.months;

      userCourse.$save(function (res) {
        $state.go('training.payment', {
          userCourseId: res._id
        });
      }, function (res) {
        vm.error = res.data.message;
      });
    }
  }
}());
