const express = require("express"); // common JS modules
import express from 'express'; // ES2015 modules

minimal express server:

// index.js
const express = require("express"); // require express, assigning it to express variable
const app = express(); // assign express to app constant, setting up config below

app.get("/", (req, res) => { // if someone makes a request to "/", do this:
res.send({ hi: "there" }); // req object represents request, res object for response
});

app.listen(5000); // listen on port 5000

deployment checklist:

- dynamic port binding, use port Heroku will use
- specify node environment
- specify startup script

* dynamic port binding
  const PORT = process.env.PORT || 5000; // look at he ENV, is there a PORT to use?
  app.listen(PORT); //

* specify node environment

  - the video added node and npm versions under an "engines" key, but it feels a bit odd to manually edit this file

* specify startup script

  - "start": "node index.js", in package.json

* scripts
  - config script in package.json, e.g. add 'dev' script for starting in dev mode
  - run with `npm run dev`
