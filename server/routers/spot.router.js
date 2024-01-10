const express = require('express')
const spotController = require("../controllers/spot.controller")

const spotRouter = express.Router()

spotRouter.post("/addSpot", spotController.addSpot)

module.exports = spotRouter