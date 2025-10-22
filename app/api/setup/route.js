import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST(request) {
  try {
    // Check if this is the first setup (no users exist)
    await connectDB();
    
    const existingUsers = await User.countDocuments();
    
    // Uncomment the lines below to only allow setup when no users exist
    // if (existingUsers > 0) {
    //   return NextResponse.json(
    //     { error: 'Setup already completed' },
    //     { status: 403 }
    //   );
    // }

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password required' },
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