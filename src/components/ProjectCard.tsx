import { motion } from 'framer-motion';
import { ExternalLink, Github, Palette, Code, Star, Image } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  images?: string[]; // For graphic design projects with multiple images
  overview?: string; // Detailed project description for modal
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
      if (project.type === 'graphic') return <Image className="w-8 h-8" />;
      return <Palette className="w-8 h-8" />;
    }
    if (project.role === 'developer') return <Code className="w-8 h-8" />;
    return <Star className="w-8 h-8" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Store current scroll position
        window._lastScrollPosition = window.scrollY;
        
        // Prevent default hash navigation
        if (window.location.hash) {
          e.preventDefault();
        }
        
        if (onClick) onClick(project);
      }}
      className="group cursor-pointer"
    >
      <div className="gradient-card rounded-3xl overflow-hidden shadow-lg 
                    transition-all duration-500 project-card border border-gray-100">
        {/* Project Image */}
        <div className="relative h-64 bg-gradient-to-br from-[rgb(251,108,133)]/10 via-pink-50 to-white 
                       overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                       rounded-2xl flex items-center justify-center text-white shadow-lg"
            >
              {getRoleIcon()}
            </motion.div>
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-[rgb(251,108,133)]/30 rounded-full animate-pulse-soft"></div>
          <div className="absolute bottom-6 right-6 w-4 h-4 bg-[rgb(251,108,133)]/20 rounded-full animate-float"></div>
          
          <div className="absolute top-4 right-4">
            <span className="px-4 py-2 glass-nav rounded-full text-sm font-medium text-gray-700 backdrop-blur-sm">
              {project.role === 'both' ? 'Design + Dev' : 
               project.role === 'designer' ? 'Design' : 'Development'}
            </span>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-8">
          <h3 className="text-xl font-outfit font-semibold text-gray-800 mb-3 
                       group-hover:text-[rgb(251,108,133)] transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-gradient-to-r from-[rgb(251,108,133)]/10 to-[rgb(245,89,119)]/10 
                         text-gray-700 rounded-full text-sm font-medium border border-[rgb(251,108,133)]/20
                         hover:bg-[rgb(251,108,133)]/20 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group flex-1 px-6 py-3 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                         text-white rounded-xl font-medium btn-glow
                         focus:outline-none focus:ring-4 focus:ring-[rgb(251,108,133)]/30
                         flex items-center justify-center gap-2 cursor-pointer"
              >
                View Live
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            )}
            
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group px-6 py-3 btn-outline-glow rounded-xl font-medium
                         focus:outline-none focus:ring-4 focus:ring-[rgb(251,108,133)]/30
                         flex items-center justify-center gap-2 cursor-pointer"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Code
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
