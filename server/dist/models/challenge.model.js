const mongooseChallenge = require("./db");
const challengeSchema = new mongooseChallenge.Schema({
  challenge: String,
  spotName: String,
  completedBy: [String],
});
module.exports = mongooseChallenge.model("Challenges", challengeSchema);
