//TODO: Sort by date, amount, name
//TODO: Pagination of expenses
//TODO: CRUD
import express from "express";
import db from "../db/conn.mjs";
import {ObjectId} from "mongodb";

const router = express.Router();
// This section will help you get a list of all the expenses.
router.get("/", async (req, res) => {
  if(req.body.session){
    let collection = await db.collection("expenses");
    let results = await collection.find({user:req.username}).toArray();
    //TODO: Check if logged in
    if (!results) res.send("No expenses found").status(404);
    else res.status(200).send(results);
  }else{
    console.log(`Is there a session ${req.body.session}`);
    res.status(401).send("You have to be logged in to view expenses");
  }
});

// This section will help you get a single expense by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("expenses");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);
  //TODO: Check if logged in
  if (!result) res.send("Not found").status(404);
  else res.status(200).send(result);
});

// This section will help you get expenses by search
router.get("/search", async (req, res) => {
  let collection = await db.collection("expenses");
  let query = {name: new ObjectId(req.query.term)};
  let result = await collection.find(query);

  if (!result) res.send("Not found").status(404);
  else res.status(200).send(result.toArray());
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  let newDocument = {
    name: req.body.name,
    urgency: req.body.urgency,
    amount: req.body.amount,
    description: req.body.description,
    dueDate: req.body.dueDate,
    type: req.body.type,
    funded: req.body.funded,
    username: req.body.username
    // level: req.body.level,
  };
  let collection = await db.collection("expenses");
  console.log("Adding a new expense");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update an expense by id.
router.patch("/:id", async (req, res) => {
  console.log("Editting one expense");
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      name: req.body.name,
      urgency: req.body.urgency,
      amount: req.body.amount,
      description: req.body.description,
      dueDate: req.body.dueDaate,
      type: req.body.type,
      funded: req.body.funded
    }
  };

  let collection = await db.collection("expenses");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("expenses");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});
// modules.exports = router;
export default router;
// // Load Expense model
// const Expense = require('../database/models/Expense');

// // Connection to the database
// const databaseObject = require("../database/db.mjs");
// const { ObjectId } = require('mongodb');
// const { db } = require('../database/models/Expense');

// ID to Object
// const objectID = require("mongodb").ObjectId;
// router.get("/", async (req,res) => {
//   let collection = await databaseObject.collection("test");
//   let results = await collection.find({}).toArray();
//   res.send(results).status(200);
// });
// // @route GET expenses
// // @description Get all expenses
// // @access Public
// router.route('/expenses').get(function (req, res){
//   let connection = databaseObject.getDb("test");//TODO: Extract in someway
//   connection.collection("expenses")
//   .find({})
//   .toArray(function (err, result){
//       if (err) throw err;
//       res.json(result);
//     }
//   );
// });

// // @route GET /expenses/:id
// // @description Get single expense by id
// // @access Public
// router.route('/:id').get(function (req, res) {
//   let connection = databaseObject.getDb();
//   debugger
//   let query = {_id: ObjectId(req.params.id)};
//   connection
//   .collection("expenses")
//   .findOne(query, function(err, result){
//     if(err) throw err;
//     res.json(result);
//   });
// });

// // @route PUT /edit/:id
// // @description Edit a single expense by id
// // @access Public
// router.route('/edit/:id').post(function (req, res) {
//   let connection = databaseObject.getDb();
//   let query = {_id: ObjectId(req.params.id)};
//   let edittedExpense = {
//     $set: {
//       name: req.body.name,
//       amount: req.body.amount, 
//       type: req.body.type,
//       description: req.body.description,
//       due_date: req.body.due_date,
//       urgency: req.body.urgency,
//       funded: req.body.funded,
//     },
//   };
//   connection
//   .collection("expenses")
//   .updateOne(query, edittedExpense, function(err, result){
//     if(err) throw err;
//     res.json(result);
//   });
//   console.log(query +" : "+ query);

// });

// // @route POST /create-expense
// // @description add expense
// // @access Public
// //TODO: Should be just expense w/post?
// router.route('/create-expense').post(function (req, response){
//     let connection = databaseObject.getDb();

//     let expenseAdd = {
//       name : req.body.name,
//       amount: req.body.amount, 
//       description: req.body.description,
//       due_date: req.body.due_date,
//       funded: req.body.funded=="on"? true:false,
//       type: req.body.type,
//       urgency: req.body.urgency,
//     };
//     connection.collection("expenses").insertOne(expenseAdd, function (err, res){
//       if(err){
//          throw err;
//       }
//       response.json(res);
//     });
// });

// // @route DELETE /expense/:id
// // @description Delete expense by id
// // @access Public
// router.route('/expenses/:id').delete((req, res) => {
//   let connection = databaseObject.getDb();//TODO: Extract in someway
//   let query = {_id: ObjectId(req.params.id)};
//   connection.collection("expenses").deleteOne(query, function(err,obj){
//     if (err) throw err;
//     res.json(obj);
//   });
// });

// module.exports = router;
// export default router;