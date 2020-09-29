const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  endereco: String,
  dataNascimento: Date,
  peso: String,
  tipoSangue: String,
});

module.exports = mongoose.model("User", UserSchema);
