import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Achievement from '@/models/Achievement';
import { verifyToken, getAuthToken } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const achievements = await Achievement.find().sort({ date: -1, order: 1 });
    return NextResponse.json(achievements);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch achievements' },
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
    const achievement = await Achievement.create(data);
    return NextResponse.json(achievement, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create achievement' },
      { status: 500 }
    );
  }
}