// const authJwt = require("../middleware/auth.jwt");
const cartController = require("../controller/cart.controller");
const router = require("express").Router();
const authJwt = require("../middleware/auth.jwt");

module.exports = (app) => {
  router.post("/", authJwt, cartController.createCart);
  router.get("/:id/menus", authJwt, cartController.getMenubyCartId);

  app.use("/api/carts", router);
};
