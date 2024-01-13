const Spot = require('../models/spot.model')
const path = require('path')
const fs = require('fs')

const spotController = {}

//sets the uploads folder as a local variable
const uploadsFolder = `${__dirname}/../uploads`

spotController.addSpot = async (req, res) => {
  try {
    //checks if a spot with the same name already exists
    const spot = await Spot.findOne({name: req.body.name})

    if(spot == null) {
      //makes the directory for the images to be put in
      fs.mkdirSync(path.join(uploadsFolder, req.body.name))

      //sets up a list used to store the image paths
      const imageNames = []

      //adds the images to the uploads the folder and to the image path list
      for(let image in req.files) {
        req.files[image].mv(path.join(uploadsFolder, req.body.name, req.files[image].name))
        imageNames.push(req.files[image].name)
      }

      //creates the image to store the spot in the database
      let dbObject = {
        ...req.body,
        imagePaths: imageNames
      }

      //saves the new spot
      const newDocument = new Spot(dbObject)
      await newDocument.save()
      res.status(200)
      res.send({status: "working"})
    } else {
      res.status(400)
      res.send({status: "spot already exists"})
    }
  } catch (error) {
    console.log(error)
  }
}

spotController.getAll = async (req, res) => {
  try {
    //gets all spots
    const allSpots = await Spot.find()
    res.status(200)
    res.send(allSpots)
  } catch (error) {
    console.log(error)
  }
}

spotController.getImage = async(req, res) => {
  try {
    //gets a specific image based on the parameters passed
    res.status(200)
    res.sendFile(path.join(uploadsFolder, `${req.params.spotName}/${req.params.imageName}`))
  } catch (error) {
    console.log(error)
  }
}

spotController.getSpot = async(req, res) => {
  try {
    //gets a specific spot based on the url params
    let spot = await Spot.findOne({ name: req.params.spotName})
    res.status(200)
    res.send(spot)
  } catch (error) {
    console.log(error)
  }
}

spotController.getAuthorSpot = async (req, res) => {
  try {
    //gets all the spots authored by a specific person
    let spots =  await Spot.find({author: req.params.author})
    res.status(200)
    res.send(spots)
  } catch (error) {
    console.log(error)
  }
}

module.exports = spotController