const express = require("express");
const routes = express.Router();
const path = require("path");
const SessionController = require("./controller/SessionController");

routes.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

routes.post("/login", SessionController.store);

// routes.get("/dashboard", DashboardController.show);

module.exports = routes;
