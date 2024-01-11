const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const userController = {};

userController.checkUser = async (req, res) => {
  try {
    let user = await User.findOne({email: req.body.email})
    let passwordCheck = await bcrypt.compare(req.body.password, user.password)
    if(passwordCheck == true) {
      res.status(200)
      res.send({username: user.username})
    } else {
      res.status(400)
      res.send({loginStatus: false})
    }
  } catch (error) {
    console.log(error)
  }
}

userController.createUser = async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    let newUser = new User({
      ...req.body,
      password: passwordHash
    })
    await newUser.save()
  } catch (error) {
    console.log(error)
  }
}


module.exports = userController