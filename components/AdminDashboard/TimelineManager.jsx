'use client';
import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiBook, FiBriefcase } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getAuthHeaders, formatDate } from '@/lib/utils';

export default function TimelineManager() {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    type: 'education',
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/education');
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching timeline:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = currentItem._id
        ? `/api/education/${currentItem._id}`
        : '/api/education';
      const method = currentItem._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(currentItem),
      });

      if (response.ok) {
        toast.success(currentItem._id ? 'Updated!' : 'Created!');
        fetchItems();
        resetForm();
      } else {
        toast.error('Failed to save');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return;

    try {
      const response = await fetch(`/api/education/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        toast.success('Deleted!');
        fetchItems();
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
      type: 'education',
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
  };

  const handleEdit = (item) => {
    setCurrentItem({
      ...item,
      startDate: item.startDate ? new Date(item.startDate).toISOString().split('T')[0] : '',
      endDate: item.endDate ? new Date(item.endDate).toISOString().split('T')[0] : '',
    });
    setIsEditing(true);
  };

  // Group by type
  const educationItems = items.filter(item => item.type === 'education');
  const experienceItems = items.filter(item => item.type === 'experience');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Education & Experience</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="glow-button flex items-center gap-2"
        >
          <FiPlus /> Add Entry
        </button>
      </div>

      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="glass dark:glass-dark rounded-2xl p-6 mb-6"
        >
          <div className="grid gap-4">
            {/* Type Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Type *</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="education"
                    checked={currentItem.type === 'education'}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, type: e.target.value })
                    }
                    className="w-4 h-4"
                  />
                  <FiBook /> Education
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="experience"
                    checked={currentItem.type === 'experience'}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, type: e.target.value })
                    }
                    className="w-4 h-4"
                  />
                  <FiBriefcase /> Experience
                </label>
              </div>
            </div>

            {/* Institution/Company */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {currentItem.type === 'education' ? 'Institution' : 'Company'} *
              </label>
              <input
                type="text"
                required
                value={currentItem.institution}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, institution: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={currentItem.type === 'education' ? 'University Name' : 'Company Name'}
              />
            </div>

            {/* Degree/Position */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {currentItem.type === 'education' ? 'Degree' : 'Position'} *
              </label>
              <input
                type="text"
                required
                value={currentItem.degree}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, degree: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={currentItem.type === 'education' ? 'Bachelor of Science' : 'Senior Developer'}
              />
            </div>

            {/* Field/Department */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {currentItem.type === 'education' ? 'Field of Study' : 'Department'}
              </label>
              <input
                type="text"
                value={currentItem.field}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, field: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={currentItem.type === 'education' ? 'Computer Science' : 'Engineering'}
              />
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Start Date *</label>
                <input
                  type="date"
                  required
                  value={currentItem.startDate}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, startDate: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <input
                  type="date"
                  value={currentItem.endDate}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, endDate: e.target.value })
                  }
                  disabled={currentItem.current}
                  className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
                />
              </div>
            </div>

            {/* Current */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentItem.current}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, current: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Currently {currentItem.type === 'education' ? 'studying' : 'working'} here</span>
              </label>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                rows={4}
                value={currentItem.description}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, description: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="Brief description of your role, achievements, or what you learned..."
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

      {/* Education Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FiBook /> Education
        </h3>
        <div className="grid gap-4">
          {educationItems.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No education entries added yet.
            </p>
          ) : (
            educationItems.map((item) => (
              <div
                key={item._id}
                className="glass dark:glass-dark rounded-2xl p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-1">{item.degree}</h4>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                      {item.institution}
                    </p>
                    {item.field && (
                      <p className="text-gray-500 dark:text-gray-400 mb-2">
                        {item.field}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {formatDate(item.startDate)} - {item.current ? 'Present' : formatDate(item.endDate)}
                    </p>
                    {item.description && (
                      <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="glass dark:glass-dark p-3 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="glass dark:glass-dark p-3 rounded-full hover:bg-red-500 hover:text-white transition-all"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Experience Section */}
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FiBriefcase /> Experience
        </h3>
        <div className="grid gap-4">
          {experienceItems.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No experience entries added yet.
            </p>
          ) : (
            experienceItems.map((item) => (
              <div
                key={item._id}
                className="glass dark:glass-dark rounded-2xl p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-1">{item.degree}</h4>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                      {item.institution}
                    </p>
                    {item.field && (
                      <p className="text-gray-500 dark:text-gray-400 mb-2">
                        {item.field}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {formatDate(item.startDate)} - {item.current ? 'Present' : formatDate(item.endDate)}
                    </p>
                    {item.description && (
                      <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="glass dark:glass-dark p-3 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="glass dark:glass-dark p-3 rounded-full hover:bg-red-500 hover:text-white transition-all"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}