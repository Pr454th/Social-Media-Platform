const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
require("dotenv").config();

// Import Routes
const router = require("./routes/postRoutes");

app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use("/api", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/dist"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to database");
  app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
  });
});
