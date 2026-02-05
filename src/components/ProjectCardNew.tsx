import { motion } from 'framer-motion';
import { Github, Palette, Code, Star, Image, ArrowUpRight, Play } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  images?: string[]; // For graphic design projects with multiple images
  link?: string;
  github?: string;
  role: 'designer' | 'developer' | 'both';
  type?: 'uiux' | 'graphic' | 'development'; // Project type for different layouts
  category?: string; // For filtering and categorization
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick?: (project: Project) => void;
}

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const getRoleIcon = () => {
    if (project.role === 'designer') {
      if (project.type === 'graphic') return <Image className="w-6 h-6" />;
      return <Palette className="w-6 h-6" />;
    }
    if (project.role === 'developer') return <Code className="w-6 h-6" />;
    return <Star className="w-6 h-6" />;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Store current scroll position
    window._lastScrollPosition = window.scrollY;
    
    if (onClick) onClick(project);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      viewport={{ once: true }}
      className="group h-full"
    >
      <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50
                    shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden
                    hover:border-[rgb(251,108,133)]/30 hover:-translate-y-2">
        
        {/* Glass reflection effect - Apple style */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

        {/* Project Visual Area */}
        <div className="relative h-64 bg-gradient-to-br from-gray-50 via-pink-50/30 to-purple-50/20 
                       overflow-hidden rounded-t-3xl">
          
          {/* Main Icon */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0.8 }}
            whileHover={{ scale: 1.1, y: -5 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                     w-16 h-16 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                     rounded-2xl flex items-center justify-center text-white shadow-lg z-10"
          >
            {getRoleIcon()}
          </motion.div>
          
          {/* Floating Orbs - Apple-style ambient design */}
          <motion.div 
            animate={{ 
              y: [-20, 20, -20],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-8 left-8 w-6 h-6 bg-[rgb(251,108,133)]/20 rounded-full blur-sm"
          ></motion.div>
          
          <motion.div 
            animate={{ 
              y: [20, -15, 20],
              x: [-5, 5, -5],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-8 right-12 w-8 h-8 bg-purple-300/20 rounded-full blur-sm"
          ></motion.div>

          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute top-16 right-8 w-4 h-4 bg-pink-200/30 rounded-full blur-sm"
          ></motion.div>
          
          {/* Role Badge */}
          <div className="absolute top-6 right-6">
            <div className="px-4 py-2 bg-white/60 backdrop-blur-md rounded-full text-sm font-medium 
                          text-gray-700 border border-white/30 shadow-sm">
              {project.role === 'both' ? 'Design + Dev' : 
               project.role === 'designer' ? 'Design' : 'Development'}
            </div>
          </div>

          {/* Interactive overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent 
                     flex items-center justify-center cursor-pointer"
            onClick={handleCardClick}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full 
                       flex items-center justify-center shadow-lg"
            >
              <Play className="w-5 h-5 text-[rgb(251,108,133)] ml-1" />
            </motion.div>
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="p-8 relative">
          <motion.h3 
            className="text-xl font-outfit font-semibold text-gray-900 mb-3 leading-tight
                     group-hover:text-[rgb(251,108,133)] transition-colors duration-300"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            {project.title}
          </motion.h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed text-sm line-clamp-3">
            {project.description}
          </p>

          {/* Tags - More refined Apple style */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.slice(0, 4).map((tag, tagIndex) => (
              <motion.span 
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: tagIndex * 0.05 }}
                className="px-3 py-1.5 bg-gray-100/80 backdrop-blur-sm text-gray-700 
                         rounded-full text-xs font-medium border border-gray-200/50
                         hover:bg-[rgb(251,108,133)]/10 hover:border-[rgb(251,108,133)]/30 
                         hover:text-[rgb(251,108,133)] transition-all duration-300"
              >
                {tag}
              </motion.span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-3 py-1.5 bg-gray-100/80 text-gray-500 rounded-full text-xs font-medium">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Action Buttons - Apple-inspired design */}
          <div className="flex gap-3">
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="group flex-1 px-6 py-3 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                         text-white rounded-2xl font-medium text-sm
                         shadow-lg hover:shadow-xl hover:shadow-pink-500/25
                         focus:outline-none focus:ring-4 focus:ring-[rgb(251,108,133)]/30
                         flex items-center justify-center gap-2 transition-all duration-300
                         relative overflow-hidden"
              >
                <span className="relative z-10">View Live</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 
                                       transition-transform duration-300 relative z-10" />
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </motion.a>
            )}
            
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="group px-6 py-3 bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 
                         rounded-2xl font-medium text-sm border border-gray-200/50
                         hover:border-gray-300/50 transition-all duration-300
                         focus:outline-none focus:ring-4 focus:ring-gray-200/50
                         flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Code</span>
              </motion.a>
            )}
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r 
                       from-[rgb(251,108,133)] to-[rgb(245,89,119)] opacity-0 
                       group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </motion.div>
  );
}