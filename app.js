const express = require('express');
const app = express();
app.use(express.json());
const { User } = require('./db');
const path = require('path');

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.post('/api/sessions', async(req, res, next)=> {
  try {
    const credentials = {
      username: req.body.username, 
      password: req.body.password
    }
    res.send({ token: await User.authenticate(credentials)});
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/sessions', async(req, res, next)=> {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  }
  catch(ex){
    next(ex);
  }

});

module.exports = app;
