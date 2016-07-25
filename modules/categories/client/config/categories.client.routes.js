(function () {
  'use strict';

  angular
    .module('categories.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.categories', {
        abstract: true,
        url: '/categories',
        template: '<ui-view/>'
      })
      .state('admin.categories.list', {
        url: '',
        templateUrl: 'modules/categories/client/views/list-categories.client.view.html',
        controller: 'CategoriesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'List Categories'
        }
      })
      .state('admin.categories.create', {
        url: '/create',
        templateUrl: 'modules/categories/client/views/form-category.client.view.html',
        controller: 'CategoriesController',
        controllerAs: 'vm',
        resolve: {
          categoryResolve: newCategory
        },
        data: {
          pageTitle: 'Categories Create'
        }
      })
      .state('admin.categories.edit', {
        url: '/:categoryId/edit',
        templateUrl: 'modules/categories/client/views/form-category.client.view.html',
        controller: 'CategoriesController',
        controllerAs: 'vm',
        resolve: {
          categoryResolve: getCategory
        },
        data: {
          pageTitle: 'Edit Category {{ categoryResolve.name }}'
        }
      })
      .state('admin.categories.view', {
        url: '/:categoryId',
        templateUrl: 'modules/categories/client/views/show-category.client.view.html',
        controller: 'CategoriesController',
        controllerAs: 'vm',
        resolve: {
          categoryResolve: getCategory
        },
        data: {
          pageTitle: 'Category {{ categoryResolve.name }}'
        }
      });

    getCategory.$inject = ['$stateParams', 'CategoriesService'];

    function getCategory($stateParams, CategoriesService) {
      return CategoriesService.get({
        categoryId: $stateParams.categoryId
      }).$promise;
    }

    newCategory.$inject = ['CategoriesService'];

    function newCategory(CategoriesService) {
      return new CategoriesService();
    }
  }
}());
