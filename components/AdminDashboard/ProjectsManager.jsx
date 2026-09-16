'use client';
import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiExternalLink, FiGithub, FiFolder } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    title: '',
    description: '',
    category: 'Full-Stack',
    status: 'Completed',
    year: '2024',
    image: '',
    techStack: [],
    githubLink: '',
    liveLink: '',
  });

  const categories = ['Full-Stack', 'Frontend', 'Backend', 'Mobile', 'AI/ML', 'DevOps', 'Other'];
  const statuses = ['Completed', 'In-Progress', 'Planned'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const url = currentProject._id
        ? `/api/projects/${currentProject._id}`
        : '/api/projects';
      const method = currentProject._id ? 'PUT' : 'POST';

      const payload = {
        ...currentProject,
        technologies: currentProject.techStack,
        githubUrl: currentProject.githubLink,
        liveUrl: currentProject.liveLink,
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(currentProject._id ? 'Project updated!' : 'Project created!');
        fetchProjects();
        resetForm();
      } else {
        const err = await response.json();
        toast.error(err.error || 'Failed to save project');
      }
    } catch (error) {
      toast.error('Failed to save project');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success('Project deleted!');
        fetchProjects();
      } else {
        toast.error('Failed to delete project');
      }
    } catch (error) {
      toast.error('Error deleting project');
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentProject({
      title: '',
      description: '',
      category: 'Full-Stack',
      status: 'Completed',
      year: '2024',
      image: '',
      techStack: [],
      githubLink: '',
      liveLink: '',
    });
  };

  const handleEdit = (project) => {
    const tech = project.technologies?.length ? project.technologies : (project.techStack || []);
    setCurrentProject({
      ...project,
      techStack: tech,
      githubLink: project.githubUrl || project.githubLink || '',
      liveLink: project.liveUrl || project.liveLink || '',
      category: project.category || 'Full-Stack',
      status: project.status || 'Completed',
      year: project.year || '2024',
    });
    setIsEditing(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Manage Projects</h2>
          <p className="text-sm text-gray-500">Showcase your applications, tools, and portfolios</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsEditing(true);
          }}
          className="glow-button flex items-center gap-2"
        >
          <FiPlus /> Add Project
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="glass dark:glass-dark rounded-2xl p-6 mb-8 border border-white/10 space-y-4">
          <h3 className="text-xl font-bold mb-2">{currentProject._id ? 'Edit Project' : 'New Project'}</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Title *</label>
              <input
                type="text"
                placeholder="e.g. AI-Powered SaaS Platform"
                required
                value={currentProject.title}
                onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={currentProject.category}
                onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="dark:bg-gray-800">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              placeholder="Describe what this project does and key problems solved..."
              required
              rows={3}
              value={currentProject.description}
              onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={currentProject.status}
                onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {statuses.map((s) => (
                  <option key={s} value={s} className="dark:bg-gray-800">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Year</label>
              <input
                type="text"
                placeholder="2024"
                value={currentProject.year}
                onChange={(e) => setCurrentProject({ ...currentProject, year: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="text"
                placeholder="/images/... or https://..."
                value={currentProject.image}
                onChange={(e) => setCurrentProject({ ...currentProject, image: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tech Stack (comma separated)</label>
            <input
              type="text"
              placeholder="React, Next.js, Node.js, Tailwind CSS, MongoDB"
              value={currentProject.techStack.join(', ')}
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                })
              }
              className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">GitHub Repo Link</label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={currentProject.githubLink}
                onChange={(e) => setCurrentProject({ ...currentProject, githubLink: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Live Demo Link</label>
              <input
                type="url"
                placeholder="https://myproject.com"
                value={currentProject.liveLink}
                onChange={(e) => setCurrentProject({ ...currentProject, liveLink: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button type="submit" className="glow-button">
              {currentProject._id ? 'Update Project' : 'Create Project'}
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
        <div className="text-center py-12 text-gray-500">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 glass dark:glass-dark rounded-2xl p-8">
          <FiFolder size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-gray-500 dark:text-gray-400">No projects added yet. Click "Add Project" to add your first project!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project._id} className="glass dark:glass-dark rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/20 transition-all border border-transparent">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold">
                    {project.category || 'Web'}
                  </span>
                  <span className="text-xs text-gray-500">{project.year || '2024'}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {(project.technologies || project.techStack || []).map((t, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 self-end md:self-center">
                {(project.liveUrl || project.liveLink) && (
                  <a
                    href={project.liveUrl || project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass dark:glass-dark p-3 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                    title="View Demo"
                  >
                    <FiExternalLink size={16} />
                  </a>
                )}
                {(project.githubUrl || project.githubLink) && (
                  <a
                    href={project.githubUrl || project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass dark:glass-dark p-3 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                    title="View Source"
                  >
                    <FiGithub size={16} />
                  </a>
                )}
                <button
                  onClick={() => handleEdit(project)}
                  className="glass dark:glass-dark p-3 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                  title="Edit"
                >
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="glass dark:glass-dark p-3 rounded-full hover:bg-red-500 hover:text-white transition-all"
                  title="Delete"
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
