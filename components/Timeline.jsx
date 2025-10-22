'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import GlassCard from './GlassCard';
import { FiBook, FiBriefcase } from 'react-icons/fi';
import { formatDate } from '@/lib/utils';

export default function Timeline() {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetch('/api/education')
      .then((res) => res.json())
      .then((data) => {
        // Sort by start date, most recent first
        const sorted = data.sort((a, b) => 
          new Date(b.startDate) - new Date(a.startDate)
        );
        setTimeline(sorted);
      })
      .catch((error) => console.error('Error fetching timeline:', error));
  }, []);

  const getIcon = (type) => {
    return type === 'education' ? FiBook : FiBriefcase;
  };

  const getGradient = (type) => {
    return type === 'education'
      ? 'from-blue-500 to-cyan-500'
      : 'from-purple-500 to-pink-500';
  };

  return (
    <section id="timeline" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Education & Experience
        </motion.h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {timeline.map((item, index) => {
              const Icon = getIcon(item.type);
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Timeline Icon */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
                    <div className={`glass dark:glass-dark p-3 rounded-full bg-gradient-to-r ${getGradient(item.type)}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                    <GlassCard>
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                          {item.type === 'education' ? 'Education' : 'Experience'}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                        {item.degree || item.institution}
                      </h3>

                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-3">
                        {item.institution}
                      </p>

                      {item.field && (
                        <p className="text-gray-500 dark:text-gray-400 mb-3">
                          {item.field}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span>{formatDate(item.startDate)}</span>
                        <span>•</span>
                        <span>
                          {item.current ? 'Present' : formatDate(item.endDate)}
                        </span>
                      </div>

                      {item.description && (
                        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                          {item.description}
                        </p>
                      )}
                    </GlassCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {timeline.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No timeline entries added yet.
          </p>
        )}
      </div>
    </section>
  );
}