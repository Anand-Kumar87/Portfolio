'use client';
import { useState, useEffect } from 'react';
import { FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getAuthHeaders } from '@/lib/utils';

export default function AboutManager() {
  const [aboutData, setAboutData] = useState({
    name: '',
    profession: '',
    tagline: '',
    bio: '',
    profileImage: '',
    resumeUrl: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await fetch('/api/about');
      const data = await res.json();
      if (data && data._id) {
        setAboutData(data);
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(aboutData),
      });

      if (response.ok) {
        toast.success('About section updated successfully!');
      } else {
        toast.error('Failed to update');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setAboutData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage About Section</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              value={aboutData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Profession
            </label>
            <input
              type="text"
              value={aboutData.profession}
              onChange={(e) => handleChange('profession', e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Full-Stack Developer"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Tagline
          </label>
          <input
            type="text"
            value={aboutData.tagline}
            onChange={(e) => handleChange('tagline', e.target.value)}
            className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Building beautiful digital experiences"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Biography
          </label>
          <textarea
            rows={8}
            value={aboutData.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="Tell your story..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Profile Image URL
            </label>
            <input
              type="url"
              value={aboutData.profileImage}
              onChange={(e) => handleChange('profileImage', e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="https://example.com/profile.jpg"
            />
            {aboutData.profileImage && (
              <img
                src={aboutData.profileImage}
                alt="Profile Preview"
                className="mt-3 w-32 h-32 rounded-full object-cover glass dark:glass-dark p-2"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Resume URL
            </label>
            <input
              type="url"
              value={aboutData.resumeUrl}
              onChange={(e) => handleChange('resumeUrl', e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="/resume.pdf or https://..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="glow-button w-full md:w-auto flex items-center justify-center gap-2"
        >
          <FiSave /> {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}