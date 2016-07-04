'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * User-Courses Schema
 */
var UserCourseSchema = new Schema({
  months: {
    type: Number,
    enum: [1, 3, 6]
  },
  categories: [{
    type: Schema.ObjectId,
    ref: 'Category'
  }],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  payment: {
    type: Boolean,
    default: false
  }
});

mongoose.model('UserCourse', UserCourseSchema);
