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

- organizing, new folders:

  - /config - protected AAPI keys and settings
  - /routes - route handlers, grouped by purpose
  - /services - Helper modules and business logic (e.g. passport)
  - index.js

- shorthand for assigning, requiring, and using a require like routes:
  - require('./routes/authRoutes')(app);
- longhand version:

  - const authRoutes = require('./routes/authRoutes');
  - authRoutes(app);

- requiring authRoutes returns a function, then this immediately invokes the function with an app argument

* MongoDB is schemaless
* Mongoose model class represents entire MongoDB collection

  - model class has functions to work with an entire collection
  - creating a new record/searching all collections done with model class
  - also model instances are JS objects that represent a single record in collection

* shorthand dependent const assignment:

- const mongoose = require('mongoose');
- const Schema = mongoose.Schema; // set new variable called Schema, assign mongoose.Schema to it
- const { Schema } = mongoose; // mongoose object has Schema property, assign it to { Schema }
  - "destructuring"

* Schema will describe what each individual record will look like
  mongoose.model('users', userSchema); // telling mongoose to create a new collection called users
