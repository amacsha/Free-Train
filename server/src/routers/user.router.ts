const expressRouterUser = require("express");
const userControllerRouter = require("../controllers/user.controller");
const authenticateUser = require("../middleware/authenticate");

const userRouterMain = expressRouterUser.Router();

userRouterMain.post("/checkUser", userControllerRouter.checkUser);
userRouterMain.post("/createUser", userControllerRouter.createUser);
userRouterMain.post(
  "/deleteUser",
  authenticateUser,
  userControllerRouter.deleteUser,
);

userRouterMain.get("/logout", authenticateUser, userControllerRouter.logout);

module.exports = userRouterMain;
