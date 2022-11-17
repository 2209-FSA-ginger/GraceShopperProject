const Sequelize = require("sequelize");
const db = require("../db");
const queryInterface = db.getQueryInterface()

const Product = db.define("product", {
  albumId: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  artist: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  genre: {
    type: Sequelize.STRING,
  },
  style: {
    type: Sequelize.STRING,
  },
  releaseDate: {
    type: Sequelize.STRING,
  },
  rating: {
    type: Sequelize.DECIMAL(10, 2),
  },
  ratingCount: {
    type: Sequelize.BIGINT,
  },
  notes: {
    type: Sequelize.TEXT,
  },
  tracklist: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
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
    type: Sequelize.DECIMAL(10, 2),
    set() {
      this.setDataValue(
        "displayPrice",
        Math.round(this.price * (1 - this.discount) * 100) / 100
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

// const changeId = (queryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
//   // Get current highest value from the table
//   const [[{ max }]] = await queryInterface.sequelize.query(`SELECT MAX("id") AS max FROM "products";`, { transaction });
//   // Set the autoincrement current value to highest value + 1
//   await queryInterface.sequelize.query(`ALTER SEQUENCE "products_id_seq" RESTART WITH ${max + 1};`, { transaction });

// })

// changeId(queryInterface)

module.exports = Product;
