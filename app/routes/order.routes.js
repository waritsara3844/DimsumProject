const orderController = require("../controller/order.controller");
const router = require("express").Router();
const authJwt = require("../middleware/auth.jwt");

module.exports = (app) => {
  router.post("/", authJwt, orderController.createOrder);
  router.get("/report/summaries", authJwt, orderController.summariesOrder);
  router.get("/report/ranking", authJwt, orderController.rankingOrder);

  app.use("/api/orders", router);
};
