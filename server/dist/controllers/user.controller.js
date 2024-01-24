"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
require("dotenv").config();
const checkUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      //checks that the required user does exist
      let user = yield User.findOne({ email: req.body.email });
      if (user == null) {
        res.status(418).send({ status: "incorrect details" });
      } else {
        let passwordCheck = yield bcrypt.compare(
          req.body.password,
          user.password,
        );
        if (passwordCheck == true) {
          //sets the session id to the username
          if (process.env.ENV != "test") req.session.userId = user.username;
          res.status(200).send({ username: user.username });
        } else {
          res.status(418);
          res.send({ status: "incorrect details" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
const createUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      //checks that another user with the same info does not already exist
      let userEmail = yield User.findOne({ email: req.body.email });
      let userName = yield User.findOne({ username: req.body.username });
      if (userEmail == null && userName == null) {
        //if all good hashes the password and sends it ot the database
        const passwordHash = yield bcrypt.hash(req.body.password, 10);
        let newUser = new User(
          Object.assign(Object.assign({}, req.body), {
            password: passwordHash,
          }),
        );
        //sets the session id and saves to the database
        if (process.env.ENV != "test") req.session.userId = newUser.username;
        yield newUser.save();
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
  });
const logout = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy((error) => {
      if (error) {
        res.status(400).send({ status: "could not log out" });
      } else {
        res.clearCookie("sid");
        res.status(200).send({ status: "logged out" });
      }
    });
  });
const deleteUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const user = yield User.findOne({ username: req.body.user });
      if (user == null) {
        res.status(418).send({ status: "could not delete account" });
      } else {
        let passwordCheck = yield bcrypt.compare(
          req.body.password,
          user.password,
        );
        if (passwordCheck == true) {
          yield User.deleteOne({ username: req.body.user });
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
  });
const userController = {
  checkUser,
  createUser,
  logout,
  deleteUser,
};
module.exports = userController;
