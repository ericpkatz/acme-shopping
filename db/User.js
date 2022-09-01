const conn = require("./conn");
const { Sequelize } = conn;
const { STRING, BOOLEAN, TEXT, INTEGER, CHAR } = Sequelize;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { VIRTUAL } = require("sequelize");

const User = conn.define("user", {
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  firstName: {
    type: STRING,
  },
  lastName: {
    type: STRING,
  },
  isGuest: {
    type: BOOLEAN,
    defaultValue: false,
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
  email: {
    type: STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  imageUrl: {
    type: TEXT,
  },
  address: {
    type: STRING,
    // allowNull: false,
  },
  city: {
    type: STRING,
    // allowNull: false,
  },
  state: {
    type: STRING,
    // allowNull: false,
  },
  zipCode: {
    type: CHAR,
    // allowNull: false,
  },
  fullAddress: {
    type: VIRTUAL,
    get: function(){
      return `${this.address}, ${this.city}, ${this.state} ${this.zipCode}`
    }
  }
});

User.addHook("beforeSave", async (user) => {
  user.password = await bcrypt.hash(user.password, 5);
});
//when checkout, to close the order
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
  //the active order with the array of lineItems with product info along with quantity
};
User.prototype.getOrders = async function () {
  let orders = await conn.models.order.findAll({
    where: {
      userId: this.id,
      isCart: false,
    },
    include: [
      {
        model: conn.models.lineItem,
        include: [conn.models.product],
      },
    ]//,
//    order: ['updatedAt', 'DESC']
  });
  return orders || [];
};

User.prototype.getUserOrders = async function () {
  let orders = await conn.models.order.findAll({
    where: {
      userId: this.id,
      isCart: false,
    },
    include: [
      {
        model: conn.models.lineItem,
        include: [conn.models.product],
      },
    ],
  });
  return orders || [];
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
//user / guest
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
User.createAccount = async function (information) {
  return await this.create({ ...information, isAdmin: false });
};
User.createGuestAccount = async function (information) {
  return await this.create({
    username: "",
    password: "",
    isGuest: true,
    email: `${Date.now()}@fake.com`,
    imageUrl: "",
    address: "",
  });
};
User.prototype.getUsers = async function(){
  return (await User.findAll());
}

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
User.findByAdminToken = async function(token){
  try{
    let user = await this.findByToken(token);
    if(user.isAdmin){
      return user;
    }
    throw 'error';
  }
  catch(ex){
    const error = new Error("bad token");
    error.status = 401;
    throw error
  }
};
//Products
User.prototype.getProducts = async function () {
  let products = await conn.models.product.findAll({
    order: [["name"]],
  });
  return products;
};
User.prototype.createProduct = async function(productReq){
  const product = await conn.models.product.create(productReq);
  return product;
};
User.prototype.updateProduct = async function(productReq, id){
  let product = await conn.models.product.findByPk(id*1);
  product = await product.update(productReq)
  return product;
}
User.prototype.deleteProduct = async function(id){
  const product = await conn.models.product.findByPk(id*1);
  await product.destroy();
  return;
}
module.exports = User;
