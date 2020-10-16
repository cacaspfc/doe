const User = require("../models/User");
const RegistroDoacao = require("../models/RegistroDoacao");
const moment = require("moment");



module.exports = {
  async store(req, res) {
    var { dataDoacao } = req.body;
    const { localDoacao } = req.body;
    const { user_id } = req.params;

    dataDoacao = new Date(moment(dataDoacao).add(1,"d").format("YYYY-MM-DD"))
    //Masculino 3 meses
    //Feminino  4 meses
    const user = await User.findById(user_id);
    var oldDonation;
    if (user) {
      const lastRegister = await (await RegistroDoacao.find({'user': user_id}).sort({'dataDoacao': -1}));
      if (lastRegister.length !== 0) {
        oldDonation = lastRegister[lastRegister.length - 1].proximaDataDoacao
        if (dataDoacao > oldDonation) {
          await registerGenero(dataDoacao,localDoacao,user)
          return res.status(200).json("Foi");
        } else {
          return res.status(200).json("Tera que esperar ze gotinha");
          }
      }else{
        await registerGenero(dataDoacao,localDoacao,user)
        return res.status(200).json("Primeiro Registro");
      }
    } else {
      return res.status(400).json({ error: "USER DOES NOT EXISTS" });
    }
  },

  async alter(req, res) {},
  async deleted(req, res) {},
};

async function registerGenero(dataDoacao,localDoacao,user){

  var proximaDataDoacao = new Date(moment(dataDoacao).subtract(1,"day"))
    if (user.genero == "Masculino"){
          const registroDoacao = await RegistroDoacao.create({
            dataDoacao: moment(dataDoacao).format("YYYY-MM-DD"),
            localDoacao,
            user: user._id,
            proximaDataDoacao: new Date(proximaDataDoacao).setMonth(new Date(proximaDataDoacao).getMonth() + 3)
          });
          registroDoacao.save();
        }else if (user.genero == "Feminino"){
            const registroDoacao = await RegistroDoacao.create({
            dataDoacao: moment(dataDoacao).format("YYYY-MM-DD"),
            localDoacao,
            user: user._id,
            proximaDataDoacao: new Date(dataDoacao).setMonth(new Date().getMonth() + 4)
          });
          registroDoacao.save()
        }
  }
