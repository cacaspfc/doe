const express = require('express');
const routes = express.Router();
const path = require('path');
const SessionController = require('./controller/SessionController');
const RegistroDoacaoController = require('./controller/RegistroDoacaoController');
const TrofeusController = require('./controller/TrofeusController');

routes.post('/login', SessionController.login);

routes.post('/cadastrar', SessionController.cadastrar);

routes.post('/loginuser/:_id', SessionController.showUser);
routes.put('/atualizar/:user_id', SessionController.atualizar);

routes.post('/registrodoacao/:user_id', RegistroDoacaoController.store);

routes.get('/userdoacao/:user_id', RegistroDoacaoController.show);

routes.get('/usertrophy/:user_id', TrofeusController.show);

routes.get('/home', function (request, response) {
  // if (request.session.loggedin) {
  //   response.send("Welcome back, " + request.session.username + "!");
  // } else {
  //   response.send("Please login to view this page!");
  // }
  // response.end();
});

module.exports = routes;
