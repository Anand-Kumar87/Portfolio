'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import GlassCard from './GlassCard';

export default function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch('/api/about')
      .then((res) => res.json())
      .then((data) => setAboutData(data));
  }, []);

  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          About Me
        </motion.h2>

        <GlassCard className="max-w-4xl mx-auto">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {aboutData?.bio ||
                `I'm a passionate full-stack developer with expertise in modern web technologies. 
                
I love creating beautiful, functional, and user-friendly applications that solve real-world problems.

With a strong foundation in both frontend and backend development, I strive to build scalable and efficient solutions.`}
            </p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}