const express = require('express');
const app = express.Router();
const { User } = require('../db');
const { isLoggedIn } = require('./middleware');

module.exports = app;

app.post('/', async(req, res, next)=> {
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

app.get('/', isLoggedIn, async(req, res, next)=> {
  res.send(req.user);
});

app.put('/user', isLoggedIn ,async(req,res,next)=>{
  try {
    res.send(await req.user.update(req.body));
  } catch (error) {
    next(error);
  }
});

app.post('/user', async(req, res, next) => {
  try {
    await User.createAccount(req.body);
    const credentials = {
      username: req.body.username,
      password: req.body.password
    }
    res.send(credentials);
  }
  catch(ex){
    next(ex)
  }
});