const conn = require("./conn");
const { Sequelize } = conn;

const Genre = conn.define("genre", {});

module.exports = Genre;
