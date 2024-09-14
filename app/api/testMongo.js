import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('Email-Pass-Demo-DB'); // Replace with your actual database name

    // Define a collection
    const collection = db.collection('Email-Pass-Demo-Collection'); // Replace with your collection name

    if (req.method === 'POST') {
      // Insert a test document into the collection
      const newUser = { email: 'john.doe@example.com', pass: 'Pass1234'};
      const result = await collection.insertOne(newUser);

      return res.status(201).json({ message: 'User added successfully', insertedId: result.insertedId });
    } else if (req.method === 'GET') {
      // Retrieve all documents from the collection
      const users = await collection.find({}).toArray();
      return res.status(200).json(users);
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
