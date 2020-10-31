const User = require('../models/User');
const RegistroDoacao = require('../models/RegistroDoacao');
const moment = require('moment');
const momentTz = require('moment-timezone');
const tropy = require('../controller/TrofeusController');

module.exports = {
  async store(req, res) {
    var { dataDoacao } = req.body;
    const { localDoacao } = req.body;
    const { user_id } = req.params;

    dataDoacao = new Date(moment(dataDoacao));
    if (dataDoacao < new Date(moment().subtract(3, 'hour'))) {
      // Variavel boolean que é anterior
      var antesDoacao = true;
    }

    //Masculino 3 meses
    //Feminino  4 meses
    const user = await User.findById(user_id);
    var lastRegister;
    if (user) {
      if (antesDoacao) {
        lastRegister = await RegistroDoacao.find({ user: user_id }).sort({
          dataDoacao: -1,
        });
        var donationRemember = lastRegister[lastRegister.length - 1].dataDoacao;
        dataDoacao = new Date(moment(dataDoacao));
        if (
          dataDoacao < donationRemember &&
          dataDoacao < new Date(moment(donationRemember).subtract(3, 'month'))
        ) {
          if (dataDoacao < user.dateRegister) {
            await registerGenero(dataDoacao, localDoacao, user, false);
          } else {
            await registerGenero(dataDoacao, localDoacao, user, true);
          }
          return res.status(200).json('Resgistrado');
        } else {
          return res
            .status(200)
            .json(
              'Desculpe, voce não pode registrar essa doacao pq existe um registro que bate com 3 meses  ' +
                moment(donationRemember).format('YYYY-MM-DD')
            );
        }
      } else {
        lastRegister = await await RegistroDoacao.find({ user: user_id }).sort({
          dataDoacao: -1,
        });
        if (lastRegister.length !== 0) {
          var oldDonation =
            lastRegister[lastRegister.length - 1].proximaDataDoacao;

          if (dataDoacao > oldDonation) {
            await registerGenero(dataDoacao, localDoacao, user, false);
            tropy.store(user);
            return res.status(200).json('Resgistrado');
          } else {
            return res.status(200).json('Tera que esperar ze gotinha');
          }
        } else {
          await registerGenero(dataDoacao, localDoacao, user, false);
          tropy.store(user);
          return res.status(200).json('Primeiro Registro');
        }
      }
    } else {
      return res.status(400).json({ error: 'USER DOES NOT EXISTS' });
    }
  },

  async alter(req, res) {},
  async deleted(req, res) {},
};

async function registerGenero(dataDoacao, localDoacao, user, tropy) {
  dataDoacao = new Date(moment(dataDoacao).add(1, 'd').format('YYYY-MM-DD'));
  var proximaDataDoacao = new Date(moment(dataDoacao).subtract(1, 'day'));
  if (user.genero == 'Masculino') {
    const registroDoacao = await RegistroDoacao.create({
      dataDoacao: moment(dataDoacao).format('YYYY-MM-DD'),
      localDoacao,
      user: user._id,
      noTropy: tropy,
      proximaDataDoacao: new Date(proximaDataDoacao).setMonth(
        new Date(proximaDataDoacao).getMonth() + 3
      ),
    });
    registroDoacao.save();
  } else if (user.genero == 'Feminino') {
    const registroDoacao = await RegistroDoacao.create({
      dataDoacao: moment(dataDoacao).format('YYYY-MM-DD'),
      localDoacao,
      user: user._id,
      noTropy: tropy,
      proximaDataDoacao: new Date(proximaDataDoacao).setMonth(
        new Date(proximaDataDoacao).getMonth() + 4
      ),
    });
    registroDoacao.save();
  }
}
