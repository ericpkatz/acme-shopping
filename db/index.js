const conn = require("./conn");
const { Sequelize } = conn;
const Product = require("./Product");
const User = require("./User");
const LineItem = require("./LineItem");
const Order = require("./Order");
const Genre = require("./Genre");
const Category = require("./Category");
const Address = require("./Address");
const CreditCard = require("./CreditCard");

User.hasMany(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);
CreditCard.belongsTo(User);
Address.belongsTo(User);

module.exports = {
  conn,
  User,
  Product,
  LineItem,
  Order,
  Genre,
  Category,
  Address,
  CreditCard,
};
