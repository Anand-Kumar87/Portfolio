import { FiClock, FiArrowRight } from 'react-icons/fi';
import GlassCard from '@/components/GlassCard';
import { formatDate, calculateReadingTime, truncate } from '@/lib/utils';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

async function getBlogPosts() {
  await connectDB();
  const posts = await Blog.find({ published: true })
    .sort({ createdAt: -1 })
    .lean();
  
  return JSON.parse(JSON.stringify(posts));
}

export const metadata = {
  title: 'Blog - My Portfolio',
  description: 'Read my latest articles and insights',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen pt-24 px-6 pb-20">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Blog & Articles
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          Thoughts, insights, and stories from my journey
        </p>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No blog posts published yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug}`}>
                <GlassCard className="h-full cursor-pointer group">
                  {post.coverImage && (
                    <div className="relative overflow-hidden rounded-2xl mb-4 h-48">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span>{formatDate(post.createdAt)}</span>
                    <span className="flex items-center gap-1">
                      <FiClock /> {calculateReadingTime(post.content)} min
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {truncate(post.excerpt || post.content, 120)}
                  </p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 gap-2 transition-all">
                    Read More <FiArrowRight />
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}