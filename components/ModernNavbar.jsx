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
  FiShield
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
        ? 'block py-3 px-4 text-base font-medium hover:bg-white/10 dark:hover:bg-white/5 rounded-xl transition-colors'
        : 'px-4 py-2 font-medium transition-colors hover:text-blue-500'
    }`}
  >
    {children}
    {!mobile && (
      <motion.div
        className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
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
    // Check login status only on client
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }
  }, []);

  // Close profile dropdown when clicking outside
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
    setIsScrolled(latest > 50);
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
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'glass dark:glass-dark backdrop-blur-xl border-b border-white/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-lg">AK</span>
              </div>
              <span className="text-xl font-bold gradient-text">Anand Kumar</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
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

            {/* Desktop Actions & Profile Hub */}
            <div className="hidden lg:flex items-center gap-4 relative" ref={profileMenuRef}>
              {/* Profile Avatar Hub Trigger Button */}
              <motion.button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-3 p-1.5 pr-3.5 glass dark:glass-dark rounded-full border transition-all duration-300 ${
                  isProfileOpen 
                    ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-lg' 
                    : 'border-white/20 dark:border-white/10 hover:border-blue-400'
                }`}
                aria-label="Profile and quick settings menu"
                aria-expanded={isProfileOpen}
              >
                {/* Avatar with Status Dot */}
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    AK
                  </div>
                  {/* Glowing online status */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  </span>
                </div>

                <div className="text-left leading-tight hidden xl:block">
                  <div className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1">
                    Anand K.
                  </div>
                  <div className="text-[10px] text-emerald-500 font-medium">Available</div>
                </div>

                <motion.div
                  animate={{ rotate: isProfileOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-500 dark:text-gray-400"
                >
                  <FiChevronDown size={15} />
                </motion.div>
              </motion.button>

              {/* Floating Profile Popover Menu */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-3 w-80 glass dark:glass-dark backdrop-blur-2xl rounded-3xl p-5 border border-white/20 dark:border-white/10 shadow-2xl z-50"
                  >
                    {/* User Header */}
                    <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
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
                        <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-500 font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Open for Opportunities
                        </div>
                      </div>
                    </div>

                    {/* Mode / Theme Segmented Switch */}
                    <div className="py-4 border-b border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Appearance
                        </span>
                        <span className="text-xs text-gray-400 capitalize">{theme} Mode</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 bg-black/5 dark:bg-white/5 p-1 rounded-2xl">
                        <button
                          onClick={() => setTheme('light')}
                          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                            theme === 'light'
                              ? 'bg-white text-amber-500 shadow-sm font-semibold'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          <FiSun size={15} className="text-amber-500" />
                          Light
                        </button>
                        <button
                          onClick={() => setTheme('dark')}
                          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                            theme === 'dark'
                              ? 'bg-gray-800 text-indigo-400 shadow-sm font-semibold'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          <FiMoon size={15} className="text-indigo-400" />
                          Dark
                        </button>
                      </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="py-4 space-y-2 border-b border-white/10">
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
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 glass dark:glass-dark hover:bg-white/10 dark:hover:bg-white/5 rounded-xl font-medium text-xs text-gray-700 dark:text-gray-200 transition-colors"
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
                            className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <FiShield size={15} className="text-blue-500" />
                              Admin Dashboard
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-semibold">
                              Admin
                            </span>
                          </button>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors"
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
                          className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <FiLock size={15} className="text-gray-500 dark:text-gray-400" />
                            Admin Portal
                          </span>
                          <span className="text-[10px] text-gray-400">Login</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="lg:hidden p-3 glass dark:glass-dark rounded-full border border-white/20 dark:border-white/10 shadow-md"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer (Fixed Scrollable Implementation) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-80 max-w-[85vw] h-[100dvh] max-h-[100dvh] glass dark:glass-dark backdrop-blur-2xl z-50 lg:hidden border-l border-white/10 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header (Fixed) */}
            <div className="p-5 flex items-center justify-between border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">AK</span>
                </div>
                <div>
                  <span className="font-bold gradient-text text-base block">Anand Kumar</span>
                  <span className="text-[11px] text-emerald-500 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available for hire
                  </span>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-500 dark:text-gray-300"
                aria-label="Close menu"
              >
                <FiX size={22} />
              </motion.button>
            </div>

            {/* Scrollable Body (min-h-0 and touch-pan-y ensure full scrolling without cutoffs) */}
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

              {/* Theme & Controls */}
              <div className="border-t border-white/10 pt-4 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-2">
                  Preferences
                </p>

                <div className="grid grid-cols-2 gap-2 bg-black/5 dark:bg-white/5 p-1 rounded-2xl">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-medium transition-all ${
                      theme === 'light'
                        ? 'bg-white text-amber-500 shadow-sm font-semibold'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <FiSun size={16} className="text-amber-500" />
                    Light Mode
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-medium transition-all ${
                      theme === 'dark'
                        ? 'bg-gray-800 text-indigo-400 shadow-sm font-semibold'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <FiMoon size={16} className="text-indigo-400" />
                    Dark Mode
                  </button>
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="border-t border-white/10 pt-4 space-y-2.5">
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
                  className="w-full glow-button flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold shadow-lg text-center"
                >
                  <FiMail size={16} />
                  <span>Hire Me</span>
                </motion.a>

                <motion.a
                  href="/resume.pdf"
                  download
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full glass dark:glass-dark py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 text-sm text-gray-800 dark:text-gray-200"
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
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 glass dark:glass-dark rounded-xl font-medium text-sm text-blue-500"
                    >
                      <FiShield size={16} />
                      <span>Admin Dashboard</span>
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-500/10 text-red-500 rounded-xl font-medium text-sm"
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
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 glass dark:glass-dark rounded-xl font-medium text-sm text-gray-700 dark:text-gray-300"
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
