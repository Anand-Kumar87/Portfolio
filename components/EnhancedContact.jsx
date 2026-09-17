'use client';
import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck, FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

const FloatingInput = ({ label, type = 'text', value, onChange, required = false }) => {
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(value && String(value).trim().length > 0);

  return (
    <div className="relative mb-6">
      <motion.input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full px-4 py-3 bg-transparent border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors peer"
        placeholder=" "
      />
      <motion.label
        animate={{
          y: focused || hasValue ? -28 : 0,
          scale: focused || hasValue ? 0.85 : 1,
          color: focused ? '#3B82F6' : undefined,
        }}
        className="absolute left-4 top-3 text-gray-500 pointer-events-none origin-left transition-colors"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </motion.label>
    </div>
  );
};

const FloatingTextarea = ({ label, value, onChange, required = false }) => {
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(value && String(value).trim().length > 0);

  return (
    <div className="relative mb-6">
      <motion.textarea
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={3}
        className="w-full px-4 py-3 bg-transparent border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
        placeholder=" "
      />
      <motion.label
        animate={{
          y: focused || hasValue ? -28 : 12,
          scale: focused || hasValue ? 0.85 : 1,
          color: focused ? '#3B82F6' : undefined,
        }}
        className="absolute left-4 top-3 text-gray-500 pointer-events-none origin-left transition-colors"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </motion.label>
    </div>
  );
};

export default function EnhancedContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const controls = useAnimation();

  const handleCopy = (text, key) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      toast.success(`Copied ${key} to clipboard!`);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Message sent! An automated confirmation email was sent to your inbox.', {
          duration: 5000,
          icon: '🚀'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Reset success state after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        const errData = await response.json().catch(() => ({}));
        toast.error(errData.error || 'Failed to send message');
      }
    } catch (error) {
      toast.error('An error occurred: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'solestyle41@gmail.com',
      href: 'mailto:solestyle41@gmail.com',
      copyable: true
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+91 8726540277',
      href: 'tel:+918726540277',
      copyable: true
    },
    {
      icon: FiMapPin,
      label: 'India',
      value: 'New Delhi, Kamla Nagar',
      href: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-8">Let's Connect</h3>
            
            <div className="space-y-5 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="flex items-center justify-between p-4 glass dark:glass-dark rounded-xl hover:shadow-lg transition-all group border border-white/5"
                >
                  <a
                    href={info.href}
                    className="flex items-center gap-4 flex-1 min-w-0"
                  >
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <info.icon size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{info.label}</p>
                      <p className="text-gray-900 dark:text-gray-100 font-semibold truncate">{info.value}</p>
                    </div>
                  </a>

                  {info.copyable && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCopy(info.value, info.label);
                      }}
                      title={`Copy ${info.label}`}
                      aria-label={`Copy ${info.label}`}
                      className="p-2.5 rounded-lg ml-2 bg-gray-100 dark:bg-white/5 hover:bg-blue-500/20 text-gray-600 dark:text-gray-300 hover:text-blue-400 transition-colors border border-transparent hover:border-blue-500/30"
                    >
                      {copiedKey === info.label ? (
                        <FiCheck className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <FiCopy className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Decorative Element */}
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="hidden sm:block w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"
            />
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass dark:glass-dark p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl"
          >
            <form onSubmit={handleSubmit}>
              <FloatingInput
                label="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <FloatingInput
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <FloatingInput
                label="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />

              {/* Honeypot field to prevent bot spam */}
              <input
                type="text"
                name="_hp"
                value={formData._hp || ''}
                onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <FloatingTextarea
                label="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />

              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : 'glow-button'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <FiCheck size={20} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <FiSend size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
