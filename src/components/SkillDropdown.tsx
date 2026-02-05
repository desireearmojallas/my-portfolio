import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, type LucideIcon } from 'lucide-react';

interface Tool {
  name: string;
  icon?: React.ComponentType<{ className?: string }>; // Icon component for the tool
}

interface SkillDropdownProps {
  title: string;
  icon: LucideIcon;
  tools: Tool[] | string[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function SkillDropdown({ 
  title, 
  icon: Icon, 
  tools, 
  isOpen, 
  onToggle 
}: SkillDropdownProps) {
  return (
    <div className="w-full mb-4">
      {/* Skill Header - Clickable card */}
      <motion.div
        onClick={onToggle}
        className={`group p-6 gradient-card rounded-2xl border border-gray-100 
                  hover:shadow-lg transition-all duration-300 cursor-pointer
                  ${isOpen ? 'shadow-md border-[#FBD1D9]/30' : ''}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-10 h-10 bg-gradient-to-r from-[#FBD1D9] to-[rgb(245,89,119)] 
                         rounded-xl flex items-center justify-center group-hover:scale-110 
                         transition-transform ${isOpen ? 'scale-110' : ''}`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-800 font-medium text-lg">{title}</span>
          </div>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`text-gray-400 ${isOpen ? 'text-[#FBD1D9]' : ''}`}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Expandable Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => {
                  const isToolObject = typeof tool !== 'string';
                  const toolName = isToolObject ? (tool as Tool).name : tool;
                  const ToolIcon = isToolObject ? (tool as Tool).icon : undefined;
                  
                  return (
                    <motion.div
                      key={toolName}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="px-4 py-2 bg-gray-50 hover:bg-[#FBD1D9]/10 
                               text-gray-700 rounded-full text-sm font-medium
                               border border-gray-200 transition-all duration-200
                               hover:border-[#FBD1D9]/50 hover:text-[rgb(251,108,133)]
                               flex items-center gap-2 hover:shadow-sm"
                    >
                      {ToolIcon && (
                        <ToolIcon className="w-4 h-4 text-[rgb(251,108,133)]" />
                      )}
                      {toolName}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
