const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://SAJADALI:passpass@cluster0.euj7b2w.mongodb.net/');
    console.log("Connected to DB");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { connectDB };
