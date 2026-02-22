import { motion, useReducedMotion } from 'framer-motion';
import { Github, Palette, Code, Star, Image, ArrowUpRight, Award, Smartphone, Globe, Layers, Database, Zap } from 'lucide-react';
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

// Category-based styling - simplified to theme colors only
const getCategoryStyles = (category?: string) => {
  // Mobile apps get special hero treatment with stronger pink
  if (category === 'Mobile Applications') {
    return {
      gradient: 'from-[rgb(251,108,133)] to-[rgb(245,89,119)]',
      bgLight: 'bg-pink-50',
      textColor: 'text-[rgb(251,108,133)]',
      borderColor: 'border-pink-200',
      icon: <Smartphone className="w-5 h-5" />,
      badgeBg: 'bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)]',
      label: 'Mobile App'
    };
  }
  
  // All other categories use subtle rose/gray theme
  return {
    gradient: 'from-rose-400 to-pink-400',
    bgLight: 'bg-rose-50/50',
    textColor: 'text-rose-600',
    borderColor: 'border-gray-200',
    icon: category?.includes('Web Development') ? <Globe className="w-5 h-5" /> : 
          category?.includes('Web Applications') ? <Layers className="w-5 h-5" /> : 
          <Code className="w-5 h-5" />,
    badgeBg: 'bg-gradient-to-r from-rose-400 to-pink-400',
    label: category || 'Project'
  };
};

