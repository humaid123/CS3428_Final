/*
 * server.js
 * Humaid M. Agowun (A00430163)
 * File run with node server.js to set up the server.
 * Uses Express router for modularisation.
 */
import express, { json, static } from "express";
import { connect, set, connection, Promise } from "mongoose";
import { authenticate } from "passport";
import { urlencoded } from "body-parser";
require("dotenv").config();

//set up express
const server = express();
server.use(json());
server.use(urlencoded({ extended: true }));
server.use(static(__dirname));
var allowCrossDomain = function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
server.use(allowCrossDomain);

//connect to database
connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
set("useCreateIndex", true);
connection.on("error", (error) => console.log(error));
Promise = global.Promise;

//import passport configuration.
import "./server/auth";

import routes from "./server/routes";
import secureRoutes from "./server/secureRoutes";

// any post to / have a different routing procedure
server.use("/", routes);

//any post to a /secure needs to be authenticated via jwt
server.use("/secure", authenticate("jwt", { session: false }), secureRoutes);

// middleware that throws error 500 if
// anything wrong happens in server code
server.use((err, _, res) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

// listen on given port. Must SET UP .env to listen.
server.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});
