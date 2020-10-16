const User = require("../models/User");
const RegistroDoacao = require("../models/RegistroDoacao");
const moment = require("moment");

module.exports = {
  async store(req, res) {
    var { dataDoacao } = req.body;
    const { localDoacao } = req.body;
    const { user_id } = req.params;

    dataDoacao = new Date(moment(dataDoacao).format("YYYY-MM-DD"))
    console.log(dataDoacao)
    //Masculino 3 meses
    //Feminino  4 meses
    const user = await User.findById(user_id);
    var oldDonation;
    if (user) {
      var lastRegister = await RegistroDoacao.find({user: user_id}).sort({
        dateDoacao: -1,
      });
      if (lastRegister) {
        oldDonation = lastRegister[lastRegister.length - 1].proximaDataDoacao 
        console.log(oldDonation)
        if (dataDoacao >= oldDonation) {
          this.registerGenero()
          return res.status(200).json("Foi");
        } else {
          return res.status(200).json("Tera que esperar ze gotinha");
          }
      }else{
        this.registerGenero()
        return res.status(200).json("Primeiro Registro");
      }
    } else {
      return res.status(400).json({ error: "USER DOES NOT EXISTS" });
    }
  },

  async alter(req, res) {},
  async deleted(req, res) {},


  async registerGenero(){
    if (user.genero == "Masculino"){
          const registroDoacao = await RegistroDoacao.create({
            dataDoacao: moment(dataDoacao).format("DD-MM-YYYY"),
            localDoacao,
            user: user_id,
            proximaDataDoacao: new Date().setMonth(new Date().getMonth + 3)
          });
          registroDoacao.save();
          return res.status(200).json("Primeiro Registro");
        }else if (user.genero == "Feminino"){
            const registroDoacao = await RegistroDoacao.create({
            dataDoacao: moment(dataDoacao).format("DD-MM-YYYY"),
            localDoacao,
            user: user_id,
            proximaDataDoacao: new Date().setMonth(new Date().getMonth + 4)
          });
          registroDoacao.save()
        }
  }

};
