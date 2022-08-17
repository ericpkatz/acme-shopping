const express = require("express");
const { Product } = require("../db/Product");
const { LineItem } = require("../db");
const app = express.Router();
const { isLoggedIn } = require("./middleware");

module.exports = app;

app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.createOrderFromCart());
  } catch (ex) {
    next(ex);
  }
});

app.put("/cart", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.addToCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.get("/cart", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.getCart());
  } catch (ex) {
    next(ex);
  }
});

app.put("/cart/:id", isLoggedIn, async (req, res, next) => {
  try {
    const lineItem = await LineItem.findByPk(req.params.id);
    await lineItem.update(req.body);
  } catch (ex) {
    next(ex);
  }
});

app.get("/cart/1", isLoggedIn, async (req, res, next) => {
  try {
    console.log("\n /cart/1\n");
    const lineItem = await LineItem.findByPk(1);
    // console.log(lineItem);
    res.send(lineItem);
    // await thing.update(req.body);
  } catch (ex) {
    next(ex);
  }
});
