'use strict';

/**
 * Module Dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Material = mongoose.model('Material'),
  Category = mongoose.model('Category'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Add material to a category
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  var category = req.category,
    material = new Material(res.body);

  material.category = category._id;
  material.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(material);
  })
};

/**
 * Get the list of materials in a particular category
 * @param req
 * @param res
 */
exports.list = function (req, res) {
  var category = req.category;

  Material.find({ category: category._id }).sort({ week: 1, order: 1 }).populate('category').exec(function (err, materials) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(materials);
  });
};

/**
 * Get a particular material
 * @param req
 * @param res
 */
exports.read = function (req, res) {
  var material = req.material;

  res.json(material);
};

/**
 * Update the material properties
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  var material = req.material;

  res.json(material);
};

/**
 * Remove material from a category
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
  var material = req.material;

  material.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });

      res.json(material);
    }
  });
};

/**
 * Get material by material id
 * @param req
 * @param res
 * @param next
 * @param id
 * @returns {*}
 */
exports.materialByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Material is invalid'
    });
  }

  Material.findById(id).populate('category').exec(function (err, material) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else if (!material) {
      return res.status(400).send({
        message: 'No material with such id'
      });
    } else {
      req.material = material;
    }
  })
};
