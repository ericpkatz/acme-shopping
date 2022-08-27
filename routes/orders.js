const express = require("express");
const { Order, conn, User } = require("../db");
const { Product } = require("../db/Product");
const app = express.Router();
const { isLoggedIn } = require("./middleware");

module.exports = app;

app.get('/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.getOrders());
  } catch (err) {
    next(err);
  }
});

app.get('/userorders', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.getUserOrders());
  } catch (err) {
    next(err);
  }
});

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



// app.get("/", async (req, res, next) => {
//   try {
//     res.send(
//       await Order.findOne({
//         where: {
//           isCart: true,
//         },
//         include: [
//           {
//             model: conn.models.lineItem,
//             include: [conn.models.product],
//           },
//         ],
//       })
//     );
//   } catch (ex) {
//     next(ex);
//   }
// });
//testing branch
// app.get("/guest", async (req, res, next) => {
//   try {
//     const guest = await User.findOne({
//       where: {
//         isGuest: true,
//       },
//       include: [
//         {
//           model: conn.models.order,
//           include: [conn.models.lineItem],
//         },
//       ],
//     });
//     res.send(guest);
//   } catch (ex) {
//     next(ex);
//   }
// });

// app.put("/cart", async (req, res, next) => {
//   try {
//     res.send(await Order.update());
//   } catch (ex) {
//     next(ex);
//   }
// });

app.get("/Chloe", async (req, res, next) => {
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