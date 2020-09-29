const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  async cadastrar(req, res) {
    const { email } = req.body;
    var { password } = req.body;
    const { username } = req.body;

    let user = await User.findOne({ email });
    if (user == null) {
      bcrypt.hash(password, 10, async (err, cript) => {
        password = cript;
        user = await User.create({ email, password, username });
      });
      res.json(user);
    } else {
      res.status(400).json(null);
    }
    // return  res.redirect("/");
  },

  async login(req, res) {
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
