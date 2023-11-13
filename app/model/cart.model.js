const sql = require("./db");

const Cart = function (cart) {
  this.user_id = cart.user_id;
};

Cart.getByUserId = async (user_id) => {
  const [rows] = await sql
    .promise()
    .query(`SELECT * FROM carts WHERE user_id = ${user_id}`);
  return rows;
};

Cart.create = (newCart, result) => {
  sql.query("INSERT INTO carts SET ?", newCart, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newCart });
    console.log("Add new cart success");
  });
};

Cart.getMenuByCartId = async (id, result) => {
  const query = `
  SELECT m.*, cm.quantity  FROM carts c
  JOIN carts_menus cm  ON cm.cart_id = c.id
  JOIN menus m  ON m.id = cm.menu_id 
  WHERE c.id = ${id}`;

  const [rows] = await sql.promise().query(query);
  return rows;
};

// const Cart = {
//   create: (newCart, callback) => {
//     sql.query("INSERT INTO carts SET ?", newCart, (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         callback(err, null);
//         return;
//       }

//       callback(null, { id: res.insertId, ...newCart });
//       console.log("Add new cart success");
//     });
//   },
// };

module.exports = Cart;
