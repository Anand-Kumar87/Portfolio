import ModernNavbar from '@/components/ModernNavbar';
import ModernHero from '@/components/ModernHero';
import About from '@/components/About';
import SkillsDashboard from '@/components/SkillsDashboard';
import ProjectGallery from '@/components/ProjectGallery';
import Achievements from '@/components/Achievements';
import AnimatedTimeline from '@/components/AnimatedTimeline';
import Blog from '@/components/Blog';
import EnhancedContact from '@/components/EnhancedContact';
import SocialFloating from '@/components/SocialFloating';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollProgress from '@/components/ScrollProgress';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <ParticleBackground />
      <ModernNavbar />
      <main className="min-h-screen relative z-10">
        <section id="home">
          <ModernHero />
        </section>
        
        <section id="about">
          <About />
        </section>
        
        <section id="skills">
          <SkillsDashboard />
        </section>
        
        <section id="projects">
          <ProjectGallery />
        </section>
        
        <Achievements />
        
        <section id="experience">
          <AnimatedTimeline />
        </section>
        
        <Blog />
        
        <section id="contact">
          <EnhancedContact />
        </section>
      </main>
      <Footer />
      <SocialFloating />
    </>
  );
}
