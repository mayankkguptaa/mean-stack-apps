(function () {
  'use strict';

  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Users',
      state: 'admin.users'
    });

    // Add the Categories in admin panel
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Categories',
      state: 'admin.categories.list'
    });
  }
}());
