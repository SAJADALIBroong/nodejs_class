const ItemModel = require("../models/itemModel");

const addItem = async (req, res) => {
  const { name, price, description } = req.body;

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
};

const getItems = async (req, res) => {
  const items = await ItemModel.find();
  res.send({
    message: "Items fetched successfully",
    items
  });
};

const getItemById = async (req, res) => {
  const id = req.params.id;
  const item = await ItemModel.findById(id);
  res.send({
    message: "Item fetched successfully",
    item
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
};

const deleteItem = async (req, res) => {
  const id = req.params.id;
  const item = await ItemModel.findByIdAndDelete(id);
  res.send({
    message: "Item deleted successfully",
    item
  });
};

module.exports = {
  addItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
};
