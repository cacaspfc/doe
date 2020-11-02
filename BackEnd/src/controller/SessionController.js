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
    const { _id } = req.body; // passar como parametro ou localstore
    User.findById(_id, function (err, user) {
      if (err) {
        res.status(400).send(null);
        console.log(err);
      }
      const { email } = req.body;
      const { endereco } = req.body;
      const { username } = req.body;
      const { dataNascimento } = req.body;
      const { peso } = req.body;
      const { altura } = req.body;
      const { tipoSangue } = req.body;
      const { genero } = req.body;
      const { telefone } = req.body;
      const { estado } = req.body;
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
      user.doencasSangue = doencasSangue.split(',');

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
