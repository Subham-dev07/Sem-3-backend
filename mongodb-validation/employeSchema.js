const mongoose = require("mongoose");

/**
 * LEVEL 2 — Validation in the mongoose schema
 *
 * These rules live in our Node code. Mongoose runs them before it sends
 * anything to MongoDB, which means we get clear error messages and nothing
 * useless travels over the network.
 *
 * Remember one thing: these validators run on save() and create(). Update
 * methods such as findByIdAndUpdate skip them by default, so pass
 * { runValidators: true } when you update.
 */
const employeeSchema = new mongoose.Schema({
  employeeName: {
    type: String,

    // required: the field must be present and not empty.
    required: true,

    // Pass an array to any built-in validator when you want your own
    // message: [value, message]. Without the message mongoose generates a
    // generic one, which is fine but less helpful to the client.
    minLength: [3, "Employee name must be at least 3 characters long"],
  },

  // Shorthand form. When you only care about the type you can write the
  // type directly instead of an options object.
  age: Number,

  department: {
    type: String,

    // enum restricts the value to this fixed list. Anything else fails.
    // Keep the casing consistent, because the check is case-sensitive.
    enum: ["HR", "ENG", "SALES", "MARKETING"],
  },

  salary: Number,

  isPermanent: {
    type: Boolean,

    // default fills the field in when the request does not send it.
    // A default value is never validated, so make sure it is a legal one.
    default: false,
  },

  joinedOn: Date,

  workEmail: {
    type: String,

    // When no built-in validator fits, write your own. Return true to accept
    // the value and false to reject it; the message is what the client sees.
    //
    // Note: this runs only when the field has a value. If you also want the
    // field to be mandatory, add required: true alongside it.
    validate: {
      validator: function (email) {
        return email.endsWith("polariscampus.com");
      },
      message: "Please use your official work email address",
    },
  },
});

// The first argument is the model name. Mongoose lowercases and pluralises it
// for the collection, so "Employee" maps to the "employees" collection.
// This is also the name other schemas use in ref: "Employee".
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
