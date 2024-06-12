const express = require("express");
const validateItem = require('../middleware/validateItem')
const router = express.Router();
const {cacheItems, cacheItemById} = require('../middleware/cache')
const {
  addItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
} = require("../controllers/itemController");
const adminMiddleware = require("../middleware/admin");
const AuthMiddleware = require("../middleware/authMiddleware");
;


router.post('/',validateItem, addItem);
router.get('/', adminMiddleware,cacheItems,getItems);
router.get('/:id',AuthMiddleware,cacheItemById, getItemById);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;




