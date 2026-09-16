'use client';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon, FiMenu, FiX, FiDownload, FiMail, FiLock, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const NavLink = ({ href, children, onClick, mobile = false }) => (
  <motion.a
    href={href}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`relative group ${
      mobile 
        ? 'block py-3 px-4 text-base font-medium hover:bg-white/10 rounded-xl transition-colors'
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
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Check login status only on client
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
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
    // Smooth scroll to section
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">AK</span>
              </div>
              <span className="text-xl font-bold gradient-text">Anand Kumar</span>
            </motion.div>

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

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 glass dark:glass-dark rounded-full"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FiSun size={18} className="text-amber-400" /> : <FiMoon size={18} className="text-indigo-400" />}
              </motion.button>

              {isLoggedIn ? (
                <>
                  <motion.button
                    onClick={() => router.push('/admin/dashboard')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 glass dark:glass-dark rounded-full font-medium text-sm"
                  >
                    <FiLock size={16} />
                    Admin Panel
                  </motion.button>
                  <motion.button
                    onClick={handleLogout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-500 rounded-full font-medium text-sm"
                  >
                    <FiLogOut size={16} />
                    Logout
                  </motion.button>
                </>
              ) : (
                <motion.button
                  onClick={() => router.push('/admin/login')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 glass dark:glass-dark rounded-full font-medium text-sm"
                >
                  <FiLock size={16} />
                  Admin Login
                </motion.button>
              )}

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glow-button flex items-center gap-2 text-sm"
              >
                <FiMail size={16} />
                Hire Me
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-3 glass dark:glass-dark rounded-full"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-80 max-w-[85vw] glass dark:glass-dark backdrop-blur-2xl z-50 lg:hidden border-l border-white/10 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 pb-4 flex items-center justify-between border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">AK</span>
                </div>
                <span className="font-bold gradient-text text-lg">Menu</span>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                aria-label="Close menu"
              >
                <FiX size={22} />
              </motion.button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 overscroll-contain">
              {/* Navigation Links */}
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
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

              {/* Mobile Actions */}
              <div className="border-t border-white/10 pt-4 space-y-3">
                <motion.button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 py-3 px-4 glass dark:glass-dark hover:bg-white/10 rounded-xl transition-colors font-medium text-sm"
                >
                  {theme === 'dark' ? <FiSun size={18} className="text-amber-400" /> : <FiMoon size={18} className="text-indigo-400" />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </motion.button>

                {isLoggedIn ? (
                  <>
                    <motion.button
                      onClick={() => {
                        setIsOpen(false);
                        router.push('/admin/dashboard');
                      }}
                      className="w-full flex items-center gap-3 py-3 px-4 glass dark:glass-dark rounded-xl font-medium text-sm"
                    >
                      <FiLock size={18} />
                      <span>Admin Panel</span>
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-3 py-3 px-4 bg-red-500/20 text-red-500 rounded-xl font-medium text-sm"
                    >
                      <FiLogOut size={18} />
                      <span>Logout</span>
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    onClick={() => {
                      setIsOpen(false);
                      router.push('/admin/login');
                    }}
                    className="w-full flex items-center gap-3 py-3 px-4 glass dark:glass-dark rounded-xl font-medium text-sm"
                  >
                    <FiLock size={18} />
                    <span>Admin Login</span>
                  </motion.button>
                )}

                <motion.a
                  href="/resume.pdf"
                  download
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full glow-button flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold shadow-lg"
                >
                  <FiDownload size={16} />
                  <span>Download CV</span>
                </motion.a>

                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contact');
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full glass dark:glass-dark py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 text-sm"
                >
                  <FiMail size={16} />
                  <span>Contact Me</span>
                </motion.a>
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
