const express = require("express");
const { Employee, Manager } = require("../models/models");
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

//api for loging in of the manager and employee
// Manager details are hard coded from here.
router.post("/login/admin", async (req, res) => {
  if (
    req.body.email === "manager@gmail.com" &&
    req.body.password === "manager"
  ) {
    res.send({ status: true, role: "manager", user: { username: "manager" } });
  } else {
    try {
      const current_employee = await Employee.findOne({
        $and: [
          { e_email: req.body.e_email },
          {
            e_password: req.body.e_password,
          },
        ],
      });
      current_employee
        ? res.send({
            user: current_employee,
            role: "employee",
            status: true,
          })
        : res.send({ status: false, data: "Wrong Details" });
    } catch (error) {
      console.log(error);
      res.send({
        status: false,
        data: "Un Expected Error",
      });
    }
  }
});

module.exports = router;
