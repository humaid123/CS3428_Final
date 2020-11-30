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

// route for signing up.
router.post(
  "/signup",
  //call passport middleware for signing up
  passport.authenticate("signup", { session: false }),
  /*
  callback after successful passport authentcation
  the configuration adds the new account 
  or sends an error message
  so we just sends a success message

  Humaid M. Agowun (A00430163)

  req = the express request object
  res = the express response object
  */
  async function (req, res) {
    res.status(200).json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

/*
 * route for logging in
 * YOU NEED TO USE A CLOSURE SO THAT THE passport.authenticate
 * gets access to res so it can send the token to the user
 */
router.post(
  "/login",
  /*
  function that is immediately called.
  its main purpose is to act as a closure so
  passport gets access to req and res.
  Humaid M. Agowun (A00430163)

  req = the express request object
  res = the express response object
  next = the next callback to be called.
  */
  async function (req, res, next) {
    passport.authenticate(
      "login",
      /*
      callback after successful authentication.
      we create a token and sends it.
      checks if a specialist is indeed logging in as a specialist
      and if student is indeed logging in as a student

      Humaid M. Agowun (A00430163)

      err = error provided from login strategy configuration
      user = found user provided from login strategy configuration
      info = json with message if user not found provided by login strategy configuration
      */
      async function (err, user, info) {
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
      }
    )(req, res, next);
  }
);

module.exports = router;
