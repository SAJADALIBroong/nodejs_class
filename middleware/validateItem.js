const {body} = require("express-validator")
const validateItem = [
    body("name", "Name cannot be empty")
      .trim()
      .notEmpty(),
    body('price', 'Price must be a positive number')
      .isFloat({ gt: 0 }),
    body('description')
      .optional()
      .trim()
      .escape()
  ]; 

  module.exports = validateItem;