const express = require('express')
const spotRouter = require('./routers/spot.router')
const userRouter = require('./routers/user.router')

const router = express.Router()

router.use("/spot", spotRouter)
router.use("/user", userRouter)

module.exports = router