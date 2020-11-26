/*
 * routes.js
 * Humaid M. Agowun (A00430163)
 * Contains our passport-local routes that is
 * createAccounts and login only.
 */

const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config(); //gives access to process.env
const router = require("express").Router();

// route for signing up. Humaid M. Agowun (A00431063)
router.post(
  "/signup",
  //call passport middleware for signing up
  passport.authenticate("signup", { session: false }),
  //callback after passport middleware called
  async function (req, res) {
    res.status(200).json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

/*
 * route for logging in - Humaid M. Agowun (A00430163)
 * YOU NEED TO USE A CLOSURE SO THAT THE passport.authenticate
 * gets access to res so it can send the token to the user
 */
router.post("/login", async function (req, res, next) {
  //we only call the passport middleware in a closure so it can use res
  passport.authenticate("login", async function (err, user, info) {
    try {
      if (err || !user) {
        return res.status(400).json({ message: info.message });
      }

      let isSpecialist = req.body.isSpecialist == "true";
      if (isSpecialist != user.isSpecialist) {
        const accountStatus = user.isSpecialist ? "specialist" : "student";
        return res.status(400).send({
          message:
            "Account is a " +
            accountStatus +
            "." +
            "\nYou need to use the other login.",
        });
      }

      req.login(user, { session: false }, async function (error) {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        // create token using _id from mongo and user email
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
          expiresIn: "5h",
        });

        //return the token which is to be put in localStorage for auth.
        return res.status(200).json({ token });
      });
    } catch (error) {
      return res.status(400).json({ message: "Error while logging in." });
    }
  })(req, res, next);
});

module.exports = router;
