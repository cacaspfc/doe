const mongoose = require("mongoose");

const RegistroDoacaoSchema = new mongoose.Schema({
  data: String,
});

module.exports = mongoose.model("User", UserSchema);
