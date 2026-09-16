'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import GlassCard from './GlassCard';
import { FiClock, FiArrowRight } from 'react-icons/fi';
import { formatDate, calculateReadingTime, truncate } from '@/lib/utils';
import Link from 'next/link';

const defaultPosts = [
  {
    _id: 'post-1',
    title: 'Architecting Scalable Web Applications with Next.js & MongoDB',
    slug: 'architecting-scalable-web-applications',
    content: 'Discover modern patterns for App Router, server actions, and efficient database indexing to deliver blazing-fast web experiences.',
    excerpt: 'Key strategies for structuring full-stack web applications with Next.js App Router, server actions, and MongoDB optimization.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    tags: ['Next.js', 'React', 'MongoDB', 'Architecture'],
    createdAt: '2024-03-15T10:00:00.000Z',
    published: true,
  },
  {
    _id: 'post-2',
    title: 'Mastering Fluid Micro-Interactions with Framer Motion & Tailwind',
    slug: 'fluid-micro-interactions-framer-motion',
    content: 'Learn how to elevate UI design with physics-based springs, gesture tracking, and glassmorphism without compromising on 60fps performance.',
    excerpt: 'Step-by-step techniques to bring web apps to life using Framer Motion springs, layout animations, and glassmorphism.',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
    tags: ['UI/UX', 'Framer Motion', 'Tailwind CSS', 'Design'],
    createdAt: '2024-02-28T10:00:00.000Z',
    published: true,
  },
  {
    _id: 'post-3',
    title: 'Building AI-Powered Dashboards: From Concept to Production',
    slug: 'building-ai-powered-dashboards',
    content: 'An in-depth walkthrough on integrating LLM insights, real-time analytics, and secure client-side state in production fintech dashboards.',
    excerpt: 'How to design and deploy AI-driven financial analytics tools with real-time charts, intelligent budgeting, and automated reporting.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    tags: ['AI', 'Analytics', 'Fintech', 'Full-Stack'],
    createdAt: '2024-01-20T10:00:00.000Z',
    published: true,
  },
];

export default function Blog() {
  const [posts, setPosts] = useState(defaultPosts);

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => {
        const dataArray = Array.isArray(data) ? data : [];
        const published = dataArray.filter((post) => post.published);
        if (published.length > 0) {
          setPosts(published.slice(0, 3));
        }
      })
      .catch((error) => {
        console.error('Error fetching blog posts:', error);
      });
  }, []);

  return (
    <section id="blog" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Latest Articles
          </h2>
          <Link
            href="/blog"
            className="glass dark:glass-dark px-6 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition-transform"
          >
            View All <FiArrowRight />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
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
                      <FiClock /> {calculateReadingTime(post.content)} min read
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {truncate(post.excerpt || post.content, 120)}
                  </p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
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

                  <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 gap-2 transition-all">
                    Read More <FiArrowRight />
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}