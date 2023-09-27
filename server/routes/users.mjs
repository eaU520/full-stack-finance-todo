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
  body('email').isEmail().normalizeEmail(),//TODO: What does normalize do?
  body('password').isStrongPassword({//FIXME: Check for valid password
    minLength: 8,
    maxLength: 16,
    minUppercase: 1,
    minNumbers: 1
    //TODO: Special Characters?
  }).withMessage("Password must be 8-16 characters and contain at least one uppercase letter and at least one number"),
  body('password'),async (req, response)=>{
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
      console.log("Hash: ", hash)
    })
  });
  const collection = await db.collection("users");
  const existsEmail = await collection.find({email: {$in: userAdd.email}});
  console.log(existsEmail, "<-Parse");
  const existsUsername = await collection.find({username: userAdd.username});
  console.log("Email: ",existsEmail._eventsCount === 0);
  console.log("Username: ", existsUsername._eventsCount === 0);
  if (existsEmail._eventsCount === 0  && existsUsername._eventsCount === 0){//TODO: Hash password
    const result = await collection.insertOne(userAdd);
    // console.log("Added person", result, userAdd);
    response.send(result).status(204);
  }
  else{
    console.log("Not added: ",userAdd);
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
  });
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