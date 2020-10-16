const mongoose = require("mongoose");

const RegistroDoacaoSchema = new mongoose.Schema({
  dataDoacao: Date,
  proximaDataDoacao: Date,
  LocalDoacao: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("BloodDonationUser", RegistroDoacaoSchema);
