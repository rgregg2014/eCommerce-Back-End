const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

//--------------------------This is working
router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const prodTags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(prodTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

//------------------------------This is working
router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const prodTags = await Tag.findOne({
      where: { id: req.params.id },
      include: [{ model: Product }],
    });
    if (!prodTags) {
      res
        .status(404)
        .json({ message: "No product found. Please try another ID." });
      return;
    }
    res.status(200).json(prodTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

//----------------------------This is working!
router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//------------------------------This is working!
router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: { id: req.params.id },
  })
    .then((prodTags) => {
      if (!prodTags) {
        res.status(404).json({ message: "No tag with that ID!" });
        return;
      }
      res.json(prodTags);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//-------------------------------This is working!
router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: { id: req.params.id },
  })
    .then((prodTags) => {
      if (!prodTags) {
        res.status(404).json({ message: "Heck! No Tag Found!" });
        return;
      }
      res.json(prodTags);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
