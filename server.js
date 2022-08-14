const app = require("./app");
const { conn, User, Product, CreditCard } = require("./db");
const { USERS } = require("./db/seed-data-users");

const setUp = async () => {
  try {
    await conn.sync({ force: true });
    // await User.create({ username: "moe", password: "moe_pw" });
    // const lucy = await User.create({ username: "lucy", password: "lucy_pw" });
    const createdUsers = await Promise.all(
      USERS.map((user) => User.create(user))
    );
    await CreditCard.create({
      nameOnCard: "Moe Foo",
      number: "1234123412341234",
      expirationMonth: 4,
      expirationYear: 25,
      pin: 573,
      userId: createdUsers[3].id,
    });
    // const foo = await Product.create({ name: "foo" });
    // const bar = await Product.create({ name: "bar" });
    // await lucy.addToCart({ product: foo, quantity: 3 });
    // await lucy.addToCart({ product: bar, quantity: 4 });
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

setUp();
