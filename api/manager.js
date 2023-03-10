const express = require("express");
const { Manager } = require("../models/models");
const router = express.Router();

//api for creating a new manager
router.post("/new/manager", async (req, res) => {
  try {
    const m_check = await Manager.findOne({
      $and: [{ m_number: req.body.m_number }, { m_email: req.body.m_email }],
    });

    if (m_check) {
      res.send({
        data: "Manager already exists",
        result: m_check,
        status: false,
      });
    } else {
      const new_manager = new Manager({
        m_name: req.body.m_name,
        m_location: req.body.m_location,
        m_number: req.body.m_number,
        m_email: req.body.m_email,
        m_password: req.body.m_password,
      });

      const manager = await new_manager.save();
      res.send({
        data: "Manager added",
        status: true,
        result: manager,
      });
    }
  } catch (error) {
    res.send({
      data: "un expected error",
      status: false,
      result: error,
    });
  }
});

//api for loging in of the manager
router.post("/login/manager", async (req, res) => {
  try {
    const manager = await Manager.findOne({
      $and: [
        { m_email: req.body.m_email },
        { m_password: req.body.m_password },
      ],
    });
    if (manager) {
      res.send({
        status: true,
        data: "Login successfully",
        result: manager,
      });
    } else {
      res.send({
        data: "No matching details",
        status: false,
      });
    }
  } catch (error) {
    res.send({
      data: "Un expected error",
      status: false,
      result: error,
    });
  }
});

module.exports = router;
