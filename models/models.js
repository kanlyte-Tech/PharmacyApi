const mongoose = require("mongoose");

//converts _id to id
const id = (schema) => {
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id;
    },
  });
};
//model for registering a new employee
const registeremployeeSchema = new mongoose.Schema({
  e_name: {
    type: String,
    required: true,
  },
  e_number: {
    type: Number,
    required: true,
  },
  e_email: {
    type: String,
    required: true,
  },
  e_password: {
    type: String,
    required: true,
  },
});

id(registeremployeeSchema);
const Employee = new mongoose.model("employees", registeremployeeSchema);

//model for adding a new business
const registerbusinessschema = new mongoose.Schema({
  b_name: {
    type: String,
    required: true,
  },
  b_location: {
    type: String,
    required: true,
  },
  b_owner: {
    type: String,
    required: true,
  },
  owner_tel: {
    type: Number,
    required: true,
  },
  owner_email: {
    type: String,
    required: true,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
});
id(registerbusinessschema);
const Business = mongoose.model("business", registerbusinessschema);

//model for adding a new manager
const registermanagerschema = new mongoose.Schema({
  m_name: {
    type: String,
    required: true,
  },
  m_number: {
    type: Number,
    required: true,
  },
  m_location: {
    type: String,
    required: true,
  },
  m_email: {
    type: String,
    required: true,
  },
  m_password: {
    type: String,
    required: true,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
});
id(registermanagerschema);
const Manager = mongoose.model("manager", registermanagerschema);

//model for adding a new category
const categorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },
  b_id: {
    type: String,
    required: true,
  },
  category_date: {
    type: Date,
    default: Date.now,
  },
});
id(categorySchema);
const Category = mongoose.model("category", categorySchema);
module.exports = {
  Employee,
  Business,
  Category,
  Manager,
};
