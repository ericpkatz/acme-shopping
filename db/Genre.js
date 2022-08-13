const conn = require("./conn");
const { Sequelize } = conn;

const Genre = conn.define("order", {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Genre;
