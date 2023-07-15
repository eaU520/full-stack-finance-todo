import express from "express";
// const session = require('express-session');
const app = express();
import cors  from "cors";
import expenses from "./routes/expenses.mjs"
import "./loadEnvironment.mjs";
// require("dotenv").config();

// const mongo = require('mongoose');
// const { MongoClient, ServerApiVersion } = require('mongodb');
//TODO:Remove commented lines
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.use("./routes/expenses",expenses);
app.use("./routes/user",users);
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

//max session = sec*min*millisec*hours
// const MAX_SESSION_TIME = 60*60*1000*1; //1 hour

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