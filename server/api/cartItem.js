const router = require("express").Router()
const {models : {CartItem, Product}} = require("../db")


//GET /api/cartItem/allCartItems/:userId
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

//PUT /api/cartItem/changeCartQuantity/:userId/:productId
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

//POST /api/cartItem/addCartItem
router.post("/addCartItem", async (req, res, next) => {
    try{
        const newCartItem = req.body
        const newItem = CartItem.create(newCartItem)
        res.status(201).send(newItem)
    } catch (err){
        next(err)
    }
})

//DELETE /api/cartItem/deleteSingleCartItem/:userId/:productId
router.delete("/deleteSingleCartItem/:userId/:productId", async (req, res, next) => {
    try{
        await CartItem.destroy({
            where: {userId: req.params.userId, productId: req.params.productId}
        })
       res.status(204)
    } catch(err){
        next(err)
    }
})

//DELETE /api/cartItem/deleteAllCartItems/:userId
router.delete("/deleteAllCartItems/:userId", async (req, res, next) => {
    try{
        await CartItem.destroy({
            where: {userId: req.params.userId}
        })
        res.status(204)
    } catch(err){
        next(err)
    }
})

module.exports = router