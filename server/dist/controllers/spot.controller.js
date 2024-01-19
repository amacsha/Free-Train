var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Spot = require("../models/spot.model");
const path = require("path");
const fs = require("fs");
const spotController = {};
//sets the uploads folder as a local variable
const uploadsFolder = `${__dirname}/../uploads`;
spotController.addSpot = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        //checks if a spot with the same name already exists
        const spot = yield Spot.findOne({ name: req.body.name });
        if (spot == null) {
            //makes the directory for the images to be put in
            fs.mkdirSync(path.join(uploadsFolder, req.body.name));
            //sets up a list used to store the image paths
            const imageNames = [];
            //adds the images to the uploads the folder and to the image path list
            for (let image in req.files) {
                req.files[image].mv(path.join(uploadsFolder, req.body.name, req.files[image].name));
                imageNames.push(req.files[image].name);
            }
            //creates the image to store the spot in the database
            let dbObject = Object.assign(Object.assign({}, req.body), { imagePaths: imageNames, likes: 0, likedBy: [], comments: [] });
            //saves the new spot
            const newDocument = new Spot(dbObject);
            yield newDocument.save();
            res.status(200);
            res.send({ status: "working" });
        }
        else {
            res.status(400);
            res.send({ status: "spot already exists" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
spotController.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        //gets all spots
        const allSpots = yield Spot.find();
        res.status(200);
        res.send(allSpots);
    }
    catch (error) {
        console.log(error);
    }
});
spotController.getImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        //gets a specific image based on the parameters passed
        res.status(200);
        res.sendFile(path.join(uploadsFolder, `${req.params.spotName}/${req.params.imageName}`));
    }
    catch (error) {
        console.log(error);
    }
});
spotController.getSpot = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        //gets a specific spot based on the url params
        let spot = yield Spot.findOne({ name: req.params.spotName });
        res.status(200);
        res.send(spot);
    }
    catch (error) {
        console.log(error);
    }
});
spotController.getAuthorSpot = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        //gets all the spots authored by a specific person
        let spots = yield Spot.find({ author: req.params.author });
        res.status(200);
        res.send(spots);
    }
    catch (error) {
        console.log(error);
    }
});
spotController.like = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let spot = yield Spot.findOne({ name: req.params.spotName });
        let newList = [...spot.likedBy];
        newList.push(req.body.user);
        yield Spot.updateOne({ name: req.params.spotName }, { likedBy: newList });
        res.status(200);
        res.send({ working: "this works" });
    }
    catch (error) {
        console.log(error);
    }
});
spotController.unLike = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let spot = yield Spot.findOne({ name: req.params.spotName });
        let newList = [...spot.likedBy];
        newList.splice(newList.indexOf(req.body.user), 1);
        yield Spot.updateOne({ name: req.params.spotName }, { likedBy: newList });
        res.status(200);
        res.send({ working: "this works" });
    }
    catch (error) {
        console.log(error);
    }
});
spotController.addComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let spot = yield Spot.findOne({ name: req.params.spotName });
        let newList = [...spot.comments];
        newList.push(req.body);
        yield Spot.updateOne({ name: req.params.spotName }, { comments: newList });
        res.status(200);
        res.send({ status: true });
    }
    catch (error) {
        console.log(error);
    }
});
spotController.deleteSpot = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield Spot.deleteOne({ name: req.params.spotName });
        fs.rm(path.join(uploadsFolder, req.params.spotName), { recursive: true, force: true }, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                res.status(200);
                res.send({ status: true });
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
spotController.getLikedSpots = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let allSpots = yield Spot.find();
        let likedSpots = allSpots.filter((spot) => {
            return spot.likedBy.includes(req.params.userName);
        });
        res.status(200);
        res.send(likedSpots);
    }
    catch (error) {
        console.log(error);
    }
});
module.exports = spotController;
