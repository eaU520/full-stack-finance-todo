//TODO: Sort by date, amount, name
//TODO: Pagination of expenses
import express from "express";
import db from "../db/conn.mjs";
import {ObjectId} from "mongodb";

const router = express.Router();
// This section will get a list of all the expenses.
router.get("/", async (req, res) => {
  if(req.headers["session"]){
    let collection = await db.collection("expenses");
    const user = req.headers["session"];
    let results = await collection.find({username:user}).toArray();
    console.log(results);
    if (!results) res.send("No expenses found").status(204);//204 no content
    else res.status(200).send(results);
  }else{
    res.status(401).send("You have to be logged in to view expenses");
  }
});

// This section will get a single expense by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("expenses");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);
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

// This section will create a new expense.
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
  };
  let collection = await db.collection("expenses");
  console.log("Adding a new expense");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will update an expense by id.
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
      funded: req.body.funded,
      username: req.body.username
    }
  };

  let collection = await db.collection("expenses");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("expenses");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
