const mongoose = require("./db");

const UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
});

module.exports = mongoose.model("Users", UserSchema);
