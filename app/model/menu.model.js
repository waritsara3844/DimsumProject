const sql = require("./db");

const Menu = function (menu) {
  this.name = menu.name;
  this.detail = menu.detail;
  this.price = menu.price;
  this.category = menu.category;
  this.sold_amount = menu.sold_amount;
};

Menu.createNewMenu = (newMenu, result) => {
  sql.query("INSERT INTO menus SET ?", newMenu, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, newMenu);
    console.log("Add new menu success");
  });
};

Menu.category = (category, result) => {
  sql.query("SELECT * FROM menus WHERE category = ?", category, (err, res) => {
    if (err) {
      console.log("Query err:" + err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Found menu: " + res);
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Menu.updateMenu = (id, data, result) => {
  sql.query(
    `UPDATE menu SET name='${data.name}', detail='${data.detail}', price='${data.price}', category='${data.category}', sold_amount='${data.sold_amount}' WHERE id = '${id}'`,
    (err, res) => {
      if (err) {
        console.log("Error:" + err);
        result(err, null);
        return;
      }
      if (res.affectRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Update menu: " + { id: id, ...data });
      return result(null, { id: id, ...data });
    }
  );
};

Menu.getMenu = (id, result) => {
  sql.query(`SELECT * FROM menus WHERE id=${id}`, (err, res) => {
    console.log(err);
    if (err) {
      console.log("Error: " + err);
      result(err, null);
      return;
    }
    console.log(res);
    result(null, res);
  });
};

Menu.deleteMenu = (id, result) => {
  sql.query(`DELETE FROM menus WHERE id=${id}`, (err, res) => {
    if (err) {
      console.log("error : " + err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Deleted menu with id: " + id);
    result(null, { id: id });
  });
};

Menu.getAllMenu = (result) => {
  sql.query("SELECT * FROM menus", (err, res) => {
    if (err) {
      console.log("error: " + err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
module.exports = Menu;
