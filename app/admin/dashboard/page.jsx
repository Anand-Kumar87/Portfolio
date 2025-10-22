'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProjectsManager from '@/components/AdminDashboard/ProjectsManager';
import SkillsManager from '@/components/AdminDashboard/SkillsManager';
import AboutManager from '@/components/AdminDashboard/AboutManager';
import AchievementsManager from '@/components/AdminDashboard/AchievementsManager';
import TimelineManager from '@/components/AdminDashboard/TimelineManager';
import { FiLogOut, FiHome } from 'react-icons/fi';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('about');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'timeline', label: 'Education & Experience' },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          
          <div className="flex gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass dark:glass-dark px-4 md:px-6 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition-all"
            >
              <FiHome /> View Site
            </a>
            <button
              onClick={handleLogout}
              className="glass dark:glass-dark px-4 md:px-6 py-3 rounded-full flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="glass dark:glass-dark rounded-3xl p-4 md:p-6">
          {/* Tabs */}
          <div className="flex gap-2 md:gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 md:px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'glass dark:glass-dark hover:scale-105'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'about' && <AboutManager />}
            {activeTab === 'skills' && <SkillsManager />}
            {activeTab === 'projects' && <ProjectsManager />}
            {activeTab === 'achievements' && <AchievementsManager />}
            {activeTab === 'timeline' && <TimelineManager />}
          </div>
        </div>
      </div>
    </div>
  );
}