import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('Email-Pass-Demo-DB');  // MongoDB database name

    const dataToInsert = req.body;
    const collection = db.collection('Email-Pass-Demo-Collection');  // collection name

    const result = await collection.insertOne(dataToInsert);

    res.status(201).json({ message: 'Data added successfully', insertedId: result.insertedId });
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
