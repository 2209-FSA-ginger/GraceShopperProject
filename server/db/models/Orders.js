const Sequelize = require("sequelize");
const db = require("../db");
const queryInterface = db.getQueryInterface()

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
    allowNull: true
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
    type: Sequelize.BIGINT
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

const changeId = (queryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
  // Get current highest value from the table
  const [[{ max }]] = await queryInterface.sequelize.query(`SELECT MAX("id") AS max FROM "orders";`, { transaction });
  // Set the autoincrement current value to highest value + 1
  await queryInterface.sequelize.query(`ALTER SEQUENCE "orders_id_seq" RESTART WITH ${max + 1};`, { transaction });

})

changeId(queryInterface)

module.exports = Order;
