const express = require("express");
const { Order, conn } = require("../db");
const { Product } = require("../db/Product");
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

app.get("/", async (req, res, next) => {
  try {
    res.send(
      await Order.findOne({
        where: {
          isCart: false,
        },
        include: [
          {
            model: conn.models.lineItem,
            include: [conn.models.product],
          },
        ],
      })
    );
  } catch (ex) {
    next(ex);
  }
});
