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
      //options
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    //callback after authentication
    async function (req, email, password, done) {
      // Configure localStrategy to create Account-We take the email and password and create a new User..
      try {
        const { manipulationSecretKey, isSpecialist } = req.body;
        if (
          (isSpecialist &&
            manipulationSecretKey != process.env.SPECIALIST_MANIPULATION_KEY) ||
          (!isSpecialist &&
            manipulationSecretKey != process.env.STUDENT_MANIPULATION_KEY)
        ) {
          throw new Error({
            message: "Wrong secret passed - cannot create account",
          });
        }

        const found = await UserModel.findOne({ email });
        if (found) {
          throw new Error({ code: 400, message: "Email already taken" });
        }

        //hash password before saving
        const hash = await bcrypt.hash(password, 10);
        password = hash;
        const newUser = await UserModel.create({
          email,
          password,
          isSpecialist,
          inbox: [],
          sentItems: [],
        });
        return done(null, newUser); //successfully created the account.
      } catch (error) {
        done(error);
      }
    }
  )
);

// Creating our login strategy.
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      //the done callback is done(error, <user or False if no user>, <message>)
      try {
        const user = await UserModel.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const valid = await user.isValidPassword(password);
        if (!valid) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

//creating our jwt strategy.
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
passport.use(
  new JWTStrategy(
    {
      // THE CLIENT NEED TO PASS a field secret_token in their params
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async function (token, done) {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
