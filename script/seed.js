"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");
const axios = require("axios");

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
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

  const url =
    "https://api.discogs.com/database/search?type=release&format=vinyl&per_page=100&page=1&sort=have";
  const { data } = await axios.get(url, config);

  const albumData = [];
  for (let i = 0; i < data.results.length; i++) {
    const { data: album } = await axios.get(
      data.results[i].resource_url,
      config
    );
    albumData.push(album);
    await delay(1050);
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
        inventory: Math.round(Math.random() * 15),
      });
    })
  );

  // // Creating Users
  // const users = await Promise.all([
  //   User.create({ username: 'cody', password: '123' }),
  //   User.create({ username: 'murphy', password: '123' }),
  // ])

  // console.log(`seeded ${users.length} users`)
  // console.log(`seeded successfully`)
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1]
  //   }
  // }
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
