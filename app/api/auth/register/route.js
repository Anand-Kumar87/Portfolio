import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, generateToken } from '@/lib/auth';

// Z+ Security Master Passkeys accepted for admin registration
const VALID_SECURITY_KEYS = [
  process.env.REGISTRATION_KEY,
  'ZPLUS-SECURE-2026',
  'Admin@12345',
  'ANAND-SECURITY-KEY',
  'ZPLUS2026'
].filter(Boolean);

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { username, password, securityKey } = body;

    // 1. Basic validation
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const trimmedUsername = username.trim();

    if (trimmedUsername.length < 3) {
      return NextResponse.json(
        { error: 'Username must be at least 3 characters' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // 2. Security Passkey Validation (Z+ Security gate)
    // Allows first user setup if DB is empty, or requires security passkey
    const totalUsers = await User.countDocuments();
    if (totalUsers > 0) {
      const providedKey = (securityKey || '').trim();
      const isKeyValid = VALID_SECURITY_KEYS.some(k => k.toLowerCase() === providedKey.toLowerCase());
      
      if (!isKeyValid) {
        return NextResponse.json(
          { 
            error: 'Invalid Z+ Security Passkey', 
            hint: 'Use Master Passkey: ZPLUS-SECURE-2026 or Admin@12345' 
          },
          { status: 403 }
        );
      }
    }

    // 3. Check if user already exists
    const existingUser = await User.findOne({
      username: { $regex: new RegExp(`^${trimmedUsername}$`, 'i') }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Admin username already exists. Please choose another username or log in.' },
        { status: 409 }
      );
    }

    // 4. Hash password with bcrypt 12 salt rounds
    const hashedPassword = await hashPassword(password);

    // 5. Create new admin user
    const newUser = await User.create({
      username: trimmedUsername,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
    });

    // 6. Generate secure session token
    const token = generateToken({ userId: newUser._id, username: newUser.username });

    return NextResponse.json({
      success: true,
      message: 'Z+ Security Admin account created successfully!',
      token,
      username: newUser.username,
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed', message: error.message },
      { status: 500 }
    );
  }
}
