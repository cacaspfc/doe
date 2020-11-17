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
        if (user.genero == 'Masculino') {
          lastRegister = await RegistroDoacao.find({ user: user_id, dataDoacao: { $gte: moment(dataDoacao).subtract(3,"month"), $lte: moment(dataDoacao).add(3,"month")}});
        if (lastRegister.length == 0){
          if (dataDoacao < user.dateRegister) {
              await registerGenero(dataDoacao, localDoacao, user, false);
          tropy.store(user);
            } else {
              await registerGenero(dataDoacao, localDoacao, user, true);
          tropy.store(user);
            }
            return res.status(200).json('Registrado');
        }else{
              return res
              .status(409)
              .json(
                moment(lastRegister[lastRegister.length - 1].dataDoacao).format('DD-MM-YYYY')
              );
          }
        }else{
          lastRegister = await RegistroDoacao.find({ user: user_id, dataDoacao: { $gte: moment(dataDoacao).subtract(4,"month"), $lte: moment(dataDoacao).add(4,"month")}});
        if (lastRegister.length == 0){
          if (dataDoacao < user.dateRegister) {
              await registerGenero(dataDoacao, localDoacao, user, false);
          tropy.store(user);
            } else {
              await registerGenero(dataDoacao, localDoacao, user, true);
          tropy.store(user);
            }
            return res.status(200).json('Registrado');
        }else{
              return res
              .status(409)
              .json(
                moment(lastRegister[lastRegister.length - 1].dataDoacao).format('DD-MM-YYYY')
              );
          }
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
            return res.status(200).json('Registrado');
          } else {
            return res
              .status(409)
              .json('Desculpe, voce não pode registrar essa doacao até o prazo valido de doação vencer');
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

  async show(req, res) {
    const { user_id } = req.params;

    var register = await RegistroDoacao.find({ user: user_id }).sort({
      dataDoacao: -1,
    });
    if (register) {
      res.status(200).json(register);
    } else {
      res.status(400).json(register);
    }
  },
  async alter(req, res) { },
  async deleted(req, res) { },
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
