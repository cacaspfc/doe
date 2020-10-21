const mongoose = require("mongoose");

const RegistroDoacaoSchema = new mongoose.Schema({
  dataDoacao: Date,
  proximaDataDoacao: Date,
  localDoacao: String,
  noTropy: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("BloodDonationUser", RegistroDoacaoSchema);
