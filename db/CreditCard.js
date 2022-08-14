const conn = require("./conn");
const { Sequelize } = conn;
const { STRING, INTEGER } = Sequelize;

const CreditCard = conn.define("creditCard", {
  nameOnCard: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^[a-z\s]+$/i,
    },
  },
  number: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^[0-9]{16}$/i,
    },
  },
  expirationMonth: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 12,
    },
  },
  expirationYear: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 99,
    },
  },
  pin: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 999,
    },
  },
});

module.exports = CreditCard;
