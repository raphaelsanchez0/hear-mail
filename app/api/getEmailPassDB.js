import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('Email-Pass-Demo-DB');  // MongoDB database name

    const collection = db.collection('Email-Pass-Demo-Collection');  // collection name
    const data = await collection.find({}).toArray();  // Fetch all data from the collection
    print(" data from db collection: " + data)

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
