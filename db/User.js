const conn = require("./conn");
const { Sequelize } = conn;
const { STRING, ENUM, INTEGER, DATEONLY } = Sequelize;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = conn.define("user", {
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: INTEGER,
    allowNull: false,
  },
  shippingAddressApt: {
    type: STRING,
  },
  shippingAddresStr: {
    type: STRING,
    allowNull: false,
  },
  shippingAddresCity: {
    type: STRING,
    allowNull: false,
  },
  shippingAddresState: {
    type: STRING,
    allowNull: false,
  },
  shippingAddresZipcode: {
    type: STRING,
    allowNull: false,
  },
  creditCardNumber: {
    type: INTEGER,
    allowNull: false,
  },
  creditCardExpirationDate: {
    type: DATEONLY,
    allowNull: false,
  },
  creditCardPin: {
    type: INTEGER,
    allowNull: false,
  },
  userType: {
    type: ENUM,
    values: ["user", "admin"],
  },
  username: {
    type: STRING,
  },
  password: {
    type: STRING,
  },
});

User.addHook("beforeSave", async (user) => {
  user.password = await bcrypt.hash(user.password, 5);
});

User.prototype.createOrderFromCart = async function () {
  const cart = await this.getCart();
  cart.isCart = false;
  return cart.save();
};

User.prototype.addToCart = async function ({ product, quantity }) {
  const cart = await this.getCart();
  let lineItem = await conn.models.lineItem.findOne({
    where: {
      productId: product.id,
      orderId: cart.id,
    },
  });
  if (lineItem) {
    lineItem.quantity = quantity;
    if (lineItem.quantity) {
      await lineItem.save();
    } else {
      await lineItem.destroy();
    }
  } else {
    await conn.models.lineItem.create({
      productId: product.id,
      quantity,
      orderId: cart.id,
    });
  }
  return this.getCart();
};

User.prototype.getCart = async function () {
  let order = await conn.models.order.findOne({
    where: {
      userId: this.id,
      isCart: true,
    },
    include: [
      {
        model: conn.models.lineItem,
        include: [conn.models.product],
      },
    ],
  });
  if (!order) {
    order = await conn.models.order.create({ userId: this.id });
    order = await conn.models.order.findByPk(order.id, {
      include: [conn.models.lineItem],
    });
  }
  return order;
};

User.authenticate = async function (credentials) {
  const user = await this.findOne({
    where: {
      username: credentials.username,
    },
  });
  if (user && (await bcrypt.compare(credentials.password, user.password))) {
    return jwt.sign({ id: user.id }, process.env.JWT);
  } else {
    const error = new Error("Bad Credentials");
    error.status = 401;
    throw error;
  }
};

User.findByToken = async function findByToken(token) {
  try {
    const id = jwt.verify(token, process.env.JWT).id;
    const user = await User.findByPk(id);
    if (!user) {
      throw "error";
    }
    return user;
  } catch (ex) {
    const error = new Error("bad token");
    error.status = 401;
    throw error;
  }
};

module.exports = User;
