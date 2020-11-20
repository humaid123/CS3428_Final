const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async function (req, res) {
    res.status(200).json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

// YOU NEED TO USE A CLOSURE SO THAT THE passport.authenticate can send the token to the user
router.post("/login", async function (req, res, next) {
  passport.authenticate("login", async function (err, user, info) {
    try {
      if (err || !user) {
        return res.status(400).json({ message: info.message });
      }
      req.login(user, { session: false }, async function (error) {
        if (error) return next(error);
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
          expiresIn: "5h",
        });
        return res.status(200).json({ token });
      });
    } catch (error) {
      return res.status(400).json({ message: "error in logging in" });
    }
  })(req, res, next);
});

module.exports = router;
