//TODO: Search expenses
//TODO: Sort by date, amount, name
//TODO: Pagination of expenses
const express = require('express');
const expensesRouter = express.Router();

// Load Expense model
const Expense = require('../database/models/Expense');

// Connection to the database
const databaseObject = require("../database/db");
const { ObjectId } = require('mongodb');

// ID to Object
const objectID = require("mongodb").ObjectId;

// @route GET expenses
// @description Get all expenses
// @access Public
// expensesRouter.get('/', (req, res, next) => {
//   //returns React index.html?
// });
expensesRouter.route('/expenses').get(function (req, res){
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

// // @route GET api/expenses/:id
// // @description Get single expense by id
// // @access Public
// expensesRouter.get('expenses/:id', (req, res) => {
//     Expense.findById(req.params.id)
//     .then(expense => res.json(expense))
//     .catch(err => res.status(404).json({ noexpensefound: 'No Expense found' }));
// });

// @route POST /edit/:id
// @description Get single expense by id and update
// @access Public
expensesRouter.route('edit/:id').post(function (req, res) {
    
});

// @route POST /create-expense
// @description add expense
// @access Public
expensesRouter.route('/create-expense').post(function (req, response){
    let connection = databaseObject.getDb();

    let expenseAdd = {
      name : req.body.name,
      amount: req.body.amount, 
      description: req.body.description,
      due_date: req.body.due_date,
      funded: req.body.funded,
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

// @route GET /expense/:id
// @description Update expense
// @access Public
// expensesRouter.put('/:id', (req, res) => {
//     Expense.findByIdAndUpdate(req.params.id, req.body)
//     .then(expense => res.json({ msg: 'Updated successfully' }))
//     .catch(err =>
//       res.status(400).json({ error: 'Unable to update the Database' })
//     );
// });

// @route DELETE /expense/:id
// @description Delete expense by id
// @access Public
expensesRouter.route('/expenses/:id').delete((req, res) => {
  let connection = databaseObject.getDb();//TODO: Extract in someway
  let query = {_id: ObjectId(req.params.id)};
  connection.collection("expenses").deleteOne(query, function(err,obj){
    if (err) throw err;
    res.json(obj);
  });
});

module.exports = expensesRouter;