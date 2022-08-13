const conn = require("./conn");
const { Sequelize } = conn;

const Category = conn.define("category", {});

module.exports = Category;
