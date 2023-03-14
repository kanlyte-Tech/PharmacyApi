const express = require("express");
const { Supplier } = require("../models/models");
const router = express.Router();

router.post("/new/supplier", async (req, res) => {
  try {
    const check_supplier = await Supplier.findOne({
      $and: [{ s_email: req.body.s_email }, { ph_id: req.body.ph_id }],
    });
    if (check_supplier) {
      res.send({
        data: "supplier exists",
        status: false,
        result: check_supplier,
      });
    } else {
      const supplier = new Supplier({
        s_name: req.body.s_name,
        ph_id: req.body.ph_id,
        s_contact: req.body.s_contact,
        s_email: req.body.s_email,
        date_joined: req.body.date_joined,
      });

      const new_supplier = await supplier.save();

      res.send({
        status: true,
        data: "supplier added",
        result: new_supplier,
      });
    }
  } catch (error) {
    res.send({
      data: "un expected error",
      status: "false",
      result: error,
    });
  }
});

//api for displaying a supplier by ph_id

router.get("/supplier/pharmacy/:ph_id", async (req, res) => {
  try {
    const supplier = await Supplier.find({ ph_id: req.params.ph_id });
    if (supplier) {
      res.send({
        status: true,
        result: supplier,
        data: "My supplier",
      });
    } else {
      res.send({
        status: false,
        data: "No supplier",
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});

module.exports = router;
