'use client';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon, FiMenu, FiX, FiGlobe, FiDownload, FiMail, FiLock, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

const NavLink = ({ href, children, onClick, mobile = false }) => (
  <motion.a
    href={href}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`relative group ${
      mobile 
        ? 'block py-3 px-4 text-lg font-medium hover:bg-white/10 rounded-lg transition-colors'
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

const LanguageSelector = ({ mobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);

  useEffect(() => {
    // Auto-detect browser language
    const browserLang = navigator.language.split('-')[0];
    const detectedLang = languages.find(lang => lang.code === browserLang) || languages[0];
    setCurrentLang(detectedLang);
  }, []);

  return (
    <div className={`relative ${mobile ? 'w-full' : ''}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 ${
          mobile 
            ? 'w-full py-3 px-4 text-lg font-medium hover:bg-white/10 rounded-lg transition-colors'
            : 'px-3 py-2 glass dark:glass-dark rounded-full hover:scale-105 transition-all'
        }`}
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="font-medium">{currentLang.code.toUpperCase()}</span>
        <FiGlobe size={16} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`absolute top-full mt-2 ${
              mobile ? 'left-0 right-0' : 'right-0'
            } glass dark:glass-dark rounded-xl p-2 border border-white/10 z-50 ${
              mobile ? 'w-full' : 'min-w-48'
            }`}
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => {
                  setCurrentLang(lang);
                  setIsOpen(false);
                }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors"
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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
              <LanguageSelector />
              
              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 glass dark:glass-dark rounded-full"
              >
                {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
              </motion.button>

              {isLoggedIn ? (
                <>
                  <motion.button
                    onClick={() => router.push('/admin/dashboard')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 glass dark:glass-dark rounded-full font-medium"
                  >
                    <FiLock size={16} />
                    Admin Panel
                  </motion.button>
                  <motion.button
                    onClick={handleLogout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-500 rounded-full font-medium"
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
                  className="flex items-center gap-2 px-4 py-2 glass dark:glass-dark rounded-full font-medium"
                >
                  <FiLock size={16} />
                  Admin Login
                </motion.button>
              )}

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glow-button flex items-center gap-2"
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
            >
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-80 glass dark:glass-dark backdrop-blur-xl z-50 lg:hidden border-l border-white/10"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">AK</span>
                  </div>
                  <span className="font-bold gradient-text">Menu</span>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <FiX size={20} />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-2 mb-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
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
              <div className="space-y-4">
                <LanguageSelector mobile />
                
                <motion.button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 py-3 px-4 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
                  <span className="font-medium">
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </motion.button>

                {isLoggedIn ? (
                  <>
                    <motion.button
                      onClick={() => {
                        setIsOpen(false);
                        router.push('/admin/dashboard');
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 py-3 px-4 glass dark:glass-dark rounded-lg font-medium"
                    >
                      <FiLock size={20} />
                      <span>Admin Panel</span>
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 py-3 px-4 bg-red-500/20 text-red-500 rounded-lg font-medium"
                    >
                      <FiLogOut size={20} />
                      <span>Logout</span>
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    onClick={() => {
                      setIsOpen(false);
                      router.push('/admin/login');
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 py-3 px-4 glass dark:glass-dark rounded-lg font-medium"
                  >
                    <FiLock size={20} />
                    <span>Admin Login</span>
                  </motion.button>
                )}

                <motion.a
                  href="/resume.pdf"
                  download
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full glow-button flex items-center justify-center gap-2"
                >
                  <FiDownload size={16} />
                  Download CV
                </motion.a>

                <motion.a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full glass dark:glass-dark py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <FiMail size={16} />
                  Contact Me
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
