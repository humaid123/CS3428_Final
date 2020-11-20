const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const userModel = require("./server/model");
require("dotenv").config();

const server = express();
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(__dirname));
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
server.use(allowCrossDomain);

mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.on("error", (error) => console.log(error));
mongoose.Promise = global.Promise;

require("./server/auth"); //configure passport.

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

server.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

server.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});
