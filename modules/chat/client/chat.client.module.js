(function (app) {
  'use strict';

  app.registerModule('chat', ['core']);
  app.registerModule('chat.service');
  app.registerModule('chat.routes', ['ui.router', 'core.routes', 'chat.service']);
}(ApplicationConfiguration));
