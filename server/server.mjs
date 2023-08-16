import express from "express";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cookie from 'cookie';
import cors  from "cors";
import "./loadEnvironment.mjs";
import expenses from "./routes/expenses.mjs"
import users from "./routes/users.mjs"
import MongoDBStore from "connect-mongodb-session"
import mongo from 'mongoose';

import { configDotenv } from "dotenv";


// const { MongoClient, ServerApiVersion } = require('mongodb');
//TODO:Remove commented lines
const port = configDotenv.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/expense",expenses);
app.use("/user",users);
// get driver connection
// const dbconn = require("./database/db");

mongo.Promise = global.Promise
mongo.connect(configDotenv.mongoURI,{
  useNewUrlParser: true,
  useCreateIndex: true
})

const mongoDBStore = new MongoDBStore({
  uri: configDotenv.mongoURI,
  collection: 'mySessions',
})

// max session = sec*min*millisec*hours


//Creating session on server
app.use(
  session({
    secret: configDotenv.secretKey,//FIXME: Generate dynamically
    name: 'session-id',//key field for postman
    store: mongoDBStore,
    cookie: {
      maxAge: configDotenv.MAX_SESSION_TIME,
      sameSite: false,
      secure: false,
    },
    resave: true,
    saveUninitialized: false,
  })
)

app.listen(port, () => {
  // perform a database connection when server starts
  // dbconn.connectToServer(function (err) {
  //   if (err) console.error(err);
 
  // });
  console.log(`Server is running on port: ${port}`);
});