import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Social from '@/models/Social';
import { verifyToken, getAuthToken } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const socials = await Social.find().sort({ order: 1 });
    return NextResponse.json(socials);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch social links' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const token = getAuthToken(request);
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    const social = await Social.create(data);
    return NextResponse.json(social, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create social link' },
      { status: 500 }
    );
  }
}