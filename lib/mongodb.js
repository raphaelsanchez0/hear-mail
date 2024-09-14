import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://Hear-Mail-Admin:Hearmail2024@email-pass-db-demo.grudt.mongodb.net/?retryWrites=true&w=majority&appName=Email-Pass-DB-Demo';  // Replace with your actual MongoDB URI
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error('MongoDB URI in not URIing');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to avoid connecting multiple times
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, it’s fine to create a new client for every function call
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
