const express = require("express");
const { Employee } = require("../models/models");
const router = express.Router();

//route for registering an employee
router.post("/new/employee", async (req, res) => {
  const e_check = await Employee.findOne({
    $and: [{ e_email: req.body.e_email }, { e_number: req.body.e_number }],
  });
  if (e_check) {
    res.send({
      data: "employee exists",
      status: false,
    });
  } else {
    const employee = new Employee({
      ph_id: req.body.ph_id,
      e_name: req.body.e_name,
      e_email: req.body.e_email,
      e_number: req.body.e_number,
      e_password: req.body.e_password,
    });
    try {
      const new_employee = await employee.save();
      res.send({
        data: "Employee registered",
        status: true,
        result: new_employee,
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

//route for editing an employee
router.put("/edit/employee/:id", async (req, res) => {
  try {
    const current_employee = await Employee.findById(req.params.id);
    const updated_employee = await Employee.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          e_name: req.body.e_name || current_employee.e_name,
          e_email: req.body.e_email || current_employee.e_email,
          e_number: req.body.e_number || current_employee.e_number,
          e_password: req.body.e_password || current_employee.e_password,
        },
      }
    );
    res.send({
      data: "Employee Updated",
      status: true,
      result: updated_employee,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      data: "Un expexted error",
      result: error,
    });
  }
});

//api for deleting all employees at once
// this api is specifically for backend use..... do not render it in the front end
// because it is more harmful to the data

router.delete("/delete/allemployees", async (req, res) => {
  try {
    const all_employees = await Employee.find();
    if (all_employees) {
      const delete_employees = await Employee.deleteMany();
      res.send({
        status: true,
        data: "deleted",
        result: delete_employees,
      });
    } else {
      res.send({
        status: false,
        data: "No Employees Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "Un expected error", result: error });
  }
});

//api for deleting an employees by a given id
router.delete("/delete/employee/:id", async (req, res) => {
  try {
    const current_employee = await Employee.findById(req.params.id);
    if (current_employee) {
      const delete_employee = await Employee.deleteOne({
        _id: req.params.id,
      });
      res.send({
        status: true,
        data: "deleted",
        result: delete_employee,
      });
    } else {
      res.send({
        status: true,
        data: "Employee not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "Un expected error", result: error });
  }
});

//api for displaying all employees
router.get("/allemployees", async (req, res) => {
  try {
    const all_employees = await Employee.find();
    res.send({
      data: "Employees available",
      status: true,
      result: all_employees,
    });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "Un expected error", result: error });
  }
});

//api for displaying an employee by employee id.
router.get("/one/employee/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.send({
      status: true,
      result: employee,
      data: "My employee",
    });
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});

module.exports = router;
