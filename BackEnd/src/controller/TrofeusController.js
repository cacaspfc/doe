const Trophy = require('../models/Trophy');
const RegistroDoacao = require('../models/RegistroDoacao');
const moment = require('moment');
var step = 0;

module.exports = {
  async store(user) {
    var trofeus = await Trophy.find({ user: user._id });
    console.log(trofeus);
    if (trofeus.length >= 1) {
      atualizarTrophy();
    } else {
      Trophy.create({
        user: user._id,
        trofeus: ['T0', 'T1'],
      });
    }
  },
  async show(req, res) {
    const { user_id } = req.params;

    var trofeus = await Trophy.find({ user: user_id });
    if (trofeus) {
      res.status(200).json(trofeus);
    } else {
      res.status(400).json(null);
    }
  },
};

async function atualizarTrophy(user) {
  var register = await RegistroDoacao.find({ user: user._id }).sort({
    dataDoacao: -1,
  });
  for (let index = 0; index < register.length; index++) {
    if (register.noTropy == true) {
    } else {
      Trophy.findOne({ user: user._id }, function (err, trof) {
        if (err) {
          console.log(err);
        } else {
          sequenciaDoacao(trof, register, user);
          feitasDoacao(trof, register, user);
          userDoacao(trof, register, user);
        }
      });
    }
  }
}

async function sequenciaDoacao(trof, register, user) {
  if (user.genero == 'Masculino') {
    var comecoAno = moment().format('YYYY');
    if (moment(register.dataDoacao).format('YYYY') == comecoAno) {
      step++;
      if (step == 4) {
        var tt = trof.trofeus.find((element) => element == 'SF1');
        if (tt != undefined) {
          tt = trof.trofeus.find((element) => element == 'SF2');
          if (tt != undefined) {
            tt = trof.trofeus.find((element) => element == 'SF3');
            if (tt != undefined) {
              tt = trof.trofeus.find((element) => element == 'SF4');
              if (tt != undefined) {
                //Mais TROFEUS, POREM CRIAR UM FUNTION MELHOR
              }
            } else {
              trof.trofeus.push('SF3');
            }
          } else {
            trof.trofeus.push('SF2');
          }
        } else {
          trof.trofeus.push('SF1');
        }
      }
    }
  } else {
    var comecoAno = moment().format('YYYY');
    if (moment(register.dataDoacao).format('YYYY') == comecoAno) {
      step++;
      if (step == 3) {
        var tt = trof.trofeus.find((element) => element == 'SF1');
        if (tt != undefined) {
          tt = trof.trofeus.find((element) => element == 'SF2');
          if (tt != undefined) {
            tt = trof.trofeus.find((element) => element == 'SF3');
            if (tt != undefined) {
              tt = trof.trofeus.find((element) => element == 'SF4');
              if (tt != undefined) {
                //Mais TROFEUS, POREM CRIAR UM FUNTION MELHOR
              }
            } else {
              trof.trofeus.push('SF3');
            }
          } else {
            trof.trofeus.push('SF2');
          }
        } else {
          trof.trofeus.push('SF1');
        }
      }
    }
  }
  trof.save();
}
async function feitasDoacao(trof, register) {
  var tt;
  if (register.length == 5) {
    tt = trof.trofeus.find((element) => element == 'T2');
    if (tt != undefined) {
    } else {
      trof.trofeus.push('T2');
    }
  } else if (register.length == 10) {
    tt = trof.trofeus.find((element) => element == 'T3');
    if (tt != undefined) {
    } else {
      trof.trofeus.push('T3');
    }
  } else if (register.length == 15) {
    tt = trof.trofeus.find((element) => element == 'T4');
    if (tt != undefined) {
    } else {
      trof.trofeus.push('T4');
    }
  }
  trof.save();
}
async function userDoacao(trof, user) {
  var inicioUserY = moment(user.dateRegister).format('YYYY');
  var inicioUserM = moment(user.dateRegister).format('MM');
  var atualY = moment().format('YYYY');
  var atualM = moment().format('MM');
  var qtempoY = atualY - inicioUserY;
  var qtempoM = atualM - inicioUserM;
  if (qtempoM >= 1 && qtempoM < 6) {
    tt = trof.trofeus.find((element) => element == 'U1');
    if (tt != undefined) {
    } else {
      trof.trofeus.push('U1');
    }
  } else if (qtempoM >= 6 && qtempoM < 12) {
    tt = trof.trofeus.find((element) => element == 'U2');
    if (tt != undefined) {
    } else {
      trof.trofeus.push('U2');
    }
  } else if (qtempoY >= 1 && qtempoM < 3) {
    tt = trof.trofeus.find((element) => element == 'U3');
    if (tt != undefined) {
    } else {
      trof.trofeus.push('U3');
    }
  } else if (qtempoY >= 3) {
    tt = trof.trofeus.find((element) => element == 'U3');
    if (tt != undefined) {
    } else {
      trof.trofeus.push('U3');
    }
    //NOVOS TROFEUS FUTUROS
  }
  trof.save();
}
async function campanhaDoacao(trof, register) {}
