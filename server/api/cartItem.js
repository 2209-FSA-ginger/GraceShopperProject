const router = require("express").Router()
const {models : {CartItem, Product}} = require("../db")

router.get("/allCartItems/:userId", async (req, res) => {
    const allCartItems = CartItem.findAll({
        include: {model : Product},
        where: {userId: req.params.userId}
    })
    res.send(allCartItems)
})

router.put("/changeCartQuantity/:userId/:productId", async (req, res) => {
    const updatedQuantity = req.body
    const findCartItem = CartItem.findOne({
        where: {userId: req.params.userId, productId: req.params.productId}
    })
    await findCartItem.update({quantity: updatedQuantity})
    res.send(findCartItem)
})


router.post
router.delete
router.delete


module.exports = router