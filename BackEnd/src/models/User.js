const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("User", UserSchema);
