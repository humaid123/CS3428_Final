/*
 * server.js
 * Humaid M. Agowun (A00430163)
 * File run with node server.js to set up the server.
 * Uses Express router for modularisation.
 */

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
require("dotenv").config();

//set up express
const server = express();
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(__dirname));
var allowCrossDomain = function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
server.use(allowCrossDomain);

//connect to database
mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.on("error", (error) => console.log(error));
mongoose.Promise = global.Promise;

//import passport configuration.
require("./server/auth");

const routes = require("./server/routes");
const secureRoutes = require("./server/secureRoutes");

// any post to / have a different routing procedure
server.use("/", routes);

//any post to a /secure needs to be authenticated via jwt
server.use(
  "/secure",
  passport.authenticate("jwt", { session: false }),
  secureRoutes
);

// middleware that returns error 500 if
// anything wrong happens in server code
server.use((_req, res) => {
  res.status(500).json({ message: "unrecognised error" });
});

// listen on given port. Must SET UP .env to listen.
server.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});
