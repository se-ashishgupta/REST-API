const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const DATA = "mongodb://0.0.0.0:27017/studentsapi";
mongoose.connect(DATA, (err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log("not Connected");
  }
});
