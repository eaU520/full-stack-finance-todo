import express from "express";
import db from "../db/conn.mjs";
import {ObjectId} from "mongodb";
import bcrypt from "bcryptjs";
import {body, validate} from 'express-validator';

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
body('password').isLength({
  min: 8,
  max: 16
}),async (req, response)=>{
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
  let collection = await db.collection("users");
  console.log("Adding a new user");
  let result = await collection.insertOne(userAdd);
  response.send(result).status(204);
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

export default userRouter;