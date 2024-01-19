const mongoose = require("./db");
const challengeSchema = new mongoose.Schema({
    challenge: String,
    spotName: String,
    completedBy: [String],
});
module.exports = mongoose.model("Challenges", challengeSchema);
