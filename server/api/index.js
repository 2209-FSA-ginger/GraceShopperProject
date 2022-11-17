const router = require("express").Router();


router.use('/users', require('./users'))
router.use("/cartItems", require("./cartItems"))
router.use('/products', require('./products'))
router.use('/orders', require('./orders'))
router.use("/payment", require("./stripe"))

module.exports = router;

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
