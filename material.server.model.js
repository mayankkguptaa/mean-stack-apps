var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MaterialSchema = new Schema({
  title: String
  description: String,
  link: String,
  requiredDuration: Number,
  order: Number,
  week: {
    type: Number,
    enum: [1,2,3,4]
  }
});

model.model('Material', MaterialSchema);
