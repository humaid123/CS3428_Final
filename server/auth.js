
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
console.log(localStrategy);
const UserModel = require('./model');

const SECRET = "TOP_SECRET"; //this string should be in process.env, is the secret that is used to hash user to get the jwt
const MANIPULATION_SECRET_KEY = "MANIPULATE"; //this should be in process.env

// Creating our signing up strategy 
passport.use(
    'signup',
    new localStrategy(
        //options
        {
            usernameField: 'email', 
            passwordField: 'password',
            passReqToCallback: true
        },
        //callback after authentication
        async function (req, email, password, done) {
            console.log("/signup local Strategy reached: ", email, password, req.body);
            // callback on how to use local strategy for the authentication.
            // We take the email and password and create a new User..
            try {
                const {manipulationSecretKey, isSpecialist} = req.body;
                console.log(manipulationSecretKey);
                if (manipulationSecretKey != MANIPULATION_SECRET_KEY) {
                    throw new Error({message : "wrong secret passed to create account"});
                }
                const found = await UserModel.findOne({email});
                if (found) {
                     throw new Error({code: 400, message: "email already taken"});
                }
                console.log("creating new user");
                const newUser = await UserModel.create({
                    email, password, isSpecialist, inbox: [], sentItems: []
                });
                console.log(newUser);
                return done(null, newUser); //successfully created the account.
            } catch (error) {
                console.log("error in signup authentication: ", error);
                done(error);
            }
        }
    )
);

// Creating our login strategy.
passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email', 
            passwordField: 'password'
        },
        async function (email, password, done) {
            console.log("login Strategy reached");
            //the done callback is done(error, <user or False if no user>, <message>)
            try {
                const user = await UserModel.findOne({email});
                if (!user) {
                    return done(null, false, {message: 'User not found'});
                }
                console.log("searched user: ", user.email, user.password);
                const valid = await user.isValidPassword(password);
                console.log("password validity: " + valid);
                if (!valid) {
                    return done(null, false, {message: 'Wrong Password'});
                }
                
                return done(null, user, {message: 'Logged in Successfully'});
            } catch (error) {
                return done(error);
            }
        }
    )
);

//creating our jwt strategy.
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
passport.use(
    new JWTStrategy({
        secretOrKey: SECRET,
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
        // THE CLIENT NEED TO PASS a field secret_token in their params
    },
    async function (token, done) {
        try {
            console.log("reached JWT strategy");
            return done(null, token.user);
        } catch(error) {
            console.log('JWT error', error);
            done(error);
        }
    })
);
