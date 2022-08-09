const { conn, User, Product } = require('./db');
const app = require('supertest')(require('./app'));
const { expect } = require('chai');
const jwt = require('jsonwebtoken');

describe('Shopping', ()=> {
  beforeEach(async()=> {
    await conn.sync({ force: true });
    await User.create({ username: 'moe', password: 'MOE'});
    await Product.create({ name: 'foo'});
  });

  describe('Successful Authentication', ()=> {
    it('Logs the User In', async()=> {
      let response = await app.post('/api/sessions')
        .send({ username: 'moe', password: 'MOE'});

      expect(response.status).to.equal(200);
      const token = response.body.token;
      expect(token).to.be.ok;
      response = await app.get('/api/sessions')
        .set('authorization', token);
      expect(response.status).to.equal(200);
      expect(response.body.username).to.equal('moe');

    });
  });
  describe('The Shopping Experience', ()=> {
    it('Allows the user to create an order', async()=> {
      const moe = await User.findOne({
        where: {
          username: 'moe'
        }
      });
      const foo = await Product.findOne({
        where: {
          name: 'foo'
        }
      });
      const token = jwt.sign({ id: moe.id}, process.env.JWT);

      let response = await app.get('/api/orders/cart')
        .set('authorization', token);
      expect(response.status).to.equal(200);
      const cart = response.body;
      const id = cart.id;
      expect(cart.id).to.be.ok;
      expect(cart.lineItems).to.eql([]);
      response = await app.get('/api/orders/cart')
        .set('authorization', token);
      expect(response.body.id).to.equal(id);
      expect(response.body.lineItems).to.eql([]);
      response = await app.post('/api/orders/cart')
        .set('authorization', token)
        .send({ product: foo, quantity: 1 });
      expect(response.status).to.equal(200);
      let lineItem = response.body.lineItems.find(lineItem => lineItem.productId === foo.id );
      expect(lineItem).to.be.ok;
      response = await app.post('/api/orders/cart')
        .set('authorization', token)
        .send({ product: foo, quantity: 2 });
      expect(response.status).to.equal(200);
      lineItem = response.body.lineItems.find(lineItem => lineItem.productId === foo.id );
      expect(lineItem).to.be.ok;
      expect(lineItem.quantity).to.equal(3);
    });
  });
});
