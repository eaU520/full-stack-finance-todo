import express from "express";
import db from "../db/conn.mjs";
import bcrypt from "bcryptjs";
import {body, validationResult} from 'express-validator';
// /Users/ebonyarliciacalloway/Documents/full-stack-finance-todo/server/db/models/User.js
// // Load User model
// const User = require('../database/models/User');

const userRouter = express.Router();
const saltSize = 12;
// // Connection to the database
// const databaseObject = require("../database/db");
// const { ObjectId } = require('mongodb');

// ID to Object
// const objectID = require("mongodb").ObjectId;
//TODO: encrypt and store password
// @route POST /register
// @description add a user
// @access Public
userRouter.post("/register", 
  body("email", "Must be a valid email format").trim().isEmail(),
  // body("email", "Your email is too short").isLength({min: 5}),normalizeEmail()?
  body("password","Password must be 8-16 characters").isLength({min:8, max: 16}),//TODO: No maximum or much higher
  body("password","Password must contain at least one uppercase letter").matches("[A-Z]"),
  body("password","Password must contain at least one number").matches("[0-9]"),
  //TODO: minSymbols: 1,
  body("name", "Name must be at least two chracters long").trim().isLength({min: 2}),
  body("name", "Name must only be contain letters").isAlpha(),
  body("passwordAgain", "Password not the same as the confirm password").trim().custom((value, {req}) =>{
    if(value !== req.body.password){
      throw new Error('Password not the same as the confirm password');
    }
    return true;
  }),
  //TODO: Internationalization and non ASCII
  (req, response)=>{
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
      return response.status(400).send(validationErrors.array().map((x)=>x["msg"]));
    }
    let userAdd = {
      username : req.body.username,
      email: req.body.email, 
      // password: req.body.password,
      name: req.body.name,
      admin: false,
    };
  bcrypt.genSalt(saltSize, function (err, salt){
    bcrypt.hash(userAdd.password, salt, function(err,hash){
      if(err) {
        console.log(`The error with the hash is : ${err}`);
        throw err;
      }
      userAdd.password = hash;
    });
  });
  const collection = db.collection("users");
  const existsEmail = await collection.findOne({email:  userAdd.email});
  const existsUsername = await collection.findOne({username: userAdd.username});
  console.log("The user being added: ", userAdd);
  if (existsEmail.length === 0  && existsUsername.length === 0){//TODO: Hash password
    const result = collection.insertOne(userAdd);
    response.status(201).send(result);//201 Created
  }
  else{
    response.status(409).send("Username and/or email already in use");//409 Conflict
  }
});

// @route POST /login
// @description add a user
// @access Public
userRouter.post('/login', async (req, response) =>{
  let userLog = {
    username : req.body.username,
    password: req.body.password,
  };
  if(!userLog.username || !userLog.password){
    response.status(400).send("Please enter all fields");
  }
  const collection = db.collection("users");
  const user = await collection.findOne({username: userLog.username});
  // user.forEach(console.log);
  if(user.username === undefined) return response.status(400).send("User does not exist");
  // console.log(`The user password is: ${user.password}, ${user.username} `);
  bcrypt.compare(userLog.password, user.password).then((isMatch) =>{//FIXME: Hashing the user's input
    if(!isMatch) return response.status(404).send("Invalid crednetials");
    const userSession = {id:user.id, name: user.name, email: user.email};
    req.session.user = userSession;
    window.sessionStorage.setItem("session-id", true);
    response.cookie = "session=true";
    response.status(200).send(`Successfully logged in ${userLog.username}`);
  });
});

userRouter.delete('/logout', async (req, response) =>{
  req.session.destroy((error)=>{
    if(error) throw error;
    response.clearCookie("session-id");
    req.session.user = null;
    response.cookie = "session=false";
    window.sessionStorage.setItem("session-id", false);
    response.send("Logged out successfully");
  });
});

// @route GET /calendar
// @description add a user
// @access Public
userRouter.route('/calendar').get(function (req, response){
  let connection = databaseObject.getDb();
  let userLog = {
    username : req.body.username,
  };
  connection.collection("calendar").findOne(userLog, function (err, res){
    if(err){
       throw err;
    }
    //TODO: check the username then check the password matches bcrypt
    response.json(res);
  });
});

userRouter.post('/user/forgot', async (req, response) =>{
  response.send("Forgot password, put in username to get temporary password");
});

export default userRouter;