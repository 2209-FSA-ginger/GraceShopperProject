const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  addressLine1: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  addressLine2: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "USA",
  },
  zipcode: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  phone: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  creditCard: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
});

module.exports = Order;
