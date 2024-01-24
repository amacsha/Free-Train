"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = require("supertest");
const assert = require("assert");
const express = require("express");
const router = require("../router");
const User = require("../models/user.model");
const Spot = require("../models/spot.model");
const Challenge = require("../models/challenge.model");
const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();
describe("Backend Tests", function () {
  const app = express();
  app.use(express.json());
  app.use("/", router);
  const request = supertest(app);
  mongoose.connect(
    `${process.env.TEST_DATABASE}/${process.env.TEST_COLLECTION}`,
  );
  describe("Users", function () {
    this.beforeAll(() =>
      __awaiter(this, void 0, void 0, function* () {
        yield User.deleteMany();
      }),
    );
    it("should create a user", () =>
      __awaiter(this, void 0, void 0, function* () {
        const res = yield request
          .post("/user/createUser")
          .send({ email: "test@test", username: "test", password: "test" });
        assert.equal(res.body.status, "complete");
        const foundUser = yield User.findOne({ username: "test" });
        assert.equal(foundUser.email, "test@test");
      }));
    it("should not create duplicate users", () =>
      __awaiter(this, void 0, void 0, function* () {
        const res = yield request
          .post("/user/createUser")
          .send({ email: "test@test", username: "test", password: "test" });
        assert.equal(res.body.status, "email already exists");
      }));
    it("should validate users with correct passwords", () =>
      __awaiter(this, void 0, void 0, function* () {
        const res = yield request
          .post("/user/checkUser")
          .send({ email: "test@test", password: "test" });
        assert.equal(res.body.username, "test");
      }));
    it("should not validate users with incorrect passwords", () =>
      __awaiter(this, void 0, void 0, function* () {
        const res = yield request
          .post("/user/checkUser")
          .send({ email: "test@test", password: "wrong" });
        assert.equal(res.body.status, "incorrect details");
      }));
    it("should delete users", () =>
      __awaiter(this, void 0, void 0, function* () {
        const res = yield request
          .post("/user/deleteUser")
          .send({ user: "test", password: "test" });
        assert.equal(res.body.status, "account deleted");
        const foundUser = yield User.findOne({ username: "test" });
        assert.equal(foundUser, null);
      }));
    this.afterAll(() =>
      __awaiter(this, void 0, void 0, function* () {
        yield User.deleteMany();
        console.log("User tests done");
      }),
    );
  });
  describe("Spots", function () {
    this.beforeAll(() =>
      __awaiter(this, void 0, void 0, function* () {
        yield Spot.deleteMany();
      }),
    );
    it("should create a spot", () =>
      __awaiter(this, void 0, void 0, function* () {
        const newSpot = {
          name: "test 1",
          description: "test 1",
          lat: "0",
          lng: "0",
          author: "test",
          imagePaths: ["http://exampleurl.com", "http://exampleurl.com"],
        };
        const res = yield request.post("/spot/addSpot").send(newSpot);
        assert.equal(res.body.status, "working");
        const foundSpot = yield Spot.findOne({ name: "test 1" });
        assert.equal(foundSpot.description, "test 1");
        yield request
          .post("/spot/addSpot")
          .send(
            Object.assign(Object.assign({}, newSpot), {
              name: "test 2",
              description: "test 2",
            }),
          );
        yield request
          .post("/spot/addSpot")
          .send(
            Object.assign(Object.assign({}, newSpot), {
              name: "test 3",
              description: "test 3",
              author: "test 3",
            }),
          );
      }));
    it("should get all spots", () =>
      __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/spot/getAll");
        assert.equal(res.body.length, 3);
      }));
    it("should get one spot by name", () =>
      __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/spot/getSpot/test 1");
        assert.equal(res.body.description, "test 1");
      }));
    it("should get spots by author", () =>
      __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/spot/getAuthorSpots/test");
        assert.equal(res.body.length, 2);
      }));
    it("should like spot", () =>
      __awaiter(this, void 0, void 0, function* () {
        const res = yield request
          .post("/spot/like/test 1")
          .send({ user: "test" });
        assert.equal(res.body.working, "this works");
      }));
    it("should get spots by likes", () =>
      __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/spot/getLikedSpots/test");
        assert.equal(res.body.length, 1);
        assert.equal(res.body[0].likedBy[0], "test");
      }));
    it("should delete spots", () =>
      __awaiter(this, void 0, void 0, function* () {
        const res = yield request.delete("/spot/deleteSpot/test 1");
        assert.equal(res.body.status, true);
        const foundSpot = yield Spot.findOne({ name: "test 1" });
        assert.equal(foundSpot, null);
      }));
    this.afterAll(() =>
      __awaiter(this, void 0, void 0, function* () {
        yield Spot.deleteMany();
        fs.rmdir(`${__dirname}/../uploads/test 1`, () => {});
        fs.rmdir(`${__dirname}/../uploads/test 2`, () => {});
        fs.rmdir(`${__dirname}/../uploads/test 3`, () => {
          console.log("Spot tests done");
        });
      }),
    );
  });
  describe("Challenges", function () {
    this.beforeAll(() =>
      __awaiter(this, void 0, void 0, function* () {
        yield Challenge.deleteMany();
      }),
    );
    it("should create a challenge", () =>
      __awaiter(this, void 0, void 0, function* () {
        const res = yield request
          .post("/challenge/addChallenge")
          .send({ challenge: "test", spotName: "mySpot" });
        assert.equal(res.body.status, "this works");
        const foundChallenge = yield Challenge.findOne({ challenge: "test" });
        assert.equal(foundChallenge.spotName, "mySpot");
        yield request
          .post("/challenge/addChallenge")
          .send({ challenge: "test 2", spotName: "mySpot 2" });
      }));
    it("should toggle completion status for user", () =>
      __awaiter(this, void 0, void 0, function* () {
        const challengeBefore = yield Challenge.findOne({ challenge: "test" });
        assert.equal(challengeBefore.completedBy.length, 0);
        const res = yield request
          .post("/challenge/toggleCompleted/test")
          .send({ username: "testUser" });
        assert.equal(res.body.status, "working");
        const foundChallenge = yield Challenge.findOne({ challenge: "test" });
        assert.equal(foundChallenge.completedBy[0], "testUser");
      }));
    it("should get challenges by users completion status", () =>
      __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get(
          "/challenge/getCompletedChallenges/testUser",
        );
        assert.equal(res.body.length, 1);
        assert.equal(res.body[0].completedBy[0], "testUser");
      }));
    it("should get challenges by spot", () =>
      __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/challenge/getChallengeBySpot/mySpot 2");
        assert.equal(res.body.length, 1);
        assert.equal(res.body[0].spotName, "mySpot 2");
      }));
    this.afterAll(() =>
      __awaiter(this, void 0, void 0, function* () {
        yield Challenge.deleteMany();
        console.log("Challenge tests done");
      }),
    );
  });
});
