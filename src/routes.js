const express = require("express");
const routes = express.Router();
const path = require("path");
const SessionController = require("./controller/SessionController");

routes.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
  //__dirname : It will resolve to your project folder.
});

routes.post("/", SessionController.store);

// routes.get("/dashboard", DashboardController.show);

module.exports = routes;
