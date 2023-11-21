const Menu = require("../model/menu.model");

const addNewMenu = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Body cannot be empty." });
  }
  const menuObject = new Menu({
    name: req.body.name,
    detail: req.body.detail,
    price: req.body.price,
    category: req.body.category,
    sold_amount: 0,
  });

  Menu.createNewMenu(menuObject, (err, data) => {
    if (err) {
      res
        .status(500)
        .send({ message: err.message || "Somee error occured while creating" });
    } else res.send(data);
  });
};

const categoryMenu = (req, res) => {
  Menu.category(req.params.category, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.send({
          message: "Not Found: " + req.params.category,
          valid: true,
        });
      } else {
        res.status(500).send({
          message: "Error query: " + req.params.category,
        });
      }
    } else {
      res.send({ record: data });
      console.log(data);
    }
  });
};

const updateMenu = (req, res) => {
  if (!req.body) {
    res.status(500).send({ message: "Content can not be empty!" });
  }
  const data = {
    name: req.body.name,
    detail: req.body.detail,
    price: req.body.price,
    category: req.body.category,
    sold_amount: req.sold_amount,
  };
  Menu.updateMenu(req.params.id, data, (err, result) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(401).send({ message: "Not found menu" + req.params.id });
      } else {
        res.status(500).send({ message: "Error update menu: " + req.params });
      }
    } else {
      res.send(result);
    }
  });
};

const getMenuByID = (req, res) => {
  Menu.getMenu(req.params.id, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred." });
    } else res.send(result);
    console.log(result);
  });
};

const getAllMenu = (req, res) => {
  Menu.getAllMenu((err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occured" });
    } else res.send(data);
  });
};

const removeMenuByID = (req, res) => {
  Menu.deleteMenu(req.params.id, (err, result) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(401).send({
          message: "Not found menu: " + req.params.id,
        });
      } else {
        res
          .status(500)
          .send({ message: "Error delete menu: " + req.params.id });
      }
    } else res.send(result);
  });
};

module.exports = {
  addNewMenu,
  categoryMenu,
  updateMenu,
  getMenuByID,
  removeMenuByID,
  getAllMenu,
};
