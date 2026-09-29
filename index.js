const express = require("express");

const connect = require("./connect");

const Employee = require("./model/employeSchema");

const app = express();

connect();

app.use(express.json());


app.post("/employees", async function (req, res) {
  const employee = new Employee(req.body);
  try {
    const result = await employee.save();
    res.json(result);
  } catch (error) {
    res.send(error.message)
  }
});



app.get("/employees", async function (req, res) {

  const employees = await Employee.find();

  res.json(employees);

});


app.listen(3000, function () {
  console.log("Server running on port 3000");
});