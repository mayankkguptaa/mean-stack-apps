'use strict';

/**
 * Module dependencies
 */
var categoriesPolicy = require('../policies/categories.server.policy'),
  materials = require('../controllers/materials.server.controller'),
  categories = require('../controllers/categories.server.controller');

module.exports = function (app) {
  // Categories collection routes
  app.route('/api/materials').all(categoriesPolicy.isAllowed)
    .get(materials.list)
    .post(materials.create);

  // Single article routes
  app.route('/api/materials/:materialId').all(categoriesPolicy.isAllowed)
    .get(materials.read)
    .put(materials.update)
    .delete(materials.delete);

  // Finish by binding the material middleware
  app.param('materialId', materials.materialByID);
};
