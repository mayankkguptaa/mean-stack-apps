(function () {
  'use strict';

  angular
    .module('categories')
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['$scope', '$state', 'categoryResolve', '$window', 'Authentication', 'MaterialsService', '$uibModal', '$log', 'CategoriesService'];

  function CategoriesController($scope, $state, category, $window, Authentication, MaterialsService, $uibModal, $log, CategoriesService) {
    var vm = this;

    vm.category = category;
    vm.category.materials = CategoriesService.materialList({ categoryId: vm.category._id });
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.modalOpen = function (size) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'modules/categories/client/views/form-material-modal.client.view.html',
        controller: 'ModalInstanceCtrl',
        controllerAs: 'vm',
        size: size,
        resolve: {
          MaterialResolve: newMaterial,
          CategoryResolve: vm.category
        }
      });

      modalInstance.result.then(function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

      newMaterial.$inject = ['MaterialsService'];

      function newMaterial(MaterialsService) {
        return new MaterialsService;
      }
    };

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.category.$remove($state.go('admin.categories.list'));
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.categoryForm');
        return false;
      }

      if (vm.category._id) {
        vm.category.$update(successCallback, errorCallback);
      } else {
        vm.category.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('admin.categories.view', {
          categoryId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }

  angular
    .module('categories')
    .controller('ModalInstanceCtrl', ModalInstanceCtrl);

  ModalInstanceCtrl.$inject = ['$uibModalInstance', 'MaterialResolve', 'CategoryResolve', 'CategoriesService', '$scope', '$window', '$state'];

  function ModalInstanceCtrl($uibModalInstance, material, category, CategoriesService, $scope, $window, $state) {
    var vm = this;

    vm.categories = CategoriesService.query();
    vm.material = material;
    vm.material.category = category._id;
    vm.material.week = '1';

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    vm.save = save;
    vm.remove = remove;
    vm.error = null;
    vm.form = {};

    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.material.$remove();
      }
    }

    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.materialForm');
        return false;
      }

      if (vm.material._id) {
        vm.material.$update(successCallback, errorCallback);
      } else {
        vm.material.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('admin.categories.view', {
          categoryId: res.material.category
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
