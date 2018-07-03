var mongoose = require("mongoose");
const User = require("./User");
var MatchSchema = new mongoose.Schema({
  entities: [String], // Could be player or team
  game: String,
  goalAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 }
});
mongoose.model("Match", MatchSchema);

module.exports = mongoose.model("Match");
