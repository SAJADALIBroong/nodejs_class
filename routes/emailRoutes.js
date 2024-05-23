const express = require("express");
const emailSend = require("../controllers/emailController");
const router = express.Router();



router.post('/send', emailSend)


module.exports= router;