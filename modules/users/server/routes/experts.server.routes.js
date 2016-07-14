'use strict';

/**
 * Module dependencies
 */
var adminPolicy = require('../policies/admin.server.policy'),
  expert = require('../controllers/experts.server.controller');

module.exports = function (app) {
  // Experts collection routes
  app.route('/api/experts')
    .get(adminPolicy.isAllowed, expert.list);

  // Single expert routes
  app.route('/api/experts/:userId')
    .get(adminPolicy.isAllowed, expert.read)
    .put(adminPolicy.isAllowed, expert.update)
    .delete(adminPolicy.isAllowed, expert.delete);

  // Finish by binding the expert middleware
  app.param('expertId', expert.expertByID);
};
