const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  status: Number
});

const ItemModel = mongoose.model('Item', itemSchema);

module.exports = ItemModel;
