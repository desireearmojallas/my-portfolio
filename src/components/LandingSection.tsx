// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Code, Sparkles, ChevronDown, MousePointer2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface LandingSectionProps {
  onRoleSelect: (role: 'designer' | 'developer') => void;
}

export default function LandingSection({ onRoleSelect }: LandingSectionProps) {
  // Track the selected role with local state (default to 'designer')
  const [selectedRole, setSelectedRole] = useState<'designer' | 'developer'>('designer');
  // State for font animation
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  // State for guided tutorial
  const [showRoleTutorial, setShowRoleTutorial] = useState(true);
  // Ref for cursor element (no state to avoid re-renders)
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Debug component renders and role selection
  console.log('LandingSection rendered, current role:', selectedRole);
  
  // Track mouse movement for cursor following (DOM only, no re-renders)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Ensure scrolling is always available
  useEffect(() => {
    // Reset any overflow settings that might be interfering with scrolling
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    
    return () => {
      // Clean up on unmount
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  // Array of font families to cycle through
  const fonts = [
    'font-outfit', // Default font
    'font-serif',  // Playfair Display
    'font-mono',   // Roboto Mono.
    'font-sans',   // Inter
    'font-cursive' // Dancing Script  
  ];

  // Enhanced font animation effect with better cleanup and timing
  useEffect(() => {
    if (!isAnimating) return;
    
    // Use consistent timing for smooth transitions
    const animationDelay = 400; // slightly slower for better visual effect
    
    // Font cycling animation
    const fontInterval = setInterval(() => {
      setCurrentFontIndex(prevIndex => (prevIndex + 1) % fonts.length);
    }, animationDelay);
    
    // Pause animation after cycling through all fonts once
    const pauseTimeout = setTimeout(() => {
      setIsAnimating(false);
      clearInterval(fontInterval);
      
      // Reset to default font with a small delay for visual smoothness
      const resetTimeout = setTimeout(() => {
        setCurrentFontIndex(0);
      }, animationDelay / 2);
      
      // Resume animation after 5 seconds of pause
      const resumeTimeout = setTimeout(() => {
        setIsAnimating(true);
      }, 5000);
      
      return () => {
        clearTimeout(resetTimeout);
        clearTimeout(resumeTimeout);
      };
    }, fonts.length * animationDelay);
    
    return () => {
      clearInterval(fontInterval);
      clearTimeout(pauseTimeout);
    };
  }, [isAnimating, fonts.length]);

  // Fixed role selection handler with better timing and positioning
  const handleRoleSelect = (role: 'designer' | 'developer') => {
    console.log(`Role selected: ${role}, Current role: ${selectedRole}`);
    
    // Dismiss tutorial on button click
    setShowRoleTutorial(false);
    
    // Always update the state and trigger the callback to ensure consistent behavior
    setSelectedRole(role);
    
    // Call the parent callback with the selected role
    onRoleSelect(role);
    
    // Give the DOM time to update before scrolling
    setTimeout(() => {
      // First, ensure the sections are rendered by forcing a reflow
      window.dispatchEvent(new Event('resize'));
      
      // Then wait a bit more for the sections to fully render
      setTimeout(() => {
        const nextSection = document.getElementById('journey');
        if (nextSection) {
          console.log('Scrolling to journey section');
          // Use window.scrollTo instead of scrollIntoView for better browser compatibility
          const yOffset = -80; // Add some offset for header/navigation
          const y = nextSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
          
          // Ensure scrollbars remain visible by forcing overflow to be visible
          document.documentElement.style.overflow = 'auto';
          document.documentElement.style.overflowX = 'hidden';
          document.body.style.overflow = 'auto';
          document.body.style.overflowX = 'hidden';
        } else {
          console.log('Journey section not found');
        }
      }, 150); // Add extra delay for the sections to render
    }, 100);
  };

  // Improved scroll handler that preserves scrollbars
  const scrollToJourney = () => {
    const journeySection = document.getElementById('journey');
    if (journeySection) {
      // Use window.scrollTo instead of scrollIntoView
      const yOffset = -80; // Add some offset for header/navigation
      const y = journeySection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
      
      // Ensure scrollbars remain visible
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gradient-hero px-0 relative w-full landing-section">
      {/* Simplified decorative elements - just one subtle element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-20 h-20 rounded-full bg-gradient-to-r from-pink-200 to-pink-300 opacity-30" />
      </div>

      <div className="text-center w-full max-w-4xl mx-auto relative z-10 px-4 sm:px-6">
        {/* Sparkle icon with simplified animation */}
        <div className="mb-4 sm:mb-6 animate-fadeIn" style={{animationDelay: '0ms', animationFillMode: 'forwards'}}>
          <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-[rgb(251,108,133)]" />
        </div>

        {/* Main heading with enhanced font animation - more responsive */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-outfit font-bold text-gray-800 mb-4 sm:mb-6 animate-fadeIn" style={{animationDelay: '200ms', animationFillMode: 'forwards'}}>
          Hi, I'm <span 
            className={`bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] bg-clip-text text-transparent inline-flex transition-all duration-300 ${isAnimating ? 'animate-pulse-soft' : ''} ${fonts[currentFontIndex]}`}
            style={{
              transform: isAnimating ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.3s ease-in-out'
            }}
          >
            Des<span className="typewriter"></span>
          </span>
        </h1>
        
        {/* Subtitle with improved responsive styling */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 font-light animate-fadeIn" style={{animationDelay: '400ms', animationFillMode: 'forwards'}}>
          Designer. Developer. <span className="font-medium text-[rgb(251,108,133)]">Problem Solver</span>.
        </p>
        
        {/* Guided Tutorial - Cursor Following with Tooltip */}
        <AnimatePresence>
          {showRoleTutorial && (
            <motion.div
              ref={cursorRef}
              style={{
                position: 'fixed',
                pointerEvents: 'none',
                zIndex: 50
              }}
              transition={{ type: 'spring', damping: 3, mass: 0.2 }}
              className="flex flex-col items-center gap-2"
            >
              {/* Animated cursor icon */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <MousePointer2 className="w-6 h-6 text-[rgb(251,108,133)] drop-shadow-lg" />
              </motion.div>
              
              {/* Tooltip with text */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shadow-xl"
              >
                Choose a role
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Enhanced role selection buttons with better responsive design */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fadeIn py-8 px-4 button-shadow-container" style={{animationDelay: '600ms', animationFillMode: 'forwards'}}>
          <button
            type="button" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); // Prevent any event bubbling
              handleRoleSelect('designer');
            }}
            className={`group px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg cursor-pointer
                     focus:outline-none focus:ring-4 focus:ring-[rgb(251,108,133)]/30
                     flex items-center gap-2 sm:gap-3 justify-center transition-all duration-300 w-full sm:w-auto
                     hover:transform hover:scale-105 hover:-translate-y-1
                     ${selectedRole === 'designer' 
                       ? 'bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] text-white shadow-xl shadow-pink-300/60 hover:shadow-2xl hover:shadow-pink-300/70' 
                       : 'text-gray-800 border border-gray-300 hover:border-pink-300 hover:bg-pink-50/50 hover:shadow-lg hover:shadow-pink-200/40'}`}
          >
            <Palette className={`w-4 h-4 sm:w-5 sm:h-5 ${selectedRole === 'designer' ? 'animate-pulse-soft' : ''}`} />
            Designer
          </button>
          
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); // Prevent any event bubbling
              handleRoleSelect('developer');
            }}
            className={`group px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg cursor-pointer
                     focus:outline-none focus:ring-4 focus:ring-[rgb(251,108,133)]/30
                     flex items-center gap-2 sm:gap-3 justify-center transition-all duration-300 w-full sm:w-auto
                     hover:transform hover:scale-105 hover:-translate-y-1
                     ${selectedRole === 'developer' 
                       ? 'bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] text-white shadow-xl shadow-pink-300/60 hover:shadow-2xl hover:shadow-pink-300/70' 
                       : 'text-gray-800 border border-gray-300 hover:border-pink-300 hover:bg-pink-50/50 hover:shadow-lg hover:shadow-pink-200/40'}`}
          >
            <Code className={`w-4 h-4 sm:w-5 sm:h-5 ${selectedRole === 'developer' ? 'animate-pulse-soft' : ''}`} />
            Developer
          </button>
        </div>
      </div>
      
      {/* Responsive scroll indicator */}
      <div 
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 cursor-pointer animate-fadeIn hover:translate-y-1 transition-transform duration-300"
        style={{animationDelay: '800ms', animationFillMode: 'forwards'}}
        onClick={scrollToJourney}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            scrollToJourney();
          }
        }}
      >
        <p className="text-xs sm:text-sm text-gray-500 font-light">Scroll to explore</p>
        <div className="w-6 h-10 sm:w-8 sm:h-12 border-2 border-gray-300 rounded-full flex justify-center items-start pt-2 transition-colors hover:border-pink-200">
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}