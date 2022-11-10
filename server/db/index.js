//this is the access point for all things database related!

const db = require("./db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Orders");
const OrderProduct = require("./models/OrderProducts");
const CartItem = require("./models/CartItem");

//associations could go here!

User.hasMany(CartItem);
CartItem.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

Product.belongsToMany(Order, { through: OrderProduct });
Order.belongsToMany(Product, { through: OrderProduct });

Product.hasMany(OrderProduct);
OrderProduct.belongsTo(Product);

Order.hasMany(OrderProduct);
OrderProduct.belongsTo(Order);

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
