const express = require("express");
const { Pharmacy } = require("../models/models");
const router = express.Router();

//router for creating a new pharmacy
router.post("/new/pharmacy", async (req, res) => {
  const ph_check = await Pharmacy.findOne({
    $and: [{ ph_name: req.body.ph_name }, { m_id: req.body.m_id }],
  });
  if (ph_check) {
    res.send({
      data: "pharmacy exists",
      status: false,
    });
  } else {
    const pharmacy = new Pharmacy({
      m_id: req.body.m_id,
      ph_name: req.body.ph_name,
      ph_location: req.body.ph_location,
      ph_owner: req.body.ph_owner,
      owner_email: req.body.owner_email,
      owner_tel: req.body.owner_tel,
    });
    try {
      const new_pharmacy = await pharmacy.save();
      res.send({
        data: "pharmacy added",
        status: true,
        result: new_pharmacy,
      });
    } catch (error) {
      res.send({
        status: false,
        result: error,
        data: "Un expected error",
      });
    }
  }
});

// route for editing a pharmacy
router.put("/edit/pharmacy/id:", async (req, res) => {
  try {
    const current_pharmacy = await Pharmacy.findById(req.params.id);
    const updated_pharmacy = await Pharmacy.updateOne(
      { _id: req.params.id },
      {
        $set: {
          ph_name: req.body.ph_name || current_business.ph_name,
          ph_location: req.body.ph_location || current_business.ph_location,
          ph_owner: req.body.ph_owner || current_business.ph_owner,
          owner_email: req.body.owner_email || current_business.owner_email,
          owner_tel: req.body.owner_tel || current_business.owner_tel,
        },
      }
    );
    res.send({
      data: "pharmacy Updated",
      status: true,
      result: updated_pharmacy,
    });
  } catch (error) {
    // console.log(error);
    res.send({
      status: false,
      data: "Un expexted error",
      result: error,
    });
  }
});

//api for deleting all pharmacies in the database  at once
// this api is specifically for backend use..... do not render it in the front end
// because it is more harmful to the data

router.delete("/delete/allphamarcies", async (req, res) => {
  try {
    const all_pharmacies = await Pharmacy.find();
    if (all_pharmacies) {
      const delete_pharmacies = await Pharmacy.deleteMany();
      res.send({
        status: true,
        data: "deleted",
        result: delete_pharmacies,
      });
    } else {
      res.send({
        status: false,
        data: "No Pharmacies Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "Un expected error", result: error });
  }
});

//api for deleting a pharmacy by a given id
router.delete("/delete/pharmacy/:id", async (req, res) => {
  try {
    const current_pharmacy = await Pharmacy.findById(req.params.id);
    if (current_pharmacy) {
      const delete_pharmacy = await Pharmacy.deleteOne({
        _id: req.params.id,
      });
      res.send({
        status: true,
        data: "deleted",
        result: delete_pharmacy,
      });
    } else {
      res.send({
        status: true,
        data: "pharmacy not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "Un expected error", result: error });
  }
});

//api for displaying all pharmacies
router.get("/allpharmacies", async (req, res) => {
  try {
    const all_pharmacies = await Pharmacy.find();
    res.send({
      data: "pharmacies available",
      status: true,
      result: all_pharmacies,
    });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "Un expected error", result: error });
  }
});

//api for displaying a pharmacy by b_id.
router.get("/one/pharmacy/:id", async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findById(req.params.id);
    res.send({
      status: true,
      result: pharmacy,
      data: "My pharmacy",
    });
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});

module.exports = router;
