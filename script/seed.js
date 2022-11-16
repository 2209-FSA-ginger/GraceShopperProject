"use strict";

const {
  db,
  models: { User, CartItem, Order, Product, OrderProduct },
} = require("../server/db");
const axios = require("axios");

//////// HELPER FUNCTIONS

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function createNameOrPassword(info) {
  let name = "";
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  for (let i = 0; i < 4; i++) {
    const randomnum = Math.floor(Math.random() * (25 - 0 + 1));
    if (info === "name" && i === 0) {
      name += alphabet[randomnum].toUpperCase();
    } else {
      name += alphabet[randomnum];
    }
  }
  return name;
}

function isAdmin() {
  const randomNum = Math.floor(Math.random() * (2 - 1 + 1) + 1);
  if (randomNum === 2) {
    return true;
  } else {
    return false;
  }
}

function createEmail() {
  let name = "";
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  for (let i = 0; i < 4; i++) {
    const randomnum = Math.floor(Math.random() * (25 - 0 + 1));
    name += alphabet[randomnum];
  }
  name += "@gmail.com";
  return name;
}

function createQuantityOrPrice(info) {
  let randomNum;
  if (info === "quantity") {
    randomNum = Math.floor(Math.random() * 21);
  } else if (info === "price") {
    randomNum = Math.floor(Math.random() * (10000 - 100) + 100) / 100;
  }

  return randomNum;
}

function createUserId() {
  const randomNum = Math.floor(Math.random() * (100 - 1 + 1) + 1);
  return randomNum;
}

function createNumberInfo(info) {
  let randomNum;
  if (info === "zipcode") {
    randomNum = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
  } else if (info === "phone") {
    randomNum = Math.floor(
      Math.random() * (9999999999 - 1000000000 + 1) + 1000000000
    );
  } else if (info === "creditCard") {
    randomNum = Math.floor(
      Math.random() * (9999999999999999 - 1000000000000000 + 1) +
        1000000000000000
    );
  }
  return randomNum;
}

function createLocationName(location) {
  let name = "";
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  for (let i = 0; i < 4; i++) {
    const randomnum = Math.floor(Math.random() * (25 - 0 + 1));
    if (i === 0) {
      name += alphabet[randomnum].toUpperCase();
    } else {
      name += alphabet[randomnum];
    }
  }
  if (location === "street") {
    name += " Street";
  } else if (location === "city") {
    name += " City";
  } else if (location === "state") {
    name += " State";
  } else if (location === "country") {
    name += "Country";
  }

  return name;
}

const users = [];
for (let i = 0; i < 100; i++) {
  users.push({
    firstName: createNameOrPassword("name"),
    lastName: createNameOrPassword("name"),
    username: createNameOrPassword(),
    password: createNameOrPassword(),
    isAdmin: isAdmin(),
    email: createEmail(),
  });
}

const guests = [];
for (let i = 0; i < 50; i++) {
  guests.push({
    firstName: createNameOrPassword("name"),
    lastName: createNameOrPassword("name"),
    addressLine1: createLocationName("street"),
    addressLine2: createLocationName("street"),
    city: createLocationName("city"),
    state: createLocationName("state"),
    country: createLocationName("country"),
    zipcode: createNumberInfo("zipcode"),
    phone: createNumberInfo("phone"),
    email: createEmail(),
    creditCard: createNumberInfo("creditCard"),
  });
}
const cartItems = [];
for (let j = 0; j < 500; j++) {
  cartItems.push({ quantity: createQuantityOrPrice("quantity") });
}

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // pulling data from discog API
  const config = {
    headers: {
      Authorization: "Discogs token=IpaLmbvZLgbnIhEgTvAhGJpDwrmbuHOKFegEjGKx",
    },
  };

  const apiUrl = (page) => {
    return `https://api.discogs.com/database/search?type=release&format=vinyl&per_page=100&page=${page}&sort=have`;
  };
  let albumList = [];
  for (let i = 1; i < 6; i++) {
    const { data } = await axios.get(apiUrl(i), config);
    albumList = [...albumList, ...data.results];
  }

  //console.log(albumList);
  const albumData = [];
  for (let i = 0; i < albumList.length; i++) {
    const { data: album } = await axios.get(albumList[i].resource_url, config);
    albumData.push(album);
    await delay(1050); // was 1050
  }

  //Creating Products
  const products = await Promise.all(
    albumData.map((album) => {
      const tracklist = album.tracklist
        .map((track) => {
          return `${track.position} - ${track.title} - ${track.duration}`;
        })
        .join();

      return Product.create({
        albumId: album.id,
        title: album.title,
        artist: album.artists_sort,
        genre: album.genres ? album.genres.join() : "",
        style: album.styles ? album.styles.join() : "",
        releaseDate: album.released,
        rating: album.community.rating.average,
        ratingCount: album.community.rating.count,
        notes: album.notes,
        tracklist: tracklist,
        price: album.lowest_price,
        displayPrice: 0,
        imageURL: album.images[0].resource_url,
        inventory: Math.round(Math.random() * 20),
      });
    })
  );

  // Creating Users
  await Promise.all(users.map((user) => User.create(user)));

  // Creating Cart Items
  await Promise.all(cartItems.map((cartItem) => CartItem.create(cartItem)));

  const allCartItems = await CartItem.findAll();
  await Promise.all(
    allCartItems.map((cartItem) => cartItem.setUser(createUserId()))
  );
  await Promise.all(
    allCartItems.map((cartItem) =>
      cartItem.setProduct(Math.floor(Math.random() * products.length + 1))
    )
  );

  // Creating Login Orders
  const orders = users.map((user) => {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      addressLine1: createLocationName("street"),
      addressLine2: createLocationName("street"),
      city: createLocationName("city"),
      state: createLocationName("state"),
      country: createLocationName("country"),
      zipcode: createNumberInfo("zipcode"),
      phone: createNumberInfo("phone"),
      email: user.email,
      creditCard: createNumberInfo("creditCard"),
    };
  });

  await Promise.all(orders.map((order) => Order.create(order)));

  const allOrders = await Order.findAll();
  await Promise.all(
    allOrders.map(async (order) => {
      const user = await User.findOne({
        where: {
          firstName: order.firstName,
          lastName: order.lastName,
          email: order.email,
        },
      });
      return order.setUser(user);
    })
  );

  //Creating Guest Orders
  await Promise.all(guests.map((guest) => Order.create(guest)));

  //Creating Order Products
  const everyOrder = await Order.findAll();

  const randomProducts = [];
  for (let i = 0; i < everyOrder.length; i++) {
    const arr = [];
    while (arr.length < Math.min(products.length, 3)) {
      const r = Math.floor(Math.random() * products.length) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    randomProducts.push(arr);
  }

  for (let i = 0; i < Math.min(products.length, 3); i++) {
    await Promise.all(
      everyOrder.map(async (order, j) => {
        const product = await Product.findByPk(randomProducts[j][i]);
        return OrderProduct.create({
          orderId: order.id,
          productId: product.id,
          quantity: createQuantityOrPrice("quantity"),
          price: product.displayPrice,
        });
      })
    );
  }

  //Creating
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
