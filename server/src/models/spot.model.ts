const mongooseSpot = require("./db");

const spotSchema = new mongooseSpot.Schema({
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

module.exports = mongooseSpot.model("Spots", spotSchema);
