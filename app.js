const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// Import Routes
const router = require("./routes/postRoutes");

app.use(cors());
app.use(bodyParser.json());
app.use("/api/posts", router);

console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to database");
  app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
  });
});
