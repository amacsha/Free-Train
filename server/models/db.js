const mongoose = require("mongoose");
require("dotenv").config();

const DB_NAME = process.env.DATABASE_NAME;
const DB_COLLECTION = process.env.DATABASE_COLLECTION;

async function connectDB() {
  await mongoose.connect(`${DB_NAME}/${DB_COLLECTION}`);
}

connectDB();

module.exports = mongoose;
