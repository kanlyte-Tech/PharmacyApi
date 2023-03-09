const express = require("express");
const { Category } = require("../models/models");
const router = express.Router();

router.post("/new/category", async (req, res) => {
  const category_check = new Category.findOne({
    category_name: req.body.category_name,
  });
});
