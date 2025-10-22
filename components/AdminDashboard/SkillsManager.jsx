'use client';
import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getAuthHeaders, groupBy } from '@/lib/utils';

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkill, setCurrentSkill] = useState({
    name: '',
    category: 'Frontend',
    level: 50,
  });

  const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other'];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills');
      const data = await res.json();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = currentSkill._id
        ? `/api/skills/${currentSkill._id}`
        : '/api/skills';
      const method = currentSkill._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(currentSkill),
      });

      if (response.ok) {
        toast.success(currentSkill._id ? 'Updated!' : 'Created!');
        fetchSkills();
        resetForm();
      } else {
        toast.error('Failed to save');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;

    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        toast.success('Deleted!');
        fetchSkills();
      } else {
        toast.error('Failed to delete');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentSkill({
      name: '',
      category: 'Frontend',
      level: 50,
    });
  };

  const handleEdit = (skill) => {
    setCurrentSkill(skill);
    setIsEditing(true);
  };

  const groupedSkills = groupBy(skills, 'category');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Skills</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="glow-button flex items-center gap-2"
        >
          <FiPlus /> Add Skill
        </button>
      </div>

      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="glass dark:glass-dark rounded-2xl p-6 mb-6"
        >
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Skill Name *
              </label>
              <input
                type="text"
                required
                value={currentSkill.name}
                onChange={(e) =>
                  setCurrentSkill({ ...currentSkill, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="React.js"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <select
                required
                value={currentSkill.category}
                onChange={(e) =>
                  setCurrentSkill({ ...currentSkill, category: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Level ({currentSkill.level}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={currentSkill.level}
                onChange={(e) =>
                  setCurrentSkill({
                    ...currentSkill,
                    level: parseInt(e.target.value),
                  })
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button type="submit" className="glow-button">
              {currentSkill._id ? 'Update' : 'Create'}
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

      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div
            key={category}
            className="glass dark:glass-dark rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold mb-4">{category}</h3>
            <div className="space-y-3">
              {categorySkills.map((skill) => (
                <div
                  key={skill._id}
                  className="flex items-center justify-between glass dark:glass-dark rounded-xl p-3"
                >
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="p-2 hover:bg-blue-500 hover:text-white rounded-lg transition-all"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(skill._id)}
                      className="p-2 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {skills.length === 0 && !isEditing && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No skills added yet. Click "Add Skill" to get started.
        </p>
      )}
    </div>
  );
}