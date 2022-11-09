//this is the access point for all things database related!

const db = require("./db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Orders");
const OrderProduct = require("./models/OrderProducts");
const CartItem = require("./models/CartItem")

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    CartItem,
    Product,
    Order,
    OrderProduct,
  },
};
