const conn = require("./conn");
const { Sequelize } = conn;

const Genre = conn.define("genre", {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Genre;
