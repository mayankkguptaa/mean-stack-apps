'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Expert = mongoose.model('Expert'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current expert
 */
exports.read = function (req, res) {
  res.json(req.expert);
};

/**
 * Update an Expert
 */
exports.update = function (req, res) {
  var expert = req.expert;

  // For security purposes only merge these parameters
  expert.description = req.body.description;

  expert.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(expert);
  });
};

/**
 * Delete an expert
 */
exports.delete = function (req, res) {
  var expert = req.expert;

  expert.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    User.findById(expert.user._id).exec(function (err, user) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }

      res.json(expert);
    });
  });
};

/**
 * List of Experts
 */
exports.list = function (req, res) {
  Expert.find().populate('user', 'displayName').exec(function (err, experts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(experts);
  });
};

/**
 * Expert middleware
 */
exports.expertByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Expert is invalid'
    });
  }

  Expert.findById(id).populate('user', 'displayName').exec(function (err, expert) {
    if (err) {
      return next(err);
    } else if (!expert) {
      return next(new Error('Failed to load expert ' + id));
    }

    req.expert = expert;
    next();
  });
};
