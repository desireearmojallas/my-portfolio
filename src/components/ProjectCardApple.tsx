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

// Category-based styling
const getCategoryStyles = (category?: string) => {
  switch(category) {
    case 'Mobile Applications':
      return {
        gradient: 'from-purple-500 to-pink-500',
        bgLight: 'bg-purple-50',
        textColor: 'text-purple-700',
        borderColor: 'border-purple-200',
        icon: <Smartphone className="w-5 h-5" />,
        badgeBg: 'bg-gradient-to-r from-purple-500 to-pink-500'
      };
    case 'Web Development':
      return {
        gradient: 'from-blue-500 to-cyan-500',
        bgLight: 'bg-blue-50',
        textColor: 'text-blue-700',
        borderColor: 'border-blue-200',
        icon: <Globe className="w-5 h-5" />,
        badgeBg: 'bg-gradient-to-r from-blue-500 to-cyan-500'
      };
    case 'Web Applications':
      return {
        gradient: 'from-emerald-500 to-teal-500',
        bgLight: 'bg-emerald-50',
        textColor: 'text-emerald-700',
        borderColor: 'border-emerald-200',
        icon: <Layers className="w-5 h-5" />,
        badgeBg: 'bg-gradient-to-r from-emerald-500 to-teal-500'
      };
    case 'Full Stack':
      return {
        gradient: 'from-orange-500 to-red-500',
        bgLight: 'bg-orange-50',
        textColor: 'text-orange-700',
        borderColor: 'border-orange-200',
        icon: <Database className="w-5 h-5" />,
        badgeBg: 'bg-gradient-to-r from-orange-500 to-red-500'
      };
    default:
      return {
        gradient: 'from-[rgb(251,108,133)] to-[rgb(245,89,119)]',
        bgLight: 'bg-pink-50',
        textColor: 'text-pink-700',
        borderColor: 'border-pink-200',
        icon: <Code className="w-5 h-5" />,
        badgeBg: 'bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)]'
      };
  }
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
          className="group relative w-full h-[600px] bg-white rounded-[32px] border border-gray-200/60
                   shadow-md hover:shadow-2xl hover:shadow-pink-500/10 transform-gpu transition-transform transition-shadow duration-500 ease-out
                   hover:scale-[1.01] overflow-hidden cursor-pointer"
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
        className={`group relative w-full ${getCardHeight()} bg-white rounded-3xl border-2 ${categoryStyles.borderColor}
             shadow-lg hover:shadow-2xl transform-gpu transition-all duration-300 ease-out
             overflow-hidden cursor-pointer hover:scale-[1.015] hover:z-20`}
        onClick={handleCardClick}
      >
        {/* Category Ribbon - Prominent at top */}
        <div className={`absolute top-0 left-0 right-0 h-2 ${categoryStyles.badgeBg} z-20`} />
        
        {/* Category Badge with Icon */}
        <div className="absolute top-6 right-6 z-20">
          <div className={`${categoryStyles.badgeBg} text-white px-4 py-2 rounded-full shadow-lg
                         flex items-center gap-2 text-xs font-bold uppercase tracking-wider backdrop-blur-sm`}>
            {categoryStyles.icon}
            <span className="hidden sm:inline">{project.category}</span>
          </div>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-6 left-6 z-20">
            <div className="bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-full shadow-lg
                         flex items-center gap-1.5 text-xs font-bold uppercase">
              <Star className="w-3 h-3 fill-current" />
              <span>Featured</span>
            </div>
          </div>
        )}
        
        {/* Gradient background overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br from-white via-${categoryStyles.bgLight}/30 to-white`} />
        
        {/* Content container */}
        <div className="relative z-10 h-full flex flex-col p-6 sm:p-7 lg:p-8 gap-4 sm:gap-5">
          {/* Thumbnail with overlay */}
          <div className={`relative w-full ${getThumbnailHeight()} rounded-2xl overflow-hidden border-2 ${categoryStyles.borderColor} shadow-md bg-gray-50 mt-8`}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Gradient overlay matching category */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none`} />
            
            {/* Floating Tech Stack Pills on Image */}
            {project.tags && project.tags.length > 0 && (
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-800 rounded-full text-xs font-semibold shadow-lg"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-600 rounded-full text-xs font-semibold shadow-lg">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Project Info Section */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Title with gradient underline */}
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-outfit font-bold text-gray-900 leading-tight 
                           group-hover:bg-gradient-to-r group-hover:from-[rgb(251,108,133)] group-hover:to-[rgb(245,89,119)] 
                           group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {project.title}
              </h3>
              <div className={`h-1 w-16 ${categoryStyles.badgeBg} rounded-full opacity-0 group-hover:opacity-100 group-hover:w-24 transition-all duration-500`} />
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3">
              {project.description}
            </p>

            {/* Outcomes/Achievement highlight with icon */}
            {project.achievements && project.achievements[0] && (
              <div className={`flex items-start gap-3 p-4 ${categoryStyles.bgLight} ${categoryStyles.borderColor} border-l-4 rounded-lg`}>
                <Zap className={`w-5 h-5 ${categoryStyles.textColor} flex-shrink-0 mt-0.5`} />
                <span className="text-sm text-gray-700 font-medium leading-snug">{project.achievements[0]}</span>
              </div>
            )}
          </div>

          {/* Action buttons with category colors */}
          <div className="flex gap-3 pt-4 border-t-2 border-gray-100">
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex-1 ${categoryStyles.badgeBg} text-white rounded-xl font-semibold text-sm sm:text-base
                         px-4 sm:px-6 py-3 shadow-md hover:shadow-xl transition-all duration-300
                         flex items-center justify-center gap-2`}
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
                className="px-4 sm:px-5 py-3 bg-gray-900 text-white rounded-xl font-semibold text-sm
                         hover:bg-gray-800 flex items-center gap-2 transition-all shadow-md hover:shadow-xl"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">Code</span>
              </motion.a>
            )}
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className={`absolute bottom-0 right-0 w-32 h-32 ${categoryStyles.badgeBg} opacity-5 rounded-tl-full blur-2xl pointer-events-none`} />
      </motion.div>
    </motion.div>
  );
}