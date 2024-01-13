const mongoose = require('./db')

const spotSchema = new mongoose.Schema({
  name: String,
  description: String,
  imagePaths: [String],
  lat: Number,
  lng: Number,
  author: String,
  likedBy: [String]
})

module.exports = mongoose.model("Spots", spotSchema)