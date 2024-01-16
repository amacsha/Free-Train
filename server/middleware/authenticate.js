const User = require('../models/user.model')

async function authenticate(req, res, next) {
  try {
    //gets the session id
    const {userId} = req.session

    //the session id is the username so checks if a user exists 
    const checkUser = await User.findOne({username: req.session.userId})
    
    //if one does, the next midddleware is initiated, if not an error is thrown
    if(checkUser == null) {
      throw new Error()
    } else {
      return next()
    }
  } catch (error) {
    res.status(401)
    res.send({status: "you are not authenticated to access this site"})
  }
  
}

module.exports = authenticate