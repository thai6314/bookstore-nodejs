require("dotenv").config();
const passport = require("passport");
const express = require("express");
const cors = require("cors");
var path = require("path");
const FacebookStrategy = require("passport-facebook").Strategy;
const session = require("express-session");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// CONSTANTS
const { connectToDB } = require("./database/dbConnect");
const router = require("./router");
const bodyParser = require("body-parser");

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// CORS
app.use(cors());

app.use(express.static(__dirname + "/public"));

// Passport session setup.
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
// Sử dụng FacebookStrategy cùng Passport.
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.CLIENT_ID_FB,
      clientSecret: process.env.CLIENT_SECRET_FB,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        console.log(accessToken, refreshToken, profile, done);
        return done(null, profile);
      });
    }
  )
);
// end passport

app.use(session({ secret: "keyboard cat", key: "sid" })); //Save user login
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(400).send("Api working");
});
app.use("/api", router);
app.use("*", (req, res) => {
  res.status(404).json({
    message: false,
    errors: [
      {
        msg: "Route not found",
      },
    ],
  });
});

// Collecting database , host
const PORT = process.env.PORT || 3001;

connectToDB().then((_) => {
  app.listen(PORT, (_) => {
    console.log(`Server started on port ${PORT}`);
  });
});
