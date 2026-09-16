import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST(request) {
  try {
    // Check if this is the first setup (no users exist)
    await connectDB();
    
    const existingUsers = await User.countDocuments();
    
    if (existingUsers > 0) {
      return NextResponse.json(
        { error: 'Setup has already been completed. Contact administrator.' },
        { status: 403 }
      );
    }

    const { username, password } = await request.json();

    if (!username || !password || password.length < 6) {
      return NextResponse.json(
        { error: 'Valid username and password (minimum 6 characters) required' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    await User.findOneAndUpdate(
      { username },
      {
        username,
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      message: 'Admin user created successfully',
      username,
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    );
  }
}