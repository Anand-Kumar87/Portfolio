'use client';
import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    title: '',
    description: '',
    image: '',
    techStack: [],
    githubLink: '',
    liveLink: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const url = currentProject._id
        ? `/api/projects/${currentProject._id}`
        : '/api/projects';
      const method = currentProject._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentProject),
      });

      if (response.ok) {
        toast.success(currentProject._id ? 'Updated!' : 'Created!');
        fetchProjects();
        setIsEditing(false);
        setCurrentProject({
          title: '',
          description: '',
          image: '',
          techStack: [],
          githubLink: '',
          liveLink: '',
        });
      }
    } catch (error) {
      toast.error('Failed to save project');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;

    const token = localStorage.getItem('token');
    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      toast.success('Deleted!');
      fetchProjects();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="glow-button flex items-center gap-2"
        >
          <FiPlus /> Add Project
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="glass dark:glass-dark rounded-2xl p-6 mb-6">
          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Title"
              required
              value={currentProject.title}
              onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
              className="px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <textarea
              placeholder="Description"
              required
              value={currentProject.description}
              onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
              className="px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={currentProject.image}
              onChange={(e) => setCurrentProject({ ...currentProject, image: e.target.value })}
              className="px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              placeholder="Tech Stack (comma separated)"
              value={currentProject.techStack.join(', ')}
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  techStack: e.target.value.split(',').map((s) => s.trim()),
                })
              }
              className="px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="url"
              placeholder="GitHub Link"
              value={currentProject.githubLink}
              onChange={(e) => setCurrentProject({ ...currentProject, githubLink: e.target.value })}
              className="px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="url"
              placeholder="Live Link"
              value={currentProject.liveLink}
              onChange={(e) => setCurrentProject({ ...currentProject, liveLink: e.target.value })}
              className="px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button type="submit" className="glow-button">
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setCurrentProject({
                  title: '',
                  description: '',
                  image: '',
                  techStack: [],
                  githubLink: '',
                  liveLink: '',
                });
              }}
              className="glass dark:glass-dark px-6 py-3 rounded-full"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project._id} className="glass dark:glass-dark rounded-2xl p-6 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setCurrentProject(project);
                  setIsEditing(true);
                }}
                className="glass dark:glass-dark p-3 rounded-full hover:bg-blue-500 hover:text-white transition-all"
              >
                <FiEdit />
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="glass dark:glass-dark p-3 rounded-full hover:bg-red-500 hover:text-white transition-all"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}