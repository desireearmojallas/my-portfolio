import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [scrollY, setScrollY] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Determine active page
  const getActivePage = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/about') return 'about';
    if (location.pathname === '/blog') return 'blog';
    if (location.pathname === '/contact') return 'contact';
    return 'home';
  };

  const activePage = getActivePage();

  // Update scroll position and handle navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show navbar when at the top
      if (currentScrollY < 100) {
        setVisible(true);
      } else {
        // Show navbar when scrolling up, hide when scrolling down
        if (currentScrollY < prevScrollY) {
          setVisible(true);
        } else if (currentScrollY > prevScrollY) {
          setVisible(false);
        }
      }
      
      setPrevScrollY(currentScrollY);
      setScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    
    // Use the navigation handler from App component
    onNavigate(sectionId);
  };

  return (
    <>
      {/* Sticky Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-40 transition-all duration-300 glass-nav py-4"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(-100%)'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => scrollToSection('home')}
              className="font-outfit font-bold text-2xl text-gray-900 cursor-pointer hover:opacity-80 transition-opacity"
            >
              Des<span className="text-[rgb(251,108,133)]">.</span>
            </motion.button>
            
            <div className="hidden md:flex space-x-8 items-center">
              {[
                { id: 'home', label: 'Home' },
                { id: 'projects', label: 'Projects' },
                { id: 'about', label: 'About' },
                { id: 'blog', label: 'Blog' },
                { id: 'contact', label: 'Contact' }
              ].map((item, index) => (
                <motion.button 
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-all duration-300 font-medium relative group cursor-pointer ${
                    activePage === item.id 
                      ? 'text-[rgb(251,108,133)]' 
                      : 'text-gray-600 hover:text-[rgb(251,108,133)]'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-[rgb(251,108,133)] transition-all duration-300 ${
                    activePage === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                href="#"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(255,130,150)] text-white font-medium hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 hover:scale-105"
              >
                Resume
              </motion.a>
            </div>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:hidden text-gray-800 hover:text-[rgb(251,108,133)] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open mobile menu"
            >
              <Menu className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 glass-mobile-menu z-50 md:hidden"
          >
            <div className="p-6 flex justify-end">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-800 hover:text-[rgb(251,108,133)] transition-colors"
                aria-label="Close mobile menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex flex-col justify-center items-center h-[80%] space-y-8 text-xl font-medium">
              {[
                { id: 'home', label: 'Home' },
                { id: 'projects', label: 'Projects' },
                { id: 'about', label: 'About' },
                { id: 'blog', label: 'Blog' },
                { id: 'contact', label: 'Contact' }
              ].map((item, index) => (
                <motion.button 
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-all duration-300 relative group ${
                    activePage === item.id 
                      ? 'text-[rgb(251,108,133)]' 
                      : 'text-gray-800 hover:text-[rgb(251,108,133)]'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-[rgb(251,108,133)] transition-all duration-300 ${
                    activePage === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                href="#"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(255,130,150)] text-white font-medium hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 hover:scale-105"
              >
                Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
