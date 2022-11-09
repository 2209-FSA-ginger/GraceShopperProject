const Sequelize = require("sequelize");
const db = require("../db");

const OrderProduct = db.define("orderProduct", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
      notEmpty: true,
    },
  },
});

module.exports = OrderProduct;
