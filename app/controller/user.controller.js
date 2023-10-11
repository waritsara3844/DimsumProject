const User = require("../model/user.model");
const bcrypt = require("bcryptjs");

const validaUsername = (req, res) => {
  User.checkUsername(req.params.us, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.send({
          message: "Not fond: " + req.params.us,
        });
      } else {
        res.status(500).send({
          message: "Error query" + req.params.us,
        });
      }
    } else {
      res.send({ recode: data, valid: false });
    }
  });
};

const createNewUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
  }
  const salt = bcrypt.genSaltSync(10);
  const userObject = new User({
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, salt),
  });

  User.signup(userObject, (err, data) => {
    if (err) {
      res
        .status(500)
        .send({ message: err.message || "Some error occured while creating" });
    } else res.send(data);
  });
};

const loginUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Body cannot be empty!" });
  }
  const account = new User({
    username: req.body.username,
    password: req.body.password,
  });

  User.login(account, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res
          .status(401)
          .send({ message: " Not found user" + req.body.username });
      } else if (err.kind == "invalid_pass") {
        res.status(401).send("Invalid Password");
      } else {
        res.status(500).send({ message: "Query error." });
      }
    } else {
      res.send(data);
    }
  });
};
module.exports = {
  validaUsername,
  createNewUser,
  loginUser,
};
