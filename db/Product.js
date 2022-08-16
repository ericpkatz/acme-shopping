const conn = require("./conn");
const { Sequelize } = conn;

const Product = conn.define("product", {
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Product;
