const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const userController = {};

userController.checkUser = async (req, res) => {
  try {
    let user = await User.findOne({email: req.body.email})
    let passwordCheck = await bcrypt.compare(req.body.password, user.password)
    if(passwordCheck == true) {
      req.session.userId = user.username
      console.log("userId", req.session)
      res.status(200)
      res.send({username: user.username})
    } else {
      res.status(418)
      res.send({status: "incorrect details"})
    }
  } catch (error) {
    console.log(error)
  }
}

userController.createUser = async (req, res) => {
  try {
    let userEmail = await User.findOne({email: req.body.email})
    console.log(userEmail)
    let userName = await User.findOne({username: req.body.username})
    console.log(userName)
    if(userEmail == null && userName == null) {
      const passwordHash = await bcrypt.hash(req.body.password, 10)
      let newUser = new User({
        ...req.body,
        password: passwordHash
      })
      req.session.userId = newUser.username
      await newUser.save()
      res.status(200)
      res.send({status: "complete"})
    } else if(userEmail != null) {
      res.status(400)
      res.send({status: "email already exists"})
    } else if(userName != null) {
      res.status(400)
      res.send({status: "username already exists"})
    }
    
    
  } catch (error) {
    console.log(error)
  }
}

userController.logout = async (req, res) => {
  req.session.destroy((error) => {
    if(error) {
      res.status(400)
      res.send({status: "could not log out"})
    } else {
      res.clearCookie("sid")
      res.status(200).send({status: "logged out"})
    }
  })
}


module.exports = userController