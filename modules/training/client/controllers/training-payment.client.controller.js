(function () {
  'use strict';

  angular
    .module('training')
    .controller('TrainingPaymentController', TrainingPaymentController);

  TrainingPaymentController.$inject = ['CategoriesService', 'amount', '_'];

  function TrainingPaymentController(CategoriesService, amount, _) {
    var vp = this;
  }
}());
