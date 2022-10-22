const express = require('express');
const expensesRouter = express.Router();

// Load Expense model
const Expense = require('../database/models/User');

// Connection to the database
const databaseObject = require("../database/db");
const { ObjectId } = require('mongodb');

// ID to Object
const objectID = require("mongodb").ObjectId;

// @route POST /register
// @description add a user
// @access Public
expensesRouter.route('/register').post(function (req, response){
    let connection = databaseObject.getDb();

    let userAdd = {
      username : req.body.username,
      email: req.body.email, 
      password: req.body.password,
      admin: false,
    };
    connection.collection("users").insertOne(userAdd, function (err, res){
      if(err){
         throw err;
      }
      response.json(res);
    });
});