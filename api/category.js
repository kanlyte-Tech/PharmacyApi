const express = require("express");
const { Category } = require("../models/models");
const router = express.Router();

router.post("/new/category", async (req, res) => {
  try {
    const category_check = await Category.findOne({
      category_name: req.body.category_name,
    });
    if (category_check) {
      res.send({
        data: "category exists",
        status: false,
        result: category_check,
      });
    } else {
      const new_category = new Category({
        category_name: req.body.category_name,
        ph_id: req.body.ph_id,
      });
      const category = await new_category.save();

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
//api for displaying categories by ph_id

router.get("/category/pharmacy/:ph_id", async (req, res) => {
  try {
    const category = await Category.find({ ph_id: req.params.ph_id });
    if (category) {
      res.send({
        status: true,
        result: category,
        data: "My categories",
      });
    } else {
      res.send({
        status: false,
        data: "No Category",
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});

module.exports = router;
