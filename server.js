const app = require("./app");
const { conn, User, Product } = require("./db");
const { faker } = require("@faker-js/faker");
console.log();
const setUp = async () => {
  try {
    await conn.sync({ force: true });
    await User.create({
      username: "moe",
      password: "moe_pw",
      email: faker.internet.email("moe", null, "fakeMail.dev"),
      imageUrl: faker.image.people(640, 480),
      address: faker.address.streetAddress(true),
    });
    const lucy = await User.create({
      username: "lucy",
      password: "lucy_pw",
      email: faker.internet.email("lucy", null, "fakeMail.dev"),
      imageUrl: faker.image.people(640, 480),
      address: faker.address.streetAddress(true),
    });
    const foo = await Product.create({
      name: "foo",
      description: faker.lorem.paragraph(1),
      price: faker.finance.amount(0.05, 20, 2),
    });
    const bar = await Product.create({
      name: "bar",
      description: faker.lorem.paragraph(1),
      price: faker.finance.amount(0.05, 20, 2),
    });
    await lucy.addToCart({ product: foo, quantity: 3 });
    await lucy.addToCart({ product: bar, quantity: 4 });
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

setUp();
