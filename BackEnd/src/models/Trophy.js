const mongoose = require("mongoose");

const TrophySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  trofeus: [String]
});

module.exports = mongoose.model("Trophy", TrophySchema);
