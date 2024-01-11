const express = require('express')
const spotController = require("../controllers/spot.controller")

const spotRouter = express.Router()

spotRouter.post("/addSpot", spotController.addSpot)

spotRouter.get("/getAll", spotController.getAll)

module.exports = spotRouter