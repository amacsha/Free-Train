const express = require('express')
const spotRouter = require('./routers/spot.router')
const userRouter = require('./routers/user.router')
const authenticate = require('./middleware/authenticate')

const router = express.Router()

router.use("/spot", authenticate, spotRouter)
router.use("/user", userRouter)

module.exports = router