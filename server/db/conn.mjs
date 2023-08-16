import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);
let conn;
try{
  conn = await client.connect();
}catch(e){
  console.error("Could not connect: ",e);
}
console.log(`Connection: ${conn}`);
let db = conn.db("test");
export default db;

//_db = db.db("test");//TODO: database or collection?
