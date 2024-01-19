//modules imported
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./router");
const session = require("express-session");
require("dotenv").config();
//port
const port = process.env.PORT || 3000;
//secret
const secret = process.env.SECRET || secret;
//set the cors allowed cors origin
const corsConfig = {
    origin: "http://localhost:5173",
    credentials: true,
};
//set up express server
const app = express();
//set up middleware
app.use(cors(corsConfig));
app.use(express.json());
//taken from express-session found here https://www.npmjs.com/package/express-session and then edited
app.use(session({
    secret: secret,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: false,
        sameSite: true,
        maxAge: 3600000,
    },
}));
app.use(fileUpload());
app.use(router);
app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});
