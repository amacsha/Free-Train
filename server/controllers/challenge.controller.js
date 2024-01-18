const Challenge = require("../models/challenge.model");

const challengeController = {};

challengeController.addChallenge = async (req, res) => {
  try {
    const newChallengeObj = {
      ...req.body,
      completedBy: [],
    };
    const newChallenge = new Challenge(newChallengeObj);
    await newChallenge.save();
    res.status(200);
    res.send({ status: "this works" });
  } catch (error) {
    console.log(error);
  }
};

challengeController.getChallengeBySpot = async (req, res) => {
  try {
    console.log(req.params);
    const challenges = await Challenge.find({ spotName: req.params.spotName });
    res.status(200);
    res.send(challenges);
  } catch (error) {
    console.log(error);
  }
};

challengeController.toggleCompleted = async (req, res) => {
  try {
    const challenge = await Challenge.findOne({
      challenge: req.params.challengeName,
    });
    if (challenge.completedBy.includes(req.body.username) == false) {
      let newList = challenge.completedBy;
      newList.push(req.body.username);
      await Challenge.updateOne(
        { challenge: req.params.challengeName },
        { completedBy: newList },
      );
      res.status(200);
      res.send({ status: "working" });
    } else {
      let newList = challenge.completedBy;
      newList.splice(newList.indexOf(req.body.username), 1);
      await Challenge.updateOne(
        { challenge: req.params.challengeName },
        { completedBy: newList },
      );
      res.status(200);
      res.send({ status: "working" });
    }
  } catch (error) {
    console.log(error);
  }
};

challengeController.getSpotByCompleted = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    const sendChallenges = challenges.filter((challenge) => {
      return challenge.completedBy.includes(req.params.username);
    });
    res.status(200);
    res.send(sendChallenges);
  } catch (error) {
    console.log(error);
  }
};

module.exports = challengeController;
