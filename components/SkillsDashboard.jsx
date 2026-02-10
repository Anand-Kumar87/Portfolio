'use client';
import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { getLanguageIcon, getCategoryIcon, getSkillColor } from '@/utils/languageDetection';
import { FiTrendingUp, FiAward, FiTarget, FiZap } from 'react-icons/fi';

const SkillCard = ({ skill, index, category }) => {
  const IconComponent = getLanguageIcon(skill.name);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.05 }}
      className="group relative"
    >
      <div className="glass dark:glass-dark p-6 rounded-2xl h-full border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
        {/* Background Glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl"
          style={{ backgroundColor: getSkillColor(skill.name) }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon & Name */}
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="p-3 rounded-xl"
              style={{ backgroundColor: `${getSkillColor(skill.name)}20` }}
            >
              <IconComponent 
                size={24} 
                style={{ color: getSkillColor(skill.name) }}
              />
            </div>
            <div>
              <h3 className="font-bold text-lg">{skill.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{category}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Proficiency</span>
              <span className="text-sm font-bold">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: getSkillColor(skill.name) }}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.level}%` } : {}}
                transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
              />
            </div>
          </div>

          {/* Experience Badge */}
          <div className="flex items-center gap-2 text-xs">
            <FiTrendingUp className="text-green-500" />
            <span className="text-gray-600 dark:text-gray-300">
              {skill.experience || '2+'} years experience
            </span>
          </div>

          {/* Hover Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            style={{ transform: 'skewX(-20deg)' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const CategorySection = ({ category, skills, icon: Icon }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      className="mb-12"
    >
      {/* Category Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
          <Icon size={24} className="text-blue-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold capitalize">{category}</h2>
          <p className="text-gray-500">{skills.length} technologies</p>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <SkillCard 
            key={skill._id} 
            skill={skill} 
            index={index}
            category={category}
          />
        ))}
      </div>
    </motion.div>
  );
};

const StatsCard = ({ icon: Icon, title, value, description, color }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    className="glass dark:glass-dark p-6 rounded-2xl text-center"
  >
    <div className={`inline-flex p-4 rounded-full mb-4 ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
    <h3 className="text-3xl font-bold mb-2">{value}</h3>
    <p className="font-semibold mb-1">{title}</p>
    <p className="text-sm text-gray-500">{description}</p>
  </motion.div>
);

export default function SkillsDashboard() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        setSkills(data);
        setLoading(false);
      });
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  const stats = [
    {
      icon: FiZap,
      title: 'Technologies',
      value: skills.length,
      description: 'Mastered tools',
      color: 'bg-blue-500'
    },
    {
      icon: FiAward,
      title: 'Expert Level',
      value: skills.filter(s => s.level >= 90).length,
      description: '90%+ proficiency',
      color: 'bg-green-500'
    },
    {
      icon: FiTarget,
      title: 'Categories',
      value: Object.keys(groupedSkills).length,
      description: 'Skill domains',
      color: 'bg-purple-500'
    },
    {
      icon: FiTrendingUp,
      title: 'Avg. Level',
      value: Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length) + '%',
      description: 'Overall expertise',
      color: 'bg-orange-500'
    }
  ];

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass dark:glass-dark p-6 rounded-2xl animate-pulse">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-xl mb-4" />
                <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
                <div className="w-1/2 h-3 bg-gray-300 dark:bg-gray-600 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20" />
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
            Technical <span className="gradient-text">Expertise</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills, tools, and technologies I work with to create exceptional digital experiences.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-16">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <CategorySection
              key={category}
              category={category}
              skills={categorySkills}
              icon={getCategoryIcon(category)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
