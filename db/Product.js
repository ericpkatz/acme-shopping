const conn = require("./conn");
const { Sequelize } = conn;
const { STRING, TEXT, DECIMAL } = Sequelize;
const Product = conn.define("product", {
  name: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: TEXT,
  },
  price: {
    type: DECIMAL,
    defaultValue: 0.0,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Product;
