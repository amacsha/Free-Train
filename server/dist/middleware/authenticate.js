"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/user.model");
require("dotenv").config();
function authenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.env.ENV == 'test')
            return next();
        try {
            //gets the session id\
            const sessionUid = req.session.uid;
            //the session id is the username so checks if a user exists
            const checkUser = yield User.findOne({ _id: sessionUid });
            //if one does, the next midddleware is initiated, if not an error is thrown
            if (checkUser == null) {
                throw new Error();
            }
            else {
                return next();
            }
        }
        catch (error) {
            res
                .status(401)
                .send({ status: "you are not authenticated to access this site" });
        }
    });
}
module.exports = authenticate;
