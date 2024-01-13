const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const userController = {};

userController.checkUser = async (req, res) => {
  try {
    //checks that the required user does exist
    let user = await User.findOne({email: req.body.email})
    let passwordCheck = await bcrypt.compare(req.body.password, user.password)

    if(passwordCheck == true) {
      //sets the session id to the username
      req.session.userId = user.username

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
    //checks that another user with the same info does not already exist
    let userEmail = await User.findOne({email: req.body.email})
    let userName = await User.findOne({username: req.body.username})

    if(userEmail == null && userName == null) {
      //if all good hashes the password and sends it ot the database
      const passwordHash = await bcrypt.hash(req.body.password, 10)
      let newUser = new User({
        ...req.body,
        password: passwordHash
      })

      //sets the session id and saves to the database
      req.session.userId = newUser.username
      await newUser.save()
      res.status(200)
      res.send({status: "complete"})

      //next two if else statements tell the user what needs changing
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