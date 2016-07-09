(function () {
  'use strict';

  angular
    .module('training')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Training',
      state: 'training.home',
      roles: ['*']
    });
  }
}());
