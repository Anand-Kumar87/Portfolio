'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FiCalendar, FiBookOpen, FiBriefcase } from 'react-icons/fi';

const TimelineItem = ({ item, index, isLeft }) => {
  const isEducation = item.type === 'education';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`flex items-center gap-8 mb-16 ${isLeft ? 'flex-row-reverse' : ''}`}
    >
      <div className={`flex-1 ${isLeft ? 'text-right' : ''}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className={`absolute top-6 w-3 h-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rotate-45 ${isLeft ? '-right-[7px]' : '-left-[7px]'}`} />
          
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-3 ${isEducation ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'}`}>
            {isEducation ? <FiBookOpen size={12} /> : <FiBriefcase size={12} />}
            {isEducation ? 'Education' : 'Experience'}
          </span>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{item.degree}</h3>
          <h4 className="text-base font-medium text-blue-600 dark:text-blue-400 mb-3">{item.institution}</h4>
          
          <div className={`flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3 ${isLeft ? 'justify-end' : ''}`}>
            <FiCalendar size={14} />
            {new Date(item.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} — {item.endDate ? new Date(item.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
          </div>

          {item.field && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 italic">{item.field}</p>
          )}
          
          {item.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
          )}
        </motion.div>
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          viewport={{ once: true }}
          className={`w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 shadow-md ${isEducation ? 'bg-blue-500' : 'bg-emerald-500'}`}
        />
      </div>

      <div className="flex-1" />
    </motion.div>
  );
};

export default function AnimatedTimeline() {
  const [education, setEducation] = useState([]);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    fetch('/api/education')
      .then(res => res.json())
      .then(data => setEducation(Array.isArray(data) ? data : []))
      .catch(() => setEducation([]));
  }, []);

  return (
    <section ref={containerRef} className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">Timeline</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">My Journey</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            A timeline of my educational background and professional experience
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gray-200 dark:bg-gray-700 h-full">
            <motion.div style={{ height: lineHeight }} className="w-full bg-gradient-to-b from-blue-500 to-emerald-500" />
          </div>

          <div className="relative">
            {education.map((item, index) => (
              <TimelineItem key={item._id} item={item} index={index} isLeft={index % 2 === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
