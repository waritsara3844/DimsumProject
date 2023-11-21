const CartMenu = require("../model/cartmenu.model");

const createCartMenu = async (req, res) => {
  try {
    const { cart_id, menu_id, quantity } = req.body;

    const cartMenu = new CartMenu({
      cart_id,
      menu_id,
      quantity,
    });

    await CartMenu.create(cartMenu);

    res.send({ message: "created !" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const updateCartMenu = async (req, res) => {
  try {
    const { cart_id, menu_id, quantity } = req.body;
    if (quantity <= 0) {
      CartMenu.delete(cart_id, menu_id);
      res.send({ message: "deleted !" });
      return;
    }

    const cartMenu = new CartMenu({
      cart_id,
      menu_id,
      quantity,
    });

    await CartMenu.update(cartMenu);
    res.send({ message: "updated !" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createCartMenu,
  updateCartMenu,
};
