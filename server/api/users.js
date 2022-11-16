const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { requireAdminToken, requireToken } = require("../auth/index");

module.exports = router;

// GET all users -> /api/users
// admin auth
router.get("/", requireAdminToken, async (req, res, next) => {
  try {
    let users;
    if (req.query) {
      console.log(req.query);
      const filterObject = {};

      //add page and perPage
      if (req.query.range) {
        const range = JSON.parse(req.query.range);
        filterObject.limit = range[1] - range[0] + 1;
        filterObject.offset = range[0];
      }

      if (req.query.sort) {
        const sort = JSON.parse(req.query.sort);
        filterObject.order = [sort];
      }

      users = await User.findAll(filterObject);
    } else {
      users = await User.findAll();
    }

    const numUsers = await User.count();

    if (req.query.range) {
      const range = JSON.parse(req.query.range);
      res.header("Content-Range", `users ${range[0]}-${range[1]}/${numUsers}`);
    } else {
      res.header("Content-Range", `users 0-${numUsers}/${numUsers}`);
    }
    res.send(users);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// Get single user - required for admin panel - /api/users/:userId
router.get("/:userId", requireAdminToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

// PUT a single user -> /api/users/:userId
router.put("/:userId", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const updateInfo = {};
    for (let keys in req.body) {
      if (keys === "userId") {
        continue;
      }
      updateInfo[keys] = req.body[keys];
    }
    if (user.password === req.user.password || req.user.isAdmin) {
      const updatedUser = await user.update(updateInfo);
      res.status(200).send(updatedUser);
    } else {
      const error = Error("Unauthorized User");
      error.status = 401;
      throw error;
    }
  } catch (err) {
    next(err);
  }
});

// DELETE a single user -> /api/users/:userId
router.delete("/:userId", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user.password === req.user.password || req.user.isAdmin) {
      await User.destroy({
        where: {
          id: req.params.userId,
        },
      });
      res.status(204).end();
    } else {
      const error = Error("Unauthorized User");
      error.status = 401;
      throw error;
    }
  } catch (err) {
    next(err);
  }
});

// CREATE a single user via admin panel -> /api/users
router.post("/", requireAdminToken, async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});
