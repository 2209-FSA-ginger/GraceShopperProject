const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  shippingInfo: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  billingInfo: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Order;
