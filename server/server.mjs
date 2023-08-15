import express from "express";
import session from 'express-session';
import cors  from "cors";
import "./loadEnvironment.mjs";
import expenses from "./routes/expenses.mjs"
import users from "./routes/users.mjs"
import MongoDBStore from "connect-mongodb-session"
import mongo from 'mongoose';

// require("dotenv").config();


// const { MongoClient, ServerApiVersion } = require('mongodb');
//TODO:Remove commented lines
const port = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/expense",expenses);
app.use("/user",users);
// get driver connection
// const dbconn = require("./database/db");

// const { MongoDBStore } = require("connect-mongodb-session");

// mongo.Promise = global.Promise
// mongo.connect(process.env.mongoURI,{
  // useNewUrlParser: true,
// })

// const mongoDBStore = new MongoDBStore({
  // uri: process.env.mongoURI,
  // collection: 'mySessions',
// })

// max session = sec*min*millisec*hours
const MAX_SESSION_TIME = 60*60*1000*1; //1 hour

//Creating session on server
// app.use(
//   session({
//     secret:'a1b2c3d4e5co2k3hf',
//     name: 'session-id',//key field for postman
//     store: mongoDBStore,
//     cookie: {
//       maxAge: MAX_SESSION_TIME,
//       sameSite: false,
//       secure: false,
//     },
//     resave: true,
//     saveUninitialized: false,
//   })
// )

app.listen(port, () => {
  // perform a database connection when server starts
  // dbconn.connectToServer(function (err) {
  //   if (err) console.error(err);
 
  // });
  console.log(`Server is running on port: ${port}`);
});