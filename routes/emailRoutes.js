const express = require("express");
const emailSend = require("../controllers/email.controller");

const router = express.Router();


router.post('/send', emailSend)

module.exports =  router