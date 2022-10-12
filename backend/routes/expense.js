const express = require('express');
const expensesRouter = express.Router();

// Load Expense model
const Expense = require('../database/models/Expense');

// Connection to the database
const databaseObject = require("../database/db");

// ID to Object
const objectID = require("mongodb").ObjectId;

// @route GET api/expense/test
// @description tests expense route
// @access Public
expensesRouter.get('/test', (req, res) => res.send('expense route testing!'));

// @route GET expenses
// @description Get all expenses
// @access Public
// router.get('/', (req, res) => {
//   Expense.find()
//     .then(books => res.json(expenses))
//     .catch(err => res.status(404).json({ noexpensesfound: 'No Expenses found' }));
// });
expensesRouter.route('/expenses').get(function (req, res){
  let connection = databaseObject.getDb("test");//TODO: Extract in someway
  connection.collection("expenses").find({}).toArray(
    function (err, result){
      if (err) throw err;
      res.json(result);
    }
  );
  });

// @route GET /
// @description Get homepage by id
// @access Public
expensesRouter.get('/', (req, res) => {
  res.send("Homepage");
});

// @route GET api/expenses/:id
// @description Get single expense by id
// @access Public
expensesRouter.get('/:id', (req, res) => {
    Expense.findById(req.params.id)
    .then(expense => res.json(expense))
    .catch(err => res.status(404).json({ noexpensefound: 'No Expense found' }));
});

// @route GET /expenses
// @description add/save expense
// @access Public
expensesRouter.post('/', (req, res) => {
    Expense.create(req.body)
    .then(expense => res.json({ msg: 'Expense added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this expense' }));
});

// @route GET /expense/:id
// @description Update expense
// @access Public
expensesRouter.put('/:id', (req, res) => {
    Expense.findByIdAndUpdate(req.params.id, req.body)
    .then(expense => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET /expense/:id
// @description Delete expense by id
// @access Public
expensesRouter.delete('/:id', (req, res) => {
  Expense.findByIdAndRemove(req.params.id, req.body)
    .then(expense => res.json({ mgs: 'Expense entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such expense' }));
});

module.exports = expensesRouter;