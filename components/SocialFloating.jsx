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
      .then((data) => setSocials(data));
  }, []);

  const iconMap = {
    github: FiGithub,
    linkedin: FiLinkedin,
    twitter: FiTwitter,
    instagram: FiInstagram,
    email: FiMail,
    whatsapp: FaWhatsapp,
  };

  return (
    <div className="fixed right-6 bottom-6 flex flex-col gap-4 z-40">
      {socials.map((social, index) => {
        const Icon = iconMap[social.platform.toLowerCase()] || FiMail;
        return (
          <motion.a
            key={social._id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.2, rotate: 360 }}
            className="glass dark:glass-dark p-3 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all"
          >
            <Icon className="w-5 h-5" />
          </motion.a>
        );
      })}
    </div>
  );
}