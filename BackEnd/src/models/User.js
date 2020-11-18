const mongoose = require('mongoose');
const moment = require('moment');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  endereco: String,
  dataNascimento: String,
  peso: String,
  altura: String,
  genero: String,
  tipoSangue: String,
  telefone: String,
  estado: String,
  doencasSangue: [String],
  dateRegister: {
    type: Date,
    default: new Date(moment().subtract(3, 'hour')),
  },
  fotoPerfil: String,
});

module.exports = mongoose.model('User', UserSchema);
