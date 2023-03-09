const express = require("express");
const { Employee } = require("../models/models");
const router = express.Router();

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
