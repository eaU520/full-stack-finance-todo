const express = require('express');
const expensesRouter = express.Router();

// Load Expense model
const Expense = require('../database/models/User');

// Connection to the database
const databaseObject = require("../database/db");
const { ObjectId } = require('mongodb');

// ID to Object
const objectID = require("mongodb").ObjectId;

