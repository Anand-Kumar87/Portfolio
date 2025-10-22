'use client';
import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiAward } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getAuthHeaders, formatDate } from '@/lib/utils';

export default function AchievementsManager() {
  const [achievements, setAchievements] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    title: '',
    description: '',
    date: '',
    issuer: '',
    credentialUrl: '',
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const res = await fetch('/api/achievements');
      const data = await res.json();
      setAchievements(data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = currentItem._id
        ? `/api/achievements/${currentItem._id}`
        : '/api/achievements';
      const method = currentItem._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(currentItem),
      });

      if (response.ok) {
        toast.success(currentItem._id ? 'Updated!' : 'Created!');
        fetchAchievements();
        resetForm();
      } else {
        toast.error('Failed to save');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this achievement?')) return;

    try {
      const response = await fetch(`/api/achievements/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        toast.success('Deleted!');
        fetchAchievements();
      } else {
        toast.error('Failed to delete');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentItem({
      title: '',
      description: '',
      date: '',
      issuer: '',
      credentialUrl: '',
    });
  };

  const handleEdit = (item) => {
    setCurrentItem({
      ...item,
      date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
    });
    setIsEditing(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Achievements</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="glow-button flex items-center gap-2"
        >
          <FiPlus /> Add Achievement
        </button>
      </div>

      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="glass dark:glass-dark rounded-2xl p-6 mb-6"
        >
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                required
                value={currentItem.title}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, title: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="AWS Certified Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Issuer *</label>
              <input
                type="text"
                required
                value={currentItem.issuer}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, issuer: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Amazon Web Services"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date *</label>
              <input
                type="date"
                required
                value={currentItem.date}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, date: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                rows={3}
                value={currentItem.description}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, description: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="Brief description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Credential URL
              </label>
              <input
                type="url"
                value={currentItem.credentialUrl}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, credentialUrl: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button type="submit" className="glow-button">
              {currentItem._id ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="glass dark:glass-dark px-6 py-3 rounded-full"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement._id}
            className="glass dark:glass-dark rounded-2xl p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="glass dark:glass-dark p-3 rounded-2xl">
                  <FiAward className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{achievement.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {achievement.issuer} • {formatDate(achievement.date)}
                  </p>
                  {achievement.description && (
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {achievement.description}
                    </p>
                  )}
                  {achievement.credentialUrl && (
                    <a
                      href={achievement.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                    >
                      View Credential →
                    </a>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(achievement)}
                  className="glass dark:glass-dark p-3 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(achievement._id)}
                  className="glass dark:glass-dark p-3 rounded-full hover:bg-red-500 hover:text-white transition-all"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {achievements.length === 0 && !isEditing && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No achievements added yet. Click "Add Achievement" to get started.
        </p>
      )}
    </div>
  );
}