const router = require("express").Router();
const {
  models: { CartItem, Product, User },
} = require("../db");
const { requireAdminToken, requireToken } = require("../auth/index");

//GET /api/cartItems/:userId
router.get("/:userId", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user.password === req.user.password) {
      const allCartItems = await CartItem.findAll({
        include: { model: Product },
        where: { userId: req.params.userId },
      });
      res.send(allCartItems);
    } else {
      const error = Error("Unauthorized User");
      error.status = 401;
      throw error;
    }
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
    const newItem = await CartItem.create(newCartItem);
    res.status(201).send(newItem);
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

//DELETE /api/cartItems/all/:userId
router.delete("/all/:userId", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user.password === req.user.password) {
      await CartItem.destroy({
        where: { userId: req.params.userId },
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

module.exports = router;
