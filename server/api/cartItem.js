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

router.post("/addCartItem", async (req, res) => {
    const newCartItem = req.body
    const newItem = CartItem.create(newCartItem)
    res.send(newItem)
})

router.delete("/deleteCartItem/:userId/:productId", async (req, res) => {
    const itemToDelete = CartItem.findOne({
        where: {userId: req.params.userId, productId: req.params.productId}
    })
    await CartItem.destroy({
        where: {userId: req.params.userId, productId: req.params.productId}
    })
   res.send(itemToDelete)
})


router.delete


module.exports = router