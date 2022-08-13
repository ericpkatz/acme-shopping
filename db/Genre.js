const conn = require("./conn");
const { Sequelize } = conn;

const Genre = conn.define("genre", {
  type: Sequelize.STRING,
  allowNull: false,
  validate: {
    notEmpty: true,
  },
});

module.exports = Genre;
