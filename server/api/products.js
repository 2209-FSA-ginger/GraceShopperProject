const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  models: { Product, User },
} = require("../db");
module.exports = router;
const { requireAdminToken } = require("../auth/index");
const axios = require("axios");

// GET /api/products
// No auth
router.get("/", async (req, res, next) => {
  try {
    let products;
    if (req.query) {
      const filterObject = {};

      //add page limit
      if (req.query.limit) filterObject.limit = req.query.limit;

      //add offset
      if (req.query.page) filterObject.offset = (req.query.page - 1) * req.query.limit;

      //filterCategory and filter (filterCategory refers to the property you want to filter eg. genre,
      //and filter is how you want to filter the category eg. pop)
      if (req.query.filterCategory && req.query.filter) {
        if (req.query.filterCategory === "all") {
          let modelColumns = [];
          for (let keys in Product.rawAttributes) {
            if (Product.rawAttributes[keys].type.key === "STRING") {
              modelColumns.push({
                [keys]: { [Sequelize.Op.substring]: req.query.filter },
              });
            }
          }
          filterObject.where = { [Sequelize.Op.or]: modelColumns };
        } else {
          filterObject.where = {
            [req.query.filterCategory]: {
              [Sequelize.Op.substring]: req.query.filter,
            },
          };
        }
      }

      //order and scale (order refers to column name, scale refers to ASC or DESC )
      if (req.query.order && req.query.scale)
        filterObject.order = [[req.query.order, req.query.scale]];

      //// FOR ADMIN PANEL
      if (req.query.range) {
        const range = JSON.parse(req.query.range);
        filterObject.limit = range[1] - range[0] + 1;
        filterObject.offset = range[0];
      }

      if (req.query.sort) {
        const sort = JSON.parse(req.query.sort);
        filterObject.order = [sort];
      }
      //////

      products = await Product.findAll(filterObject);
    } else {
      products = await Product.findAll();
    }

    const numProducts = await Product.count();

    if (req.query.range) {
      const range = JSON.parse(req.query.range);
      res.header(
        "Content-Range",
        `users ${range[0]}-${range[1]}/${numProducts}`
      );
    } else {
      res.header("Content-Range", `users 0-${numProducts}/${numProducts}`);
    }

    res.send(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:productId
// No auth
router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products
// admin auth
router.post("/", requireAdminToken, async (req, res, next) => {
  try {
    let product;
    if (!req.body.custom) {
      const config = {
        headers: {
          Authorization:
            "Discogs token=IpaLmbvZLgbnIhEgTvAhGJpDwrmbuHOKFegEjGKx",
        },
      };
      const { data: album } = await axios.get(
        `https://api.discogs.com/releases/${req.body.albumId}`,
        config
      );
      const tracklist = album.tracklist
        .map((track) => {
          return `${track.position} - ${track.title} - ${track.duration}`;
        })
        .join();
      product = await Product.create({
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
    } else {
      product = await Product.create(req.body);
    }
    res.status(201).send(product);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:productId
// admin auth
router.put("/:productId", requireAdminToken, async (req, res, next) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.productId,
      },
      returning: true,
      plain: true,
    });
    res.status(201).send(product[1]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:productId
// admin auth
router.delete("/:productId", requireAdminToken, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
