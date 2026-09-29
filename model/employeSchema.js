const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeName: String,
  age: Number,
  department: String,
  salary: Number,
  isPermanent: Boolean,
  joinedOn: Date,
  workEmail: String
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;