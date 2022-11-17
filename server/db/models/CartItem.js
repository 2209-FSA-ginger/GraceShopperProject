const Sequelize = require("sequelize")
const db = require("../db")
const queryInterface = db.getQueryInterface()

const CartItem = db.define("cartItem", {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})


const changeId = (queryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
    // Get current highest value from the table
    const [[{ max }]] = await queryInterface.sequelize.query(`SELECT MAX("id") AS max FROM "cartItems";`, { transaction });
    // Set the autoincrement current value to highest value + 1
    await queryInterface.sequelize.query(`ALTER SEQUENCE "cartItems_id_seq" RESTART WITH ${max + 1};`, { transaction });

})

changeId(queryInterface)

module.exports = CartItem

