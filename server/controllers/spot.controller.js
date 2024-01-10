const Spot = require('../models/spot.model')
let spotController = {}

spotController.addSpot = async (req, res) => {
  try {
    const newDocument = new Spot(req.body)
    await newDocument.save()
    res.status(200)
    res.send({status: "working"})
  } catch (error) {
    console.log(error)
  }
}

module.exports = spotController