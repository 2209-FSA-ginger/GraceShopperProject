require('dotenv').config()
const router = require("express").Router()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

// POST api/payment/session
router.post("/session", async (req, res) => {
    console.log(req.body)
    const items = req.body.map( item => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        images: item.images
                    },
                    unit_amount: Math.floor(Number(item.price) * 100)
                },
                quantity: item.quantity
            }
        })
    console.log(items)
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: items,
            success_url: `${process.env.SERVER_URL}/confirmation`,
            cancel_url: `${process.env.SERVER_URL}/checkout`
        })
        console.log(session)
        res.send(session.url)
    } catch (error) {
        res.status(500)
    }
})

module.exports = router