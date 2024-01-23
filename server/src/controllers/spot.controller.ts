const Spot = require("../models/spot.model");
const path = require("path");
const fs = require("fs");

import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { Spot } from "../types/type";

interface RequestFiles extends Request {
  files: any;
}

type SpotController = {
  addSpot(req: Request, res: Response): Promise<void>;
  getAll(req: Request, res: Response): Promise<void>;
  getImage(req: Request, res: Response): Promise<void>;
  getSpot(req: Request, res: Response): Promise<void>;
  getAuthorSpot(req: Request, res: Response): Promise<void>;
  like(req: Request, res: Response): Promise<void>;
  unLike(req: Request, res: Response): Promise<void>;
  addComment(req: Request, res: Response): Promise<void>;
  deleteSpot(req: Request, res: Response): Promise<void>;
  getLikedSpots(req: Request, res: Response): Promise<void>;
};

//sets the uploads folder as a local variable
const uploadsFolder = `${__dirname}/../uploads`;

const addSpot = async (req: RequestFiles, res: Response): Promise<void> => {
  try {
    //checks if a spot with the same name already exists
    const spot: HydratedDocument<Spot> = await Spot.findOne({
      name: req.body.name,
    });

    if (!spot) {
      const dbObject = {
        ...req.body,
        likes: 0,
        likedBy: [],
        comments: [],
      };

      //saves the new spot
      const newDocument = new Spot(dbObject);
      await newDocument.save();
      res.status(200).send({ status: "working" });
    } else {
      res.status(400).send({ status: "spot already exists" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    //gets all spots
    const allSpots: HydratedDocument<Spot[]> = await Spot.find();
    res.status(200).send(allSpots);
  } catch (error) {
    console.log(error);
  }
};

const getImage = async (req: Request, res: Response): Promise<void> => {
  try {
    //gets a specific image based on the parameters passed
    res
      .status(200)
      .sendFile(
        path.join(
          uploadsFolder,
          `${req.params.spotName}/${req.params.imageName}`,
        ),
      );
  } catch (error) {
    console.log(error);
  }
};

const getSpot = async (req: Request, res: Response): Promise<void> => {
  try {
    //gets a specific spot based on the url params
    const spot: HydratedDocument<Spot> = await Spot.findOne({
      name: req.params.spotName,
    });
    res.status(200).send(spot);
  } catch (error) {
    console.log(error);
  }
};

const getAuthorSpot = async (req: Request, res: Response): Promise<void> => {
  try {
    //gets all the spots authored by a specific person
    const spots: HydratedDocument<Spot> = await Spot.find({
      author: req.params.author,
    });
    res.status(200).send(spots);
  } catch (error) {
    console.log(error);
  }
};

const like = async (req: Request, res: Response): Promise<void> => {
  try {
    let spot: HydratedDocument<Spot> = await Spot.findOne({
      name: req.params.spotName,
    });
    let newList = [...spot.likedBy];
    newList.push(req.body.user);
    await Spot.updateOne({ name: req.params.spotName }, { likedBy: newList });
    res.status(200).send({ working: "this works" });
  } catch (error) {
    console.log(error);
  }
};

const unLike = async (req: Request, res: Response): Promise<void> => {
  try {
    let spot: HydratedDocument<Spot> = await Spot.findOne({
      name: req.params.spotName,
    });
    let newList = [...spot.likedBy];
    newList.splice(newList.indexOf(req.body.user), 1);
    await Spot.updateOne({ name: req.params.spotName }, { likedBy: newList });
    res.status(200).send({ working: "this works" });
  } catch (error) {
    console.log(error);
  }
};

const addComment = async (req: Request, res: Response): Promise<void> => {
  try {
    let spot: HydratedDocument<Spot> = await Spot.findOne({
      name: req.params.spotName,
    });
    let newList = [...spot.comments];
    newList.push(req.body);
    await Spot.updateOne({ name: req.params.spotName }, { comments: newList });
    res.status(200).send({ status: true });
  } catch (error) {
    console.log(error);
  }
};

const deleteSpot = async (req: Request, res: Response): Promise<void> => {
  try {
    await Spot.deleteOne({ name: req.params.spotName });
    fs.rm(
      path.join(uploadsFolder, req.params.spotName),
      { recursive: true, force: true },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200);
          res.send({ status: true });
        }
      },
    );
  } catch (error) {
    console.log(error);
  }
};

const getLikedSpots = async (req: Request, res: Response): Promise<void> => {
  try {
    let allSpots: HydratedDocument<Spot[]> = await Spot.find();
    let likedSpots = allSpots.filter((spot) => {
      return spot.likedBy.includes(req.params.userName);
    });
    res.status(200);
    res.send(likedSpots);
  } catch (error) {
    console.log(error);
  }
};

const spotController: SpotController = {
  addSpot,
  getAll,
  getImage,
  getSpot,
  getAuthorSpot,
  like,
  unLike,
  addComment,
  deleteSpot,
  getLikedSpots,
};

module.exports = spotController;
