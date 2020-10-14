const User = require("../models/User");
const RegistroDoacao = require("../models/RegistroDoacao");

module.exports = {
  async store(req, res) {
    const { dataDoacao } = req.body;
    const { localDoacao } = req.body;
    const { user_id } = req.params;

    const user = await User.findById(user_id);
    if (user) {
      //Masculino 3
      //Feminino  4
      var oldDonation = await RegistroDoacao.findOne({ user_id }).sort({
        dateDoacao: -1,
      });
      console.log(oldDonation);
      if (oldDonation) {
        var oldData = Date.parse(oldDonation.dataDoacao);
        console.log("Ultima data " + oldData);
        if (user.genero == "Masculino") {
          const registroDoacao = await RegistroDoacao.create({
            dataDoacao,
            localDoacao,
            user: user_id,
          });
          registroDoacao.save();
          return res.status(200).json();
        } else if (user.genero == "Feminino") {
          return res.status(200).json();
        }
        // } else {
        //   const registroDoacao = await RegistroDoacao.create({
        //     dataDoacao,
        //     localDoacao,
        //     user: user_id,
        //   });
        //   registroDoacao.save();
        return res.status(200).json("Não entrou no pi ");
      }
    } else {
      return res.status(400).json({ error: "USER DOES NOT EXISTS" });
    }
  },

  async alter(req, res) {},
  async deleted(req, res) {},
};
