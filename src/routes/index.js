const router = require("express").Router();
const path = require("path");

require("dotenv").config();

router.use("/user", require("./user.js"));

router.use("*", (req, res) => 
  res.sendFile(path.resolve(__dirname + "/../../build/index.html"))
);
module.exports = router;
