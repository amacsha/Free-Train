const express = require('express')
const userController = require('../controllers/user.controller')

const userRouter = express.Router()

userRouter.post('/checkUser', userController.checkUser)
userRouter.post('/createUser', userController.createUser)

module.exports = userRouter
