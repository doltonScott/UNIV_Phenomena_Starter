// Use the dotenv package, to create environment variables
require("dotenv").config();
// Create a constant variable, PORT, based on what's in process.env.PORT or fallback to 3000
const PORT = process.env.port || 3000;
// Import express, and create a server
const express = require("express");
const server = express();
// Require morgan and body-parser middleware
// Have the server use morgan with setting 'dev'
const morgan = require("morgan");
server.use(morgan("dev"));
// Import cors
// Have the server use cors()
const cors = require("cors");
server.use(cors());
server.use(express.json());
// Have the server use your api router with prefix '/api'\
const apiRouter = require("./api");
//server.use("/api", apiRouter);
// Import the client from your db/index.js
const { client } = require("./db/index");
// Create custom 404 handler that sets the status code to 404.
server.use("*", function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});
// Create custom error handling that sets the status code to 500
// and returns the error as an object
server.use(function (err, req, res, next) {
  err.status = 500;
  next(err);
});
// Start the server listening on port PORT
// On success, connect to the database
const handle = server.listen(PORT, async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error(err);
    await client.end();
    throw err;
  }
  //client.connect();
  console.log("The server is up on port", PORT, "databse is connected");
});
module.exports = { handle };
