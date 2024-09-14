import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('Email-Pass-Demo-DB');
    const collection = db.collection('Email-Pass-Demo-Collection');

    const users = await collection.find({}).toArray();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
