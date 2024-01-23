var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const supertest = require('supertest');
const assert = require('assert');
const express = require('express');
const router = require("../router");
const User = require('../models/user.model');
const Spot = require('../models/spot.model');
const mongoose = require("mongoose");
require("dotenv").config();
describe('Backend Tests', function () {
    const app = express();
    app.use(express.json());
    app.use('/', router);
    const request = supertest(app);
    this.beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        yield mongoose.connect(`${process.env.TEST_DATABASE}/${process.env.TEST_COLLECTION}`);
    }));
    describe('Users', function () {
        this.beforeAll(() => __awaiter(this, void 0, void 0, function* () {
            yield User.deleteMany();
        }));
        it('should create a user', () => __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post("/user/createUser").send({ email: "test@test", username: "test", password: "test" });
            assert.equal(res.body.status, "complete");
            const foundUser = yield User.findOne({ username: "test" });
            assert.equal(foundUser.email, "test@test");
        }));
        it('should not create duplicate users', () => __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post("/user/createUser").send({ email: "test@test", username: "test", password: "test" });
            assert.equal(res.body.status, "email already exists");
        }));
        it('should validate users with correct passwords', () => __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post("/user/checkUser").send({ email: "test@test", password: "test" });
            assert.equal(res.body.username, "test");
        }));
        it('should not validate users with incorrect passwords', () => __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post("/user/checkUser").send({ email: "test@test", password: "wrong" });
            assert.equal(res.body.status, "incorrect details");
        }));
        it('should delete users', () => __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post("/user/deleteUser").send({ user: "test", password: "test" });
            assert.equal(res.body.status, "account deleted");
            const foundUser = yield User.findOne({ username: "test" });
            assert.equal(foundUser, null);
        }));
        this.afterAll(() => __awaiter(this, void 0, void 0, function* () {
            yield User.deleteMany();
            console.log('all ran');
        }));
    });
    describe('Spots', function () {
        this.beforeAll(() => __awaiter(this, void 0, void 0, function* () {
            yield Spot.deleteMany();
        }));
        // it('should create a spot', async () => {
        //   const res = await request.post("/spot/createUser").send({email: "test@test", username: "test", password: "test"})
        //   assert.equal(res.body.status, "complete");
        //   const foundUser = await User.findOne({username: "test"})
        //   assert.equal(foundUser.email, "test@test");
        // });
        this.afterAll(() => __awaiter(this, void 0, void 0, function* () {
            yield Spot.deleteMany();
            console.log('all ran');
        }));
    });
});
