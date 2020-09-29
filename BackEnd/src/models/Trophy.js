const mongoose = require("mongoose");

const TrophySchema = new mongoose.Schema({
  enable: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Trophy", TrophySchema);
