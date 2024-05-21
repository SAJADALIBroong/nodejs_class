const express = require("express");
const itemRoutes = require("./routes/itemRoutes");
const authRoutes = require("./routes/authRoutes")
const db = require("./config/db");
const limiter = require("./middleware/rate-limit");

const app = express();
const PORT = 4000;

app.use(express.json()); // middleware to parse JSON

app.use('/item/', limiter)

db.connectDB();

app.use("/item", itemRoutes);
app.use("/auth",authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
