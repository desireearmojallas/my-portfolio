// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Code, Sparkles, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LandingSectionProps {
  onRoleSelect: (role: 'designer' | 'developer') => void;
}

export default function LandingSection({ onRoleSelect }: LandingSectionProps) {
  // Track the selected role with local state (default to 'designer')
  const [selectedRole, setSelectedRole] = useState<'designer' | 'developer'>('designer');
  // State for font animation
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Array of font families to cycle through
  const fonts = [
    'font-outfit', // Default font
    'font-serif',  // Playfair Display
    'font-mono',   // Roboto Mono.
    'font-sans',   // Inter
    'font-cursive' // Dancing Script  
  ];

  // Font animation effect
  useEffect(() => {
    let fontInterval: ReturnType<typeof setTimeout>;
    let pauseTimeout: ReturnType<typeof setTimeout>;

    if (isAnimating) {
      fontInterval = setInterval(() => {
        setCurrentFontIndex(prevIndex => (prevIndex + 1) % fonts.length);
      }, 300); // Change font every 300ms during animation

      // Pause animation after cycling through all fonts
      pauseTimeout = setTimeout(() => {
        setIsAnimating(false);
        setCurrentFontIndex(0); // Return to default font
        
        // Resume animation after 5 seconds
        setTimeout(() => {
          setIsAnimating(true);
        }, 5000);
      }, fonts.length * 300);
    }

    return () => {
      clearInterval(fontInterval);
      clearTimeout(pauseTimeout);
    };
  }, [isAnimating, fonts.length]);

  const handleRoleSelect = (role: 'designer' | 'developer') => {
    setSelectedRole(role);
    onRoleSelect(role);
    
    // Smooth scroll to next section
    const nextSection = document.getElementById('journey');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToJourney = () => {
    const journeySection = document.getElementById('journey');
    if (journeySection) {
      journeySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gradient-hero px-6 relative overflow-hidden">
      {/* Floating decorative elements remain unchanged */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-20 h-20 rounded-full bg-gradient-to-r from-pink-200 to-pink-300 opacity-30 animate-float"
        />
        <motion.div
          animate={{ 
            x: [0, -30, 0],
            y: [0, 50, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-32 right-20 w-16 h-16 rounded-full bg-gradient-to-r from-pink-300 to-pink-400 opacity-20 animate-float"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-pink-200 to-white opacity-20"
        />
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Sparkle icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <Sparkles className="w-12 h-12 mx-auto text-[rgb(251,108,133)] animate-pulse-soft" />
        </motion.div>

        {/* Main heading with typewriter effect and font animation */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-outfit font-bold text-gray-800 mb-6 animate-fade-in"
        >
          Hi, I'm <motion.span 
            className={`bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] bg-clip-text text-transparent inline-flex ${isAnimating ? 'animate-pulse-soft' : ''} ${fonts[currentFontIndex]}`}
            animate={{ 
              scale: isAnimating ? [1, 1.05, 1] : 1
            }}
            transition={{ 
              duration: 0.3, 
              repeat: isAnimating ? 3 : 0
            }}
          >
            Des<span className="typewriter"></span>
          </motion.span>
        </motion.h1>
        
        {/* Subtitle with enhanced styling */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-600 mb-12 font-light animate-slide-up"
        >
          Designer. Developer. <span className="font-medium text-[rgb(251,108,133)]">Problem Solver</span>.
        </motion.p>
        
        {/* Role selection buttons with dynamic styling based on selection */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
                  <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleRoleSelect('designer')}
          className={`group px-8 py-4 rounded-full font-medium text-lg cursor-pointer
                   focus:outline-none focus:ring-4 focus:ring-[rgb(251,108,133)]/30
                   flex items-center gap-3 justify-center transition-all duration-300
                   ${selectedRole === 'designer' 
                     ? 'bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] text-white btn-glow' 
                     : 'btn-outline-glow text-gray-800'}`}
        >
          <Palette className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Designer
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleRoleSelect('developer')}
          className={`group px-8 py-4 rounded-full font-medium text-lg cursor-pointer
                   focus:outline-none focus:ring-4 focus:ring-[rgb(251,108,133)]/30
                   flex items-center gap-3 justify-center transition-all duration-300
                   ${selectedRole === 'developer' 
                     ? 'bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] text-white btn-glow' 
                     : 'btn-outline-glow text-gray-800'}`}
        >
          <Code className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Developer
        </motion.button>
        </motion.div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToJourney}
      >
        <p className="text-sm text-gray-500 font-light">Scroll to explore</p>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-12 border-2 border-gray-300 rounded-full flex justify-center items-start pt-2"
        >
          <ChevronDown className="w-4 h-4 text-gray-400 animate-bounce-gentle" />
        </motion.div>
      </motion.div>
    </section>
  );
}
