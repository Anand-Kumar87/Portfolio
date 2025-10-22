import { FiClock, FiCalendar, FiArrowLeft } from 'react-icons/fi';
import GlassCard from '@/components/GlassCard';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { notFound } from 'next/navigation';

async function getPost(slug) {
  await connectDB();
  const post = await Blog.findOne({ slug, published: true }).lean();
  
  if (!post) return null;
  
  return JSON.parse(JSON.stringify(post));
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - My Portfolio`,
    description: post.excerpt || post.content.substring(0, 160),
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-24 px-6 pb-20">
      <div className="container mx-auto max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 glass dark:glass-dark px-6 py-3 rounded-full mb-8 hover:scale-105 transition-transform"
        >
          <FiArrowLeft /> Back to Blog
        </Link>

        <GlassCard>
          {post.coverImage && (
            <div className="relative overflow-hidden rounded-2xl mb-6 h-64 md:h-96">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <span className="flex items-center gap-2">
              <FiCalendar /> {formatDate(post.createdAt)}
            </span>
            <span className="flex items-center gap-2">
              <FiClock /> {calculateReadingTime(post.content)} min read
            </span>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <article className="prose dark:prose-invert max-w-none">
            <div
              className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </GlassCard>
      </div>
    </main>
  );
}