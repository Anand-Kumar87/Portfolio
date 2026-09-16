'use client';
import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiShare2, FiExternalLink } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getAuthHeaders } from '@/lib/utils';

export default function SocialManager() {
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSocial, setCurrentSocial] = useState({
    platform: 'GitHub',
    url: '',
    order: 0,
  });

  const platforms = ['GitHub', 'LinkedIn', 'Twitter', 'Instagram', 'WhatsApp', 'Email', 'YouTube', 'Discord'];

  useEffect(() => {
    fetchSocials();
  }, []);

  const fetchSocials = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/social');
      const data = await res.json();
      setSocials(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching socials:', error);
      toast.error('Failed to load social links');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = currentSocial._id ? `/api/social/${currentSocial._id}` : '/api/social';
      const method = currentSocial._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(currentSocial),
      });

      if (response.ok) {
        toast.success(currentSocial._id ? 'Social link updated!' : 'Social link added!');
        fetchSocials();
        resetForm();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to save social link');
      }
    } catch (error) {
      toast.error('An error occurred while saving');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this social link?')) return;

    try {
      const response = await fetch(`/api/social/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        toast.success('Social link deleted!');
        fetchSocials();
      } else {
        toast.error('Failed to delete');
      }
    } catch (error) {
      toast.error('An error occurred while deleting');
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentSocial({
      platform: 'GitHub',
      url: '',
      order: socials.length,
    });
  };

  const handleEdit = (item) => {
    setCurrentSocial(item);
    setIsEditing(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Manage Social Links</h2>
          <p className="text-sm text-gray-500">Configure floating social icons and profiles</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsEditing(true);
          }}
          className="glow-button flex items-center gap-2"
        >
          <FiPlus /> Add Social Link
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="glass dark:glass-dark rounded-2xl p-6 mb-8 border border-white/10 space-y-4">
          <h3 className="text-xl font-bold mb-4">{currentSocial._id ? 'Edit Social Link' : 'Add New Social Link'}</h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Platform *</label>
              <select
                value={currentSocial.platform}
                onChange={(e) => setCurrentSocial({ ...currentSocial, platform: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {platforms.map((p) => (
                  <option key={p} value={p} className="dark:bg-gray-800">
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Profile / Contact URL *</label>
              <input
                type="text"
                required
                value={currentSocial.url}
                onChange={(e) => setCurrentSocial({ ...currentSocial, url: e.target.value })}
                placeholder="https://github.com/your-username or mailto:your@email.com"
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button type="submit" className="glow-button">
              {currentSocial._id ? 'Update Link' : 'Save Link'}
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
        <div className="text-center py-12 text-gray-500">Loading social links...</div>
      ) : socials.length === 0 ? (
        <div className="text-center py-12 glass dark:glass-dark rounded-2xl p-8">
          <FiShare2 size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-gray-500 dark:text-gray-400">No social links added yet. Click "Add Social Link" to connect your profiles!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {socials.map((social) => (
            <div
              key={social._id}
              className="glass dark:glass-dark rounded-2xl p-4 flex justify-between items-center hover:border-white/20 transition-all border border-transparent"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-sm">
                  {social.platform.substring(0, 2).toUpperCase()}
                </div>
                <div className="truncate">
                  <h4 className="font-bold text-gray-900 dark:text-white">{social.platform}</h4>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:underline flex items-center gap-1 truncate"
                  >
                    {social.url} <FiExternalLink size={10} />
                  </a>
                </div>
              </div>

              <div className="flex gap-2 ml-4 flex-shrink-0">
                <button
                  onClick={() => handleEdit(social)}
                  className="glass dark:glass-dark p-2.5 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                  title="Edit link"
                >
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(social._id)}
                  className="glass dark:glass-dark p-2.5 rounded-full hover:bg-red-500 hover:text-white transition-all"
                  title="Delete link"
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
