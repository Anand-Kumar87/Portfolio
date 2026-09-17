'use client';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FiGithub, FiExternalLink, FiPlay, FiStar, FiUsers, FiCalendar, FiCode, FiEye, FiHeart } from 'react-icons/fi';
import { getLanguageIcon } from '@/utils/languageDetection';

const ProjectCard = ({ project, index, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const githubUrl = project.githubUrl || project.githubLink;
  const liveUrl = project.liveUrl || project.liveLink;
  const technologies = (project.technologies && project.technologies.length) 
    ? project.technologies 
    : (project.techStack || []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      className="group cursor-pointer relative"
    >
      <div className="glass dark:glass-dark rounded-3xl overflow-hidden h-[500px] relative border border-white/10 hover:border-white/20 transition-all duration-500 flex flex-col">
        {/* Project Image */}
        <div className="relative h-60 overflow-hidden flex-shrink-0">
          <motion.img
            src={project.image || '/images/project-placeholder.svg'}
            alt={project.title}
            onError={(e) => { e.currentTarget.src = '/images/project-placeholder.svg'; }}
            className="w-full h-full object-cover object-top"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              (project.status || '').toLowerCase() === 'completed' ? 'bg-green-500 text-white' :
              (project.status || '').toLowerCase() === 'in-progress' ? 'bg-yellow-500 text-white' :
              'bg-blue-500 text-white'
            }`}>
              {project.status || 'Completed'}
            </span>
          </div>

          {/* Action Buttons h*/}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute top-4 right-4 flex gap-2"
          >
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-colors"
                title="View GitHub Repository"
              >
                <FiGithub size={16} />
              </motion.a>
            )}
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-colors"
                title="View Live Demo"
              >
                <FiExternalLink size={16} />
              </motion.a>
            )}
          </motion.div>

          {/* Play Button Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <FiPlay size={24} className="text-white ml-1" />
            </div>
          </motion.div>
        </div>

        {/* Project Info */}
        <div className="p-6 space-y-4">
          {/* Title & Category */}
          <div>
            <h3 className="text-xl font-bold mb-1 group-hover:text-blue-500 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-gray-500 capitalize">{project.category}</p>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 4).map((tech, i) => {
              const IconComponent = getLanguageIcon(tech);
              return (
                <div
                  key={i}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs"
                >
                  <IconComponent size={12} />
                  <span>{tech}</span>
                </div>
              );
            })}
            {technologies.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">
                +{technologies.length - 4}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <FiStar size={14} />
                <span>4.8</span>
              </div>
              <div className="flex items-center gap-1">
                <FiEye size={14} />
                <span>1.2k</span>
              </div>
              <div className="flex items-center gap-1">
                <FiHeart size={14} />
                <span>89</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <FiCalendar size={14} />
              <span>{project.year || '2024'}</span>
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        />
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const modalTech = (project.technologies && project.technologies.length) 
    ? project.technologies 
    : (project.techStack || []);
  const modalLive = project.liveUrl || project.liveLink;
  const modalGithub = project.githubUrl || project.githubLink;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/85 backdrop-blur-md z-[9999] flex items-start justify-center p-3 sm:p-6 md:p-8 overflow-y-auto overscroll-contain"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 rounded-3xl max-w-4xl w-full my-auto border border-slate-200 dark:border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header Bar */}
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/70 dark:bg-slate-900/60 flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex-shrink-0">
                {project.category || 'Full-Stack'}
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white truncate">
                {project.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors flex-shrink-0 cursor-pointer"
              aria-label="Close project modal"
            >
              ✕
            </button>
          </div>

          {/* Dedicated Clean Screenshot Preview (Browser Mockup Frame) */}
          <div className="bg-slate-950 border-b border-slate-200 dark:border-slate-800">
            {/* Browser Dots Bar */}
            <div className="px-4 py-2 bg-slate-900/90 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              </div>
              <div className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-4 py-0.5 rounded-full truncate max-w-xs sm:max-w-md">
                {modalLive ? modalLive.replace(/^https?:\/\//, '') : `${project.title.toLowerCase().replace(/\s+/g, '-')}.app`}
              </div>
              <div className="w-10" />
            </div>

            {/* Clean Screenshot - NO text overlay */}
            <div className="relative w-full max-h-[380px] overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={project.image || '/images/project-placeholder.svg'}
                alt={project.title}
                onError={(e) => { e.currentTarget.src = '/images/project-placeholder.svg'; }}
                className="w-full h-auto max-h-[380px] object-cover object-top"
              />
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 max-h-[50vh] overflow-y-auto overscroll-contain">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Description & Highlights */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wide text-xs text-blue-500">
                    Project Overview
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>
                </div>

                {/* Key Features */}
                {project.features && project.features.length > 0 && (
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wide text-xs text-blue-500">
                      Core Features & Architecture
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {project.features.map((feature, i) => (
                        <div 
                          key={i} 
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                        >
                          <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0 text-xs mt-0.5 font-bold">
                            ✓
                          </span>
                          <span className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium leading-snug">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wide text-xs text-blue-500">
                    Technologies & Libraries
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {modalTech.map((tech, i) => {
                      const IconComponent = getLanguageIcon(tech);
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-sm"
                        >
                          <IconComponent size={14} className="text-blue-500" />
                          <span>{tech}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Meta & Actions */}
              <div className="space-y-5">
                <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 p-5 rounded-2xl space-y-3.5 text-xs">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide text-slate-400">
                    Specifications
                  </h4>
                  <div className="flex items-center justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-slate-500 dark:text-slate-400">Status</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {project.status || 'Completed'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-slate-500 dark:text-slate-400">Timeline</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{project.year || '2024'}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500 dark:text-slate-400">Category</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">{project.category || 'Full-Stack'}</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="space-y-2.5">
                  {modalLive && (
                    <a
                      href={modalLive}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full glow-button flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold shadow-lg text-center cursor-pointer"
                    >
                      <FiExternalLink size={15} />
                      Open Live Demo
                    </a>
                  )}
                  {modalGithub && (
                    <a
                      href={modalGithub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-full font-bold flex items-center justify-center gap-2 transition-all text-xs sm:text-sm shadow-sm cursor-pointer"
                    >
                      <FiGithub size={15} />
                      Source Code
                    </a>
                  )}
                  <button
                    onClick={onClose}
                    className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const defaultProjects = [
  {
    _id: 'default-inv',
    title: 'Invoice Generator App',
    description: 'A modern cloud-based invoice management platform featuring instant PDF generation, client accounting, automated balance calculations, and multi-currency formats.',
    image: '/images/projects/invoice-generator.png',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'PDF Engine', 'Node.js'],
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'PDF Engine', 'Node.js'],
    category: 'Full-Stack',
    status: 'Completed',
    liveUrl: 'https://invoice-tau.vercel.app/',
    githubUrl: 'https://github.com/Anand-Kumar87/invoice',
    features: ['Automated Invoice Calculation', 'Custom Branding & Logos', 'Instant PDF Generation', 'Tax & Discount Rules']
  },
  {
    _id: 'default-shoe',
    title: 'ShoeStyle E-Commerce',
    description: 'High-performance interactive footwear e-commerce application with dynamic product catalogs, rich filtering, smooth cart workflows, and responsive checkout.',
    image: '/images/projects/shoe-style.png',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    category: 'Full-Stack',
    status: 'Completed',
    liveUrl: 'https://shoe-style-chi.vercel.app/',
    githubUrl: 'https://github.com/Anand-Kumar87/style872654.github.io',
    features: ['Product Catalog & Filtering', 'Interactive Shopping Cart', 'Secure Checkout Flow', 'Order Tracking']
  },
  {
    _id: 'default-nex',
    title: 'Nexus Finance Expense Tracker',
    description: 'Smart personal finance & AI-assisted expense tracker with real-time budget forecasting, interactive spending analytics, shared wallets, and transaction monitoring.',
    image: '/images/projects/nexus-finance.png',
    technologies: ['Next.js', 'MongoDB', 'Chart.js', 'REST API', 'Framer Motion'],
    techStack: ['Next.js', 'MongoDB', 'Chart.js', 'REST API', 'Framer Motion'],
    category: 'Web App',
    status: 'Completed',
    liveUrl: 'https://nexus-finace.netlify.app/',
    githubUrl: 'https://github.com/Anand-Kumar87/-Advanced-Expense-Tracker',
    features: ['Real-time Income/Expense Analytics', 'Dynamic Visual Reports', 'Category-wise Breakdown', 'Monthly Budget Alerts']
  }
];

export default function ProjectGallery() {
  const [projects, setProjects] = useState(defaultProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {});
  }, []);

  const categories = ['all', ...new Set(projects.map(p => p.category).filter(Boolean))];
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  const displayedProjects = filteredProjects.slice(0, visibleCount);

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass dark:glass-dark rounded-3xl h-[500px] animate-pulse">
                <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded-t-3xl" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
                  <div className="h-16 bg-gray-300 dark:bg-gray-600 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore my portfolio of innovative solutions, creative designs, and technical achievements that showcase my expertise and passion for development.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => {
                setFilter(category);
                setVisibleCount(6);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all capitalize ${
                filter === category
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'glass dark:glass-dark hover:scale-105'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {displayedProjects.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {displayedProjects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                  onSelect={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-16 glass dark:glass-dark rounded-3xl p-8 max-w-lg mx-auto">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No projects found in this category.</p>
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredProjects.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="glow-button cursor-pointer"
            >
              Load More Projects ({filteredProjects.length - visibleCount} remaining)
            </button>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
