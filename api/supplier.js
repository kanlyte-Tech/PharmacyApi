const express = require("express");
const { Supplier } = require("../models/models");
const router = express.Router();

router.post("/new/supplier", async (req, res) => {
  try {
    const check_supplier = await Supplier.findOne({
      $and: [{ s_email: req.body.s_email }, { s_contact: req.body.s_contact }],
    });
    if (check_supplier) {
      res.send({
        data: "supplier exists",
        status: false,
        result: check_supplier,
      });
    } else {
    }
  } catch (error) {
    res.send({
      data: "un expected error",
      status: "false",
      result: error,
    });
  }
});
