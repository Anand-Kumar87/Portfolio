import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request) {
  try {
    console.log('Login attempt started');
    await connectDB();
    console.log('DB connected');
    
    const { username, password } = await request.json();
    console.log('Login attempt for username:', username);

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username });
    console.log('User found:', !!user);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials - user not found' },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password);
    console.log('Password valid:', isValid);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials - wrong password' },
        { status: 401 }
      );
    }

    const token = generateToken({ userId: user._id, username: user.username });

    return NextResponse.json({ 
      token, 
      username: user.username,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed', message: error.message },
      { status: 500 }
    );
  }
}
