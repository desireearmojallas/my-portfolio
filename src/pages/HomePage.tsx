import { useState, useEffect } from 'react';
import LandingSection from '../components/LandingSection';
import ProjectsCarousel from '../components/ProjectsCarousel';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import useResponsive from '../hooks/useResponsive';

interface HomePageProps {
  onRoleSelect: (role: 'designer' | 'developer') => void;
}

export default function HomePage({ onRoleSelect }: HomePageProps) {
  const [selectedRole, setSelectedRole] = useState<'designer' | 'developer' | null>(null);
  const { isMobile, screenSize } = useResponsive();

  // Effect to ensure scrolling is always available
  useEffect(() => {
    // Force document to be scrollable
    document.documentElement.classList.add('force-scrollable');
    document.body.classList.add('force-scrollable');

    // Cleanup function
    return () => {
      document.documentElement.classList.remove('force-scrollable');
      document.body.classList.remove('force-scrollable');
    };
  }, []);
  
  // Log screen size changes for debugging
  useEffect(() => {
    console.log(`Screen size changed to: ${screenSize}, isMobile: ${isMobile}`);
  }, [screenSize, isMobile]);

  const handleRoleSelect = (role: 'designer' | 'developer') => {
    setSelectedRole(role);
    onRoleSelect(role); // Pass to parent
    
    // Force refresh scrollbars after role selection
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
  };

  return (
    <main className="pt-16 overflow-x-hidden force-scrollable w-full">
      <section id="home">
        <LandingSection onRoleSelect={handleRoleSelect} />
      </section>
      
      <section id="projects" className="transition-all duration-500 opacity-100">
        <ProjectsCarousel role={selectedRole || 'designer'} />
      </section>
      
      <Footer />
      <ScrollToTop />
    </main>
  );
}
