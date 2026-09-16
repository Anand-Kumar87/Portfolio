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
  FiUser
} from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const NavLink = ({ href, children, onClick, mobile = false }) => (
  <motion.a
    href={href}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`relative group ${
      mobile 
        ? 'block py-3 px-4 text-base font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors text-slate-800 dark:text-slate-200'
        : 'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
    }`}
  >
    {children}
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
      document.body.style.touchAction = 'none';
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
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Apple-Style Floating Pill Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3.5 sm:pt-4 pointer-events-none">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`pointer-events-auto w-full max-w-5xl rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300 ${
            isScrolled 
              ? 'bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/90 shadow-[0_12px_40px_rgba(0,0,0,0.18)]' 
              : 'bg-white/75 dark:bg-[#0f172a]/75 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
          }`}
        >
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2.5 cursor-pointer flex-shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-md shadow-blue-500/25">
              <span className="text-white font-bold text-xs sm:text-sm">AK</span>
            </div>
            <span className="text-sm sm:text-base font-bold gradient-text tracking-tight hidden xs:inline-block">
              Anand Kumar
            </span>
          </motion.a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-black/[0.03] dark:bg-white/[0.04] px-2 py-1 rounded-full border border-black/[0.04] dark:border-white/[0.05]">
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

          {/* Desktop Profile Hub Trigger & Dropdown */}
          <div className="flex items-center gap-2 relative" ref={profileMenuRef}>
            <motion.button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 p-1 sm:pr-3 rounded-full border transition-all duration-200 ${
                isProfileOpen 
                  ? 'bg-blue-50 dark:bg-slate-800 border-blue-500 ring-2 ring-blue-500/20' 
                  : 'bg-black/[0.03] dark:bg-white/[0.06] border-slate-200 dark:border-slate-800 hover:border-blue-400'
              }`}
              aria-label="Toggle profile menu"
              aria-expanded={isProfileOpen}
            >
              {/* Avatar with Status Dot */}
              <div className="relative">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                  AK
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                </span>
              </div>

              <div className="text-left leading-tight hidden sm:block">
                <div className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                  Anand K.
                </div>
                <div className="text-[10px] text-emerald-500 font-medium">Available</div>
              </div>

              <motion.div
                animate={{ rotate: isProfileOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-500 dark:text-gray-400 hidden sm:block pr-1"
              >
                <FiChevronDown size={14} />
              </motion.div>
            </motion.button>

            {/* Mobile Menu Toggle Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="lg:hidden p-2 bg-black/[0.03] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] rounded-full border border-slate-200 dark:border-slate-800 text-gray-700 dark:text-gray-200"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </motion.button>

            {/* 100% OPAQUE Profile Dropdown Popover (NO TRANSPARENCY) */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-3 w-80 bg-white dark:bg-[#0f172a] rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.3)] z-[110]"
                >
                  {/* User Profile Header */}
                  <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                      AK
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-gray-900 dark:text-white text-base truncate">
                        Anand Kumar
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        Full-Stack Engineer
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-500 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Open for Opportunities
                      </div>
                    </div>
                  </div>

                  {/* Mode / Theme Segmented Switch (Solid Background) */}
                  <div className="py-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Appearance
                      </span>
                      <span className="text-xs text-gray-400 capitalize font-medium">{theme} Mode</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
                      <button
                        onClick={() => setTheme('light')}
                        className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                          theme === 'light'
                            ? 'bg-white text-amber-500 shadow-md font-bold'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        <FiSun size={15} className="text-amber-500" />
                        Light
                      </button>
                      <button
                        onClick={() => setTheme('dark')}
                        className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                          theme === 'dark'
                            ? 'bg-slate-900 text-indigo-400 shadow-md font-bold'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        <FiMoon size={15} className="text-indigo-400" />
                        Dark
                      </button>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="py-4 space-y-2.5 border-b border-slate-100 dark:border-slate-800">
                    <motion.a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('#contact');
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full glow-button flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold shadow-lg text-center cursor-pointer"
                    >
                      <FiMail size={16} />
                      Hire Me / Get in Touch
                    </motion.a>

                    <motion.a
                      href="/resume.pdf"
                      download
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl font-semibold text-xs text-gray-800 dark:text-gray-200 transition-colors"
                    >
                      <FiDownload size={14} />
                      Download CV / Resume
                    </motion.a>
                  </div>

                  {/* Admin Area */}
                  <div className="pt-3 space-y-1">
                    {isLoggedIn ? (
                      <>
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            router.push('/admin/dashboard');
                          }}
                          className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-gray-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <FiShield size={15} className="text-blue-500" />
                            Admin Dashboard
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold">
                            Admin
                          </span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
                        >
                          <FiLogOut size={15} />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          router.push('/admin/login');
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-gray-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <FiLock size={15} className="text-gray-500 dark:text-gray-400" />
                          Admin Portal
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">Login</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu Drawer (Opaque & Smoothly Scrollable) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-80 max-w-[85vw] h-[100dvh] max-h-[100dvh] bg-white dark:bg-[#0f172a] z-50 lg:hidden border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">AK</span>
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
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-gray-500 dark:text-gray-300"
                aria-label="Close menu"
              >
                <FiX size={22} />
              </motion.button>
            </div>

            {/* Scrollable Body */}
            <div 
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 space-y-6 pb-28 touch-pan-y"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {/* Navigation Links */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 px-2">
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
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-2">
                  Appearance
                </p>

                <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                      theme === 'light'
                        ? 'bg-white text-amber-500 shadow-sm font-bold'
                        : 'text-gray-600 dark:text-gray-400'
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
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <FiMoon size={16} className="text-indigo-400" />
                    Dark
                  </button>
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-2">
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
                  className="w-full bg-slate-100 dark:bg-slate-800 py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm text-gray-800 dark:text-gray-200"
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
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 dark:bg-slate-800 rounded-xl font-semibold text-sm text-gray-700 dark:text-gray-300"
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
