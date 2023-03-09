const express = require("express");
const { Category } = require("../models/models");
const router = express.Router();

router.post("/new/category", async (req, res) => {
  try {
    const category_check = new Category.findOne({
      category_name: req.body.category_name,
    });
    if (category_check) {
      res.send({
        data: "category exists",
        status: false,
        result: category_check,
      });
    } else {
      const new_category = await Category({
        category_name: req.body.category_name,
        b_id: req.body.b_id,
      });
      const category = new_category.save();

      res.send({
        status: true,
        data: "cateory added",
        result: category,
      });
    }
  } catch (error) {
    res.send({
      data: "un expected error",
      result: error,
      status: false,
    });
  }
});
