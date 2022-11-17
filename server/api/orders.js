const router = require("express").Router();
const {
  models: { Order, OrderProduct, Product, User },
} = require("../db");
module.exports = router;
const { requireAdminToken, requireToken } = require("../auth/index");

// GET /api/orders/:userId
// user auth
router.get("/history/:userId", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user.password === req.user.password || req.user.isAdmin) {
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
    let orders;

    const include = {
      include: {
        model: OrderProduct,
        include: {
          model: Product,
        },
      },
    };

    if (req.query) {
      const filterObject = {};

      //add page and perPage
      if (req.query.range) {
        const range = JSON.parse(req.query.range);
        filterObject.limit = range[1] - range[0] + 1;
        filterObject.offset = range[0];
      }

      if (req.query.sort) {
        const sort = JSON.parse(req.query.sort);
        filterObject.order = [sort];
      }

      orders = await Order.findAll({ ...filterObject, ...include });
    } else {
      orders = await Order.findAll(include);
    }

    const numOrders = await Order.count();

    if (req.query.range) {
      const range = JSON.parse(req.query.range);
      res.header(
        "Content-Range",
        `orders ${range[0]}-${range[1]}/${numOrders}`
      );
    } else {
      res.header("Content-Range", `orders 0-${numOrders}/${numOrders}`);
    }
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
    let orderObject;
    let productArray;
    if (req.body.order) {
      orderObject = req.body.order;
      productArray = req.body.products;
    } else {
      // if coming from admin panel
      orderObject = req.body;
      productArray = req.body.orderProducts;
    }
    const order = await Order.create(orderObject);
    const products = productArray;

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

// GET single order - for admin panel
router.get("/:orderId", requireAdminToken, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.orderId,
      },
      include: {
        model: OrderProduct,
        include: {
          model: Product,
        },
      },
    });
    res.send(order);
  } catch (err) {
    next(err);
  }
});

// PUT update order - for admin panel
router.put("/:orderId", requireAdminToken, async (req, res, next) => {
  try {
    const orderObject = req.body;
    const productArray = req.body.orderProducts;

    await OrderProduct.destroy({
      where: {
        orderId: req.params.orderId,
      },
    });

    await Promise.all(
      productArray.map((product) => {
        return OrderProduct.create({
          orderId: req.params.orderId,
          productId: product.productId,
          quantity: product.quantity,
          price: product.price,
        });
      })
    );

    const order = await Order.findOne({
      where: {
        id: req.params.orderId,
      },
      include: {
        model: OrderProduct,
        include: {
          model: Product,
        },
      },
    });

    order.update(orderObject);

    res.send(order);
  } catch (err) {
    next(err);
  }
});

// DELETE order - for admin panel
router.delete("/:orderId", requireAdminToken, async (req, res, next) => {
  try {
    await OrderProduct.destroy({
      where: {
        orderId: req.params.orderId,
      },
    });

    await Order.destroy({
      where: {
        id: req.params.orderId,
      },
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
