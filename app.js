const express = require("express");
const app = express();
const ConnectDB = require("./config/connect");
const cors = require("cors");
const port = process.env.PORT || 5000;

// This helps to allow access to cross origin sites
app.use(cors());
app.use(express.json());

//default get route
// get api
app.get("/", (req, res) => {
  res.send("You are in a wrong place. Please find your way out of here!");
});

//middle wares
app.use("/api/v6/", require("./api/employee"));
app.use("/api/v6/", require("./api/manager"));
app.use("/api/v6/", require("./api/pharmacy"));

//connects the database to run from the app / index file.
ConnectDB();

//runs the server
app.listen(port, console.log(`server started on port: ${port}.......`));
