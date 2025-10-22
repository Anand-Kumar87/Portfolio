import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import About from '@/models/About';
import { verifyToken, getAuthToken } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const about = await About.findOne().sort({ updatedAt: -1 });
    return NextResponse.json(about || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch about' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const token = getAuthToken(request);
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    
    let about = await About.findOne();
    if (about) {
      about = await About.findByIdAndUpdate(about._id, data, { new: true });
    } else {
      about = await About.create(data);
    }

    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update about' }, { status: 500 });
  }
}