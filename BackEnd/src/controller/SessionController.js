const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  async cadastrar(req, res) {
    const { email } = req.body;
    var { password } = req.body;
    const { username } = req.body;

    let user = await User.findOne({ email });
    if (user == null) {
      user = await User.create({ email, password, username });
      res.json(user);
    } else if (user) {
      res.status(409).json(null);
    } else {
      res.status(400).json(null);
    }
  },

  async atualizar(req, res) {
    const { user_id } = req.params; // passar como parametro ou localstore
    User.findById(user_id, function (err, user) {
      if (err) {
        console.log(err);
        res.status(400).send(null);
      }

      var { email } = req.body;
      var { endereco } = req.body;
      var { username } = req.body;
      var { dataNascimento } = req.body;
      var { peso } = req.body;
      var { altura } = req.body;
      var { tipoSangue } = req.body;
      var { genero } = req.body;
      var { telefone } = req.body;
      var { estado } = req.body;
      var { doencasSangue } = req.body;

      user.email = email;
      user.username = username;
      user.endereco = endereco;
      user.dataNascimento = dataNascimento;
      user.peso = peso;
      user.altura = altura;
      user.tipoSangue = tipoSangue;
      user.genero = genero;
      user.telefone = telefone;
      user.estado = estado;

      user.save();
      res.status(200).send(user);
      console.log('usuario atualizou os dados' + user);
    });
    // return  res.redirect("/");
  },

  async login(req, res) {
    const { email } = req.body;
    const { password } = req.body;
    let user = await User.findOne({ email, password });

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json(null);
    }
  },

  async showUser(req, res) {
    const { _id } = req.params;
    let user = await User.findById(_id);

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json(null);
    }
  },

  async alterLogin(req, res) {
    const { email } = req.body;
    const { password } = req.body;

    let user = await User.findOne({ password });
    if (user) {
      res.json(user);
    } else {
      res.status(400).json(null);
    }
  },
};
