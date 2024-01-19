const User = require("../models/user.model");

import { Request, Response, NextFunction } from 'express';
import { Session } from 'express-session';


async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    //gets the session id\
      const userId  = req.session.userId;

      //the session id is the username so checks if a user exists
      const checkUser = await User.findOne({username: userId });

    //if one does, the next midddleware is initiated, if not an error is thrown
    if (checkUser == null) {
      throw new Error();
    } else {
      return next();
    }
  } catch (error) {
    res.status(401);
    res.send({ status: "you are not authenticated to access this site" });
  }
}

module.exports = authenticate;
