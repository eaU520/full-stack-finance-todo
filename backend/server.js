const express = require("express");
const session = require('express-session');
const app = express();
const cors = require("cors");
require("dotenv").config();

const mongo = require('mongoose');
// const mongoDBSession = require('connect-mongodb-session')(session);
const mongoDBSession = require('connect-mongo');

const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(require("../backend/routes/expense"));
app.use(require("../backend/routes/user"));
// get driver connection
const dbconn = require("./database/db");
const { MongoDBStore } = require("connect-mongodb-session");

mongo.Promise = global.Promise
mongo.connect(process.env.mongoURI,{
  useNewUrlParser: true,
})

const mongoDBStore = new MongoDBStore({
  uri: process.env.mongoURI,
  collection: 'mySessions',
})

//max session = sec*min*millisec*hours
const MAX_SESSION_TIME = 60*60*1000*1; //1 hour

//Creating session on server
app.use(
  session({
    secret:'a1b2c3d4e5co2k3hf',
    name: 'session-id',//key field for postman
    store: mongoDBStore,
    cookie: {
      maxAge: MAX_SESSION_TIME,
      sameSite: false,
      secure: false,
    },
    resave: true,
    saveUninitialized: false,
  })
)

app.listen(port, () => {
  // perform a database connection when server starts
  dbconn.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});