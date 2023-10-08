import express from "express";
import db from "../db/conn.mjs";
import bcrypt from "bcryptjs";
import {body} from 'express-validator';

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
  body('email').trim().isEmail()
  .normalizeEmail().isLength({min: 10}).withMessage("Email is too short"),
  body('password').isStrongPassword({
    minLength: 8,
    maxLength: 16,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: false,
    pointsPerUnique: 1,
    pointsPerRepeat: .5,
    pointsForContainingNumber: 5,
    pointsForContainingUpper: 5,
    pointsForContainingLower: 5
  }).withMessage("Password must be 8-16 characters and contain at least one uppercase letter, at least one number"),
  body('name').trim()
    .isLength({min: 2}).withMessage("Name must be at least two chracters long")
    .isAlpha().withMessage("Name must only be alphabet letters"),
  body('passwordAgain').trim().custom((value, {req}) =>{
    if(value !== req.body.password){
      throw new Error('Password not the same as the confirm password');
    }
    return true;
  }),
  //TODO: Internationalization and non ASCII
  async (req, response)=>{
    console.log(body)
    let userAdd = {
      username : req.body.username,
      email: req.body.email, 
      password: req.body.password,
      name: req.body.name,
      admin: false,
    };

  bcrypt.genSalt(saltSize, function (err, salt){
    bcrypt.hash(userAdd.password, salt,(err,hash) =>{
      if(err) throw err;
      userAdd.password = hash;
    })
  });
  const collection = await db.collection("users");
  const existsEmail = await collection.find({email:  userAdd.email}).toArray();
  const existsUsername = await collection.find({username: userAdd.username}).toArray();
  if (existsEmail.length === 0  && existsUsername.length === 0){//TODO: Hash password
    const result = await collection.insertOne(userAdd);
    response.send(result).status(204);
  }
  else{
    response.send("Username and/or email already in use");
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
  bcrypt.genSalt(saltSize, function (err, salt){
    bcrypt.hash(userLog.password, salt,(err,hash) =>{
      if(err) throw err;
      userLog.password = hash;
    })
  });
  let collection = await db.collection("users").findOne(userLog, function (err, res){
    if(err){
       throw err;
    }
    response.send(res);
    console.log(res);//Expect what?
    //TODO: Create session
  });
  const userLoggedIn = collection.toArray()[0];
});

userRouter.delete('/logout', async (req, response) =>{
  req.session.destroy((error)=>{
    if(error) throw error;
    response.clearCookie("session-id");
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