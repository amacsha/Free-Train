const mongoose = require("./db");
const spotSchema = new mongoose.Schema({
  name: String,
  description: String,
  imagePaths: [String],
  lat: Number,
  lng: Number,
  author: String,
  likedBy: [String],
  comments: [
    {
      madeBy: String,
      comment: String,
    },
  ],
});
module.exports = mongoose.model("Spots", spotSchema);
