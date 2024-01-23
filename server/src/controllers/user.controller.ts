const User = require("../models/user.model");
const bcrypt = require("bcrypt");

import { Request, Response } from "express";

interface UserController {
  checkUser(req: Request, res: Response): Promise<void>;
  createUser(req: Request, res: Response): Promise<void>;
  logout(req: Request, res: Response): Promise<void>;
  deleteUser(req: Request, res: Response): Promise<void>;
}

const checkUser = async (req: Request, res: Response): Promise<void> => {
  try {
    //checks that the required user does exist
    let user = await User.findOne({ email: req.body.email });
    if (user == null) {
      res.status(418).send({ status: "user does not exist" });
    } else {
      let passwordCheck = await bcrypt.compare(
        req.body.password,
        user.password,
      );

      if (passwordCheck == true) {
        //sets the session id to the username
        req.session.userId = user.username;

        res.status(200).send({ username: user.username });
      } else {
        res.status(418);
        res.send({ status: "incorrect details" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    //checks that another user with the same info does not already exist
    let userEmail = await User.findOne({ email: req.body.email });
    let userName = await User.findOne({ username: req.body.username });

    if (userEmail == null && userName == null) {
      //if all good hashes the password and sends it ot the database
      const passwordHash = await bcrypt.hash(req.body.password, 10);
      let newUser = new User({
        ...req.body,
        password: passwordHash,
      });

      //sets the session id and saves to the database
      req.session.userId = newUser.username;
      await newUser.save();
      res.status(200);
      res.send({ status: "complete" });

      //next two if else statements tell the user what needs changing
    } else if (userEmail != null) {
      res.status(400);
      res.send({ status: "email already exists" });
    } else if (userName != null) {
      res.status(400);
      res.send({ status: "username already exists" });
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  req.session.destroy((error) => {
    if (error) {
      res.status(400).send({ status: "could not log out" });
    } else {
      res.clearCookie("sid");
      res.status(200).send({ status: "logged out" });
    }
  });
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);
    const user = await User.findOne({ username: req.body.user });
    if (user == null) {
      res.status(418).send({ status: "could not delete account" });
    } else {
      let passwordCheck = await bcrypt.compare(
        req.body.password,
        user.password,
      );
      if (passwordCheck == true) {
        await User.deleteOne({ username: req.body.user });
        res.status(200);
        res.send({ status: "account deleted" });
      } else {
        res.status(418);
        res.send({ status: "could not delete account" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const userController: UserController = {
  checkUser,
  createUser,
  logout,
  deleteUser,
};

module.exports = userController;
