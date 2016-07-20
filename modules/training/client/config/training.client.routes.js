(function () {
  'use strict';

  angular
    .module('training.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('training', {
        abstract: true,
        url: '/training',
        template: '<ui-view/>'
      })
      .state('training.home', {
        url: '',
        templateUrl: 'modules/training/client/views/training.client.view.html',
        controller: 'TrainingController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Training'
        }
      })
      .state('training.months', {
        url: '/:months',
        templateUrl: 'modules/training/client/views/training-months.client.view.html',
        controller: 'TrainingMonthsController',
        controllerAs: 'vm',
        resolve: {
          months: getMonths
        },
        data: {
          pageTitle: 'Training - {{ months }} months'
        }
      })
      .state('training.package', {
        url: '/:package'

      });
  }
}());

getMonths.$inject = ['$stateParams'];

function getMonths($stateParams) {
  return $stateParams.months;
}
