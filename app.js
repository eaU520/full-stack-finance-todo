const express = require('express');
const connectDB = require('./backend/database/db');

const app = express();

var cors = require('cors');

//routes
const expensesAPI = require("./routes/api/expenses");

connectDB();

//cors
app.use(cors({ origin: true, credentials: true}));

//JSON parsing/middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send(''));

app.use("/api/expenses", expensesAPI);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
//TODO: Password configuration