import express from "express";
import db from "../db/conn.mjs";
import bcrypt from "bcryptjs";
// import session from "express-session";
import {body, validationResult} from 'express-validator';
// import mongoose from "mongoose"; 
// /Users/ebonyarliciacalloway/Documents/full-stack-finance-todo/server/db/models/User.js
// // Load User model
// const User = require('../database/models/User');
import mail from 'nodemailer';

const userRouter = express.Router();
const saltSize = 12;
const transport = mail.createTransport({
  // host: "smtp.forwardmail.net",
  service: "yahoo",
  port: 5050,
  secure: true,
  auth:{
    user:"enterprisea@myyahoo.com",
    pass:"TestingPassword3#"
  }
});

// async function mailTo(from, to, subject,body){
async function mailTo(){
  const bulk = await transport.sendMail({
    from:"ecallowayllc@gmail.com",
    to:"ecal590@gmail.com",
    subject: "Testing email",
    text:"Testxing 123",
    html: "<h2>Testing 123</h2>"
  });

}
// // Connection to the database
// const databaseObject = require("../database/db");
// const { ObjectId } = require('mongodb');
const app = express();
// const mongDBStore = require("connect-mongodb-session")(session);
// ID to Object
// const objectID = require("mongodb").ObjectId;
// @route POST /register
// @description add a user
// @access Public
userRouter.post("/register", 
  body("email", "Must be a valid email format").trim().isEmail(),
  // body("email", "Your email is too short").isLength({min: 5}),normalizeEmail()?
  body("password","Password must be at least 10 characters").isLength({min:10}),
  body("password","Password must contain at least one uppercase letter").matches("[A-Z]"),
  body("password","Password must contain at least one number").matches("[0-9]"),
  //TODO: minSymbols: 1,
  body("name", "Name must be at least two chracters long").trim().isLength({min: 2}),
  // body("name", "Name must only be contain letters").isAlpha(),
  //FIXME: handle spaces...
  body("passwordAgain", "Password not the same as the confirm password").trim().custom((value, {req}) =>{
    if(value !== req.body.password){
      throw new Error('Password not the same as the confirm password');
    }
    return true;
  }),
  //TODO: Internationalization and non ASCII
  async (req, response)=>{
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
      return response.status(400).send(validationErrors.array().map((x)=>x["msg"]));
    }
    let userAdd = {
      username : req.body.username,
      email: req.body.email, 
      password: req.body.password,
      name: req.body.name,
      admin: false,
    };
  userAdd["password"] = await bcrypt.genSalt(saltSize)
    .then(salt => {
      return bcrypt.hash(userAdd.password, salt)
    })
    .then(hash=> {
      return hash;
    })
    .catch(err => console.error(err.message));
    const collection = db.collection("users");
    const existsEmail = await collection.findOne({email:  userAdd.email}).then(res =>{
      if(res !== null){
        return res;
      }
    });
    const existsUsername = await collection.findOne({username: userAdd.username}).then(res => {
      if(res !== null){
        return res;
      }
    });
    if (existsEmail === undefined  && existsUsername === undefined){
      const result = collection.insertOne(userAdd);
      response.status(201).send(result);//201 Created
    }
    else{
      response.status(409).send("Username and/or email already in use");//409 Conflict
    }
    mailTo().catch(console.error);
});

// @route POST /login
// @description add a user
// @access Public
userRouter.post('/login', async (req, response) =>{
  
  let userLog = {
    username : req.body.username,
    password: req.body.password,
  };
  if(!userLog.username || !userLog.password){
    response.status(400).send("Please enter all fields");
  }
  const collection = db.collection("users");
  const user = await collection.findOne({username: userLog.username});
  if(user === null) return response.status(400).json({msg:"User does not exist"});
  // console.log(`The user password is: ${user.password}, ${user.username} `);
  await bcrypt.compare(userLog.password, user.password).then((isMatch) =>{
    if(!isMatch) return response.status(404).send("Invalid credentials");
    response.status(200).send(`Successfully logged in ${userLog.username}`);
  });
});


userRouter.post('/user/forgot', async (req, response) =>{
  response.send("Forgot password, put in username to get temporary password");
});

export default userRouter;