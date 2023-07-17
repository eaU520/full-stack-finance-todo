//TODO: Search expenses
//TODO: Sort by date, amount, name
//TODO: Pagination of expenses
import express from "express";
import db from "../database/db.mjs";
import {ObjectId} from "mongodb";

const router = express.Router();

// // Load Expense model
// const Expense = require('../database/models/Expense');

// // Connection to the database
// const databaseObject = require("../database/db.mjs");
// const { ObjectId } = require('mongodb');
// const { db } = require('../database/models/Expense');

// ID to Object
// const objectID = require("mongodb").ObjectId;
router.get("/", async (req,res) => {
  let collection = await databaseObject.collection("test");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});
// @route GET expenses
// @description Get all expenses
// @access Public
router.route('/expenses').get(function (req, res){
  let connection = databaseObject.getDb("test");//TODO: Extract in someway
  connection.collection("expenses")
  .find({})
  .toArray(function (err, result){
      if (err) throw err;
      res.json(result);
    }
  );
});

// @route GET /
// @description Get homepage by id
// @access Public
//TODO: Fix homepage with routes to render React component
// expensesRouter.post('/', (req, res) => {
//   res.send("");//TODO: Fix Homepage rendering
// });

// @route GET /expenses/:id
// @description Get single expense by id
// @access Public
router.route('/expenses/:id').get(function (req, res) {
  let connection = databaseObject.getDb();
  debugger
  let query = {_id: ObjectId(req.params.id)};
  connection
  .collection("expenses")
  .findOne(query, function(err, result){
    if(err) throw err;
    res.json(result);
  });
});

// @route PUT /edit/:id
// @description Edit a single expense by id
// @access Public
router.route('/edit/:id').post(function (req, res) {
  let connection = databaseObject.getDb();
  let query = {_id: ObjectId(req.params.id)};
  let edittedExpense = {
    $set: {
      name: req.body.name,
      amount: req.body.amount, 
      type: req.body.type,
      description: req.body.description,
      due_date: req.body.due_date,
      urgency: req.body.urgency,
      funded: req.body.funded,
    },
  };
  connection
  .collection("expenses")
  .updateOne(query, edittedExpense, function(err, result){
    if(err) throw err;
    res.json(result);
  });
  console.log(query +" : "+ query);

});

// @route POST /create-expense
// @description add expense
// @access Public
//TODO: Should be just expense w/post?
router.route('/create-expense').post(function (req, response){
    let connection = databaseObject.getDb();

    let expenseAdd = {
      name : req.body.name,
      amount: req.body.amount, 
      description: req.body.description,
      due_date: req.body.due_date,
      funded: req.body.funded=="on"? true:false,
      type: req.body.type,
      urgency: req.body.urgency,
    };
    connection.collection("expenses").insertOne(expenseAdd, function (err, res){
      if(err){
         throw err;
      }
      response.json(res);
    });
});

// @route DELETE /expense/:id
// @description Delete expense by id
// @access Public
router.route('/expenses/:id').delete((req, res) => {
  let connection = databaseObject.getDb();//TODO: Extract in someway
  let query = {_id: ObjectId(req.params.id)};
  connection.collection("expenses").deleteOne(query, function(err,obj){
    if (err) throw err;
    res.json(obj);
  });
});

// module.exports = router;
export default router;