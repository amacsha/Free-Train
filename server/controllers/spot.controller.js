const Spot = require('../models/spot.model')
const path = require('path')
const fs = require('fs')
const spotController = {}

const uploadsFolder = `${__dirname}/../uploads`

spotController.addSpot = async (req, res) => {
  try {
    const newDocument = new Spot(req.body)
    await newDocument.save()
    fs.mkdirSync(path.join(uploadsFolder, req.body.name))
    console.log(req.files)
    for(let image in req.files) {
      console.log(image)
      req.files[image].mv(path.join(uploadsFolder, req.body.name, req.files[image].name))
    }
    res.status(200)
    res.send({status: "working"})
  } catch (error) {
    console.log(error)
  }
}

module.exports = spotController