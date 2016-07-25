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
    vm.choices = parseInt(vm.months, 10);
    vm.selectCategory = selectCategory;
    vm.chosen = [];
    vm.selectError = false;
    vm.enableProceed = enableProceed;
    vm.packageTotal = packageTotal;
    switch (parseInt(vm.months, 10)) {
      case 1: vm.discount = 0;
        break;
      case 3: vm.discount = 10;
        break;
      case 6: vm.discount = 20;
        break;
      default: vm.discount = 0;
    }
    function packageTotal() {
      var totalprice = 0,
        i;
      for (i = 0; i < vm.chosen.length; i++) {
        totalprice += vm.chosen[i].price;
      }
      totalprice = totalprice - (totalprice * vm.discount) / 100;
      return totalprice;
    }
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
  }
}());
