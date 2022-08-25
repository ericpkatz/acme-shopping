const conn = require("./conn");
const { Sequelize } = conn;
const { STRING, TEXT, DECIMAL, INTEGER } = Sequelize;
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
  // category: {
  //   type: ENUM,
  //   values: ["philippines", "china", "korea", "japan", "mexico"],
  // },
  ml: {
    type: INTEGER,
    defaultValue: 250
  },
  limit: {
    type: INTEGER,
    defaultValue: 100
  },
  imgUrl: {
    type: TEXT,
  },
});

module.exports = Product;
