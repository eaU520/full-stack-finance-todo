import express from "express";
import db from "../db/conn.mjs";
import {ObjectId} from "mongodb";

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
userRouter.route('/register').post(function (req, response){
    let connection = databaseObject.getDb();

    let userAdd = {
      username : req.body.username,
      email: req.body.email, 
      password: req.body.password,
      name: req.body.name,
      admin: false,
    };
    //TODO: Check if user already exists
    connection.collection("users").insertOne(userAdd, function (err, res){
      if(err){
         throw err;
      }
      response.json(res);
    });
});

// @route POST /login
// @description add a user
// @access Public
userRouter.route('/login').post(function (req, response){
  let connection = databaseObject.getDb();
  let userLog = {
    username : req.body.username,
    password: req.body.password,
  };
  connection.collection("users").findOne(userLog, function (err, res){
    if(err){
       throw err;
    }
    //TODO: check the username then check the password matches bcrypt
    response.json(res);
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