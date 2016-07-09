(function () {
  'use strict';

  angular
    .module('training')
    .controller('TrainingMonthsController', TrainingMonthsController);

  TrainingMonthsController.$inject = ['CategoriesService', 'months', '_'];

  function TrainingMonthsController(CategoriesService, months, _) {
    var vm = this;

    vm.categories = [];
    vm.months = months;
    vm.choices = vm.months;
    vm.selectCategory = selectCategory;
    vm.chosen = [];
    vm.selectError = false;

    CategoriesService.query(function (res) {
      _.map(res, function (val) {
        val.check = false;
        if (vm.choices === '6') {
          val.check = true;
        }
        this.push(val);
      }, vm.categories);
    });

    function selectCategory(category) {
      console.log(vm.chosen.length);
      if (vm.chosen.length < vm.choices && !category.check) {
        category.check = true;
        vm.chosen.push(category);
      } else if (category.check) {
        category.check = false;
        vm.chosen.splice(vm.chosen.indexOf(category), 1);
      } else {
        vm.selectError = true;
      }
    }
  }
}());
