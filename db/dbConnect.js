const mongoose = require("mongoose");
require("dotenv").config();
const password = process.env.DB_PASSWORD;

const dbConnect = () => {
  mongoose.connection.on("open", function () {
    console.log("Connected to mongoDB");
  });

  mongoose.connection.on("error", function () {
    console.log("Could not connect to mongoDB");
  });

  mongoURI = `mongodb+srv://paras:${password}@cluster0.grwj2ys.mongodb.net/?retryWrites=true&w=majority`;

  mongoose.connect(mongoURI);

  return true;
};

module.exports = dbConnect;
