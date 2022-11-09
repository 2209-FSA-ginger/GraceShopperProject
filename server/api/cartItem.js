const router = require("express").Router()
const {models : {CartItem, Product}} = require("../db")

router.get("/allCartItems/:userId", async (req, res, next) => {
    try{
        const allCartItems = CartItem.findAll({
            include: {model : Product},
            where: {userId: req.params.userId}
        })
        res.send(allCartItems)
    } catch (err){
        next(err)
    }
})

router.put("/changeCartQuantity/:userId/:productId", async (req, res, next) => {
    try{
        const updatedQuantity = req.body
        const findCartItem = CartItem.findOne({
            where: {userId: req.params.userId, productId: req.params.productId}
        })
        await findCartItem.update({quantity: updatedQuantity})
        res.send(findCartItem)
    } catch (err){
        next(err)
    }
})

router.post("/addCartItem", async (req, res, next) => {
    try{
        const newCartItem = req.body
        const newItem = CartItem.create(newCartItem)
        res.send(newItem)
    } catch (err){
        next(err)
    }
})

router.delete("/deleteSingleCartItem/:userId/:productId", async (req, res, next) => {
    try{
        const itemToDelete = CartItem.findOne({
            where: {userId: req.params.userId, productId: req.params.productId}
        })
        await CartItem.destroy({
            where: {userId: req.params.userId, productId: req.params.productId}
        })
       res.send(itemToDelete)
    } catch(err){
        next(err)
    }
})

router.delete("/deleteAllCartItems/:userId", async (req, res, next) => {
    try{
        await CartItem.destroy({
            where: {userId: req.params.userId}
        })
        res.send(null)
    } catch(err){
        next(err)
    }
})

module.exports = router