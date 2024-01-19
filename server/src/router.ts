const expressRouterMain = require("express");
const spotRouter = require("./routers/spot.router");
const userRouter = require("./routers/user.router");
const challengeRouter = require("./routers/challenge.router");
const authenticate = require("./middleware/authenticate");

const router = expressRouterMain.Router();

router.use("/spot", authenticate, spotRouter);
router.use("/challenge", authenticate, challengeRouter);
router.use("/user", userRouter);

module.exports = router;
