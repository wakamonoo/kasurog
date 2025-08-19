import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if(!global.mongoClient) {
  client = new MongoClient(uri, options);
  global.mongoClient = client.connect();
}

clientPromise = global.mongoClient;
export default clientPromise;