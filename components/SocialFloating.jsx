'use client';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function SocialFloating() {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    fetch('/api/social')
      .then((res) => res.json())
      .then((data) => setSocials(Array.isArray(data) ? data : []))
      .catch(() => setSocials([]));
  }, []);

  const iconMap = {
    github: FiGithub,
    linkedin: FiLinkedin,
    twitter: FiTwitter,
    instagram: FiInstagram,
    email: FiMail,
    whatsapp: FaWhatsapp,
  };

  const fallbackSocials = [
    { _id: 'gh', platform: 'github', url: 'https://github.com/Anand-Kumar87' },
    { _id: 'li', platform: 'linkedin', url: 'https://www.linkedin.com/in/anand-kumar-270533346/' },
    { _id: 'wa', platform: 'whatsapp', url: 'https://wa.me/918726540277' },
    { _id: 'em', platform: 'email', url: 'mailto:solestyle41@gmail.com' },
  ];

  const items = socials.length > 0 ? socials : fallbackSocials;

  return (
    <div className="hidden md:flex fixed right-6 bottom-6 flex-col gap-3 z-30">
      {items.map((social, index) => {
        const Icon = iconMap[social.platform.toLowerCase()] || FiMail;
        return (
          <motion.a
            key={social._id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="glass dark:glass-dark p-3 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all shadow-lg border border-white/20 dark:border-white/10"
            title={social.platform}
          >
            <Icon className="w-5 h-5" />
          </motion.a>
        );
      })}
    </div>
  );
}