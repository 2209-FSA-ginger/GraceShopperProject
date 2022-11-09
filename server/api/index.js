const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use("/cartItem", require("./cartItem"))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
