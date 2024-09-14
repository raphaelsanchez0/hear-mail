import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('Email-Pass-Demo-DB');
    const collection = db.collection('Email-Pass-Demo-Collection');

    const { email, pass } = await req.json();

    const result = await collection.insertOne({ email, pass });

    return NextResponse.json({ message: 'Data added successfully', insertedId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error adding data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
