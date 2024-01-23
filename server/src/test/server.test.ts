import { should } from "chai";

const supertest = require('supertest');
const assert = require('assert');
const express = require('express');
const router = require("../router")
const User = require('../models/user.model')
const Spot = require('../models/spot.model')
const Challenge = require('../models/challenge.model')
const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

describe('Backend Tests', function () {
  const app = express()
  app.use(express.json())
  app.use('/', router)

  const request = supertest(app)
  mongoose.connect(`${process.env.TEST_DATABASE}/${process.env.TEST_COLLECTION}`);
  

  describe('Users', function () {
    this.beforeAll(async () => {
      await User.deleteMany()
    })
  
    it('should create a user', async () => {
      const res = await request.post("/user/createUser").send({email: "test@test", username: "test", password: "test"})
      assert.equal(res.body.status, "complete");
      const foundUser = await User.findOne({username: "test"})
      assert.equal(foundUser.email, "test@test");
    });

    it('should not create duplicate users',async () => {
      const res = await request.post("/user/createUser").send({email: "test@test", username: "test", password: "test"})
      assert.equal(res.body.status, "email already exists");
    });

    it('should validate users with correct passwords',async () => {
      const res = await request.post("/user/checkUser").send({email: "test@test", password: "test"})
      assert.equal(res.body.username, "test");
    });

    it('should not validate users with incorrect passwords',async () => {
      const res = await request.post("/user/checkUser").send({email: "test@test", password: "wrong"})
      assert.equal(res.body.status, "incorrect details");
    });

    it('should delete users',async () => {
      const res = await request.post("/user/deleteUser").send({user: "test", password: "test"})
      assert.equal(res.body.status, "account deleted");
      const foundUser = await User.findOne({username: "test"})
      assert.equal(foundUser, null)
    });

    this.afterAll(async () => {
      await User.deleteMany()
      console.log('User tests done')
    })
  })

  describe('Spots', function () {
    this.beforeAll(async () => {
      await Spot.deleteMany()
    })
  
    it('should create a spot', async () => {
      const newSpot = {name: "test 1", description: "test 1", lat: '0', lng: '0', author: "test"}

      const res = await request.post("/spot/addSpot").send(newSpot)
      assert.equal(res.body.status, "working");
      const foundSpot = await Spot.findOne({name: "test 1"})
      assert.equal(foundSpot.description, "test 1");

      await request.post("/spot/addSpot").send({...newSpot, name: "test 2", description: "test 2"})
      await request.post("/spot/addSpot").send({...newSpot, name: "test 3", description: "test 3", author: "test 3"})
    });

    it('should get all spots', async () => {
      const res = await request.get("/spot/getAll")
      assert.equal(res.body.length, 3)
    })

    it('should get one spot by name', async () => {
      const res = await request.get("/spot/getSpot/test 1")
      assert.equal(res.body.description, "test 1")
    })

    it('should get spots by author', async () => {
      const res = await request.get("/spot/getAuthorSpots/test")
      assert.equal(res.body.length, 2)
    })

    it('should like spot', async () => {
      const res = await request.post("/spot/like/test 1").send({user: "test"})
      assert.equal(res.body.working, "this works")
    })

    it('should get spots by likes', async () => {
      const res = await request.get("/spot/getLikedSpots/test")
      assert.equal(res.body.length, 1)
      assert.equal(res.body[0].likedBy[0], "test")
    })

    it('should delete spots', async () => {
      const res = await request.delete("/spot/deleteSpot/test 1")
      assert.equal(res.body.status, true)
      const foundSpot = await Spot.findOne({name: "test 1"})
      assert.equal(foundSpot, null)
    })
    
    this.afterAll(async () => {
      await Spot.deleteMany()
      fs.rmdir(`${__dirname}/../uploads/test 1`, ()=>{})
      fs.rmdir(`${__dirname}/../uploads/test 2`, ()=>{})
      fs.rmdir(`${__dirname}/../uploads/test 3`, ()=>{
        console.log('Spot tests done')
      })
    })
  })


  describe('Challenges', function () {
    this.beforeAll(async () => {
      await Challenge.deleteMany()
    })
  
    it('should create a challenge', async () => {
      const res = await request.post("/challenge/addChallenge").send({challenge: "test", spotName: "mySpot"})
      assert.equal(res.body.status, "this works");
      const foundChallenge = await Challenge.findOne({challenge: "test"})
      assert.equal(foundChallenge.spotName, "mySpot");
      await request.post("/challenge/addChallenge").send({challenge: "test 2", spotName: "mySpot 2"})
    });

    it('should toggle completion status for user', async () => {
      const challengeBefore = await Challenge.findOne({challenge: "test"})
      assert.equal(challengeBefore.completedBy.length, 0);
      const res = await request.post("/challenge/toggleCompleted/test").send({username: "testUser"})
      assert.equal(res.body.status, "working");
      const foundChallenge = await Challenge.findOne({challenge: "test"})
      assert.equal(foundChallenge.completedBy[0], "testUser");
    });

    it('should get challenges by users completion status', async () => {
      const res = await request.get("/challenge/getCompletedChallenges/testUser")
      assert.equal(res.body.length, 1);
      assert.equal(res.body[0].completedBy[0], "testUser")
    })

    it('should get challenges by spot', async () => {
      const res = await request.get("/challenge/getChallengeBySpot/mySpot 2")
      assert.equal(res.body.length, 1);
      assert.equal(res.body[0].spotName, "mySpot 2")
    })

    
    this.afterAll(async () => {
      await Challenge.deleteMany()
      console.log('Challenge tests done')
    })
  })
});