'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  experts = require(path.resolve('./modules/users/server/controllers/experts.server.controller.js')),
  messages = require('../controllers/messages.server.controller');

module.exports = function (app) {
  // Messages collection routes
  app.route('/api/messages/:roomName').get(messages.list)
    .post(messages.create);

  app.route('/api/chatCreate/:expertId').get(messages.createChatRoom);

  // Finish by binding the expert middleware
  app.param('expertId', experts.expertByID);

  // Finish by binding the thread middleware
  app.param('roomName', messages.threadByName);
};
