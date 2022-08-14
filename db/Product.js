const conn = require('./conn');
const { Sequelize } = conn;

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.ENUM,
    values: ['philippines', 'china', 'korea', 'japan', 'mexico']
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
  },
  ml: {
    type: Sequelize.INTEGER
  },
  imgUrl: {
    type: Sequelize.STRING
  }
});

module.exports = Product;

