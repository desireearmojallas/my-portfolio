import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Grid, 
  Filter, 
  Sparkles, 
  Mail, 
  FileText
} from 'lucide-react';
import { type Project } from './ProjectCardNew';
import ProjectDetailModal from './ProjectDetailModal';
import GraphicMasonryGallery from './GraphicMasonryGallery';
import UIUXProjectsGallery from './UIUXProjectsGallery';
import DeveloperProjectCard from './DeveloperProjectCard';
import TechStackSection from './TechStackSection';
import { useAssets, getAssetUrl } from '../Assets';

interface ProjectsCarouselProps {
  role: 'designer' | 'developer';
}

// Enhanced projects data with more sophisticated descriptions
const sampleProjects: Project[] = [
  {
    id: "4",
    title: "React Task Manager",
    description: "Full-stack task management application with real-time updates and team collaboration.",
    tags: ["React", "TypeScript", "Node.js", "MongoDB"],
    image: "https://placehold.co/600x800/f8f9fa/6c757d?text=React+Task+Manager",
    link: "#",
    github: "https://github.com/desireearmojallas/task-manager",
    role: "developer",
    type: "development",
    category: "Web Development",
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Express"],
  },
  {
    id: "5",
    title: "Portfolio Website",
    description: "Responsive portfolio website built with modern web technologies and smooth animations.",
    tags: ["React", "Tailwind", "Framer Motion", "Vite"],
    image: "https://placehold.co/600x800/f8f9fa/6c757d?text=Portfolio+Website",
    link: "#",
    github: "https://github.com/desireearmojallas/portfolio",
    role: "developer",
    type: "development",
    category: "Web Development",
    techStack: ["React", "TypeScript", "Tailwind", "Framer Motion", "Vite"],
  },
  {
    id: "6",
    title: "AI Chat Application",
    description: "Real-time chat application with AI integration and beautiful user interface.",
    tags: ["Next.js", "Socket.io", "AI/ML", "PostgreSQL"],
    image: "https://placehold.co/600x800/f8f9fa/6c757d?text=AI+Chat+App",
    link: "#",
    github: "https://github.com/desireearmojallas/ai-chat",
    role: "developer",
    type: "development",
    category: "Web Development",
    techStack: ["Next.js", "Socket.io", "PostgreSQL", "Node.js", "OpenAI"],
  },
  {
    id: "7",
    title: "Social Media Platform",
    description: "Modern social platform with real-time messaging and content sharing capabilities.",
    tags: ["React Native", "Firebase", "Node.js", "Socket.io"],
    image: "https://placehold.co/600x800/f8f9fa/6c757d?text=Social+Platform",
    link: "#",
    github: "https://github.com/desireearmojallas/social-platform",
    role: "developer",
    type: "development",
    category: "Mobile Development",
    techStack: ["React Native", "Firebase", "Node.js", "Socket.io", "Redux"],
  },
  {
    id: "9",
    title: "Coffee Shop Branding",
    description: "Complete brand identity including logo design, packaging, and marketing materials.",
    tags: ["Branding", "Package Design", "Illustrator", "Photoshop"],
    image: "https://placehold.co/600x800/8B4513/FFFFFF?text=Coffee+Branding",
    link: "#",
    role: "designer",
    type: "graphic",
    category: "Branding",
  },
  {
    id: "10",
    title: "E-commerce Platform",
    description: "Full-featured online store with payment integration and admin dashboard.",
    tags: ["React", "Stripe", "Node.js", "PostgreSQL"],
    image: "https://placehold.co/600x800/20B2AA/FFFFFF?text=E-commerce",
    link: "#",
    github: "https://github.com/desireearmojallas/ecommerce-platform",
    role: "developer",
    type: "development",
    category: "Web Development",
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
  },
  {
    id: "13",
    title: "Learning Platform",
    description: "Comprehensive e-learning platform with course management, video streaming, progress tracking, and real-time notifications. Features include live instructor sessions, interactive quizzes, and student performance analytics.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS"],
    image: "https://placehold.co/600x800/4F46E5/FFFFFF?text=Learning+Platform",
    link: "#",
    github: "https://github.com/desireearmojallas/learning-platform",
    role: "developer",
    type: "development",
    category: "Full Stack",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS"],
  },
  {
    id: "14",
    title: "Real-time Analytics Dashboard",
    description: "Enterprise analytics platform with live data visualization, WebSocket connections for real-time updates, and advanced filtering. Includes custom report generation, data export capabilities, and team collaboration features.",
    tags: ["React", "GraphQL", "Node.js", "MongoDB", "Socket.io", "D3.js"],
    image: "https://placehold.co/600x800/06B6D4/FFFFFF?text=Analytics+Dashboard",
    link: "#",
    github: "https://github.com/desireearmojallas/analytics-dashboard",
    role: "developer",
    type: "development",
    category: "Full Stack",
    techStack: ["React", "GraphQL", "Node.js", "MongoDB", "Socket.io"],
  },
  {
    id: "15",
    title: "Mobile Collaboration App",
    description: "Cross-platform mobile app for team collaboration with real-time chat, file sharing, task management, and offline-first architecture. Supports end-to-end encryption, presence indicators, and intelligent push notifications.",
    tags: ["React Native", "Firebase", "Node.js", "Express", "Redux"],
    image: "https://placehold.co/600x800/EC4899/FFFFFF?text=Collaboration+App",
    link: "#",
    github: "https://github.com/desireearmojallas/collab-app",
    role: "developer",
    type: "development",
    category: "Full Stack",
    techStack: ["React Native", "Firebase", "Node.js", "Express", "Redux"],
  }
];

