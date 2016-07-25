(function () {
  'use strict';

  angular
    .module('training')
    .controller('TrainingPaymentController', TrainingPaymentController);

  TrainingPaymentController.$inject = ['CategoriesService', 'months', '_'];

  function TrainingPaymentController(CategoriesService, months, _) {
    var vp = this;
  }
}());
