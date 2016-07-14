'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Message Schema
 */
var MessageSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  sender: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  thread: {
    type: Schema.ObjectId,
    ref: 'Thread'
  }
});

mongoose.model('Message', MessageSchema);
