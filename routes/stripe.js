const express = require('express');
const app = express.Router();
const { isLoggedIn } = require('./middleware');

const key = process.env.STRIPE_API_KEY;
const stripe = require('stripe')(key);

const port = process.env.PORT || 3000;
const DOMAIN = process.env.HEROKU_DOMAIN || `http://localhost:${port}`;

app.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const line_items = cart.lineItems.map(lineItem => {
      const product = lineItem.product.dataValues;
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.imgUrl],
          },
          unit_amount: 100 * product.price,
        },
        quantity: lineItem.quantity,
      };
    });

    // will only know if the checkout is successful if it goes to the success_url
    const session = await stripe.checkout.sessions.create({
      client_reference_id: cart.id,
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${DOMAIN}/#/products`,
      cancel_url: `${DOMAIN}/#/cart`,
    });
    const urlToGo = session.url;

    cart.destroy();
    res.json(urlToGo)
  }
  catch(err) {
    next(err);
  }
});

module.exports = app;
