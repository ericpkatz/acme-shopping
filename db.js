const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Order = conn.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

const LineItem = conn.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1 
  }
});

const User = conn.define('user', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING
  }
});

User.hasMany(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);

User.addHook('beforeSave', async(user)=> {
  user.password = await bcrypt.hash(user.password, 5);
});

User.prototype.addToCart = async function({ product, quantity}){
  const cart = await this.getCart();
  let lineItem = await LineItem.findOne({
    where: {
      productId: product.id,
      orderId: cart.id
    }
  });
  if(lineItem){
    lineItem.quantity += quantity;
    await lineItem.save();
  }
  else {
    await LineItem.create({ productId: product.id, quantity, orderId: cart.id });
  }
  return this.getCart();
}

User.prototype.getCart = async function(){
  let order = await Order.findOne({
    where: {
      userId: this.id,
      isCart: true
    },
    include: [
      LineItem
    ]
  });
  if(!order){
    order = await Order.create({ userId: this.id });
    order = await Order.findByPk(order.id, {
      include: [LineItem]
    });
  }
  return order;
}


User.authenticate = async function(credentials){
  const user = await this.findOne({
    where: {
      username: credentials.username
    } 
  });
  if(user && await bcrypt.compare(credentials.password, user.password)){
    return jwt.sign({ id: user.id}, process.env.JWT);
  }
  else {
    const error = new Error('Bad Credentials');
    error.status = 401;
    throw error;
  }
}

User.findByToken = async function findByToken(token){
  try {
    const id = jwt.verify(token, process.env.JWT).id;
    const user = await User.findByPk(id);
    if(!user){
      throw 'error';
    }
    return user;
  }
  catch(ex){
    const error = new Error('bad token');
    error.status = 401;
    throw error;
  }

}


module.exports = {
  conn,
  User,
  Product
};
