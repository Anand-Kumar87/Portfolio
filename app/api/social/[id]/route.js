import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Social from '@/models/Social';
import { verifyToken, getAuthToken } from '@/lib/auth';

export async function PUT(request, { params }) {
  try {
    const token = getAuthToken(request);
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    const social = await Social.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    if (!social) {
      return NextResponse.json(
        { error: 'Social link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(social);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update social link' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const token = getAuthToken(request);
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const social = await Social.findByIdAndDelete(params.id);

    if (!social) {
      return NextResponse.json(
        { error: 'Social link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Social link deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete social link' },
      { status: 500 }
    );
  }
}