'use client';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp, FiHeart } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Anand-Kumar87', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/anand-kumar-270533346/', label: 'LinkedIn' },
    { icon: FaWhatsapp, href: 'https://wa.me/918726540277', label: 'WhatsApp' },
    { icon: FiMail, href: 'mailto:solestyle41@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-white/10 glass dark:glass-dark pt-14 pb-20 md:pb-12 mt-16 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <span className="text-white font-bold text-lg">AK</span>
              </div>
              <span className="text-2xl font-bold gradient-text">Anand Kumar</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md leading-relaxed">
              Full-Stack Developer passionate about designing high-performance web applications, scalable architectures, and interactive digital experiences.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for Freelance & Full-Time Roles
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-blue-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Connect */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-3 glass dark:glass-dark rounded-xl hover:scale-110 hover:text-blue-500 hover:border-blue-500 transition-all border border-white/10"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-blue-500 transition-colors"
            >
              <FiArrowUp size={14} /> Back to Top
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Anand Kumar. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <FiHeart className="text-red-500 inline" /> using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

