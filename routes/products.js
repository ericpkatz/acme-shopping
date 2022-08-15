const express = require('express');
const { Product } = require('../db/Product');
const app = express.Router();
const { isLoggedIn } = require('./middleware');

module.exports = app;

//get all products with authentication
app.get('/products', isLoggedIn, async(req, res, next)=> {
    try {
      res.send(await req.user.getProducts());
    }
    catch(ex){
      next(ex);
    }
  });
  //create a product with authentication
  app.post('/products', isLoggedIn, async(req, res, next) => {
    try{
      res.send(await Product.create(req.body));
    }
    catch(ex){
      next(ex)
    }
  });
  //edit/update specific product with authentication
  app.put('/products/:id', isLoggedIn, async(req, res, next) => {
    try{
      res.send(await Product.update(req.body));
    }
    catch(ex){
      next(ex)
    }
  });
  //delete specific product with authentication
  app.delete('/products/:id', isLoggedIn, async(req, res, next) => {
    try{
      const product = await Product.findByPk(req.params.id);
      await product.destroy();
      res.sendStatus(204);
    }
    catch(ex){
      next(ex)
    }
  });