const express = require('express')
const spotController = require("../controllers/spot.controller")

const spotRouter = express.Router()

spotRouter.post("/addSpot", spotController.addSpot)
spotRouter.post("/like/:spotName", spotController.like)
spotRouter.post("/unLike/:spotName", spotController.unLike)
spotRouter.post("/addComment/:spotName", spotController.addComment)

spotRouter.get("/getAll", spotController.getAll)
spotRouter.get("/getImage/:spotName/:imageName", spotController.getImage)
spotRouter.get("/getSpot/:spotName", spotController.getSpot)
spotRouter.get("/getAuthorSpots/:author", spotController.getAuthorSpot)

module.exports = spotRouter