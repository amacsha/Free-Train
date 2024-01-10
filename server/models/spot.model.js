const mongoose = require('./db')

const spotSchema = new mongoose.Schema({
  name: String,
  description: String,
  imagePaths: [String],
  lat: Number,
  Lng: Number,
})

module.exports = mongoose.model("User", spotSchema)