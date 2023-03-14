const express = require("express");
const { Drug } = require("../models/models");
const router = express.Router();

// adding a new drug.

router.all("/new/drug", async (req, res) => {
  try {
    const drug_check = await Drug.findOne({
      $and: [{ ph_id: req.body.ph_id }, { drug_name: req.body.drug_name }],
    });
    if (drug_check) {
      res.send({
        data: "Drug exists",
        result: drug_check,
        status: false,
      });
    } else {
      const drug = new Drug({
        ph_id: req.body.ph_id,
        drug_category: req.body.drug_category,
        drug_name: req.body.drug_name,
        drug_quantity: req.body.drug_quantity,
        cost_price: req.body.cost_price,
        selling_price: req.body.selling_price,
        manufacturing_date: req.body.manufacturing_date,
        expiry_date: req.body.expiry_date,
        barcode_no: req.body.barcode_no,
      });
      const new_drug = await drug.save();
      res.send({
        data: "drug added",
        status: true,
        result: new_drug,
      });
    }
  } catch (error) {
    res.send({
      data: "Un expected error",
      result: error,
      status: false,
    });
  }
});

//getting all drugs in the database
router.get("/alldrugs", async (req, res) => {
  try {
    const drugs = await Drug.find();
    if (drugs) {
      res.send({
        data: "Drug exists",
        status: true,
        result: drugs,
      });
    } else {
      res.send({
        data: "No drugs",
        status: false,
      });
    }
  } catch (error) {
    res.send({
      data: "Un expected error",
      result: error,
      status: false,
    });
  }
});

//getting drugs of a certain business
router.get("/drugs/pharmacy/:ph_id", async (req, res) => {
  try {
    const drug = await Drug.find({ ph_id: req.params.ph_id });
    if (drug) {
      res.send({
        data: "Drug exists",
        status: true,
        result: drug,
      });
    } else {
      res.send({
        data: "No drugs",
        status: false,
      });
    }
  } catch (error) {
    res.send({
      data: "Un expected error",
      result: error,
      status: false,
    });
  }
});

module.exports = router;
