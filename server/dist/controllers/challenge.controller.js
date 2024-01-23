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
const Challenge = require("../models/challenge.model");
const addChallenge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newChallengeObj = Object.assign(Object.assign({}, req.body), { completedBy: [] });
        const newChallenge = new Challenge(newChallengeObj);
        yield newChallenge.save();
        res.status(200);
        res.send({ status: "this works" });
    }
    catch (error) {
        console.log(error);
    }
});
const getChallengeBySpot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const challenges = yield Challenge.find({
            spotName: req.params.spotName,
        });
        res.status(200).send(challenges);
    }
    catch (error) {
        console.log(error);
    }
});
const toggleCompleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const challenge = yield Challenge.findOne({
            challenge: req.params.challengeName,
        });
        if (challenge.completedBy.includes(req.body.username) == false) {
            let newList = challenge.completedBy;
            newList.push(req.body.username);
            yield Challenge.updateOne({ challenge: req.params.challengeName }, { completedBy: newList });
            res.status(200).send({ status: "working" });
        }
        else {
            let newList = challenge.completedBy;
            newList.splice(newList.indexOf(req.body.username), 1);
            yield Challenge.updateOne({ challenge: req.params.challengeName }, { completedBy: newList });
            res.status(200).send({ status: "working" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
const getSpotByCompleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const challenges = yield Challenge.find();
        const sendChallenges = challenges.filter((challenge) => {
            return challenge.completedBy.includes(req.params.username);
        });
        res.status(200).send(sendChallenges);
    }
    catch (error) {
        console.log(error);
    }
});
const challengeController = {
    addChallenge,
    getChallengeBySpot,
    toggleCompleted,
    getSpotByCompleted,
};
module.exports = challengeController;
