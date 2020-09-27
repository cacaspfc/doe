const User = require("../models/User");

module.exports = {
  async cadastrar(req, res) {
    const { email } = req.body;
    const { password } = req.body;
    const { username } = req.body;

    let user = await User.findOne({ email });
    if (!user || user == null) {
      user = await User.create({ email, password, username });
    }
    // return  res.redirect("/");
    res.json(user);
  },

  async login(req, res) {
    const { email } = req.body;
    const { password } = req.body;

    let user = await User.findOne({ password });
    if (user) {
      res.json(user);
    } else {
      res.json(user);
    }
  },
};
