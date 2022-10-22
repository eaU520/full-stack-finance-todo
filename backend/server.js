const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(require("../backend/routes/expense"));
app.use(require("../backend/routes/user"));
// get driver connection
const dbconn = require("./database/db");

app.listen(port, () => {
  // perform a database connection when server starts
  dbconn.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});