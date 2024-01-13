const User = require('../models/user.model')

async function authenticate(req, res, next) {
  try {
    const {userId} = req.session
    const checkUser = await User.findOne({username: req.session.userId})
    console.log(req.session)
    if(checkUser == null) {
      throw new Error()
    } else {
      next()
    }
  } catch (error) {
    res.status(401)
    res.send({status: "you are not authenticated to access this site"})
  }
  
}

module.exports = authenticate