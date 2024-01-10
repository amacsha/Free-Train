const express = require('express')
const spotRouter = require('./routers/spot.router')

const router = express.Router()

router.use("/spot", spotRouter)

module.exports = router