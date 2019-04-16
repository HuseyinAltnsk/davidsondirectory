/*
Dependencies
*/
const env = require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const fetch = require("node-fetch");
const helmet = require("helmet");

// initialize models
require("./models");


// connect to database
if (process.env.NODE_ENV === "DEV")
  mongoose.connect(
    process.env.MONGODB_URI_DEV,
    { useNewUrlParser: true }
  );
else
  mongoose.connect(
    process.env.MONGODB_URI_PROD,
    { useNewUrlParser: true }
  );

// define our app using express
const app = express();

// set the port
const port = process.env.SERVER_PORT;

// Setup json parsing
app.use(bodyParser.json());

// Parse URL codes
app.use(bodyParser.urlencoded({ extended: true }));

// setup logging
app.use(morgan("tiny"));

// Setup cookies
app.use(cookieParser());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: 1000 * 60 * 60 * 4
  })
);

//Setup up oauth
app.use(passport.initialize());

//Setup sessions handling in passport
app.use(passport.session());

// set up login routes.
app.use(require("./routes/login"));

const User = require("mongoose").model("User"); // used if we need to serialize and deserialize user

//Serialize necessary user information
passport.serializeUser((user, done) => {
  User.findOneAndUpdate(
    user.student,
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    },
    { upsert: true, runValidators: true, new: true, setDefaultsOnInsert: true },
    (err, result) => {
      user.student = result._id;
    }
  );
});

//Deserialize the user information
passport.deserializeUser((user, done) => {
  console.log("----------DESERIALIZING USER:-------------")
  console.log(user);
  console.log("------------------------------------------")
  done(null, user);
});

var MicrosoftStrategy = require("passport-microsoft").Strategy;
passport.use(
  new MicrosoftStrategy(
    {
      clientID: process.env.OAUTH2_APP_ID,
      clientSecret: process.env.OAUTH2_SECRET,
      callbackURL: process.env.OAUTH2_CALLBACK_URL,
      tenant: process.env.OAUTH2_TENANT,
      scope: "User.Read"
    },
    (accessToken, refreshToken, profile, done) => {

      fetch("https://graph.microsoft.com/beta/me", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, same-origin, *omit
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${accessToken}`
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: null
      })
        .then(response => {
          return response.json();
        })
        .then(me => {
          let user = {
            email: me.userPrincipalName,
            firstName: me.givenName,
            lastName: me.surname
          };
          done(null, user);
        }) // parses response to JSON
        .catch(error => {
          console.error(`Fetch Error =\n`, error);
        });
    }
  )
);

// require login
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'DEV') {
    // dummy user
    req.user = {
      firstName: "Huseyin",
      lastName: "Altinisik",
      email: "hualtinisik@davidson.edu",
      student: "test_user",
    }
    User.findOneAndUpdate(
        req.user.student, {
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email
        }, {
          upsert: true,
          runValidators: true,
          new: true,
          setDefaultsOnInsert: true
        });
  } else if (process.env.NODE_ENV === 'PROD') {
    if (req.isAuthenticated()){ 
      User.findOneAndUpdate(
        req.user.student, {
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email
        }, {
          upsert: true,
          runValidators: true,
          new: true,
          setDefaultsOnInsert: true
        });
      next();
    }
    else res.redirect("/login");
  } else {
    console.log("Expected NODE_ENV variable in .env to be PROD or DEV.");
    process.exit(-1);
  }
});

// Setup logout route
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect(
    `https://login.windows.net/common/oauth2/logout?post_logout_redirect_uri=${
      process.env.LOGOUT_REDIRECT_URI
    }`
  );
});

// CANNOT CATCH 404 w/ res send in server ->
//   tries to push data to port 8080, isolating it.

// Define static folder.
app.use(express.static(path.join(__dirname, "../build")));

// Setup routing
app.use(require("./routes"));

// Start server
app.listen(port, () => console.log("Ready to serve..."));
