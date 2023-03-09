const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const ConnectDB = () => {
  mongoose
    .set({
      strictQuery: true,
    })
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Server connected to Database");
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

module.exports = ConnectDB;
