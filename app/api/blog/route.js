import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { verifyToken, getAuthToken } from '@/lib/auth';
import { generateSlug } from '@/lib/utils';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const includeUnpublished = searchParams.get('all') === 'true';
    
    const token = getAuthToken(request);
    const isAuthenticated = token && verifyToken(token);
    
    const query = (!isAuthenticated && !includeUnpublished) ? { published: true } : {};
    
    const posts = await Blog.find(query).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
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
    
    // Auto-generate slug if not provided
    if (!data.slug) {
      data.slug = generateSlug(data.title);
    }
    
    // Ensure slug is unique
    let slug = data.slug;
    let counter = 1;
    while (await Blog.findOne({ slug })) {
      slug = `${data.slug}-${counter}`;
      counter++;
    }
    data.slug = slug;

    const post = await Blog.create(data);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}