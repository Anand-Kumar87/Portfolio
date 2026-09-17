'use client';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { 
  FiSun, 
  FiMoon, 
  FiMenu, 
  FiX, 
  FiDownload, 
  FiMail, 
  FiLock, 
  FiLogOut, 
  FiChevronDown, 
  FiShield,
  FiUser,
  FiExternalLink
} from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const NavLink = ({ href, children, onClick, mobile = false }) => (
  <motion.a
    href={href}
    onClick={onClick}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.96 }}
    className={`relative group cursor-pointer ${
      mobile 
        ? 'block py-2 px-3.5 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-800 dark:text-slate-200'
        : 'px-3.5 py-2 text-sm font-semibold transition-colors text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400'
    }`}
  >
    {children}
    {!mobile && (
      <motion.div
        className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
      />
    )}
  </motion.a>
);

export default function ModernNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();
  const profileMenuRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }
  }, []);

  // Close profile dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setIsProfileOpen(false);
      router.push('/');
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 30);
  });

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleNavClick = (href) => {
    setIsOpen(false);
    setIsProfileOpen(false);
    document.body.style.overflow = '';
    document.body.style.touchAction = '';

    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  if (!mounted) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-[#0b0f19]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/90 shadow-[0_4px_24px_rgba(0,0,0,0.08)] py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-blue-500/25 group-hover:shadow-cyan-500/40 border border-cyan-400/40 group-hover:border-cyan-400/80 transition-all p-0.5 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900">
                <img
                  src="/icon.png"
                  alt="Anand Kumar Monogram"
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold gradient-text tracking-tight">Anand Kumar</span>
                <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1.5 -mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available for hire
                </span>
              </div>
            </motion.a>

            {/* Center: Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-2 bg-black/[0.03] dark:bg-white/[0.04] px-4 py-1.5 rounded-full border border-black/[0.05] dark:border-white/[0.08]">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Right: Actions & Profile Hub */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Quick Hire Me CTA */}
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="glow-button !py-2.5 !px-5 !text-xs !font-bold flex items-center gap-2 shadow-md hover:shadow-blue-500/25 cursor-pointer"
              >
                <FiMail size={14} />
                <span>Hire Me</span>
              </motion.a>

              {/* Profile Avatar Hub Trigger & Popover Dropdown */}
              <div className="relative" ref={profileMenuRef}>
                <motion.button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-2.5 p-1.5 pr-3 rounded-full border transition-all duration-200 cursor-pointer ${
                    isProfileOpen 
                      ? 'border-blue-500 ring-2 ring-blue-500/20 bg-slate-100 dark:bg-slate-800' 
                      : 'border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:border-blue-400'
                  }`}
                  aria-label="Profile and quick settings menu"
                  aria-expanded={isProfileOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    AK
                  </div>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 hidden xl:inline-block">
                    Anand K.
                  </span>
                  <FiChevronDown 
                    size={14} 
                    className={`text-slate-500 transition-transform duration-300 ${isProfileOpen ? 'rotate-180 text-blue-500' : ''}`} 
                  />
                </motion.button>

                {/* SOLID OPAQUE Dropdown Menu (No bleed-through) */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute right-0 mt-2.5 w-72 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[120] overflow-hidden p-3.5 space-y-3"
                    >
                      {/* Identity Card */}
                      <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700/60">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                          AK
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Anand Kumar</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Full-Stack Engineer</p>
                        </div>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                      </div>

                      {/* Appearance Switcher */}
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1 mb-1.5">
                          Appearance
                        </p>
                        <div className="grid grid-cols-2 gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
                          <button
                            onClick={() => setTheme('light')}
                            className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-all ${
                              theme === 'light'
                                ? 'bg-white text-amber-600 shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            <FiSun size={13} className="text-amber-500" />
                            Light
                          </button>
                          <button
                            onClick={() => setTheme('dark')}
                            className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-all ${
                              theme === 'dark'
                                ? 'bg-slate-900 text-indigo-400 shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            <FiMoon size={13} className="text-indigo-400" />
                            Dark
                          </button>
                        </div>
                      </div>

                      {/* Navigation Actions */}
                      <div className="space-y-1 pt-1 border-t border-slate-100 dark:border-slate-800">
                        <a
                          href="/resume.pdf"
                          download
                          onClick={() => setIsProfileOpen(false)}
                          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <FiDownload size={14} className="text-blue-500" />
                            Download Resume
                          </span>
                          <span className="text-[10px] uppercase font-bold text-slate-400">PDF</span>
                        </a>

                        {isLoggedIn ? (
                          <>
                            <button
                              onClick={() => {
                                setIsProfileOpen(false);
                                router.push('/admin/dashboard');
                              }}
                              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl transition-colors text-left cursor-pointer"
                            >
                              <span className="flex items-center gap-2">
                                <FiShield size={14} />
                                Admin Dashboard
                              </span>
                              <FiExternalLink size={12} />
                            </button>
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors text-left cursor-pointer"
                            >
                              <span className="flex items-center gap-2">
                                <FiLogOut size={14} />
                                Sign Out
                              </span>
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                              router.push('/admin/login');
                            }}
                            className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <FiLock size={14} />
                              Admin Portal
                            </span>
                            <span className="text-[10px] text-slate-400">Login</span>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Controls (Theme Toggle + Hamburger) */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FiSun size={18} className="text-amber-400" /> : <FiMoon size={18} />}
              </button>

              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors"
                aria-label="Open mobile navigation menu"
              >
                {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer (Smooth, non-laggy, completely scrollable) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 bottom-0 right-0 w-80 max-w-[85vw] h-full bg-white dark:bg-[#0f172a] z-50 lg:hidden border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl overflow-hidden"
            style={{ touchAction: 'pan-y' }}
          >
            {/* Drawer Header */}
            <div className="p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md border border-cyan-400/40 p-0.5 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900">
                  <img
                    src="/icon.png"
                    alt="Anand Kumar Monogram"
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                </div>
                <div>
                  <span className="font-bold gradient-text text-base block">Anand Kumar</span>
                  <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available for hire
                  </span>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500 dark:text-slate-400"
                aria-label="Close menu"
              >
                <FiX size={22} />
              </motion.button>
            </div>

            {/* Drawer Scrollable Body */}
            <div 
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-4 pb-36"
              style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
            >
              {/* Navigation Links */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-2">
                  Navigation
                </p>
                <div className="space-y-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <NavLink
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        mobile
                      >
                        {item.label}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Theme Switcher */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2">
                  Appearance
                </p>

                <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                      theme === 'light'
                        ? 'bg-white text-amber-500 shadow-sm font-bold'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <FiSun size={16} className="text-amber-500" />
                    Light
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-900 text-indigo-400 shadow-sm font-bold'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <FiMoon size={16} className="text-indigo-400" />
                    Dark
                  </button>
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2">
                  Quick Actions
                </p>

                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contact');
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full glow-button flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold shadow-lg text-center cursor-pointer"
                >
                  <FiMail size={16} />
                  <span>Hire Me</span>
                </motion.a>

                <motion.a
                  href="/resume.pdf"
                  download
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-slate-100 dark:bg-slate-800 py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm text-slate-800 dark:text-slate-200"
                >
                  <FiDownload size={16} />
                  <span>Download CV</span>
                </motion.a>

                {isLoggedIn ? (
                  <>
                    <motion.button
                      onClick={() => {
                        setIsOpen(false);
                        router.push('/admin/dashboard');
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-500/10 text-blue-500 rounded-xl font-semibold text-sm"
                    >
                      <FiShield size={16} />
                      <span>Admin Dashboard</span>
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-500/10 text-red-500 rounded-xl font-semibold text-sm"
                    >
                      <FiLogOut size={16} />
                      <span>Sign Out</span>
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    onClick={() => {
                      setIsOpen(false);
                      router.push('/admin/login');
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 dark:bg-slate-800 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-300"
                  >
                    <FiLock size={16} />
                    <span>Admin Portal</span>
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            onTouchStart={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
