const expressRouter = require("express");
const challengeController = require("../controllers/challenge.controller");
const challengeRouterMain = expressRouter.Router();
challengeRouterMain.post("/addChallenge", challengeController.addChallenge);
challengeRouterMain.post(
  "/toggleCompleted/:challengeName",
  challengeController.toggleCompleted,
);
challengeRouterMain.get(
  "/getCompletedChallenges/:username",
  challengeController.getSpotByCompleted,
);
challengeRouterMain.get(
  "/getChallengeBySpot/:spotName",
  challengeController.getChallengeBySpot,
);
module.exports = challengeRouterMain;
