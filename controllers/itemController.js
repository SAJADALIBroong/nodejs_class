const ItemModel = require("../models/itemModel");
const {validationResult} = require("express-validator")
const client = require('../config/redis')

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const addItem = async (req, res) => {
  const { name, price, description } = req.body;
  const error =   validationResult(req)

  if(!error.isEmpty()){
    return res.status(400).json({errors:error.array()});
  }

  const item = new ItemModel({
    name,
    price,
    description,
  });

  await item.save();
  res.send({
    message: "Item added successfully",
    item
  });

  client.del('items')
};

const getItems = async (req, res) => {
  await delay(5000);
  const items = await ItemModel.find();
  res.send({
    message: "Items fetched successfully",
    items
  });
  client.set('items', JSON.stringify({ message: "Items fetched successfully", items }), {
    EX: 3600 // Set expiration time to 1 hour
  });

};

const getItemById = async (req, res) => {
  const id = req.params.id;
  const item = await ItemModel.findById(id);
  res.send({
    message: "Item fetched successfully",
    item
  });
  client.set(`item:${id}`, JSON.stringify({ message: "Item fetched successfully", item }), {
    EX: 3600 // Set expiration time to 1 hour
  });
};

const updateItem = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const item = await ItemModel.findByIdAndUpdate(id, { name }, { new: true });
  res.send({
    message: "Item updated successfully",
    item
  });
  client.del(`item:${id}`);
  client.del('items');
};

const deleteItem = async (req, res) => {
  const id = req.params.id;
  const item = await ItemModel.findByIdAndDelete(id);
  res.send({
    message: "Item deleted successfully",
    item
  });
  client.del(`item:${id}`);
  client.del('items');
};

module.exports = {
  addItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
};
