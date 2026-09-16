'use client';
import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiEye, FiCheck, FiX, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getAuthHeaders, formatDate } from '@/lib/utils';

export default function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    tags: [],
    published: true,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch('/api/blog?all=true', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setCurrentPost((prev) => ({
      ...prev,
      title,
      slug: prev._id ? prev.slug : generatedSlug,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = currentPost._id ? `/api/blog/${currentPost._id}` : '/api/blog';
      const method = currentPost._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(currentPost),
      });

      if (response.ok) {
        toast.success(currentPost._id ? 'Post updated!' : 'Post created!');
        fetchPosts();
        resetForm();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to save post');
      }
    } catch (error) {
      toast.error('An error occurred while saving');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        toast.success('Post deleted successfully!');
        fetchPosts();
      } else {
        toast.error('Failed to delete post');
      }
    } catch (error) {
      toast.error('An error occurred while deleting');
    }
  };

  const handleTogglePublish = async (post) => {
    try {
      const response = await fetch(`/api/blog/${post._id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ ...post, published: !post.published }),
      });

      if (response.ok) {
        toast.success(post.published ? 'Unpublished' : 'Published!');
        fetchPosts();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentPost({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage: '',
      tags: [],
      published: true,
    });
  };

  const handleEdit = (post) => {
    setCurrentPost({
      ...post,
      tags: post.tags || [],
    });
    setIsEditing(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Manage Blog Posts</h2>
          <p className="text-sm text-gray-500">Create, edit, and publish your articles</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsEditing(true);
          }}
          className="glow-button flex items-center gap-2"
        >
          <FiPlus /> New Post
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="glass dark:glass-dark rounded-2xl p-6 mb-8 border border-white/10 space-y-4">
          <h3 className="text-xl font-bold mb-4">{currentPost._id ? 'Edit Blog Post' : 'Create New Post'}</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                required
                value={currentPost.title}
                onChange={handleTitleChange}
                placeholder="e.g. Building Scalable Web Apps with Next.js"
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Slug (URL Path) *</label>
              <input
                type="text"
                required
                value={currentPost.slug}
                onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                placeholder="building-scalable-web-apps"
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Cover Image URL</label>
              <input
                type="url"
                value={currentPost.coverImage || ''}
                onChange={(e) => setCurrentPost({ ...currentPost, coverImage: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={currentPost.tags.join(', ')}
                onChange={(e) =>
                  setCurrentPost({
                    ...currentPost,
                    tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                  })
                }
                placeholder="Next.js, React, WebDev"
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Excerpt (Short summary)</label>
            <textarea
              rows={2}
              value={currentPost.excerpt || ''}
              onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
              placeholder="A brief overview displayed in cards and search results..."
              className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Content (Markdown / HTML) *</label>
            <textarea
              rows={10}
              required
              value={currentPost.content}
              onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
              placeholder="Write your article content here..."
              className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={currentPost.published}
                onChange={(e) => setCurrentPost({ ...currentPost, published: e.target.checked })}
                className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="font-medium">Publish immediately</span>
            </label>
          </div>

          <div className="flex gap-4 pt-2">
            <button type="submit" className="glow-button">
              {currentPost._id ? 'Update Post' : 'Create Post'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="glass dark:glass-dark px-6 py-3 rounded-full hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading articles...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 glass dark:glass-dark rounded-2xl p-8">
          <FiFileText size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-gray-500 dark:text-gray-400">No blog posts found. Click "New Post" to publish your first article!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="glass dark:glass-dark rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/20 transition-all border border-transparent"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      post.published
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(post.createdAt)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1 mb-2">
                  {post.excerpt || post.content}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <button
                  onClick={() => handleTogglePublish(post)}
                  title={post.published ? 'Unpublish' : 'Publish'}
                  className={`p-2.5 rounded-full transition-all ${
                    post.published
                      ? 'glass dark:glass-dark hover:bg-yellow-500 hover:text-white'
                      : 'bg-green-500/20 text-green-500 hover:bg-green-500 hover:text-white'
                  }`}
                >
                  {post.published ? <FiX size={16} /> : <FiCheck size={16} />}
                </button>
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass dark:glass-dark p-2.5 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                  title="View on site"
                >
                  <FiEye size={16} />
                </a>
                <button
                  onClick={() => handleEdit(post)}
                  className="glass dark:glass-dark p-2.5 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                  title="Edit post"
                >
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="glass dark:glass-dark p-2.5 rounded-full hover:bg-red-500 hover:text-white transition-all"
                  title="Delete post"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
