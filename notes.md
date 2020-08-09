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

* different method of requiring user class

  - tests will require model files into project multiple times, mongoose will think you're trying to load multiple models called `Users` so it'll throw an error

  * require mongoose library, then mongoose.model('users');

* mongoose: two arguments means you're pulling something out of it, one means you're pulling something out of it

  - user model: mongoose.model('users', userSchema);
  - passport: const User = mongoose.model('users');

* promise - Node handles async code

````javacscript
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        // async call to mongodb to write the user, existingUser being the user we look to find
        if (existingUser) {
          // if there's an existing user, we're done. Passing null to show no error, then returning the existing user
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
          // if there's no user, save them
            .save()
            // wait until user saved to database to invoke done like above
            .then((user) => done(null, user));
            // (user) here represents the user we saved, use this as it could have changes made during saving from DB
        }
      });

- proxy in react app: if anyone looks to access /auth/google on the react server, automatically forward tihs over to the node server

client injex.js: data layer control (Redux)
client App.js: rendering layer control (React Router)

if a file is exporting a class or component, it starts with a capital leter: App.js
returning a function or a series of functions will be lowercase: functions.js

```javascript
ReactDOM.render(<App />, document.querySelector('#root'));
````

// first argument: root component
// second arg: where we're rendering the component to inside of the DOM

Redux: hold state/data in application
Reducers: pieces of state

- authReducer: records whether or not the user is logged in
- surveysReducer: Records a list of all surveys user has created

Redux store at top where all state kept, to change state we call action creator which is sent to all reducers in application. combineReducers used to update state in redux store

- React Component calls an Action Creator
- returns an action
- sent to each of the reducers
- combining reducers updates state in redux store
- state sent back to react components, causing them to rerender

in index.js file, we create our redux store and render "provider" tag

- react-redux gives us provider tag, bonding layer/glue between redux and react sides of application
- provider tag gets sent the redux store. Since it's at the parent component of application, any other component can reach directly into the store to pull state

//index.js

```javascript
const store = createStore(() => [], applyMiddleware());
```

// first argument: all reducers
// second argument: starting/initial state of application, relevent for serverside rendering

```javascript
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
```

// browser router tells router how to behave, looks at URL and changes components on screen
// route is a react component used to set up rule between route user visits and set of components visible on screen
// Browser Router expects ones child, e.g. a div containing other children

```javascript
const Landing = () => <h2>Landing</h2>;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" component={Landing}></Route>
        </div>
      </BrowserRouter>
    </div>
  );
};
```

router takes current URL and tries to match every single route/path to current route
path="/" route will also be matched on "/surveys/new", need exact={true}

router treated like special objects where they're shown if conditions are met

- class based components place helper or functions determining what to render
