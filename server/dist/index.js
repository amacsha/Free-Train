//modules imported
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const routerMain = require("./router");
const session = require("express-session");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config({
    path: `.env${process.env.ENV == "test" ? ".test" : ""}`,
});
//port
const port = process.env.PORT || 3000;
//secret
const secret = process.env.SECRET;
//set the cors allowed cors origin
const corsConfig = {
    origin: "http://localhost:5173",
    credentials: true,
};
//set up express server
const app = express();
const server = http.createServer(app);
//set up middleware
app.use(cors(corsConfig));
app.use(express.json());
//taken from express-session found here https://www.npmjs.com/package/express-session and then edited
app.use(session({
    secret: secret,
    name: "sid",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: true,
        maxAge: 1000 * 60 * 60,
    },
}));
app.use(fileUpload());
app.use(routerMain);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
const beaconState = {};
io.on("connection", (socket) => {
    console.log("User ID: " + socket.id + " connected via WebSocket");
    // Send the current beacon state to the newly connected client
    socket.emit("initialBeaconState", beaconState);
    socket.on("lightTheBeacon", (spotName) => {
        // Update the state of the beacon
        beaconState[spotName] = { lit: true, timestamp: Date.now() };
        // sends the updated state to all clients
        io.emit("beaconLit", { spotName, lit: true });
    });
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
server.listen(port, function () {
    console.log(`Server is running on http://localhost:${port}`);
});
