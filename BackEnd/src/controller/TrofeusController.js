const Trophy = require('../models/Trophy');
const RegistroDoacao = require('../models/RegistroDoacao');
const moment = require('moment');
var step = 0;
module.exports = {
  async store(user) {
    await Trophy.findOne({ user: user._id }, async function (err, trofeus) {
      if (err) {
      } else {
        if (trofeus.trofeus.length > 1) {
          console.log(trofeus.trofeus.length);
          atualizarTrophy(user);
        } else {
          trofeus.trofeus = ['T0', 'T1'];
          trofeus.save();
        }
      }
    });
  },
  async planStore(user) {
    Trophy.create({
      user: user._id,
      trofeus: [],
    });
  },
  async show(req, res) {
    const { user_id } = req.params;
    var trofeus = await Trophy.findOne({ user: user_id });
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
  Trophy.findOne({ user: user._id }, async function (err, trof) {
    if (err) {
      console.log(err);
    } else {
      await sequenciaDoacao(trof, register, user);
      await feitasDoacao(trof, register, user);
      await userDoacao(trof, user);
      trof.save();
    }
  });
  step = 0;
}

async function sequenciaDoacao(trof, register, user) {
  for (let i = 0; i < register.length; i++) {
    if (register[i].noTropy == true) {
    } else {
      if (user.genero == 'Masculino') {
        var comecoAno = moment().format('YYYY');
        if (moment(register[i].dataDoacao).format('YYYY') == comecoAno) {
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
    }
  }
}
async function feitasDoacao(trof, register) {
  var tt;
  if (register.length >= 5 && register.length <= 9) {
    tt = trof.trofeus.find((element) => element == 'T2');
    if (tt != undefined) {
    } else {
      trof.trofeus.push('T2');
    }
  }
  if (register.length >= 10 && register.length <= 14) {
    tt = trof.trofeus.find((element) => element == 'T3');
    if (tt != undefined) {
    } else {
      trof.trofeus.push('T3');
    }
  }
  if (register.length >= 15 && register.length <= 19) {
    tt = trof.trofeus.find((element) => element == 'T4');
    if (tt != undefined) {
    } else {
      trof.trofeus.push('T4');
    }
  }
}
async function userDoacao(trof, user) {
  var inicioUserY = moment(user.dateRegister).format('YYYY');
  var inicioUserM = moment(user.dateRegister).format('MM');
  var atualY = moment().format('YYYY');
  var atualM = moment().format('MM');
  var qtempoY = atualY - inicioUserY;
  var qtempoM = atualM - inicioUserM;
  if (qtempoM >= 1) {
    tt = trof.trofeus.find((element) => element == 'U1');
    if (tt != undefined) {
    } else {
      trof.trofeus.push('U1');
    }
  }
  if (qtempoM >= 6) {
    tt = trof.trofeus.find((element) => element == 'U2');
    if (tt != undefined) {
    } else {
      trof.trofeus.push('U2');
    }
  }
  if (qtempoY >= 1) {
    tt = trof.trofeus.find((element) => element == 'U3');
    if (tt != undefined) {
    } else {
      trof.trofeus.push('U3');
    }
  }
  if (qtempoY >= 3) {
    tt = trof.trofeus.find((element) => element == 'U4');
    if (tt != undefined) {
    } else {
      trof.trofeus.push('U4');
    }
    //NOVOS TROFEUS FUTUROS
  }
}
async function campanhaDoacao(trof, register) {}
