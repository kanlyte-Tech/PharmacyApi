const express = require("express");
const { Stock } = require("../models/models");
const router = express.Router();

//api for adding stock to the pharmacy
router.post("/new/stock", async (req, res) => {
  try {
    const stock = new Stock({
      s_name: req.body.s_name,
      ph_id: req.body.ph_id,
      drug_supllied: req.body.drug_supllied,
      drug_quantity: req.body.drug_quantity,
      total_amount: req.body.total_amount,
      date_of_supply: req.body.date_of_supply,
    });

    const new_stock = await stock.save();
    res.send({
      status: true,
      data: "stock added",
      result: new_stock,
    });
  } catch (error) {
    res.send({
      data: "un expected error",
      status: "false",
      result: error,
    });
  }
});

//api for displaying stock by ph_id

router.get("/stock/pharmacy/:ph_id", async (req, res) => {
  try {
    const stock = await Stock.find({ ph_id: req.params.ph_id });
    if (stock) {
      res.send({
        status: true,
        result: stock,
        data: "My stock",
      });
    } else {
      res.send({
        status: false,
        data: "No stock",
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});

module.exports = router;
