'use client';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp, FiHeart, FiCopy, FiCheck, FiMapPin, FiClock, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('solestyle41@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Anand-Kumar87', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/anand-kumar-270533346/', label: 'LinkedIn' },
    { icon: FaWhatsapp, href: 'https://wa.me/918726540277', label: 'WhatsApp' },
    { icon: FiMail, href: 'mailto:solestyle41@gmail.com', label: 'Email' },
  ];

  const techBadges = [
    'Next.js 14', 'React 18', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'REST APIs', 'TypeScript', 'Git'
  ];

  return (
    <footer className="relative border-t border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-[#0b1120]/90 backdrop-blur-xl pt-10 pb-32 sm:pb-20">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top CTA Banner Card */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-blue-500/20 dark:border-purple-500/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              ✦ Open For Collaboration
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Have a project or opportunity in mind? Let's build it.
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Available for full-time engineering roles, technical architecture consulting, and high-impact web products.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              className="glow-button !py-3 !px-6 text-xs sm:text-sm font-bold shadow-lg"
            >
              Start a Conversation
            </a>
            <button
              onClick={copyEmail}
              className="px-5 py-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold flex items-center gap-2 hover:border-blue-500 transition-all shadow-sm cursor-pointer"
              title="Click to copy email address"
            >
              {copied ? <FiCheck size={16} className="text-emerald-500" /> : <FiCopy size={16} />}
              <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
            </button>
          </div>
        </div>

        {/* Tech Stack Marquee Pills */}
        <div className="mb-10 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 text-center md:text-left">
            Core Production Technologies
          </p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {techBadges.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Multi-Column Main Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <span className="text-white font-bold text-base">AK</span>
              </div>
              <span className="text-2xl font-extrabold gradient-text tracking-tight">Anand Kumar</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md leading-relaxed font-normal">
              Full-Stack Software Engineer dedicated to crafting high-performance, resilient web applications with modern architecture, sub-second load times, and bulletproof security.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for Opportunities (Remote & On-Site)
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4 text-slate-400">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-blue-500 transition-colors block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Coordinates & Socials */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider text-slate-400">
              Coordinates
            </h4>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <FiMapPin className="text-blue-500 flex-shrink-0" />
                <span>New Delhi, India</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-purple-500 flex-shrink-0" />
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  IST (UTC +5:30)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="text-emerald-500 flex-shrink-0" />
                <a href="tel:+918726540277" className="hover:text-blue-500 transition-colors">+91 8726540277</a>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 transition-all shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Anand Kumar. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1">
              Designed with <FiHeart className="text-red-500 inline fill-red-500" /> by Anand Kumar
            </p>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-500 hover:text-white text-xs font-bold text-slate-700 dark:text-slate-300 transition-all border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              <FiArrowUp size={12} /> Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
