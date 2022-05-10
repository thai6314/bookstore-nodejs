const express = require("express");
const { login } = require("../controller/auth");
const passport = require("passport");
const authRoute = express.Router();

authRoute.post("/auth/login", login);
authRoute.get("/auth/facebook", passport.authenticate("facebook"));

authRoute.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
  }),
  function (req, res) {
    if (req.user.accessToken) {
      res.setHeader(req.user.accessToken);
      res.redirect(
        `http://localhost:3000/access_token=${req.user.accessToken},user_id=${req.user.user._id}`
      );
    } else {
      res.send({
        message: "Login failed",
      });
    }
  }
);
authRoute.get("/cleasession", (req, res) => {
  console.log(req.session);
  req.session.destroy();
});

module.exports = authRoute;