export default function ProjectsCarousel({ role }: ProjectsCarouselProps) {
  const { assets, loadingState } = useAssets();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'featured' | 'all'>(
    role === 'designer' ? 'all' : 'featured'
  );
  const uiuxProjects = sampleProjects.filter(project => project.type === 'uiux');

  useEffect(() => {
    setActiveView(role === 'designer' ? 'all' : 'featured');
  }, [role]);

  // Filter projects by role and category, and ensure valid project data
  const filteredProjects = sampleProjects.filter(project => {
    // First check if project has required fields
    const hasValidData = project.title && project.image && project.description && project.tags && project.tags.length > 0;
    if (!hasValidData) return false;
    
    // Then check role match
    const roleMatch = project.role === role || project.role === "both";
    if (activeCategory && roleMatch) {
      return project.category === activeCategory;
    }
    return roleMatch;
  });

  // Get unique categories for the current role
  const categories = [...new Set(
    sampleProjects
      .filter(p => p.role === role || p.role === "both")
      .map(p => p.category)
      .filter(Boolean)
  )] as string[];

  const handleProjectClick = (project: Project) => {
    window._lastScrollPosition = window.scrollY;
    setSelectedProject(project);
  };

  const handleCloseModal = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
    
    if (window._lastScrollPosition !== undefined) {
      setTimeout(() => {
        window.scrollTo(0, window._lastScrollPosition || 0);
      }, 10);
    }
  };

  return (
    <section className="section-padding bg-gradient-to-br from-white via-pink-50/30 to-purple-50/20 relative overflow-visible">
      {/* Subtle background elements matching your theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-32 w-80 h-80 bg-gradient-to-r from-pink-100/30 to-rose-100/30 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-32 left-32 w-96 h-96 bg-gradient-to-r from-purple-100/20 to-pink-100/20 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        {/* Hero Section - Apple-inspired */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-16 h-16 mx-auto mb-8 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                     rounded-2xl flex items-center justify-center shadow-lg animate-float"
          >
            <Grid className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-outfit font-light text-gray-800 mb-8 leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            {role === 'designer' ? (
              <>
                Crafted with{' '}
                <span className="bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] bg-clip-text text-transparent font-medium">
                  creative intention
                </span>
              </>
            ) : (
              <>
                Built with{' '}
                <span className="bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] bg-clip-text text-transparent font-medium">
                  technical precision
                </span>
              </>
            )}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              {role === 'designer' 
                ? "A curated collection of design projects that solve real problems through thoughtful visual solutions and user-centered thinking."
                : "A showcase of development projects built with modern technologies, clean architecture, and attention to performance and usability."
              }
            </p>
          </motion.div>

          {/* View Toggle - Apple-inspired segmented control */}
          {role === 'developer' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="mt-12 inline-flex bg-gray-100/80 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/50"
            >
              <button
                onClick={() => setActiveView('featured')}
                className={`px-6 py-3 rounded-xl font-outfit font-medium text-sm transition-all duration-300 ${
                  activeView === 'featured'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Featured Work
              </button>
              <button
                onClick={() => setActiveView('all')}
                className={`px-6 py-3 rounded-xl font-outfit font-medium text-sm transition-all duration-300 ${
                  activeView === 'all'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                All Projects
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Category Filters - Refined Apple style */}
        {role === 'developer' && activeView === 'all' && categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex flex-wrap justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(null)}
                className={`px-6 py-3 rounded-full font-outfit font-medium text-sm transition-all duration-300 ${
                  activeCategory === null 
                    ? 'bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] text-white shadow-lg' 
                    : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border border-gray-200/50'
                }`}
              >
                All Projects
              </motion.button>
              
              {categories.map(category => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full font-outfit font-medium text-sm transition-all duration-300 ${
                    activeCategory === category 
                      ? 'bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] text-white shadow-lg' 
                      : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border border-gray-200/50'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Filter result indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-center"
            >
              <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200/50">
                <Filter className="w-4 h-4 text-[rgb(251,108,133)]" />
                <span className="text-sm text-gray-600 font-medium">
                  {filteredProjects.length} {activeCategory ? activeCategory.toLowerCase() : 'total'} projects
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Projects Display Section - Role-Based Layout */}
        {role === 'developer' && (activeView === 'all' || activeView === 'featured') && filteredProjects.length > 0 && (
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="space-y-8">
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-outfit font-semibold text-gray-800 mb-4">
                  {activeView === 'featured' ? 'Featured Projects' : 'All Projects'}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  A showcase of development projects built with modern technologies, clean architecture, and attention to performance and usability.
                </p>
              </div>

              {/* Developer Cards Grid */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
              >
                {filteredProjects.map((project, index) => (
                  <DeveloperProjectCard 
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={handleProjectClick}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Special Designer Galleries - Only when 'all' view is selected */}
        {role === "designer" && activeView === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            {/* Section Header with improved styling */}
            <div className="text-center mb-16 px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-block mb-6"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                              rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-outfit font-bold text-gray-800 mb-4"
              >
                Graphic Design Portfolio
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Explore my complete graphic design and visual identity work
              </motion.p>
            </div>
            
            {/* Masonry Gallery with wrapper styling */}
            <div className="relative">
              {/* Decorative background elements */}
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-pink-50/40 to-transparent pointer-events-none"></div>
              <GraphicMasonryGallery className="" />
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-pink-50/20 to-transparent pointer-events-none"></div>
            </div>
            {uiuxProjects.length > 0 && (
              <UIUXProjectsGallery 
                projects={sampleProjects} 
                defaultOpen={true} 
                className="mb-16" 
              />
            )}
          </motion.div>
        )}

        <TechStackSection role={role} />

        {/* Enhanced Call to Action Footer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="text-center relative"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-r from-pink-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-r from-rose-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 gradient-card border border-pink-100/50 rounded-3xl p-12 md:p-16 max-w-5xl mx-auto 
                        bg-gradient-to-br from-white/95 via-pink-50/30 to-purple-50/30 shadow-2xl backdrop-blur-sm">
            
            {/* Icon with enhanced animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                       rounded-3xl flex items-center justify-center shadow-xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Sparkles className="w-10 h-10 text-white relative z-10" />
            </motion.div>

            {/* Enhanced heading with better typography */}
            <motion.h2 
              className="text-4xl md:text-6xl lg:text-7xl font-outfit font-light text-gray-800 mb-6 leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Ready to start your{' '}
              <span className="bg-gradient-to-r from-[rgb(251,108,133)] via-[rgb(245,89,119)] to-[rgb(236,72,153)] bg-clip-text text-transparent font-medium relative">
                next project?
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: true }}
                />
              </span>
            </motion.h2>
            
            {/* Enhanced description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto mb-12 space-y-4"
            >
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                Let's transform your ideas into stunning designs and powerful applications.
              </p>
              <p className="text-lg text-gray-500 leading-relaxed">
                Whether you need a new brand identity, a digital experience, or a cutting-edge application, 
                I'm here to help bring your vision to life with creativity and technical excellence.
              </p>
            </motion.div>

            {/* Enhanced action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                         text-white px-10 py-5 rounded-2xl font-outfit font-semibold text-lg 
                         hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-300 
                         focus:outline-none focus:ring-4 focus:ring-pink-500/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">💬 Let's Discuss Your Project</span>
              </motion.button>

              {loadingState?.loading ? (
                <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm text-gray-700 
                              px-10 py-5 rounded-2xl font-outfit font-semibold text-lg border border-gray-200/50 opacity-70">
                  <div className="w-5 h-5 border-2 border-[#fb6c85] border-t-transparent rounded-full animate-spin"></div>
                  Loading resume... {loadingState.progress}%
                </div>
              ) : (
                <motion.a
                  href={getAssetUrl(assets, 'resume/Armojallas, Desiree P. (2025) Resume.docx.pdf') || '#'}
                  download="Armojallas, Desiree P. (2025) Resume.docx.pdf"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm text-gray-700 
                           px-10 py-5 rounded-2xl font-outfit font-semibold text-lg hover:bg-white/90 
                           border border-gray-200/50 hover:border-gray-300/50 transition-all duration-300
                           focus:outline-none focus:ring-4 focus:ring-gray-200/50 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FileText className="w-6 h-6 group-hover:scale-110 transition-transform relative z-10" />
                  <span className="relative z-10">Download Resume</span>
                </motion.a>
              )}
            </motion.div>

            {/* Additional contact methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-gray-200/50"
            >
              <p className="text-sm text-gray-500 mb-4 font-medium">Or connect with me on</p>
              <div className="flex justify-center gap-4">
                <motion.a
                  href="mailto:desireearamojallas@gmail.com"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl flex items-center justify-center
                           hover:from-[rgb(251,108,133)] hover:to-[rgb(245,89,119)] hover:text-white
                           transition-all duration-300 group"
                >
                  <Mail className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/desireearmojallas"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center
                           hover:from-blue-600 hover:to-indigo-600 hover:text-white
                           transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://github.com/desireearmojallas"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-gradient-to-r from-gray-100 to-slate-100 rounded-xl flex items-center justify-center
                           hover:from-gray-800 hover:to-slate-800 hover:text-white
                           transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>

            {/* Small footer text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              viewport={{ once: true }}
              className="mt-8 text-xs text-gray-400 font-medium"
            >
              © 2025 Desiree Armojallas. Made with ❤️ and lots of ☕
            </motion.div>
          </div>
        </motion.div>

        {/* Project Detail Modal */}
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={handleCloseModal} 
        />
      </div>
    </section>
  );
}