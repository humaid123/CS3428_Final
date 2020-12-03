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

  returns N/A
  */
  async function (req, res) {
    passport.authenticate(
      "signup",
      { session: false },
      /*
      callback after account has been created or an error thrown.
      sends the appropriate message based on account creation.    
      Humaid M. Agowun (A00430163)
   
      error = the error thrown
      user = the created user

      returns N/A
      */
      async function (error, user) {
        if (error || !user) {
          return res
            .status(error.code || 500)
            .json({ message: error.message || "could not create user" });
        }

        return res.status(200).json({ message: "signup successful" });
      }
    )(req, res);
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

  returns N/A
  */
  async function (req, res) {
    passport.authenticate(
      "login",
      /*
      callback after successful authentication.
      we create a token and sends it.
      checks if a specialist is indeed logging in as a specialist
      and if student is indeed logging in as a student.

      Humaid M. Agowun (A00430163)

      err = error provided from login strategy configuration
      user = found user provided from login strategy configuration
      info = json with message if user not found provided by login strategy configuration

      returns N/A
      */
      async function (err, user, info) {
        try {
          if (err || !user) {
            return res.status(400).json(info);
          }

          if (isWrongSubsystem(req.body.isSpecialist, user.isSpecialist)) {
            return res
              .status(400)
              .send({ message: createWrongSubsytemMessage(user.isSpecialist) });
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
          return res.status(400).json({ message: "Error while logging in." });
        }
      }
    )(req, res);
  }
);

/*
checks if the user is using the right subsystem that is 
a student is requesting from the user login and a specialist 
is requesting from the specialist login.
Humaid M. Agowun

requestIsSpecialist = the specialist status of the request
userIsSpecialist = the specialist status of the user in the database

returns true if the isSpecialist do not match, meaning wrong subsystem is being
requested.
*/
function isWrongSubsystem(requestIsSpecialist, userIsSpecialist) {
  requestIsSpecialist = requestIsSpecialist == "true"; //use == to convert string to boolean
  return userIsSpecialist != requestIsSpecialist;
}

/*
creates an error message if wrong subsystem being used.
Humaid M. Agowun

actualStatusOfUser = the isSpecialist status of the user in the database.

returns an error message.
*/
function createWrongSubsytemMessage(actualStatusOfUser) {
  const accountSubsystemStr = actualStatusOfUser ? "Specialist" : "Student";
  return "Your account requires the " + accountSubsystemStr + " login.";
}

module.exports = router;
