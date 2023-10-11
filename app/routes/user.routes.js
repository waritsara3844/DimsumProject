const authJwt = require("../middleware/auth.jwt");

module.exports = (app) => {
  const user_controller = require("../controller/user.controller");
  var router = require("express").Router();
  router.get("/:us", user_controller.validaUsername);
  router.post("/signup", user_controller.createNewUser);
  router.post("/login", user_controller.loginUser);
  app.use("/api/user", router);
};
