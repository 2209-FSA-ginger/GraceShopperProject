const router = require("express").Router();
const {
  models: { Order, OrderProduct, Product, User },
} = require("../db");
module.exports = router;
const { requireAdminToken, requireToken } = require("../auth/index");

// GET /api/orders/:userId
// user auth
router.get("/:userId", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user.password === req.user.password) {
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
      // console.log("ORDER HIS", orderHistory);
      res.send(orderHistory);
    } else {
      const error = Error("Unauthorized User");
      error.status = 401;
      throw error;
    }
  } catch (err) {
    next(err);
  }
});

// GET /api/orders
// admin auth
router.get("/", requireAdminToken, async (req, res, next) => {
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
// no auth?? potentially needed but want guests to be able to post here
// req.body requires obj {order as {}, products as []}
router.post("/", async (req, res, next) => {
  try {
    const order = await Order.create(req.body.order);
    const products = req.body.products;
    console.log(products)
    await Promise.all(
      products.map((product) => {
        return OrderProduct.create({
          orderId: order.id,
          productId: product.productId,
          quantity: product.quantity,
          price: product.price,
        });
      })
    );
    res.send(order);
  } catch (err) {
    next(err);
  }
});
