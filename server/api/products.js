const router = require("express").Router();
const Sequelize = require("sequelize")
const {
  models: { Product, User },
} = require("../db");
module.exports = router;
const { requireAdminToken } =  require("../auth/index");

// GET /api/products
// No auth
router.get("/", async (req, res, next) => {
  try {
    let products
    if(req.query){
      const filterObject = {}

      //add page limit
      if(req.query.limit) filterObject.limit = req.query.limit
      
      //add offset
      if(req.query.page) filterObject.offset = (req.query.page - 1) * 3

      //filterCategory and filter (filterCategory refers to the property you want to filter eg. genre, 
      //and filter is how you want to filter the category eg. pop)
      if(req.query.filterCategory && req.query.filter) {
        if(req.query.filterCategory === "all"){
          let modelColumns = []
          for(let keys in Product.rawAttributes){
            if(Product.rawAttributes[keys].type.key === "STRING"){
              modelColumns.push({[keys]:{ [Sequelize.Op.substring]: req.query.filter}})
            }
          }
          filterObject.where = {[Sequelize.Op.or]: modelColumns}
        } else {
          filterObject.where = {[req.query.filterCategory] : {
            [Sequelize.Op.substring] : req.query.filter
          }}
        }
      } 

      //order and scale (order refers to column name, scale refers to ASC or DESC )
      if(req.query.order && req.query.scale) filterObject.order = [[req.query.order, req.query.scale]]

      products = await Product.findAll(filterObject);
    } else {
      products = await Product.findAll();
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
    const product = await Product.create(req.body);
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
