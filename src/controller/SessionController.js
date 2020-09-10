const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }
    // res.redirect("/");
    res.json(user);
    // return res.send("<script>alert('Dados Gravado com Sucesso')</script>");
  },
};
