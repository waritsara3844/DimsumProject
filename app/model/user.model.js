const sql = require("./db");
const jwt = require("jsonwebtoken");
const secret = require("../config/jwt.config");
const bcrypt = require("bcryptjs");

const expireTime = "2h";

const User = function (user) {
  (this.email = user.email),
    (this.username = user.username),
    (this.password = user.password);
};

User.checkUsername = (username, result) => {
  sql.query(`SELECT * FROM users WHERE username='${username}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Found username: " + res[0]);
      result(err, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};
User.signup = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("Query error: " + err);
      result(err, null);
    }
    const token = jwt.sign({ id: res.insertId }, secret.secret, {
      expiresIn: expireTime,
    });
    result(null, { id: res.insertId, ...newUser, accessToken: token });
    console.log(null, { id: res.insertId, ...newUser, accessToken: token });
  });
};

User.login = (account, result) => {
  sql.query(
    "SELECT * FROM users WHERE username = ?",
    [account.username],
    (err, res) => {
      if (err) {
        console.log("err:" + err);
        result(err, null);
        return;
      }
      if (res.length) {
        const validPassword = bcrypt.compareSync(
          account.password,
          res[0].password
        );
        if (validPassword) {
          const token = jwt.sign({ id: res.insertId }, secret.secret, {
            expiresIn: expireTime,
          });
          console.log("Login success Token was generated " + token);
          res[0].accessToken = token;
          result(null, res[0]);
          return;
        } else {
          console.log("Password not match");
          result({ kind: "invalid_pass" }, null);
          return;
        }
      }
      return result({ kind: "not find" }, null);
    }
  );
};

module.exports = User;
