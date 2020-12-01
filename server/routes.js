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

router.post(
  "/signup",
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
      "signup",
      { session: false },
      /*
      callback after account has been created or an error thrown.
      sends the appropriate message based on account creation. 
   
      Humaid M. Agowun (A00430163)
   
      error = the error thrown
      user = the created user
      */
      async function (error, user) {
        if (error || !user) {
          return res
            .status(400)
            .json({ message: error.message || "could not create user" });
        }

        return res.status(200).json({ message: "signup successful" });
      }
    )(req, res, next);
  }
);

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
