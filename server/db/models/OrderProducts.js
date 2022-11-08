const Sequelize = require("sequelize");
const db = require("../db");

const OrderProduct = db.define("orderProduct", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
});

module.exports = OrderProduct;
