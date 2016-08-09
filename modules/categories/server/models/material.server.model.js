'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Material Schema
 */
var MaterialSchema = new Schema({
  title: {
    type: String,
    required: 'Title is required'
  },
  description: {
    type: String,
    required: 'Description is required'
  },
  path: {
    type: String
  },
  requiredDuration: Number,
  order: {
    type: Number,
    unique: 'Material at this order already present',
    required: 'Order no. is required'
  },
  week: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: 'Week is required'
  },
  category: {
    type: Schema.ObjectId,
    ref: 'Category'
  }
});

MaterialSchema.index({ week: 1, order: 1 });

mongoose.model('Material', MaterialSchema);
