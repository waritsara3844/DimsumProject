const sql = require("./db");

const CartMenu = function (cartmenu) {
  this.cart_id = cartmenu.cart_id;
  this.menu_id = cartmenu.menu_id;
  this.quantity = cartmenu.quantity;
};

CartMenu.create = async (newCartMenu) => {
  return await sql
    .promise()
    .query(`INSERT INTO carts_menus SET ?`, newCartMenu);
};

CartMenu.update = async (cartmenu) => {
  return await sql
    .promise()
    .query(
      `UPDATE carts_menus SET quantity = ? WHERE menu_id = ? AND cart_id = ?`,
      [cartmenu.quantity, cartmenu.menu_id, cartmenu.cart_id]
    );
};

CartMenu.delete = async (cart_id, menu_id) => {
  return await sql
    .promise()
    .query(`DELETE FROM carts_menus WHERE menu_id = ? AND cart_id = ?`, [
      menu_id,
      cart_id,
    ]);
};

CartMenu.deleteAllMenu = async (cart_id) => {
  const query = `DELETE FROM carts_menus WHERE cart_id = ${cart_id}`;
  return await sql.promise().query(query);
};

module.exports = CartMenu;
