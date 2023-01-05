const mongoose = require("mongoose");
const validator = require("validator");

const studentschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    // validate(value) {
    //   if (!validator.isEmail(value)) {
    //     throw new Error("invalid Email");
    //   }
    // },
  },
  phone: Number,

  profileimg: {
    type: String,
  },
  resume: {
    type: String,
  },
});

const Student = new mongoose.model("Student", studentschema);
module.exports = Student;
