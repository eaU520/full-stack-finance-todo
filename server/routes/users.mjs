import express from "express";
import db from "../db/conn.mjs";
import bcrypt from "bcryptjs";
import {body} from 'express-validator';

// // Load User model
// const User = require('../database/models/User');

const userRouter = express.Router();
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
  body('email').isEmail().normalizeEmail(),
  body('password').isStrongPassword({
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

  bcrypt.getSalt(12, (err, salt) =>
    bcrypt.hash(userAdd.password, salt,(err,hash) =>{
      if(err) throw err;
      userAdd.password = hash;
    })
  );
    //TODO: Check if user already exists
  const collection = await db.collection("users");
  console.log("Attempting to add a new user");
  const exists = await collection.find({username: username, email: email});
  if (exists.isLength() <= 0){
    const result = await collection.insertOne(userAdd);
    response.send(result).status(204);
  }
  else{
    response.send("Username and email already in use");
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
  let collection = await db.collection("users").findOne(userLog, function (err, res){
    if(err){
       throw err;
    }
    //FIXME: Encrypt password//hash in some way
    //TODO: check the username then check the password matches bcrypt
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