const mongooseUser = require("./db");
const UserSchema = new mongooseUser.Schema({
    email: String,
    username: String,
    password: String,
});
module.exports = mongooseUser.model("Users", UserSchema);
