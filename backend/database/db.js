const { MongoClient } = require("mongodb");
const Db = process.env.mongoURI;
const connectionString = process.env.mongoURI || "";
const client1 = new MongoClient(connectionString);
// console.log(Db);
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
let connection;
try{
  connection = await client1.connect();
}catch(e){
  console.error(e);
}
let db1 = connection.db("I_don't_know_what_goes_here");
export default db1;
// module.exports = {
//   connectToServer: function (callback) {
//     client.connect(function (err, db) {
//       // Verify we got a good "db" object
//       if (db != undefined)
//       {
//         _db = db.db("test");//TODO: database or collection?
//         console.log("Successfully connected to MongoDB."); 
//       }
//       return callback(err);
//          });
//   },
 
//   getDb: function () {
//     return _db;
//   },
// };