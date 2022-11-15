const router = require("express").Router();
const {
  models: { CartItem, Product, User },
} = require("../db");
const { requireAdminToken, requireToken } = require("../auth/index");

//GET /api/cartItems
router.get("/", requireToken, async (req, res, next) => {
  try {
    const allCartItems = await CartItem.findAll({
      include: { model: Product },
      where: { userId: req.user.id },
      order: [["id", "ASC"]],
    });
    res.send(allCartItems);
  } catch (err) {
    next(err);
  }
});

//PUT /api/cartItems/:cartId
router.put("/:cartId", requireToken, async (req, res, next) => {
  try {
    const updatedQuantity = req.body.quantity;
    const findCartItem = await CartItem.findByPk(req.params.cartId);
    const user = await User.findByPk(findCartItem.userId);
    console.log(user);
    if (user.password === req.user.password) {
      await findCartItem.update({ quantity: updatedQuantity });
      res.send(findCartItem);
    } else {
      const error = Error("Unauthorized User");
      error.status = 401;
      throw error;
    }
  } catch (err) {
    next(err);
  }
});

//POST /api/cartItems
router.post("/", requireToken, async (req, res, next) => {
  try {
    const newCartItem = { ...req.body, userId: req.user.id };
    const [item, created] = await CartItem.findOrCreate({
      where: {
        userId: req.user.id,
        productId: req.body.productId,
      },
      defaults: {
        quantity: req.body.quantity,
      },
    });
    if (!created) {
      item.update({ quantity: item.quantity + req.body.quantity });
    }
    res.status(201).send(item);
  } catch (err) {
    next(err);
  }
});

//DELETE /api/cartItems/:cartId
router.delete("/:cartId", requireToken, async (req, res, next) => {
  try {
    const findCartItem = await CartItem.findByPk(req.params.cartId);
    const user = await User.findByPk(findCartItem.userId);
    if (user.password === req.user.password) {
      await CartItem.destroy({
        where: { id: req.params.cartId },
      });
      res.sendStatus(204);
    } else {
      const error = Error("Unauthorized User");
      error.status = 401;
      throw error;
    }
  } catch (err) {
    next(err);
  }
});

//DELETE /api/cartItems
router.delete("/", requireToken, async (req, res, next) => {
  try {
    await CartItem.destroy({
      where: { userId: req.user.id },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
