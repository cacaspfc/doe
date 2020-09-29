const mongoose = require("mongoose");

const RegistroDoacaoSchema = new mongoose.Schema({
  dataDoacao: String,
  LocalDoacao: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("BloodDonation", RegistroDoacaoSchema);
