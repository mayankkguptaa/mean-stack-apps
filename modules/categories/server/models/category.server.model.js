'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Category Schema
 */
var CategorySchema = new Schema({
  name: String,
  description: String,
  pics: [{
    type: String
  }],
  price: Number,
  material: [{
    type: Schema.ObjectId,
    ref: 'Material'
  }]
});

mongoose.model('Category', CategorySchema);
