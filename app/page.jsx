import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Achievements from '@/components/Achievements';
import Timeline from '@/components/Timeline';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import SocialFloating from '@/components/SocialFloating';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Timeline />
        <Blog />
        <Contact />
      </main>
      <SocialFloating />
    </>
  );
}