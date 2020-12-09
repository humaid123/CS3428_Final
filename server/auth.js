/*
 * auth.js
 * Humaid M. Agowun (A00430163)
 * File that configures our passport strategies.
 * We have 3 strategy: signup, login and jwt.
 */

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const UserModel = require("./model");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Creating our signing up strategy
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email", // tells passport how our username wiil be called
      passwordField: "password", // tells passport how our password field is called
      passReqToCallback: true, // let's us access req.body
    },
    /*
    function to configure signup strategy. 
    Creates the user in the database if everything works well

    Humaid M. Agowun (A00430163)

    req = the http request filled by passport
    email = the email used by passport from the request
    password = the email used by password from the request
    done = the next callback to be executed

    returns N/A
    */
    async function (req, email, password, done) {
      try {
        let { manipulationSecretKey, isSpecialist } = req.body;
        isSpecialist = isSpecialist == "true"; // use == so as to change string to boolean

        if (isWrongSecret(isSpecialist, manipulationSecretKey)) {
          return done({ code: 400, message: "Wrong secret passed." });
        }

        if (await emailIsAlreadyTaken(email)) {
          return done({ code: 400, message: "Email address already taken." });
        }

        const newUser = await createNewUserInDb(email, password, isSpecialist);
        if (!newUser) {
          return done({
            code: 400,
            message: "Database did not save your account.",
          });
        }
        return done(null, newUser); //successfully created the account.
      } catch (error) {
        done(error);
      }
    }
  )
);

/*
function that checks if the email is already taken so 
we know if we can create the user.

Humaid M. Agowun (A00430163)

email = the email address to check
*/
async function emailIsAlreadyTaken(email) {
  const user = await UserModel.findOne({ email });
  return user != null;
}
/*
 * Check if the secret passed is correct to create account
 *
 * Humaid M. Agowun (A00430163)
 *
 * isSpecialist = boolean, true if the request is from specialist system
 * secretKey = secret used by request
 */
function isWrongSecret(isSpecialist, secretKey) {
  if (isSpecialist) {
    return secretKey != process.env.SPECIALIST_MANIPULATION_KEY;
  }
  // !isSpecialist
  return secretKey != process.env.STUDENT_MANIPULATION_KEY;
}

/*
 * adds the new user in the database.
 * Hashes the password before creating account.
 *
 * Humaid M. Agowun (A00430163)
 *
 * email = the email of the new user to be added to the database
 * password = the password of the new user to be added to the database
 * isSpecialist = boolean, true if request is from a specialist
 */
async function createNewUserInDb(email, password, isSpecialist) {
  const hash = await bcrypt.hash(password, 10);
  password = hash;
  const newUser = await UserModel.create({
    email,
    password,
    isSpecialist,
    inbox: [],
    sentItems: [],
  });
  return newUser;
}

// Creating our login strategy.
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    /*
    function to configure login strategy. 
    Humaid M. Agowun (A00430163)

    email = the email from the request and used by passport
    password = the password from the request and used by passport
    done = the next callback

    returns N/A
    */
    async function (email, password, done) {
      try {
        //we send the same error message if user not found or if wrong password
        incorrectCredentialMessage = "Wrong username or password.";
        const user = await UserModel.findOne({ email });
        if (!user) {
          return done(null, false, { message: incorrectCredentialMessage });
        }

        const validPassword = await user.isValidPassword(password);
        if (!validPassword) {
          return done(null, false, { message: incorrectCredentialMessage });
        }

        return done(null, user, { message: "Logged in Successfully." });
      } catch (error) {
        return done(error);
      }
    }
  )
);

//creating our jwt strategy.
const passportJWT = require("passport-jwt");
passport.use(
  new passportJWT.Strategy(
    {
      // THE CLIENT NEED TO PASS a field secret_token in their params
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: passportJWT.ExtractJwt.fromUrlQueryParameter(
        "secret_token"
      ),
    },
    /*
     * function to configure JWT strategy.
     * JWT takes care of everything for us
     * Humaid M. Agowun (A00430163)
     *
     * token = token extracted by passport-jwt
     * done = the next callback
     *
     * returns N/A
     */
    async function (token, done) {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
