const Cart = require("../model/cart.model");

const createCart = (req, res) => {
  const user_id = req.body.user_id;

  if (!user_id) {
    res.status(400).send({ message: "User id cannot be empty." });
  }

  const cart = new Cart({
    user_id,
  });

  Cart.create(cart, (err, data) => {
    if (err) {
      res
        .status(500)
        .send({ message: err.message || "Some error occured while creating" });
    } else {
      res.send(data);
    }
  });
};

const getMenubyCartId = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400).send({ message: "ID cannot be empty." });
    }

    const menus = await Cart.getMenuByCartId(id);
    let amount = 0;
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      amount += menu.price * menu.quantity;
    }
    res.send({ amount, data: menus });
  } catch (error) {
    console.log(error);
  }
};

// const getMenubyCartId = (req, res) => {
//   const id = req.params.id;

//   if (!id) {
//     res.status(400).send({ message: "ID cannot be empty." });
//   }

//   const cart = new Cart({
//     id,
//   });

// Cart.getMenu(id, (err, data) => {
//   if (err) {
//     res
//       .status(500)
//       .send({ message: err.message || "Some error occured while creating" });
//   } else {
//     let amount = 0;
//     for (let i = 0; i < data.length; i++) {
//       console.log(data);
//       const menu = data[i];
//       amount += menu.price * menu.quantity;
//     }
//     res.send({ amount, data });
//   }
// });

module.exports = {
  createCart,
  getMenubyCartId,
};
