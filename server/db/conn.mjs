import { MongoClient } from "mongodb";
// const Db = process.env.mongoURI;
const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);


let conn;
try{
  conn = await client.connect();
}catch(e){
  console.error(e);
}
let db = conn.db("test");
console.log(db.databaseName);
export default db;

//_db = db.db("test");//TODO: database or collection?