export default function ProjectCardApple({ project, index, onClick, layout = 'masonry' }: ProjectCardAppleProps) {
  const shouldReduceMotion = useReducedMotion();
  const categoryStyles = getCategoryStyles(project.category);

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
    if (project.size === 'large') return 'min-h-[420px] sm:min-h-[460px] lg:min-h-[500px] h-auto';
    if (project.size === 'medium') return 'min-h-[390px] sm:min-h-[430px] lg:min-h-[460px] h-auto';
    return 'min-h-[360px] sm:min-h-[400px] lg:min-h-[430px] h-auto';
  };

  const getThumbnailHeight = () => {
    if (layout === 'hero') return 'h-[240px] md:h-[280px] lg:h-[320px]';
    if (project.size === 'large') return 'aspect-[16/10] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]';
    if (project.size === 'medium') return 'aspect-[4/3] min-h-[200px] sm:min-h-[230px] lg:min-h-[260px]';
    return 'aspect-[4/3] min-h-[190px] sm:min-h-[220px] lg:min-h-[240px]';
  };

  // Hero layout for showcase projects (Mobile Apps)
  if (layout === 'hero') {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={cardVariants}
        viewport={{ once: true, margin: "-50px" }}
        style={{ perspective: 1000 }}
        className="w-full mb-8 sm:mb-12"
      >
        <motion.div
          className="group relative w-full min-h-[500px] sm:min-h-[560px] bg-gradient-to-br from-pink-50 via-rose-50 to-white rounded-3xl 
                   border-2 border-pink-200 shadow-xl hover:shadow-2xl hover:shadow-pink-500/20 
                   transform-gpu transition-all duration-500 ease-out hover:scale-[1.005] overflow-hidden cursor-pointer"
          onClick={handleCardClick}
        >
          {/* Decorative animated gradient blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={shouldReduceMotion ? {} : {
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1]
              }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-[rgb(251,108,133)]/20 to-pink-200/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={shouldReduceMotion ? {} : {
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1]
              }}
              className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-rose-200/20 to-pink-100/20 rounded-full blur-3xl"
            />
          </div>

          {/* Category ribbon */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] z-20" />
          
          {/* Featured badge - prominent */}
          <div className="absolute top-6 left-6 z-20">
            <div className="bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] text-white px-4 py-2 rounded-full shadow-lg
                         flex items-center gap-2 text-xs font-bold uppercase backdrop-blur-sm">
              <Smartphone className="w-4 h-4" />
              <span>Mobile App</span>
            </div>
          </div>

          {/* Main content grid */}
          <div className="relative z-10 h-full p-8 sm:p-10 lg:p-12">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
              
              {/* Left side - Content */}
              <div className="flex flex-col justify-center space-y-6">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-gradient-to-br from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                           rounded-2xl flex items-center justify-center text-white shadow-lg"
                >
                  <Smartphone className="w-8 h-8" />
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-gray-900 leading-tight">
                    {project.title}
                  </h2>
                  <div className="h-1.5 w-20 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] rounded-full" />
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-base sm:text-lg text-gray-600 leading-relaxed"
                >
                  {project.description}
                </motion.p>

                {/* Key outcomes */}
                {project.achievements && project.achievements.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-3"
                  >
                    {project.achievements.slice(0, 3).map((achievement, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Tech stack pills */}
                {project.tags && project.tags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap gap-2"
                  >
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-white border border-pink-200 text-gray-700 rounded-full text-xs font-semibold shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                )}

                {/* CTA */}
                {project.link && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-[rgb(251,108,133)] 
                               text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </motion.a>
                  </motion.div>
                )}
              </div>

              {/* Right side - Featured Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="relative h-full min-h-[350px] sm:min-h-[400px]"
              >
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-pink-200 shadow-2xl bg-gradient-to-br from-pink-100 to-rose-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgb(251,108,133)]/10 via-transparent to-transparent pointer-events-none" />
                </div>
                
                {/* Floating device frame decoration */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-[rgb(251,108,133)] to-[rgb(245,89,119)] opacity-20 rounded-full blur-2xl" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Masonry layout for other projects
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
        className={`group relative w-full ${getCardHeight()} bg-white rounded-2xl border ${categoryStyles.borderColor}
             shadow-md hover:shadow-xl hover:shadow-rose-500/10 transform-gpu transition-all duration-300 ease-out
             overflow-hidden cursor-pointer hover:scale-[1.015] hover:z-20`}
        onClick={handleCardClick}
      >
        {/* Subtle gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br from-white via-${categoryStyles.bgLight} to-white`} />
        
        {/* Category label - subtle */}
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full shadow-sm
                       flex items-center gap-2 text-xs font-medium">
            {categoryStyles.icon}
            <span className="hidden sm:inline">{categoryStyles.label}</span>
          </div>
        </div>
        
        {/* Content container */}
        <div className="relative z-10 h-full flex flex-col p-6 sm:p-7 lg:p-8 gap-4 sm:gap-5">
          {/* Thumbnail */}
          <div className={`relative w-full ${getThumbnailHeight()} rounded-2xl overflow-hidden border ${categoryStyles.borderColor} shadow-md bg-gray-50`}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />
            
            {/* Tech stack pills on image */}
            {project.tags && project.tags.length > 0 && (
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-800 rounded-full text-xs font-semibold shadow-md"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-600 rounded-full text-xs font-semibold shadow-md">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Project Info */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Title */}
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-outfit font-bold text-gray-900 leading-tight 
                           group-hover:text-[rgb(251,108,133)] transition-colors duration-300">
                {project.title}
              </h3>
              <div className="h-1 w-16 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:w-24 transition-all duration-500" />
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3">
              {project.description}
            </p>

            {/* Achievement highlight */}
            {project.achievements && project.achievements[0] && (
              <div className="flex items-start gap-3 p-3 bg-rose-50/50 border-l-2 border-rose-300 rounded-lg">
                <Zap className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 leading-snug">{project.achievements[0]}</span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 bg-[rgb(251,108,133)] text-white rounded-xl font-semibold text-sm sm:text-base
                         px-4 sm:px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300
                         flex items-center justify-center gap-2"
              >
                <span>View Live</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            )}
            
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 sm:px-5 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm
                         hover:bg-gray-200 flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">Code</span>
              </motion.a>
            )}
          </div>
        </div>

        {/* Subtle corner accent */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-rose-100/30 to-transparent rounded-tl-full blur-xl pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}