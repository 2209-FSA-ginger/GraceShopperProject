const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  discount: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 1,
    },
  },
  displayPrice: {
    type: Sequelize.FLOAT,
    set() {
      this.setDataValue(
        "displayPrice",
        Math.round(this.price * this.discount * 100) / 100
      );
    },
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: "/public/default.jpeg",
  },
  inventory: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
});

module.exports = Product;
