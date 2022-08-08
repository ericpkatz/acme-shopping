const { conn, User } = require('./db');
const app = require('supertest')(require('./app'));
const { expect } = require('chai');

describe('Authenticating', ()=> {
  beforeEach(async()=> {
    await conn.sync({ force: true });
    await User.create({ username: 'moe', password: 'MOE'});
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
});
