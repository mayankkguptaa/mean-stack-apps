(function () {
  'use strict';

  angular
    .module('training')
    .controller('TrainingMonthsController', TrainingMonthsController);

  TrainingMonthsController.$inject = ['CategoriesService', 'months', '_'];

  function TrainingMonthsController(CategoriesService, months, _) {
    var vm = this;

    vm.categories = categoriesList();
    vm.months = months;
    vm.choices = vm.months;
    vm.selectCategory = selectCategory;
    vm.chosen = [];
    vm.selectError = false;

    function categoriesList() {
      var categories = CategoriesService.query();

      _.map(categories, function (value, index) {
        return _.extend(value, { 'check': true});
      });

      return categories;
    }

/*
    function selectCategory(i) {
      if (vm.chosen.length <= vm.choices && vm.categories[i].check) {
        vm.categories[i].check = true;
        vm.chosen.push(vm.categories[i]);
      } else if (vm.categories[i].check) {
        vm.categories[i].check = false;
        vm.chosen.splice(vm.chosen.indexOf(vm.categories[i]), 1);
      } else {
        vm.selectError = true;
      }
    }
*/
    function selectCategory(category) {
      category.check = true;
    }
  }
}());
