const router = require("express").Router();
const passport = require("passport");

// router.use(passport.initialize());
// router.use(passport.session());

//GENERIC USAGE OF PASSPORT
//Authenticate users and redirect them depending on the success and failure

// authenticate users and redirect to dashboard if authentication succeeds
router.get("/login",
  passport.authenticate("microsoft", { failureRedirect: "/login/fail" }),
  (req, res) => res.redirect("/")
);

router.get("/login/callback",
  passport.authenticate("microsoft", { failureRedirect: "/login/fail" }),
  (req, res) => res.redirect("/")
);

// on failed login, send a message
router.get("/login/fail",
  (req, res) => res.send("Oops! Login failed. Try again.")
);

router.get("/login/permissions", (req, res) =>
  res.send("Oops! You don't have permission to do that!")
);

// if (process.env.AUTH === "NO") {
//   console.log("authentication disabled");

// }

module.exports = router;
