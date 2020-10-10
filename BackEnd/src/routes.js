const express = require("express");
const routes = express.Router();
const path = require("path");
const SessionController = require("./controller/SessionController");
const RegistroDoacaoController = require("./controller/RegistroDoacaoController");

routes.get("/", function (req, res) {});

routes.post("/login", SessionController.login);

routes.post("/cadastrar", SessionController.cadastrar);

routes.put("/atualizar", SessionController.atualizar);

routes.post("/registrodoacao", RegistroDoacaoController.store);

routes.get("/home", function (request, response) {
  if (request.session.loggedin) {
    response.send("Welcome back, " + request.session.username + "!");
  } else {
    response.send("Please login to view this page!");
  }
  response.end();
});

module.exports = routes;
