'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  FiLayers, 
  FiCpu, 
  FiShield, 
  FiDownload, 
  FiArrowRight, 
  FiCheckCircle, 
  FiTerminal, 
  FiDatabase,
  FiServer,
  FiZap,
  FiMapPin,
  FiAward,
  FiSmartphone
} from 'react-icons/fi';

export default function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch('/api/about')
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch(() => setAboutData(null));
  }, []);

  const metrics = [
    { value: '3+', label: 'Years Experience', subtext: 'Mobile & Full-Stack' },
    { value: '30+', label: 'Projects Shipped', subtext: 'Flutter & Web Apps' },
    { value: '99.9%', label: 'Uptime & Reliability', subtext: 'Production Deployments' },
    { value: '100%', label: 'Client Satisfaction', subtext: 'Agile & On-Time Delivery' },
  ];

  const pillars = [
    {
      icon: FiSmartphone,
      title: 'Flutter & Mobile Engineering',
      desc: 'Crafting pixel-perfect, 60fps iOS and Android applications with Flutter, Dart, BLoC/Riverpod, Impeller rendering, and native platform channels.',
      badge: 'Mobile Core'
    },
    {
      icon: FiServer,
      title: 'Full-Stack Web Architecture',
      desc: 'Architecting robust, end-to-end web applications with Next.js 14, React, Node.js, Express, and modern RESTful APIs.',
      badge: 'Web Architecture'
    },
    {
      icon: FiDatabase,
      title: 'Databases & Cloud Logic',
      desc: 'Designing scalable schemas and high-throughput data operations with MongoDB, PostgreSQL, Firebase Cloud, and Redis caching.',
      badge: 'Data & Cloud'
    },
    {
      icon: FiShield,
      title: 'Hardened Security & DevOps',
      desc: 'Z+ hardened authentication (JWT, OAuth, bcrypt), Docker containerization, CI/CD pipelines, and secure API gateways.',
      badge: 'Security & DevOps'
    }
  ];

  const coreTags = [
    'Flutter', 'Dart', 'BLoC / Riverpod', 'Next.js 14', 'React 18', 
    'Node.js', 'Express', 'Firebase', 'MongoDB', 'PostgreSQL', 
    'Docker', 'REST APIs', 'Tailwind CSS', 'TypeScript'
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <FiAward size={14} />
            <span>Engineer Profile</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4"
          >
            Architecting Scalable Systems With <span className="gradient-text">Modern Precision</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            Driven by clean code, robust backend design, and fluid user interfaces — translating complex business requirements into fast, reliable software products.
          </motion.p>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Narrative Card (Col 1-7) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group"
          >
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available For Full-Time & Contract Roles
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <FiMapPin size={13} className="text-blue-500" />
                  <span>New Delhi, India (Open to Remote)</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                  Engineering Software That Matters
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                  I am a Senior Mobile & Full-Stack Software Engineer with a deep passion for building resilient cross-platform Flutter applications (iOS & Android) and high-throughput web systems. Whether tuning 60fps Impeller widget trees, designing multi-tier cloud backends, or crafting fluid responsive interfaces, I focus on performance, scalability, and clean maintainable code.
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  My portfolio features production-grade apps including cross-platform mobile suites, fintech utilities like <strong className="text-slate-900 dark:text-white font-semibold">Invoice Generator</strong>, high-performance retail portals like <strong className="text-slate-900 dark:text-white font-semibold">ShoeStyle E-Commerce</strong>, and intelligent financial tracking platforms like <strong className="text-slate-900 dark:text-white font-semibold">Nexus Finance</strong>.
                </p>
              </div>

              {/* Core Competencies Tags */}
              <div className="pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                  Core Engineering Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {coreTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700/80 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-4">
              <a
                href="/resume.pdf"
                download
                className="glow-button !py-3 !px-6 !text-xs !font-bold flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <FiDownload size={15} />
                <span>Download Resume</span>
              </a>
              <a
                href="#contact"
                className="px-5 py-3 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Let's Discuss Opportunities</span>
                <FiArrowRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* Metrics & Impact Cards (Col 8-12) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-blue-500/40 transition-colors group"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm mb-4">
                  #0{i + 1}
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1 group-hover:text-blue-500 transition-colors">
                    {metric.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug">
                    {metric.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {metric.subtext}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 4 Architectural Pillars Row (Full Width Bento 4-Cols) */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {pillars.map((pillar, index) => {
              const IconComp = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-blue-500/40 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                        <IconComp size={22} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                        {pillar.badge}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-blue-500 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
