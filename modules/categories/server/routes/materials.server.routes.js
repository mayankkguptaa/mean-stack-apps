'use strict';

/**
 * Module dependencies
 */
var materialsPolicy = require('../policies/materials.server.policy'),
  materials = require('../controllers/materials.server.controller'),
  categories = require('../controllers/categories.server.controller');

module.exports = function (app) {
  // Categories collection routes
  app.route('/api/categories/:categoryId/materials').all(materialsPolicy.isAllowed)
    .get(materials.list)
    .post(materials.create);

  // Single article routes
  app.route('/api/categories/:categoryId/materials/:materialId').all(materialsPolicy.isAllowed)
    .get(materials.read)
    .put(materials.update)
    .delete(materials.delete);

  // Finish by binding the material middleware
  app.param('materialId', materials.materialByID);

  app.param('categoryId', categories.categoryByID);
};
