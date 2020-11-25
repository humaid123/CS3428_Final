/*
 * auth.js
 * Humaid M. Agowun (A00430163)
 * File that configures our passport strategies.
 * We have 3 strategy: signup, login and jwt.
 */

import { use } from "passport";
import { Strategy as localStrategy } from "passport-local";
import { findOne, create } from "./model";
import { hash as _hash } from "bcryptjs";
require("dotenv").config();

// Creating our signing up strategy
use(
  "signup",
  new localStrategy(
    {
      usernameField: "email", // tells passport how our username wiil be called
      passwordField: "password", // tells passport how our password field is called
      passReqToCallback: true, // let's us access req.body
    },
    // function to configure signup strategy. Humaid M. Agowun (A00430163)
    async function (req, email, password, done) {
      try {
        let { manipulationSecretKey, isSpecialist } = req.body;
        isSpecialist = isSpecialist == "true"; // use == so as to change string to boolean

        if (isWrongSecret(isSpecialist, manipulationSecretKey)) {
          throw new Error({ message: "Wrong secret passed." });
        }

        const emailAlreadyTaken = await findOne({ email });
        if (emailAlreadyTaken) {
          throw new Error({ code: 400, message: "Email already taken" });
        }

        newUser = await createNewUserInDb(email, password, isSpecialist);

        return done(null, newUser); //successfully created the account.
      } catch (error) {
        done(error);
      }
    }
  )
);

// Creating our login strategy.
use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    //function to configure login strategy. Humaid M. Agowun (A00430163)
    async function (email, password, done) {
      try {
        const user = await findOne({ email });
        if (!user) {
          return done(null, false, { message: "Typed email was not found." });
        }

        const validPassword = await user.isValidPassword(password);
        if (!validPassword) {
          return done(null, false, { message: "Wrong Password." });
        }

        return done(null, user, { message: "Logged in Successfully." });
      } catch (error) {
        return done(error);
      }
    }
  )
);

//creating our jwt strategy.
import { Strategy as JWTStrategy } from "passport-jwt";
import { ExtractJwt as ExtractJWT } from "passport-jwt";
use(
  new JWTStrategy(
    {
      // THE CLIENT NEED TO PASS a field secret_token in their params
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    /*
     * function to configure JWT strategy.
     * JWT takes care of everything for us
     * Humaid M. Agowun (A00430163)
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

//functions called by our callback
/*
 * Check if the secret passed is correct to create account
 * Humaid M. Agowun (A00430163)
 */
function isWrongSecret(isSpecialist, secretKey) {
  if (isSpecialist) return secretKey != process.env.SPECIALIST_MANIPULATION_KEY;
  // !isSpecialist
  else return secretKey != process.env.STUDENT_MANIPULATION_KEY;
}

/*
 * adds the new user in the database.
 * Hashes the password before creating account.
 * Humaid M. Agowun (A00430163)
 */
async function createNewUserInDb(email, password, isSpecialist) {
  const hash = await _hash(password, 10);
  password = hash;
  const newUser = await create({
    email,
    password,
    isSpecialist,
    inbox: [],
    sentItems: [],
  });
  return newUser;
}
