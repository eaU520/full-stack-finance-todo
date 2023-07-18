const express = require('express');
// const connectDB = require('./server/db/conn.mjs');

const app = express();

var cors = require('cors');

//routes
const expensesAPI = require("./server/routes/expense.mjs");

// connectDB();

//cors
// app.use(cors({ origin: true, credentials: true}));

// //JSON parsing/middleware
// // app.use(express.json({extended: false}));
app.use(express.json());

app.get('/', (req, res) => res.send(''));

app.use("/expenses", expensesAPI);

// // app.use("/",()=>{res.render()});

// app.use("/create-expense", expensesAPI);

// const port = process.env.PORT || 5050;

// app.listen(port, () => console.log(`Server running on port ${port}`));
// //TODO: DELETE