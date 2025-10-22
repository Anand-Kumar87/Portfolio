import { NextResponse } from 'next/server';

export async function POST() {
  // In a JWT-based system, logout is handled client-side
  // This endpoint exists for consistency and future enhancements
  
  return NextResponse.json({ message: 'Logged out successfully' });
}