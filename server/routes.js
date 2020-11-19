
const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');

const SECRET = "TOP_SECRET"; //this should actually be in process.env

router.post('/signup', 
    passport.authenticate('signup', {session: false}),
    async function (req, res) {
        console.log("route reached for /signup");
        res.status(200).json({
            message: 'Signup successful',
            user: req.user
        });    
    }
);


// YOU NEED TO USE A CLOSURE SO THAT THE passport.authenticate can send the token to the user
router.post(
    '/login',
    async function (req, res, next) {
        passport.authenticate(
            'login',
            async function (err, user, info) {
                console.log("router for login running", err, user);
                try {
                    if (err || !user) {
                        return res.status(400).json({message : info.message});
                    }
                    console.log("calling req.login");
                    req.login(user, {session: false}, async function (error) {
                        if (error) return next(error);
                        const body = {_id: user._id, email: user.email};
                        console.log("calling sign", body);
                        const token = jwt.sign({user: body}, SECRET, {expiresIn: '5h'});
                        console.log("token created", token);
                        return res.status(200).json({token});
                    });
                } catch (error) {
                    console.log(error);
                    return res.status(400).json({message : "error in logging in"});
                }
            }
        )(req, res, next);
    }
);

module.exports = router;
