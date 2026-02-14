import { motion, useReducedMotion } from 'framer-motion';
import { Github, Palette, Code, Star, Image, ArrowUpRight, Award } from 'lucide-react';
import { useCallback } from 'react';

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
  type?: 'uiux' | 'graphic' | 'development';
  category?: string;
  year?: string;
  client?: string;
  duration?: string;
  achievements?: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  featured?: boolean;
  size?: 'small' | 'medium' | 'large'; // For masonry layout
}

interface ProjectCardAppleProps {
  project: Project;
  index: number;
  onClick?: (project: Project) => void;
  layout?: 'masonry' | 'featured' | 'hero';
}

// Optimized animation variants
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.98
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4
    }
  }
};

const hoverVariants = {
  rest: { 
    scale: 1, 
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.3
    }
  },
  hover: { 
    scale: 1.02, 
    y: -8,
    rotateX: 5,
    transition: {
      duration: 0.3
    }
  }
};


export default function ProjectCardApple({ project, index, onClick, layout = 'masonry' }: ProjectCardAppleProps) {
  const shouldReduceMotion = useReducedMotion();

  const getRoleIcon = useCallback(() => {
    if (project.role === 'designer') {
      if (project.type === 'graphic') return <Image className="w-4 h-4" />;
      return <Palette className="w-4 h-4" />;
    }
    if (project.role === 'developer') return <Code className="w-4 h-4" />;
    return <Star className="w-4 h-4" />;
  }, [project.role, project.type]);

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window._lastScrollPosition = window.scrollY;
    if (onClick) onClick(project);
  }, [onClick, project]);

  // Get card height based on content and size
  const getCardHeight = () => {
    if (layout === 'hero') return 'h-[620px]';
    if (layout === 'featured') return 'h-[440px]';

    // Taller cards to let thumbnails drive the visual focus
    if (project.size === 'large') return 'min-h-[480px] h-auto';
    if (project.size === 'medium') return 'min-h-[440px] h-auto';
    return 'min-h-[400px] h-auto';
  };

  const getThumbnailHeight = () => {
    if (layout === 'hero') return 'h-[240px] md:h-[280px] lg:h-[320px]';
    if (project.size === 'large') return 'aspect-[16/10] min-h-[280px] md:min-h-[320px]';
    if (project.size === 'medium') return 'aspect-[4/3] min-h-[250px] md:min-h-[280px]';
    return 'aspect-[4/3] min-h-[230px] md:min-h-[260px]';
  };

  // Hero layout for showcase projects
  if (layout === 'hero') {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={cardVariants}
        viewport={{ once: true, margin: "-50px" }}
        style={{ perspective: 1000 }}
        className="w-full"
      >
        <motion.div
          variants={hoverVariants}
          initial="rest"
          whileHover={shouldReduceMotion ? "rest" : "hover"}
          onHoverStart={() => {}}
          onHoverEnd={() => {}}
          className="group relative w-full h-[600px] bg-white rounded-[32px] border border-gray-200/60
                   shadow-lg hover:shadow-xl transition-shadow duration-500 overflow-hidden cursor-pointer"
          onClick={handleCardClick}
        >
          {/* Apple-style gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 via-white to-gray-100/50 z-10" />
          
          {/* Main content area */}
          <div className="relative z-20 h-full flex flex-col">
            {/* Floating thumbnail */}
            <div className="pointer-events-none absolute top-8 right-8 w-44 md:w-56 lg:w-64 hidden sm:block">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/60 shadow-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
              </div>
            </div>

            {/* Header section */}
            <div className="p-12 flex-1 flex flex-col justify-center">
              {/* Client badge */}
              {project.client && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="w-3 h-3 bg-[rgb(251,108,133)] rounded-full" />
                  <span className="text-sm font-medium text-gray-500 tracking-wide uppercase">
                    {project.client}
                  </span>
                </motion.div>
              )}

              {/* Project icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                         rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl"
              >
                <div className="scale-150">{getRoleIcon()}</div>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-6xl font-outfit font-light text-gray-900 mb-6 leading-[1.1]"
              >
                {project.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl"
              >
                {project.description}
              </motion.p>

              {/* Key achievement */}
              {project.achievements && project.achievements[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-start gap-3 mb-8"
                >
                  <Award className="w-5 h-5 text-[rgb(251,108,133)] mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{project.achievements[0]}</span>
                </motion.div>
              )}

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex gap-4"
              >
                {project.link && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                             text-white rounded-2xl font-medium shadow-lg hover:shadow-xl 
                             flex items-center gap-3 transition-all duration-300"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.a>
                )}
              </motion.div>
            </div>

            {/* Decorative floating gradient */}
            <motion.div
              animate={shouldReduceMotion ? {} : {
                y: [-10, 10, -10],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                // use cubic-bezier array for typed easing
                ease: [0.42, 0, 0.58, 1]
              }}
              className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-[rgb(251,108,133)]/10 to-transparent rounded-full blur-2xl"
            />
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Masonry layout for Pinterest-style grid
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={cardVariants}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.05 }}
      style={{ perspective: 1000 }}
      className="w-full"
    >
      <motion.div
        variants={hoverVariants}
        initial="rest"
        whileHover={shouldReduceMotion ? "rest" : "hover"}
        onHoverStart={() => {}}
        onHoverEnd={() => {}}
        className={`group relative w-full ${getCardHeight()} bg-white rounded-2xl border border-gray-200/60
             shadow-sm hover:shadow-xl transition-all duration-300 ease-out overflow-hidden cursor-pointer
             hover:border-[rgb(251,108,133)]/30`}
        onClick={handleCardClick}
      >
        {/* Simple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/20 to-white" />
        
        {/* Content container */}
        <div className="relative z-10 h-full flex flex-col p-6 md:p-7 gap-4 md:gap-5">
          {/* Thumbnail */}
          <div className={`relative w-full ${getThumbnailHeight()} rounded-2xl overflow-hidden border border-gray-100 mb-5 bg-gray-50`}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Header with role badge and year */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                           rounded-lg flex items-center justify-center text-white text-sm">
                {getRoleIcon()}
              </div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {project.role === 'both' ? 'Full-Stack' : project.role}
              </span>
            </div>
            {project.year && (
              <span className="text-xs text-gray-400 font-medium">{project.year}</span>
            )}
          </div>

          {/* Client info */}
          {project.client && (
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[rgb(251,108,133)] rounded-full" />
              <span className="text-xs text-gray-500 font-medium">{project.client}</span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg md:text-xl font-outfit font-semibold text-gray-900 leading-snug 
                       group-hover:text-[rgb(251,108,133)] transition-colors duration-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-600 leading-relaxed flex-1 line-clamp-3 md:line-clamp-4">
            {project.description}
          </p>

          {/* Achievement highlight */}
          {project.achievements && project.achievements[0] && (
            <div className="flex items-start gap-2 p-3 bg-gray-50/80 rounded-lg">
              <div className="w-1 h-1 bg-[rgb(251,108,133)] rounded-full mt-2 flex-shrink-0" />
              <span className="text-xs text-gray-600">{project.achievements[0]}</span>
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-gray-100/80 text-gray-600 rounded-lg text-xs font-medium
                           hover:bg-[rgb(251,108,133)]/10 hover:text-[rgb(251,108,133)] transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100/80 text-gray-500 rounded-lg text-xs">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 mt-auto pt-3 md:pt-4 border-t border-gray-100">
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-3 py-2 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                         text-white rounded-lg font-medium text-xs shadow-sm hover:shadow-md
                         flex items-center justify-center gap-2 transition-all duration-200"
              >
                <span>View</span>
                <ArrowUpRight className="w-3 h-3" />
              </motion.a>
            )}
            
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-3 py-2 bg-gray-100/80 text-gray-700 rounded-lg font-medium text-xs
                         hover:bg-gray-200/80 flex items-center gap-2 transition-colors duration-200"
              >
                <Github className="w-3 h-3" />
                <span>Code</span>
              </motion.a>
            )}
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r 
                       from-[rgb(251,108,133)] to-[rgb(245,89,119)] opacity-0 
                       group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
    </motion.div>
  );
}