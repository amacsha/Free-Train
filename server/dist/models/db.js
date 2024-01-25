var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose = require("mongoose");
require("dotenv").config();
const DB_NAME = process.env.ENV == "test"
    ? process.env.TEST_DATABASE
    : process.env.DATABASE_NAME;
const DB_COLLECTION = process.env.ENV == "test"
    ? process.env.TEST_COLLECTION
    : process.env.DATABASE_COLLECTION;
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose.connect(`${DB_NAME}/${DB_COLLECTION}`);
    });
}
connectDB();
module.exports = mongoose;
