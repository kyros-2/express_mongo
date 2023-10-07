const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");

router.get("/fromexroute", (req, res) => {
  res.json({ data: "hello" });
});

router.get("/fromcontroller", ProductController.getAllPrducts);

module.exports = router;
