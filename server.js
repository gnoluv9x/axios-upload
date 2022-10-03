const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const moment = require("moment");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    const ext = originalname.slice(originalname.lastIndexOf("."));
    const filename = originalname.slice(0, originalname.lastIndexOf("."));
    const nowTime = moment().format();
    cb(null, `${filename}_${nowTime}${ext}`);
  },
});

const upload = multer({ storage: storage });

const PORT = process.env.PORT || 3000;
// setting static
app.use("/static", express.static(path.join(__dirname, "static")));

// handle UPLOAD with multer
app.post("/profile", upload.single("avatar"), function (req, res, next) {
  // req.file is the `avatar` file
  console.log("req.file :", req.file);
  // req.body will hold the text fields, if there were any
  console.log(" req.body :", req.body);
  // return res.status(200).json({
  //   status: "success",
  //   data: {
  //     msg: "Upload file successfully!!!",
  //   },
  // });
});

app.use("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "index.html"));
});

// listening app
app.listen(PORT, () => {
  console.log(`Running at port: ${PORT}`);
});
