const express = require("express");
const routes = express.Router();
const path = require("path");
const SessionController = require("./controller/SessionController");

routes.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

routes.post("/login", SessionController.login);

routes.post("/cadastrar", SessionController.cadastrar);

routes.get("/home", function (request, response) {
  if (request.session.loggedin) {
    response.send("Welcome back, " + request.session.username + "!");
  } else {
    response.send("Please login to view this page!");
  }
  response.end();
});

// routes.get("/dashboard", DashboardController.show);

module.exports = routes;
