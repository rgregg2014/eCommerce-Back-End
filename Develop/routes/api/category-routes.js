const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

//------------------------------This is working
router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//-------------------------------This is working
router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: "Oops! No product with that ID!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//------------------------------This is working
router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//------These both work, but are not displaying what I want them to
router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: { id: req.params.id },
  })
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: "No category with that ID!" });
        return;
      }
      res.json(categoryData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.params.id },
  })
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: "Heck! No Tag Found!" });
        return;
      }
      res.json(categoryData);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
