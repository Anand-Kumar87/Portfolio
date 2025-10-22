'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import GlassCard from './GlassCard';
import { FiAward, FiExternalLink } from 'react-icons/fi';
import { formatDate } from '@/lib/utils';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    fetch('/api/achievements')
      .then((res) => res.json())
      .then((data) => setAchievements(data))
      .catch((error) => console.error('Error fetching achievements:', error));
  }, []);

  return (
    <section id="achievements" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Achievements & Certifications
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="glass dark:glass-dark p-3 rounded-2xl">
                    <FiAward className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {achievement.issuer} • {formatDate(achievement.date)}
                    </p>
                  </div>
                </div>

                {achievement.description && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {achievement.description}
                  </p>
                )}

                {achievement.credentialUrl && (
                  <a
                    href={achievement.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <FiExternalLink /> View Credential
                  </a>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {achievements.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No achievements added yet.
          </p>
        )}
      </div>
    </section>
  );
}