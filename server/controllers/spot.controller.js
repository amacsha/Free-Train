const Spot = require('../models/spot.model')
const path = require('path')
const fs = require('fs')
const { trace } = require('console')
const spotController = {}

const uploadsFolder = `${__dirname}/../uploads`

spotController.addSpot = async (req, res) => {
  try {
    const spot = await Spot.findOne({name: req.body.name})
    if(spot == null) {
      fs.mkdirSync(path.join(uploadsFolder, req.body.name))
      const imageNames = []
      for(let image in req.files) {
        req.files[image].mv(path.join(uploadsFolder, req.body.name, req.files[image].name))
        imageNames.push(req.files[image].name)
      }
      let dbObject = {
        ...req.body,
        imagePaths: imageNames
      }
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
    const allSpots = await Spot.find()
    res.status(200)
    res.send(allSpots)
  } catch (error) {
    console.log(error)
  }
}

spotController.getImage = async(req, res) => {
  try {
    res.status(200)
    res.sendFile(path.join(uploadsFolder, `${req.params.spotName}/${req.params.imageName}`))
  } catch (error) {
    console.log(error)
  }
}

spotController.getSpot = async(req, res) => {
  try {
    let spot = await Spot.findOne({ name: req.params.spotName})
    res.status(200)
    res.send(spot)
  } catch (error) {
    console.log(error)
  }
}

spotController.getAuthorSpot = async (req, res) => {
  try {
    console.log(req.params)
    let spots =  await Spot.find({author: req.params.author})
    res.status(200)
    res.send(spots)
  } catch (error) {
    console.log(error)
  }
}

module.exports = spotController