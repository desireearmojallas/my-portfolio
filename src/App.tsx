

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import Header from './components/Header';
import './components/ScrollFix.css';
import './components/OverflowFix.css';
import './components/FullWidthFix.css';
import useFaviconSwitcher from './hooks/useFaviconSwitcher';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState<'designer' | 'developer'>('designer');
  
  // Initialize favicon switcher
  useFaviconSwitcher({
    lightFavicon: '/favicon-white.png',
    darkFavicon: '/favicon-black.png',
    brightnessThreshold: 128
  });

  // Handle role selection from landing page
  const handleRoleSelect = (role: 'designer' | 'developer') => {
    setSelectedRole(role);
  };

  const handleNavigation = (sectionId: string) => {
    // Handle navigation to different pages
    switch (sectionId) {
      case 'home':
        navigate('/');
        // Scroll to top after navigation
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
        break;
      case 'projects':
        if (location.pathname !== '/') {
          navigate('/');
          setTimeout(() => {
            const section = document.getElementById('projects');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } else {
          const section = document.getElementById('projects');
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }
        break;
      case 'about':
        navigate('/about');
        break;
      case 'blog':
        navigate('/blog');
        break;
      case 'contact':
        navigate('/contact');
        break;
      default:
        // Handle scroll navigation on home page
        if (location.pathname === '/') {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }
    }
  };

  return (
    <div className="force-scrollable w-full overflow-x-hidden" id="root">
      {/* Show header on all pages */}
      <Header onNavigate={handleNavigation} />
      
      <Routes>
        <Route path="/" element={<HomePage onRoleSelect={handleRoleSelect} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default App;
