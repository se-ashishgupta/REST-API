const express = require("express");
const router = new express.Router();
const Student = require("../models/schema");
const upload = require("../middleware/uploads");

// app.post("/student", (req, res) => {
//   console.log(req.body);
//   const user = new Student(req.body);
//   user.save((err) => {
//     if (err) {
//       res.status(400).send(err);
//     } else {
//       res.status(201).send(user);
//     }
//   });
// });
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, callback) => {
//   if (
//     file.mimetype == "image/png" ||
//     file.mimetype == "image/jpg" ||
//     file.mimetype == "image/jpeg"
//   ) {
//     callback(null, true);
//   } else {
//     console.log("uplaod png and jpg file only");
//     callback(null, false);
//   }
// };
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 2,
//   },
//   fileFilter: fileFilter,
// }).single("profileimg");

//using async function
router.post("/student", upload, async (req, res, next) => {
  try {
    // const user = new Student(req.body);
    const user = new Student({
      phone: req.body.phone,
      email: req.body.email,
      profileimg: req.files["profileimg"][0].path,
      // resume: req.files["resume"][0].path,
    });

    const userid = await user.save();
    res.status(201).send(userid);
  } catch (err) {
    res.status(400).send(err);
  }
});

//gte data of student
router.get("/student", async (req, res) => {
  try {
    const userid = await Student.find();
    res.status(201).send(userid);
  } catch (err) {
    res.status(400).send(err);
  }
});

//get data of individual student

router.get("/student/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const userid = await Student.findById(_id);
    console.log(userid);

    if (!userid) {
      return res.status(201).send("Not Found");
    } else {
      res.send(userid);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

//delete data of student

router.delete("/student/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const userid = await Student.findByIdAndDelete(_id);

    if (!userid) {
      return res.status(201).send();
    } else {
      res.send(userid);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

//update sutudent data

router.patch("/student/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const userid = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(userid);
    console.log(userid);
  } catch (err) {
    res.status(400).send(err);
  }
});

// upload images

module.exports = router;
