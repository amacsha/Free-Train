const Challenge = require("../models/challenge.model");

import { Request, Response } from "express";

import { ChallengeType } from "../types/type";

import { HydratedDocument } from "mongoose";

type ChallengeController = {
  addChallenge(req: Request, res: Response): Promise<void>;
  getChallengeBySpot(req: Request, res: Response): Promise<void>;
  toggleCompleted(req: Request, res: Response): Promise<void>;
  getSpotByCompleted(req: Request, res: Response): Promise<void>;
};

const addChallenge = async (req: Request, res: Response): Promise<void> => {
  try {
    const newChallengeObj: ChallengeType = {
      ...req.body,
      completedBy: [],
    };
    const newChallenge: HydratedDocument<ChallengeType> = new Challenge(
      newChallengeObj,
    );
    await newChallenge.save();
    res.status(200);
    res.send({ status: "this works" });
  } catch (error) {
    console.log(error);
  }
};

const getChallengeBySpot = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const challenges: HydratedDocument<ChallengeType[]> = await Challenge.find({
      spotName: req.params.spotName,
    });
    res.status(200).send(challenges);
  } catch (error) {
    console.log(error);
  }
};

const toggleCompleted = async (req: Request, res: Response): Promise<void> => {
  try {
    const challenge: HydratedDocument<ChallengeType> = await Challenge.findOne({
      challenge: req.params.challengeName,
    });
    if (challenge.completedBy.includes(req.body.username) == false) {
      let newList = challenge.completedBy;
      newList.push(req.body.username);
      await Challenge.updateOne(
        { challenge: req.params.challengeName },
        { completedBy: newList },
      );
      res.status(200).send({ status: "working" });
    } else {
      let newList = challenge.completedBy;
      newList.splice(newList.indexOf(req.body.username), 1);
      await Challenge.updateOne(
        { challenge: req.params.challengeName },
        { completedBy: newList },
      );
      res.status(200).send({ status: "working" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getSpotByCompleted = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const challenges: HydratedDocument<ChallengeType[]> =
      await Challenge.find();
    const sendChallenges = challenges.filter((challenge) => {
      return challenge.completedBy.includes(req.params.username);
    });
    res.status(200).send(sendChallenges);
  } catch (error) {
    console.log(error);
  }
};

const challengeController: ChallengeController = {
  addChallenge,
  getChallengeBySpot,
  toggleCompleted,
  getSpotByCompleted,
};

module.exports = challengeController;
