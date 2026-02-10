'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FiDownload, FiMail, FiLinkedin, FiGithub, FiPlay, FiMapPin, FiCalendar } from 'react-icons/fi';
import { getLanguageIcon } from '@/utils/languageDetection';

const TypewriterText = ({ texts, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, texts, speed]);

  return (
    <span className="gradient-text">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  );
};

const FloatingCard = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass dark:glass-dark p-4 rounded-xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300"
  >
    {children}
  </motion.div>
);

export default function ModernHero() {
  const [aboutData, setAboutData] = useState(null);
  const [skills, setSkills] = useState([]);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    Promise.all([
      fetch('/api/about').then(res => res.json()),
      fetch('/api/skills').then(res => res.json())
    ]).then(([about, skillsData]) => {
      setAboutData(about);
      setSkills(skillsData.slice(0, 6));
    });
  }, []);

  const professions = [
    'Full-Stack Developer',
    'UI/UX Designer', 
    'Cloud Architect',
    'DevOps Engineer',
    'Mobile Developer'
  ];

  return (
    <section ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"
        />
        
        {/* Floating Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-white/10 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Available for work
            </motion.div>

            {/* Main Heading */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl lg:text-8xl font-bold leading-tight mb-4"
              >
                Hi, I'm{' '}
                <span className="gradient-text">
                  {aboutData?.name || 'Anand'}
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl lg:text-4xl font-semibold text-gray-600 dark:text-gray-300 mb-6"
              >
                <TypewriterText texts={professions} />
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl"
            >
              {aboutData?.bio || 'Crafting exceptional digital experiences with cutting-edge technologies. Passionate about creating scalable solutions that make a difference.'}
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-3 gap-6"
            >
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">5+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">50+</div>
                <div className="text-sm text-gray-500">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">20+</div>
                <div className="text-sm text-gray-500">Happy Clients</div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#contact" className="glow-button group">
                <FiMail className="mr-2 group-hover:rotate-12 transition-transform" />
                Let's Talk
              </a>
              
              <a href={aboutData?.resumeUrl || '/resume.pdf'} download className="glass dark:glass-dark px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-all group">
                <FiDownload className="group-hover:translate-y-1 transition-transform" />
                Download CV
              </a>

              <button className="p-3 glass dark:glass-dark rounded-full hover:scale-110 transition-all group">
                <FiPlay className="group-hover:scale-125 transition-transform" />
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="flex gap-4"
            >
              {[
                { Icon: FiGithub, url: 'https://github.com/Anand-Kumar87' },
                { Icon: FiLinkedin, url: 'https://www.linkedin.com/in/anand-kumar-270533346/' }
              ].map(({ Icon, url }, i) => (
                <motion.a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 glass dark:glass-dark rounded-full hover:bg-blue-500 hover:text-white transition-all"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Profile Image */}
            <div className="relative w-80 h-80 mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-30"
              />
              
              <motion.img
                src={aboutData?.profileImage || '/images/profile.jpeg'}
                alt="Profile"
                className="relative w-full h-full object-cover rounded-full glass dark:glass-dark p-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

              {/* Floating Skills */}
              {skills.map((skill, index) => {
                const IconComponent = getLanguageIcon(skill.name);
                const angle = (index * 60) * (Math.PI / 180);
                const radius = 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={skill._id}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  >
                    <FloatingCard delay={1.5 + index * 0.1}>
                      <div className="flex items-center gap-2 text-sm">
                        <IconComponent size={20} className="text-blue-500" />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                    </FloatingCard>
                  </motion.div>
                );
              })}
            </div>

            {/* Info Cards */}
            <div className="absolute -bottom-10 -left-10">
              <FloatingCard delay={2}>
                <div className="flex items-center gap-3">
                  <FiMapPin className="text-blue-500" />
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className="text-sm text-gray-500">Delhi, India</div>
                  </div>
                </div>
              </FloatingCard>
            </div>

            <div className="absolute -top-10 -right-10">
              <FloatingCard delay={2.2}>
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-green-500" />
                  <div>
                    <div className="font-semibold">Experience</div>
                    <div className="text-sm text-gray-500">3+ Years</div>
                  </div>
                </div>
              </FloatingCard>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
