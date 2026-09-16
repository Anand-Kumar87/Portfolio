'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FiCalendar, FiBookOpen, FiBriefcase } from 'react-icons/fi';

const defaultTimeline = [
  {
    _id: 'default-1',
    type: 'experience',
    institution: 'Freelance & Open Source',
    degree: 'Full-Stack Developer',
    field: 'Web & Cloud Solutions',
    startDate: '2023-01-01',
    endDate: null,
    current: true,
    description: 'Building modern responsive web applications, REST APIs, and client-focused digital experiences using Next.js, Node.js, and modern tech stacks.',
  },
  {
    _id: 'default-2',
    type: 'education',
    institution: 'University / College',
    degree: 'Bachelor of Technology / Science',
    field: 'Computer Science & Engineering',
    startDate: '2020-08-01',
    endDate: '2024-06-01',
    current: false,
    description: 'Specialized in Computer Science, Software Engineering principles, Algorithms, and Modern Web Development.',
  }
];

const TimelineItem = ({ item, index, isLeft }) => {
  const isEducation = item.type === 'education';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative flex items-center md:gap-8 mb-12 md:mb-16 pl-10 md:pl-0 ${
        isLeft ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      {/* Content Card */}
      <div className={`flex-1 w-full ${isLeft ? 'md:text-right' : ''}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative p-6 glass dark:glass-dark rounded-2xl border border-white/10 shadow-lg hover:shadow-xl transition-all"
        >
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
              isEducation
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
            }`}
          >
            {isEducation ? <FiBookOpen size={12} /> : <FiBriefcase size={12} />}
            {isEducation ? 'Education' : 'Experience'}
          </span>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {item.degree}
          </h3>
          <h4 className="text-base font-medium text-blue-600 dark:text-blue-400 mb-2">
            {item.institution}
          </h4>

          <div
            className={`flex items-center gap-2 text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-3 ${
              isLeft ? 'md:justify-end' : ''
            }`}
          >
            <FiCalendar size={14} />
            {item.startDate ? new Date(item.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''} —{' '}
            {item.current || !item.endDate ? 'Present' : new Date(item.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
          </div>

          {item.field && (
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-2 italic">
              {item.field}
            </p>
          )}

          {item.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {item.description}
            </p>
          )}
        </motion.div>
      </div>

      {/* Center Dot for Desktop */}
      <div className="hidden md:flex relative z-10 items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          viewport={{ once: true }}
          className={`w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 shadow-md ${
            isEducation ? 'bg-blue-500' : 'bg-emerald-500'
          }`}
        />
      </div>

      {/* Mobile Dot */}
      <div
        className={`md:hidden absolute left-2.5 top-8 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 shadow-md z-10 ${
          isEducation ? 'bg-blue-500' : 'bg-emerald-500'
        }`}
      />

      {/* Spacer for desktop symmetry */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
};

export default function AnimatedTimeline() {
  const [timelineItems, setTimelineItems] = useState([]);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    fetch('/api/education')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTimelineItems(data);
        } else {
          setTimelineItems(defaultTimeline);
        }
      })
      .catch(() => setTimelineItems(defaultTimeline));
  }, []);

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
            Timeline
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Journey
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            A chronological timeline of my education and professional experience
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Desktop Center Line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 bg-gray-200 dark:bg-gray-700 h-full">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-blue-500 to-emerald-500"
            />
          </div>

          {/* Mobile Left Line */}
          <div className="md:hidden absolute left-2.5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-blue-500 to-emerald-500"
            />
          </div>

          <div className="relative">
            {timelineItems.map((item, index) => (
              <TimelineItem key={item._id || index} item={item} index={index} isLeft={index % 2 === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
