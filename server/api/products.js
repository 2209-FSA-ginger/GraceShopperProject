const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

// GET /api/products
// No auth
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:productId
// No auth
router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products
// admin auth - TO BE INCLUDED
router.post("/", async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).send(product);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:productId
// admin auth - TO BE INCLUDED
router.post("/:productId", async (req, res, next) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.productId,
      },
      returning: true,
      plain: true,
    });
    res.status(201).send(product[1]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:productId
// admin auth - TO BE INCLUDED
router.delete("/:productId", async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
