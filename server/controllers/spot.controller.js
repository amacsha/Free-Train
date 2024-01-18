const Spot = require("../models/spot.model");
const path = require("path");
const fs = require("fs");

const spotController = {};

//sets the uploads folder as a local variable
const uploadsFolder = `${__dirname}/../uploads`;

spotController.addSpot = async (req, res) => {
  try {
    //checks if a spot with the same name already exists
    const spot = await Spot.findOne({ name: req.body.name });

    if (spot == null) {
      //makes the directory for the images to be put in
      fs.mkdirSync(path.join(uploadsFolder, req.body.name));

      //sets up a list used to store the image paths
      const imageNames = [];

      //adds the images to the uploads the folder and to the image path list
      for (let image in req.files) {
        req.files[image].mv(
          path.join(uploadsFolder, req.body.name, req.files[image].name),
        );
        imageNames.push(req.files[image].name);
      }

      //creates the image to store the spot in the database
      let dbObject = {
        ...req.body,
        imagePaths: imageNames,
        likes: 0,
        likedBy: [],
        comments: [],
      };

      //saves the new spot
      const newDocument = new Spot(dbObject);
      await newDocument.save();
      res.status(200);
      res.send({ status: "working" });
    } else {
      res.status(400);
      res.send({ status: "spot already exists" });
    }
  } catch (error) {
    console.log(error);
  }
};

spotController.getAll = async (req, res) => {
  try {
    //gets all spots
    const allSpots = await Spot.find();
    res.status(200);
    res.send(allSpots);
  } catch (error) {
    console.log(error);
  }
};

spotController.getImage = async (req, res) => {
  try {
    //gets a specific image based on the parameters passed
    res.status(200);
    res.sendFile(
      path.join(
        uploadsFolder,
        `${req.params.spotName}/${req.params.imageName}`,
      ),
    );
  } catch (error) {
    console.log(error);
  }
};

spotController.getSpot = async (req, res) => {
  try {
    //gets a specific spot based on the url params
    let spot = await Spot.findOne({ name: req.params.spotName });
    res.status(200);
    res.send(spot);
  } catch (error) {
    console.log(error);
  }
};

spotController.getAuthorSpot = async (req, res) => {
  try {
    //gets all the spots authored by a specific person
    let spots = await Spot.find({ author: req.params.author });
    res.status(200);
    res.send(spots);
  } catch (error) {
    console.log(error);
  }
};

spotController.like = async (req, res) => {
  try {
    let spot = await Spot.findOne({ name: req.params.spotName });
    let newList = [...spot.likedBy];
    newList.push(req.body.user);
    await Spot.updateOne({ name: req.params.spotName }, { likedBy: newList });
    res.status(200);
    res.send({ working: "this works" });
  } catch (error) {
    console.log(error);
  }
};

spotController.unLike = async (req, res) => {
  try {
    let spot = await Spot.findOne({ name: req.params.spotName });
    let newList = [...spot.likedBy];
    newList.splice(newList.indexOf(req.body.user), 1);
    await Spot.updateOne({ name: req.params.spotName }, { likedBy: newList });
    res.status(200);
    res.send({ working: "this works" });
  } catch (error) {
    console.log(error);
  }
};

spotController.addComment = async (req, res) => {
  try {
    let spot = await Spot.findOne({ name: req.params.spotName });
    let newList = [...spot.comments];
    newList.push(req.body);
    await Spot.updateOne({ name: req.params.spotName }, { comments: newList });
    res.status(200);
    res.send({ status: true });
  } catch (error) {
    console.log(error);
  }
};

spotController.deleteSpot = async (req, res) => {
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

spotController.getLikedSpots = async (req, res) => {
  try {
    let allSpots = await Spot.find();
    let likedSpots = allSpots.filter((spot) => {
      return spot.likedBy.includes(req.params.userName);
    });
    res.status(200);
    res.send({ type: "liked", content: likedSpots });
  } catch (error) {
    console.log(error);
  }
};

module.exports = spotController;
