//TODO: Search expenses
//TODO: Sort by date, amount, name
//TODO: Pagination of expenses
const express = require('express');
const expensesRouter = express.Router();

// Load Expense model FIXME: Not needed?
const Expense = require('../database/models/Expense');

// Connection to the database
const databaseObject = require("../database/db");

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

// // @route POST /create-expense
// // @description add/save expense
// // @access Public
// expensesRouter.post('/create-expense', (req, res) => {
//     Expense.create(req.body)
//     .then(expense => res.json({ msg: 'Expense added successfully' }))
//     .catch(err => res.status(400).json({ error: 'Unable to add this expense' }));
// });

// // @route GET /create-expense
// // @description get the page expense
// // @access Public
// expensesRouter.get('/create-expense', (req, res) => {
  
// });

// // @route GET /expense/:id
// // @description Update expense
// // @access Public
// expensesRouter.put('/:id', (req, res) => {
//     Expense.findByIdAndUpdate(req.params.id, req.body)
//     .then(expense => res.json({ msg: 'Updated successfully' }))
//     .catch(err =>
//       res.status(400).json({ error: 'Unable to update the Database' })
//     );
// });

// @route GET /expense/:id
// @description Delete expense by id
// @access Public
expensesRouter.delete('/expenses/:id', (req, res) => {
  Expense.findByIdAndRemove(req.params.id, req.body)
    .then(expense => res.json({ mgs: 'Expense entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such expense' }));
});

module.exports = expensesRouter;