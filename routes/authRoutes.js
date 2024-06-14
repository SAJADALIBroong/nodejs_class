const express = require("express");
const router = express.Router();

const { register, login} = require("./../controllers/authController")


/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *     Register:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Auths
 *   description: The items managing API
 */


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login a user
 *     tags: [Auths]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: user login successfull
 *       400:
 *         description: Validation error
 *       500:
 *         description: Some server error
 */

router.post('/login', login)


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: register a user
 *     tags: [Auths]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: user login successfull
 *       400:
 *         description: Validation error
 *       500:
 *         description: Some server error
 */
router.post('/register', register)

module.exports= router;