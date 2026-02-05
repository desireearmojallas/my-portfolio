

import { useState, useEffect } from 'react';
import LandingSection from './components/LandingSection';
import AboutSection from './components/AboutSection';
import ProjectsCarousel from './components/ProjectsCarousel';
import Footer from './components/Footer';
import Header from './components/Header';
import './components/ScrollFix.css';
import './components/OverflowFix.css';
import './components/FullWidthFix.css';
import useResponsive from './hooks/useResponsive';

function App() {
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
    
    // Force refresh scrollbars after role selection
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
  };

  const handleNavigation = (sectionId: string) => {
    // If navigating to about or projects without a role selected, default to designer
    if ((sectionId === 'about' || sectionId === 'projects') && !selectedRole) {
      setSelectedRole('designer');
      
      // Wait for the section to become visible before scrolling
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      // Normal navigation
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-gray-50/30 to-pink-50/20 force-scrollable w-full overflow-hidden" id="root">
      <Header onNavigate={handleNavigation} />
      <main className="pt-16 overflow-hidden force-scrollable w-full">
        <section id="home">
          <LandingSection onRoleSelect={handleRoleSelect} />
        </section>
        
        {/* Render sections - show them when a role is selected or when directly navigated to */}
        <section 
          id="about" 
          className={`transition-all duration-500 ${
            selectedRole 
              ? 'opacity-100 block' 
              : 'opacity-0 hidden'
          }`}
        >
          <AboutSection role={selectedRole || 'designer'} />
        </section>
        <section 
          id="projects" 
          className={`transition-all duration-500 ${
            selectedRole 
              ? 'opacity-100 block' 
              : 'opacity-0 hidden'
          }`}
        >
          <ProjectsCarousel role={selectedRole || 'designer'} />
        </section>
        
        <section id="contact" className={selectedRole ? '' : 'mt-0'}>
          <Footer />
        </section>
      </main>
    </div>
  );
}

export default App;
