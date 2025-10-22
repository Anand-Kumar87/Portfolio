const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const BlogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  content: String,
  excerpt: String,
  coverImage: String,
  tags: [String],
  published: Boolean,
  createdAt: Date,
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

async function addPost() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Blog.create({
      title: 'My First Blog Post',
      slug: 'my-first-blog-post',
      content: 'This is my first blog post content. You can write multiple paragraphs here.',
      excerpt: 'A brief introduction to my first blog post',
      coverImage: 'https://via.placeholder.com/800x400',
      tags: ['web development', 'javascript', 'react'],
      published: true,
      createdAt: new Date(),
    });

    console.log('✅ Blog post added!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addPost();