'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  FiCode, 
  FiLayers, 
  FiCpu, 
  FiShield, 
  FiDownload, 
  FiArrowRight, 
  FiCopy, 
  FiCheck, 
  FiTerminal, 
  FiCompass 
} from 'react-icons/fi';

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/about')
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch(() => setAboutData(null));
  }, []);

  const copyConfig = () => {
    const configCode = `const anandKumar = {
  name: "Anand Kumar",
  role: "Full-Stack Software Engineer",
  location: "New Delhi, India",
  experience: "3+ Years",
  focus: ["Scalable Web Apps", "Cloud Architecture", "Interactive 3D"],
  stack: {
    frontend: ["Next.js 14", "React 18", "Tailwind CSS", "Three.js"],
    backend: ["Node.js", "Express", "MongoDB", "REST APIs"],
    devops: ["Git", "Vercel", "Netlify", "Docker Basics"]
  },
  available: true
};`;
    navigator.clipboard.writeText(configCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pillars = [
    {
      icon: FiLayers,
      title: 'Full-Cycle Engineering',
      desc: 'Bridging elegant UX design with production-grade backend databases and serverless architectures.',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      icon: FiCpu,
      title: 'Performance & 60fps UI',
      desc: 'Obsessed with sub-second page loads, bundle optimization, and smooth physics-driven motion.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: FiShield,
      title: 'Security-First Mindset',
      desc: 'Hardened endpoints, robust JWT authentications, data sanitization, and clean architectural patterns.',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: FiCompass,
      title: 'Modern 3D & AI Innovation',
      desc: 'Pioneering interactive WebGL/Three.js web spaces and integrating intelligent LLM assistants.',
      gradient: 'from-amber-500 to-orange-500'
    }
  ];

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <FiCode size={14} />
            <span>Developer Profile</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4"
          >
            Engineering With <span className="gradient-text">Purpose & Innovation</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
          >
            I turn complex business logic and design visions into high-performance, responsive web applications built to scale.
          </motion.p>
        </div>

        {/* Two-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Narrative & Pillars (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Story Card */}
            <div className="p-7 sm:p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl space-y-5">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <span>The Story Behind the Code</span>
              </h3>
              
              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  I'm <strong className="text-slate-900 dark:text-white font-semibold">Anand Kumar</strong>, a full-stack engineer driven by a curiosity for how high-scale web systems interact with fluid, responsive user interfaces.
                </p>
                <p>
                  From designing custom fintech accounting logic in <span className="text-blue-500 font-medium">Invoice Generator</span>, to building full-fledged retail experiences in <span className="text-purple-500 font-medium">ShoeStyle E-Commerce</span>, and implementing AI budget predictions in <span className="text-pink-500 font-medium">Nexus Finance</span> — my work is focused on creating practical software with intuitive design.
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic">
                  "Great code isn't just about syntax; it's about solving human problems with speed, elegance, and reliability."
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="/resume.pdf"
                  download
                  className="glow-button text-sm px-6 py-3 flex items-center gap-2 shadow-lg font-semibold"
                >
                  <FiDownload size={16} />
                  <span>Download Resume</span>
                </a>
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-semibold flex items-center gap-2 transition-all border border-slate-200 dark:border-slate-700"
                >
                  <span>View Projects</span>
                  <FiArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Core Strengths Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg border border-slate-200/60 dark:border-slate-800/60 shadow-md hover:shadow-xl transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${pillar.gradient} flex items-center justify-center text-white mb-3 shadow-md`}>
                    <pillar.icon size={20} />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive macOS Terminal & Live Metrics (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Apple macOS Code Terminal */}
            <div className="rounded-3xl bg-[#090d16] border border-slate-800 shadow-2xl overflow-hidden">
              {/* Terminal Window Header */}
              <div className="px-4 py-3 bg-[#0d1322] border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="text-xs text-slate-400 font-mono ml-2 flex items-center gap-1.5">
                    <FiTerminal size={12} className="text-blue-400" />
                    anand.config.ts
                  </span>
                </div>
                <button
                  onClick={copyConfig}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                  title="Copy code"
                >
                  {copied ? <FiCheck size={14} className="text-emerald-400" /> : <FiCopy size={14} />}
                </button>
              </div>

              {/* Terminal Code Body */}
              <div className="p-5 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto selection:bg-blue-600 selection:text-white">
                <div><span className="text-purple-400">interface</span> <span className="text-amber-300">Engineer</span> &#123;</div>
                <div className="pl-4"><span className="text-blue-400">name</span>: <span className="text-emerald-300">string</span>;</div>
                <div className="pl-4"><span className="text-blue-400">role</span>: <span className="text-emerald-300">string</span>;</div>
                <div className="pl-4"><span className="text-blue-400">status</span>: <span className="text-emerald-300">string</span>;</div>
                <div className="pl-4"><span className="text-blue-400">coreStack</span>: <span className="text-emerald-300">string[]</span>;</div>
                <div>&#125;</div>
                <br />
                <div><span className="text-purple-400">export const</span> <span className="text-blue-300">developer</span>: <span className="text-amber-300">Engineer</span> = &#123;</div>
                <div className="pl-4"><span className="text-slate-400">name</span>: <span className="text-emerald-300">"Anand Kumar"</span>,</div>
                <div className="pl-4"><span className="text-slate-400">role</span>: <span className="text-emerald-300">"Full-Stack Software Engineer"</span>,</div>
                <div className="pl-4"><span className="text-slate-400">location</span>: <span className="text-emerald-300">"New Delhi, India"</span>,</div>
                <div className="pl-4"><span className="text-slate-400">status</span>: <span className="text-emerald-300">"🟢 Open for Opportunities"</span>,</div>
                <div className="pl-4"><span className="text-slate-400">coreStack</span>: [</div>
                <div className="pl-8 text-amber-200">"Next.js 14", "React", "Node.js",</div>
                <div className="pl-8 text-amber-200">"MongoDB", "Tailwind CSS", "Three.js"</div>
                <div className="pl-4">],</div>
                <div className="pl-4"><span className="text-slate-400">mindset</span>: <span className="text-emerald-300">"Build with speed & durability"</span></div>
                <div>&#125;;</div>
              </div>
            </div>

            {/* Impact Metric Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-md text-center">
                <div className="text-3xl font-extrabold gradient-text mb-1">3+</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Years Experience</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-md text-center">
                <div className="text-3xl font-extrabold gradient-text mb-1">30+</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Projects Completed</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-md text-center">
                <div className="text-3xl font-extrabold text-emerald-500 mb-1">100%</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Dedication to Quality</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-md text-center">
                <div className="text-3xl font-extrabold text-purple-500 mb-1">24/7</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Problem Solver</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
