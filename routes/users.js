const express = require("express");
const app = express.Router();
const { isLoggedIn } = require("./middleware");

module.exports = app;

//get all users
app.get('/', isLoggedIn, async(req, res, next) => {
    try {
        res.send(await req.user.getUsers());
    }
    catch(ex){
      next(ex)
    }
  });