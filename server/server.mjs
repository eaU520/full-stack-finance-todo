import express from "express";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors  from "cors";
import "./loadEnvironment.mjs";
import expenses from "./routes/expenses.mjs"
import users from "./routes/users.mjs"
import {default as connection} from "connect-mongodb-session";

import mongo from 'mongoose';


const MongoDBStore = connection(session);
//TODO:Remove commented lines
const port = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/expenses",expenses);
app.use("/users",users);
// get driver connection
// const dbconn = require("./database/db");

mongo.Promise = global.Promise
mongo.connect(process.env.mongoURI,{
  useNewUrlParser: true
})

const mongoDBStore = new MongoDBStore({
  uri: process.env.mongoURI,
  collection: 'mySessions',
})

// max session = sec*min*millisec*hours


//TODO: Creating session on server
// app.use(
  //TODO: LOgin creates session
  // session({
  //   secret: process.env.secretKey,//FIXME: Generate dynamically
  //   name: 'session-id',//key field for postman
  //   store: mongoDBStore,
  //   cookie: {
  //     maxAge: process.env.MAX_SESSION_TIME,
  //     sameSite: false,
  //     secure: false,
  //   },
  //   resave: true,
  //   saveUninitialized: false,
  // })
// )

app.listen(port, () => {
  // perform a database connection when server starts
  // dbconn.connectToServer(function (err) {
  //   if (err) console.error(err);
 
  // });
  console.log(`Server is running on port: ${port}`);
});