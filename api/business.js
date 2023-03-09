const express = require("express");
const { Business } = require("../models/models");
const router = express.Router();

router.post("/new/business", async (req, res) => {
  const b_check = await Business.findOne({
    b_name: req.body.b_name,
  });
  if (b_check) {
    res.send({
      data: "Name already taken",
      status: false,
    });
  } else {
    const business = new Business({
      b_name: req.body.b_name,
      b_location: req.body.b_location,
      b_owner: req.body.b_owner,
      owner_email: req.body.owner_email,
      owner_tel: req.body.owner_tel,
    });
    try {
      const new_business = await business.save();
      res.send({
        data: "business added",
        status: true,
        result: new_business,
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

// route for editing a business
router.put("/edit/business/id:", async (req, res) => {
  try {
    const current_business = await Business.findById(req.params.id);
    const updated_business = await Business.updateOne(
      { _id: req.params.id },
      {
        $set: {
          b_name: req.body.b_name || current_business.b_name,
          b_location: req.body.b_location || current_business.b_location,
          b_owner: req.body.b_owner || current_business.b_owner,
          owner_email: req.body.owner_email || current_business.owner_email,
          owner_tel: req.body.owner_tel || current_business.owner_tel,
        },
      }
    );
    res.send({
      data: "business Updated",
      status: true,
      result: updated_business,
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

//api for deleting all businesses in the database  at once
// this api is specifically for backend use..... do not render it in the front end
// because it is more harmful to the data

router.delete("/delete/allbusinesses", async (req, res) => {
  try {
    const all_businesses = await Business.find();
    if (all_businesses) {
      const delete_business = await Business.deleteMany();
      res.send({
        status: true,
        data: "deleted",
        result: delete_business,
      });
    } else {
      res.send({
        status: false,
        data: "No Businesses Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "Un expected error", result: error });
  }
});

//api for deleting a business by a given id
router.delete("/delete/business/:id", async (req, res) => {
  try {
    const current_business = await Business.findById(req.params.id);
    if (current_business) {
      const delete_business = await Business.deleteOne({
        _id: req.params.id,
      });
      res.send({
        status: true,
        data: "deleted",
        result: delete_business,
      });
    } else {
      res.send({
        status: true,
        data: "business not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "Un expected error", result: error });
  }
});

//api for displaying all businesses
router.get("/allbusinesses", async (req, res) => {
  try {
    const all_bss = await Pharmacy.find();
    res.send({
      data: "businesses available",
      status: true,
      result: all_bss,
    });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "Un expected error", result: error });
  }
});

//api for displaying a business by b_id.
router.get("/one/business/:id", async (req, res) => {
  try {
    const business = await Pharmacy.findById(req.params.id);
    res.send({
      status: true,
      result: business,
      data: "My business",
    });
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});

module.exports = router;
