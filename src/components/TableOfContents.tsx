import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TableOfContentsProps {
  onNavigate: (sectionId: string) => void;
}

export default function TableOfContents({ onNavigate }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          
          // Hide sidebar when home section is visible
          if (entry.target.id === 'home') {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (sectionId: string) => {
    onNavigate(sectionId);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 22,
          }}
          className="fixed right-4 lg:right-6 xl:right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
          aria-label="Table of Contents"
        >
          <div className="relative px-2.5 py-2.5">
            {/* Connecting line */}
            <div className="absolute left-[18px] top-5 bottom-5 w-px bg-gradient-to-b from-gray-200/40 via-gray-300/50 to-gray-200/40 rounded-full" />
            
            <div className="flex flex-col gap-0.5 relative">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => handleClick(section.id)}
                    className="flex items-center gap-3 py-2 px-2 rounded-xl group relative cursor-pointer select-none"
                    whileHover={{ 
                      x: 3,
                      transition: { type: 'spring', stiffness: 420, damping: 28 },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Dot indicator */}
                    <div className="relative w-2 h-2">
                      {!isActive && (
                        <div className="absolute inset-0 rounded-full bg-gray-300/70" />
                      )}
                      {isActive && (
                        <motion.div
                          layoutId="activeDot"
                          className="absolute inset-0 rounded-full bg-[rgb(251,108,133)]"
                          transition={{
                            type: 'spring',
                            stiffness: 450,
                            damping: 30,
                          }}
                        />
                      )}
                    </div>
                    
                    {/* Label */}
                    <motion.span
                      className={`text-xs lg:text-sm font-medium relative ${
                        isActive
                          ? 'text-[rgb(251,108,133)] opacity-90'
                          : 'text-gray-500'
                      }`}
                      animate={{
                        x: isActive ? 2 : 0,
                        opacity: isActive ? 1 : 0.85,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 28,
                      }}
                    >
                      {section.label}
                    </motion.span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
