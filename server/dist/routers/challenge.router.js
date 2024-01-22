const express = require("express");
const challengeController = require("../controllers/challenge.controller");
const challengeRouter = express.Router();
challengeRouter.post("/addChallenge", challengeController.addChallenge);
challengeRouter.post(
  "/toggleCompleted/:challengeName",
  challengeController.toggleCompleted,
);
challengeRouter.get(
  "/getCompletedChallenges/:username",
  challengeController.getSpotByCompleted,
);
challengeRouter.get(
  "/getChallengeBySpot/:spotName",
  challengeController.getChallengeBySpot,
);
module.exports = challengeRouter;
