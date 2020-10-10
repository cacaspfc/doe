const User = require("../models/User");
const RegistroDoacao = require("../models/RegistroDoacao");

module.exports = {
  async store(req, res) {
    const { dataDoacao } = req.body;
    const { localDoacao } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ error: "USER DOES NOT EXISTS" });
    }

    const registroDoacao = await RegistroDoacao.create({
      dataDoacao,
      localDoacao,
      user: user_id,
    });

    return res.json(registroDoacao);
  },

  async alter(req, res) {},
  async deleted(req, res) {},
};
