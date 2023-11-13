const Order = require("../model/order.model");
const CartMenu = require("../model/cartmenu.model");
const Cart = require("../model/cart.model");
const Menu = require("../model/menu.model");

const dayjs = require("dayjs");

const createOrder = async (req, res) => {
  try {
    const { cart_id, user_id } = req.body;

    const menus = await Cart.getMenuByCartId(cart_id);

    if (!menus.length) return res.send({ message: "menu cannot be empty !" });

    let amount = 0;
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      amount += menu.price * menu.quantity;
    }

    const order = new Order({
      total: amount,
      user_id,
    });

    await Menu.updateSoldAmount(menus);

    await Order.create(order);

    await CartMenu.deleteAllMenu(cart_id);

    res.send({ message: "create order success !" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const summariesOrder = async (req, res) => {
  try {
    if (!req.query.start || !req.query.end) {
      res.status(400).send({ message: "query start or end cannot be empty" });
      return;
    }

    const start = dayjs(req.query.start)
      .startOf("days")
      .format("YYYY-MM-DD HH:mm:ss")
      .toString();
    const end = dayjs(req.query.end)
      .endOf("days")
      .format("YYYY-MM-DD HH:mm:ss")
      .toString();

    const data = await Order.summaries(start, end);

    res.send({ data });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const rankingOrder = async (req, res) => {
  try {
    const data = await Order.ranking();

    res.send({ data });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createOrder,
  summariesOrder,
  rankingOrder,
};
