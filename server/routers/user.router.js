const express = require('express')
const userController = require('../controllers/user.controller')
const authenticate = require('../middleware/authenticate')

const userRouter = express.Router()

userRouter.post('/checkUser', userController.checkUser)
userRouter.post('/createUser', userController.createUser)
userRouter.post("/deleteUser", authenticate, userController.deleteUser)

userRouter.get('/logout', authenticate, userController.logout)

module.exports = userRouter
