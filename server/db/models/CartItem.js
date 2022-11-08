const Sequelize = require("sequelize")
const db = require("../db")

const CartItem = db.define("cartItem", {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            allowEmpty: false
        }
    }
})

module.exports = CartItem

