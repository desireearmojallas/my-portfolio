import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  children: React.ReactNode;
  onToggle?: (isOpen: boolean) => void;
}

export default function CollapsibleSection({
  title,
  icon,
  defaultOpen = false,
  className = '',
  children,
  onToggle
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Call onToggle callback when isOpen changes
  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (onToggle) {
      onToggle(newIsOpen);
    }
  };

  return (
    <div className={`mb-12 ${className}`}>
      {/* Section Header/Toggle Button */}
      <motion.button
        onClick={handleToggle}
        className="w-full flex items-center justify-between gap-4 py-4 px-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div className="text-[rgb(251,108,133)] group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          )}
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 group-hover:text-[rgb(251,108,133)] transition-colors">
            {title}
          </h2>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-50 rounded-full p-2 group-hover:bg-[rgb(251,108,133)]/10 transition-colors"
        >
          {isOpen ? 
            <ChevronUp className="w-5 h-5 text-[rgb(251,108,133)]" /> : 
            <ChevronDown className="w-5 h-5 text-[rgb(251,108,133)]" />
          }
        </motion.div>
      </motion.button>
      
      {/* Section Content with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ 
              opacity: 1, 
              height: 'auto', 
              marginTop: 16 
            }}
            exit={{ 
              opacity: 0, 
              height: 0, 
              marginTop: 0,
              transition: { 
                opacity: { duration: 0.2 },
                height: { duration: 0.3 } 
              }
            }}
            transition={{ 
              duration: 0.4, 
              ease: "easeInOut" 
            }}
            className="overflow-hidden"
          >
            <div className="bg-white p-6 rounded-xl shadow-md">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
