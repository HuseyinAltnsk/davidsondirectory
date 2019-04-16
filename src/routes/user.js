const router = require("express").Router();
const User = require("mongoose").model("User");

// get all users
router.get("/", (req, res) => {
  User.find({}, (err, doc) => {}).exec((err, users) => {
    if (err) res.status(500).send({ message: "Could not get users" });
    else res.send(users || []);
  });
});

// get the current user
router.get("/current", (req, res) => {
  User.findOne(
    req.user.student,
    (err, result) => {
      console.log("finding user: " + result);
    }
  );
  console.log("-----------GETTING CURRENT USER:----------")
  console.log(JSON.stringify(req.user));
  console.log("------------------------------------------")
  res.send(req.user);
});

// add a new user
router.post("/", (req, res) => {
  let user = req.body;
  user = new User(user);
  //save to db
  user.save((err, doc) => {
    if (err) {
      res.status(403).send({ message: err.message || "Could not save user." });
    } else {
      res.send(doc);
    }
  });
});

// delete a user
router.post("/delete", (req, res) => {
  User.remove().exec((err, result) => { res.send(result) });
});


module.exports = router;
