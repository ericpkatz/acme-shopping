const conn = require("./conn");
const { Sequelize } = conn;

const Category = conn.define("order", {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Category;
