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
const Challenge = require("../models/challenge.model");
const challengeController = {};
challengeController.addChallenge = (req, res) =>
  __awaiter(this, void 0, void 0, function* () {
    try {
      const newChallengeObj = Object.assign(Object.assign({}, req.body), {
        completedBy: [],
      });
      const newChallenge = new Challenge(newChallengeObj);
      yield newChallenge.save();
      res.status(200);
      res.send({ status: "this works" });
    } catch (error) {
      console.log(error);
    }
  });
challengeController.getChallengeBySpot = (req, res) =>
  __awaiter(this, void 0, void 0, function* () {
    try {
      console.log(req.params);
      const challenges = yield Challenge.find({
        spotName: req.params.spotName,
      });
      res.status(200);
      res.send(challenges);
    } catch (error) {
      console.log(error);
    }
  });
challengeController.toggleCompleted = (req, res) =>
  __awaiter(this, void 0, void 0, function* () {
    try {
      const challenge = yield Challenge.findOne({
        challenge: req.params.challengeName,
      });
      if (challenge.completedBy.includes(req.body.username) == false) {
        let newList = challenge.completedBy;
        newList.push(req.body.username);
        yield Challenge.updateOne(
          { challenge: req.params.challengeName },
          { completedBy: newList },
        );
        res.status(200);
        res.send({ status: "working" });
      } else {
        let newList = challenge.completedBy;
        newList.splice(newList.indexOf(req.body.username), 1);
        yield Challenge.updateOne(
          { challenge: req.params.challengeName },
          { completedBy: newList },
        );
        res.status(200);
        res.send({ status: "working" });
      }
    } catch (error) {
      console.log(error);
    }
  });
challengeController.getSpotByCompleted = (req, res) =>
  __awaiter(this, void 0, void 0, function* () {
    try {
      const challenges = yield Challenge.find();
      const sendChallenges = challenges.filter((challenge) => {
        return challenge.completedBy.includes(req.params.username);
      });
      res.status(200);
      res.send(sendChallenges);
    } catch (error) {
      console.log(error);
    }
  });
module.exports = challengeController;
