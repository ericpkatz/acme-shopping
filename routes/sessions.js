const express = require("express");
const app = express.Router();
const { User, Order, conn } = require("../db");
const { isLoggedIn } = require("./middleware");

module.exports = app;

app.post("/", async (req, res, next) => {
  try {
    const credentials = {
      username: req.body.username,
      password: req.body.password,
    };
    res.send({ token: await User.authenticate(credentials) });
  } catch (ex) {
    next(ex);
  }
});

app.get("/", isLoggedIn, async (req, res, next) => {
  res.send(req.user);
});

app.put("/user", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.update(req.body));
  } catch (error) {
    next(error);
  }
});

app.put("/user/credential", isLoggedIn, async (req, res, next) => {
  try {
    await req.user.update(req.body);
    const credentials = {
      username: req.body.username,
      password: req.body.password,
    };
    res.send(credentials);
  } catch (error) {
    next(error);
  }
});

app.post("/user", async (req, res, next) => {
  try {
    await User.createAccount(req.body);
    const credentials = {
      username: req.body.username,
      password: req.body.password,
    };
    res.send(credentials);
  } catch (ex) {
    next(ex);
  }
});

//====================
//createGuest if none -
app.post("/guest/", async (req, res, next) => {
  try {
    const guest = await User.createGuestAccount();
    res.send(guest);
  } catch (ex) {
    next(ex);
  }
});

//finds if guest
app.get("/guest", async (req, res, next) => {
  try {
    const guestUser = await User.findOne({
      where: {
        isGuest: true,
      },
      include: [
        {
          model: conn.models.order,
        },
      ],
    });
    // console.log(guestUser);
    if (!guestUser) {
      res.send(false);
    } else {
      res.send(guestUser);
    }
  } catch (ex) {
    next(ex);
  }
});

//update guest
app.put("/guest", async (req, res, next) => {
  try {
    let guestUser = await User.findOne({
      where: {
        isGuest: true,
      },
      include: [
        {
          model: conn.models.order,
        },
      ],
    });
    // console.log(guestUser.id);

    guestUser = await guestUser.update(req.body);
    // console.log(guestUser);
    // User.guestAuthenticate(guestUser);
    res.send(guestUser);
  } catch (error) {
    next(error);
  }
});
