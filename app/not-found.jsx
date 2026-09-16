'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass dark:glass-dark rounded-3xl p-10 md:p-14 max-w-xl w-full text-center border border-white/20 shadow-2xl relative overflow-hidden"
      >
        {/* Glow backdrop */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-8xl md:text-9xl font-extrabold gradient-text mb-4 tracking-tighter"
        >
          404
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Page Not Found
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="glow-button inline-flex items-center gap-2"
          >
            <FiHome size={18} />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="glass dark:glass-dark px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 hover:scale-105 transition-all text-gray-800 dark:text-gray-200"
          >
            <FiArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
