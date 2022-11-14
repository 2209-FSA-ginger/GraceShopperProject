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
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        "id",
        "firstName",
        "lastName",
        "username",
        "isAdmin",
        "email",
      ],
    });
    res.send(users);
  } catch (err) {
    next(err);
  }
});

// PUT a single user -> /api/users/:userId
router.put("/:userId", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const updateInfo = {}
    for(let keys in req.body){
      if(keys === "userId"){
        continue;
      }
      updateInfo[keys] = req.body[keys]
    }
    if (user.password === req.user.password) {
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
    if (user.password === req.user.password) {
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
