const express = require("express");
const { login } = require("../controller/auth");
const passport = require("passport");
const authRoute = express.Router();

authRoute.post("/auth/login", login);
authRoute.get("/auth/facebook", passport.authenticate("facebook"));

authRoute.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.redirect("/");
  }
);
authRoute.get("/cleasession", (req, res) => {
  console.log(req.session);
  req.session.destroy();
});

module.exports = authRoute;
