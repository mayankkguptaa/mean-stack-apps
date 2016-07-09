(function (app) {
  'use strict';

  app.registerModule('training', ['underscore']);
  // app.registerModule('training.services');
  app.registerModule('training.routes', ['ui.router', 'core.routes', 'categories.services']);
}(ApplicationConfiguration));
