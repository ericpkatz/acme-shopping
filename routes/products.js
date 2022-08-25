const express = require('express');

const app = express.Router();
const { isLoggedIn } = require('./middleware');
module.exports = app;
//get all products with authentication
app.get('/', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.getProducts());
  }
  catch(ex){
    next(ex);
  }
});
app.post('/', isLoggedIn, async(req, res, next) => {
  try{
    if(req.user.isAdmin){
      res.status(201).send(await req.user.createProduct(req.body));
    }
  }
  catch(ex){
    next(ex)
  }
});
app.put('/:id', isLoggedIn, async(req, res, next) => {
  try{
    if(req.user.isAdmin){
      res.status(201).send(await req.user.updateProduct(req.body, req.params.id));
    }
  }
  catch(ex){
    next(ex)
  }
});
//create a product with authentication
// //edit/update specific product with authentication
// app.put('/:id', isLoggedIn, async(req, res, next) => {
//   try{
//     res.send(await Product.update(req.body));
  //   }
  //   catch(ex){
  //     next(ex)
  //   }
  // });
  // //delete specific product with authentication
  app.delete('/:id', isLoggedIn, async(req, res, next) => {
    try{
      if(req.user.isAdmin){
        await req.user.deleteProduct(req.params.id)
        res.sendStatus(204);
      }
    }
    catch(ex){
      next(ex)
    }
  });