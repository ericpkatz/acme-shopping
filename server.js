const app = require('./app');
const { conn, User, Product } = require('./db');

const setUp = async()=> {
  try {
    await conn.sync({ force: true });
    await User.create({ username: 'moe', password: 'moe_pw'});
    const lucy = await User.create({ username: 'lucy', password: 'lucy_pw'});
    const foo = await Product.create({ name: 'foo' }); 
    const bar = await Product.create({ name: 'bar' }); 
    await lucy.addToCart({ product: foo, quantity: 3 });
    await lucy.addToCart({ product: bar, quantity: 4 });
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

setUp();
