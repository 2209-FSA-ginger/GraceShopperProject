const router = require("express").Router();
const {
  models: { User },
} = require("../db");
import { requireAdminToken } from "../auth/index";

module.exports = router;

// GET all users -> /api/users
// admin auth - TO BE INCLUDED
router.get("/", requireAdminToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.send(users);
  } catch (err) {
    next(err);
  }
});

// GET a single user -> /api/users/:id
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

// PUT a single user -> /api/users/:id
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const updatedUser = await user.update(req.body);
    res.status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
});

// DELETE a single user -> /api/users/:id
router.delete("/:id", async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
