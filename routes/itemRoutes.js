const express = require("express");
const validateItem = require('../middleware/validateItem');
const router = express.Router();
const { cacheItems, cacheItemById } = require('../middleware/cache');
const {
  addItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
} = require("../controllers/itemController");
const adminMiddleware = require("../middleware/admin");
const AuthMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the item
 *         price:
 *           type: number
 *           description: The price of the item
 *         description:
 *           type: string
 *           description: The description of the item
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: The items managing API
 */

/**
 * @swagger
 * /item:
 *   post:
 *     summary: Add a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: The item was successfully created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Some server error
 */
router.post('/', validateItem, addItem);

/**
 * @swagger
 * /item:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: admin
 *         schema:
 *           type: string
 *         required: true
 *         description: Admin Boolean query parameter
 *     responses:
 *       200:
 *         description: List of all items
 *       401:
 *         description: You are not authorized to view this page
 *       500:
 *         description: Some server error
 */
router.get('/', adminMiddleware, cacheItems, getItems);

/**
 * @swagger
 * /item/{id}:
 *   get:
 *     summary: Get item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The item ID
 *     responses:
 *       200:
 *         description: Item details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', AuthMiddleware, cacheItemById, getItemById);

/**
 * @swagger
 * /item/{id}:
 *   put:
 *     summary: Update item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: The item was successfully updated
 *       404:
 *         description: Item not found
 */
router.put('/:id', updateItem);

/**
 * @swagger
 * /item/{id}:
 *   delete:
 *     summary: Delete item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The item ID
 *     responses:
 *       200:
 *         description: The item was deleted
 *       404:
 *         description: Item not found
 */
router.delete('/:id', deleteItem);

module.exports = router;
