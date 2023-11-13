// const authJwt = require("../middleware/auth.jwt");
const cartMenuController = require("../controller/cartmenu.controller");
const router = require("express").Router();
const authJwt = require("../middleware/auth.jwt");

module.exports = (app) => {
  router.post("/", authJwt, cartMenuController.createCartMenu);
  router.put("/", authJwt, cartMenuController.updateCartMenu);

  app.use("/api/carts/menus", router);
};
