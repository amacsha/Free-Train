const supertest = require('supertest');
const assert = require('assert');
const express = require('express');
const router = require("../router")
const User = require('../models/user.model')
const Spot = require('../models/spot.model')
const mongoose = require("mongoose");
require("dotenv").config();

describe('Backend Tests', function () {
  const app = express()
  app.use(express.json())
  app.use('/', router)

  const request = supertest(app)

  this.beforeAll(async () => {
    await mongoose.connect(`${process.env.TEST_DATABASE}/${process.env.TEST_COLLECTION}`);
  })

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
      console.log('all ran')
    })
  })


  describe('Spots', function () {
    this.beforeAll(async () => {
      await Spot.deleteMany()
    })
  
    // it('should create a spot', async () => {
    //   const res = await request.post("/spot/createUser").send({email: "test@test", username: "test", password: "test"})
    //   assert.equal(res.body.status, "complete");
    //   const foundUser = await User.findOne({username: "test"})
    //   assert.equal(foundUser.email, "test@test");
    // });

    

    this.afterAll(async () => {
      await Spot.deleteMany()
      console.log('all ran')
    })
  })
});