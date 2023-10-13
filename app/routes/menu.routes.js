const authJwt = require("../middleware/auth.jwt");

module.exports = (app) => {
  const menu_controller = require("../controller/menu.controller");
  var router = require("express").Router();
  router.post("/addmenu", authJwt, menu_controller.addNewMenu);
  router.get("/:category", menu_controller.categoryMenu);
  router.put("/:id", authJwt, menu_controller.updateMenu);
  router.get("/menues/:id", authJwt, menu_controller.getMenuByID);
  router.delete("/:id", authJwt, menu_controller.removeMenuByID);
  router.get("/", authJwt, menu_controller.getAllMenu);
  app.use("/api/menu", router);
};
