import { motion } from 'framer-motion';
import { Github, Palette, Code, Star, Image, ArrowUpRight, Play, Eye, Award, Sparkles } from 'lucide-react';
import { useState } from 'react';

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
  year?: string;
  client?: string;
  duration?: string;
  achievements?: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

interface ProjectCardPremiumProps {
  project: Project;
  index: number;
  onClick?: (project: Project) => void;
  layout?: 'grid' | 'featured';
}

export default function ProjectCardPremium({ project, index, onClick, layout = 'grid' }: ProjectCardPremiumProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getRoleIcon = () => {
    if (project.role === 'designer') {
      if (project.type === 'graphic') return <Image className="w-5 h-5" />;
      return <Palette className="w-5 h-5" />;
    }
    if (project.role === 'developer') return <Code className="w-5 h-5" />;
    return <Star className="w-5 h-5" />;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Store current scroll position
    window._lastScrollPosition = window.scrollY;
    
    if (onClick) onClick(project);
  };

  if (layout === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.2,
          ease: [0.25, 0.46, 0.45, 0.94] 
        }}
        viewport={{ once: true }}
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-200/50
                      shadow-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden
                      hover:border-[rgb(251,108,133)]/30 hover:-translate-y-3">
          
          {/* Premium glass reflection */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-10"
          />

          {/* Hero Image Section */}
          <div className="relative h-80 bg-gradient-to-br from-gray-50 via-pink-50/30 to-purple-50/20 
                        overflow-hidden rounded-t-3xl">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-8 left-8 w-32 h-32 bg-gradient-to-r from-[rgb(251,108,133)]/20 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-8 right-8 w-40 h-40 bg-gradient-to-l from-purple-300/20 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-pink-200/30 rounded-full blur-xl"></div>
            </div>

            {/* Main Project Visual */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0.8 }}
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                       w-24 h-24 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                       rounded-3xl flex items-center justify-center text-white shadow-2xl z-20
                       border-4 border-white/50"
            >
              {getRoleIcon()}
            </motion.div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ 
                y: [-10, 10, -10],
                rotate: [0, 5, 0],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-12 left-12 w-8 h-8 bg-white/60 backdrop-blur-sm rounded-2xl 
                       flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-[rgb(251,108,133)]" />
            </motion.div>

            <motion.div 
              animate={{ 
                y: [15, -10, 15],
                x: [-3, 3, -3],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute bottom-12 right-16 w-6 h-6 bg-gradient-to-r from-purple-400/60 to-pink-400/60 
                       rounded-full shadow-lg"
            />

            {/* Role Badge */}
            <div className="absolute top-6 right-6 z-30">
              <div className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-sm font-medium 
                            text-gray-700 border border-white/50 shadow-lg">
                {project.role === 'both' ? 'Design + Dev' : 
                 project.role === 'designer' ? 'Design' : 'Development'}
              </div>
            </div>

            {/* Year Badge */}
            {project.year && (
              <div className="absolute top-6 left-6 z-30">
                <div className="px-3 py-1 bg-[rgb(251,108,133)]/90 backdrop-blur-md rounded-full 
                              text-xs font-medium text-white shadow-lg">
                  {project.year}
                </div>
              </div>
            )}

            {/* Interactive Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent 
                       flex items-center justify-center cursor-pointer z-20"
              onClick={handleCardClick}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="w-16 h-16 bg-white/95 backdrop-blur-sm rounded-full 
                         flex items-center justify-center shadow-2xl border-2 border-white/50"
              >
                <Play className="w-6 h-6 text-[rgb(251,108,133)] ml-1" />
              </motion.div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="p-8 relative z-10">
            {/* Client Badge */}
            {project.client && (
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-[rgb(251,108,133)] rounded-full"></div>
                <span className="text-sm text-gray-500 font-medium">{project.client}</span>
              </div>
            )}

            <motion.h3 
              className="text-2xl font-outfit font-semibold text-gray-900 mb-4 leading-tight
                       group-hover:text-[rgb(251,108,133)] transition-colors duration-300"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              {project.title}
            </motion.h3>
            
            <p className="text-gray-600 mb-6 leading-relaxed text-base">
              {project.description}
            </p>

            {/* Achievements */}
            {project.achievements && project.achievements.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-[rgb(251,108,133)]" />
                  <span className="text-sm font-medium text-gray-700">Key Achievements</span>
                </div>
                <div className="space-y-2">
                  {project.achievements.slice(0, 2).map((achievement, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[rgb(251,108,133)] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.slice(0, 6).map((tag, tagIndex) => (
                <motion.span 
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: tagIndex * 0.03 }}
                  className="px-3 py-1.5 bg-gray-100/80 backdrop-blur-sm text-gray-700 
                           rounded-full text-xs font-medium border border-gray-200/50
                           hover:bg-[rgb(251,108,133)]/10 hover:border-[rgb(251,108,133)]/30 
                           hover:text-[rgb(251,108,133)] transition-all duration-300"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex-1 px-6 py-3 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                           text-white rounded-2xl font-medium text-sm
                           shadow-lg hover:shadow-2xl hover:shadow-pink-500/30
                           focus:outline-none focus:ring-4 focus:ring-[rgb(251,108,133)]/30
                           flex items-center justify-center gap-2 transition-all duration-300
                           relative overflow-hidden"
                >
                  <span className="relative z-10">View Project</span>
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
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-6 py-3 bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 
                           rounded-2xl font-medium text-sm border border-gray-200/50
                           hover:border-gray-300/50 transition-all duration-300
                           focus:outline-none focus:ring-4 focus:ring-gray-200/50
                           flex items-center justify-center gap-2"
                >
                  <Github className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Source</span>
                </motion.a>
              )}

              <motion.button
                onClick={handleCardClick}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-white/80 hover:bg-white/90 text-gray-700 
                         rounded-2xl font-medium text-sm border border-gray-200/50
                         hover:border-[rgb(251,108,133)]/30 transition-all duration-300
                         focus:outline-none focus:ring-4 focus:ring-gray-200/50
                         flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>Details</span>
              </motion.button>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r 
                         from-[rgb(251,108,133)] to-[rgb(245,89,119)] opacity-0 
                         group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Corner decoration */}
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-2xl opacity-0 
                         group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </motion.div>
    );
  }

  // Regular grid layout
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-200/50
                    shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden
                    hover:border-[rgb(251,108,133)]/30 hover:-translate-y-2">
        
        {/* Glass reflection effect */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-10"
        />

        {/* Project Visual Area */}
        <div className="relative h-64 bg-gradient-to-br from-gray-50 via-pink-50/30 to-purple-50/20 
                       overflow-hidden rounded-t-3xl">
          
          {/* Main Icon */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0.8 }}
            whileHover={{ scale: 1.15, y: -8 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                     w-16 h-16 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                     rounded-2xl flex items-center justify-center text-white shadow-xl z-20
                     border-2 border-white/50"
          >
            {getRoleIcon()}
          </motion.div>
          
          {/* Floating Design Elements */}
          <motion.div 
            animate={{ 
              y: [-15, 15, -15],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-8 left-8 w-6 h-6 bg-[rgb(251,108,133)]/30 rounded-full blur-sm z-10"
          />
          
          <motion.div 
            animate={{ 
              y: [20, -12, 20],
              x: [-4, 4, -4],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1.5
            }}
            className="absolute bottom-8 right-12 w-8 h-8 bg-gradient-to-r from-purple-300/40 to-pink-300/40 
                     rounded-full blur-sm z-10"
          />

          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{ 
              duration: 3.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2.5
            }}
            className="absolute top-16 right-8 w-4 h-4 bg-pink-200/40 rounded-full blur-sm z-10"
          />
          
          {/* Role Badge */}
          <div className="absolute top-6 right-6 z-30">
            <div className="px-3 py-1.5 bg-white/70 backdrop-blur-md rounded-full text-xs font-medium 
                          text-gray-700 border border-white/40 shadow-lg">
              {project.role === 'both' ? 'Design + Dev' : 
               project.role === 'designer' ? 'Design' : 'Development'}
            </div>
          </div>

          {/* Interactive overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent 
                     flex items-center justify-center cursor-pointer z-20"
            onClick={handleCardClick}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full 
                       flex items-center justify-center shadow-xl border border-white/50"
            >
              <Play className="w-5 h-5 text-[rgb(251,108,133)] ml-1" />
            </motion.div>
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="p-6 relative z-10">
          <motion.h3 
            className="text-lg font-outfit font-semibold text-gray-900 mb-3 leading-tight
                     group-hover:text-[rgb(251,108,133)] transition-colors duration-300"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            {project.title}
          </motion.h3>
          
          <p className="text-gray-600 mb-5 leading-relaxed text-sm line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 4).map((tag, tagIndex) => (
              <motion.span 
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: tagIndex * 0.05 }}
                className="px-2.5 py-1 bg-gray-100/80 backdrop-blur-sm text-gray-700 
                         rounded-full text-xs font-medium border border-gray-200/50
                         hover:bg-[rgb(251,108,133)]/10 hover:border-[rgb(251,108,133)]/30 
                         hover:text-[rgb(251,108,133)] transition-all duration-300"
              >
                {tag}
              </motion.span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2.5 py-1 bg-gray-100/80 text-gray-500 rounded-full text-xs font-medium">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="group flex-1 px-4 py-2.5 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                         text-white rounded-xl font-medium text-xs
                         shadow-lg hover:shadow-xl hover:shadow-pink-500/25
                         focus:outline-none focus:ring-4 focus:ring-[rgb(251,108,133)]/30
                         flex items-center justify-center gap-2 transition-all duration-300
                         relative overflow-hidden"
              >
                <span className="relative z-10">View</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 
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
                className="group px-4 py-2.5 bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 
                         rounded-xl font-medium text-xs border border-gray-200/50
                         hover:border-gray-300/50 transition-all duration-300
                         focus:outline-none focus:ring-4 focus:ring-gray-200/50
                         flex items-center justify-center gap-1.5"
              >
                <Github className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                <span>Code</span>
              </motion.a>
            )}
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r 
                       from-[rgb(251,108,133)] to-[rgb(245,89,119)] opacity-0 
                       group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Corner accent */}
        <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-white/40 rounded-tr-xl opacity-0 
                       group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </motion.div>
  );
}