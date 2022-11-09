const router = require("express").Router();
const {
  models: { Order, OrderProduct, Product, User },
} = require("../db");
module.exports = router;

// GET /api/orders/:userId
// user auth - TO BE INCLUDED
router.get("/:userId", async (req, res, next) => {
  try {
    const orderHistory = await Order.findAll({
      where: {
        userId: req.params.userId,
      },
      include: {
        model: OrderProduct,
        include: {
          model: Product,
        },
      },
    });
    res.send(orderHistory);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders
// admin auth - TO BE INCLUDED
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: OrderProduct,
        include: {
          model: Product,
        },
      },
    });
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

// POST /api/orders
// no auth?? potentially needed
// req.body requires obj {order as {}, products as []}
router.post("/", async (req, res, next) => {
  try {
    const order = await Order.create(req.body.order);
    const products = req.body.products;
    for (let i = 0; i < products.length; i++) {
      order.addProduct({
        productId: products[i].id,
        quantity: products[i].quantity,
        price: products[i].price,
      });
    }
    res.send(order);
  } catch (err) {
    next(err);
  }
});
