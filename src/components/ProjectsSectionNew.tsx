import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Grid, 
  Filter, 
  Sparkles, 
  Mail, 
  FileText
} from 'lucide-react';
import ProjectCardNew, { type Project } from './ProjectCardNew';
import ProjectDetailModal from './ProjectDetailModal';
import GraphicDesignGallery from './GraphicDesignGallery';
import UIUXProjectsGallery from './UIUXProjectsGallery';
import { useAssets, getAssetUrl } from '../Assets';

interface ProjectsSectionProps {
  role: 'designer' | 'developer';
}

// Enhanced projects data with more sophisticated descriptions
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Mobile App",
    description: "A sleek mobile shopping experience with intuitive navigation and seamless checkout flow.",
    tags: ["Figma", "Prototyping", "User Research", "Mobile Design"],
    image: "https://placehold.co/600x800/f8f9fa/6c757d?text=UI/UX+Project",
    link: "#",
    role: "designer",
    type: "uiux",
    category: "UI/UX Design",
  },
  {
    id: "2",
    title: "Brand Identity System",
    description: "Complete brand redesign including logo, color palette, typography, and brand guidelines.",
    tags: ["Branding", "Illustrator", "Typography", "Style Guide"],
    image: "https://placehold.co/600x800/f8f9fa/6c757d?text=Brand+Identity",
    link: "#",
    role: "designer",
    type: "uiux",
    category: "UI/UX Design",
  },
  {
    id: "3",
    title: "SaaS Dashboard",
    description: "Clean, data-driven dashboard design focusing on usability and information hierarchy.",
    tags: ["Dashboard", "Data Viz", "UX Research", "Figma"],
    image: "https://placehold.co/600x800/f8f9fa/6c757d?text=SaaS+Dashboard",
    link: "#",
    role: "designer",
    type: "uiux",
    category: "UI/UX Design",
  },
  {
    id: "4",
    title: "React Task Manager",
    description: "Full-stack task management application with real-time updates and team collaboration.",
    tags: ["React", "TypeScript", "Node.js", "MongoDB"],
    image: "https://placehold.co/600x800/f8f9fa/6c757d?text=React+Task+Manager",
    link: "#",
    github: "#",
    role: "developer",
    type: "development",
    category: "Web Development",
  },
  {
    id: "5",
    title: "Portfolio Website",
    description: "Responsive portfolio website built with modern web technologies and smooth animations.",
    tags: ["React", "Tailwind", "Framer Motion", "Vite"],
    image: "https://placehold.co/600x800/f8f9fa/6c757d?text=Portfolio+Website",
    link: "#",
    github: "#",
    role: "developer",
    type: "development",
    category: "Web Development",
  },
  {
    id: "6",
    title: "AI Chat Application",
    description: "Real-time chat application with AI integration and beautiful user interface.",
    tags: ["Next.js", "Socket.io", "AI/ML", "PostgreSQL"],
    image: "https://placehold.co/600x800/f8f9fa/6c757d?text=AI+Chat+App",
    link: "#",
    github: "#",
    role: "developer",
    type: "development",
    category: "Web Development",
  }
];

export default function ProjectsSection({ role }: ProjectsSectionProps) {
  const { assets, loadingState } = useAssets();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'featured' | 'all'>('featured');

  // Filter projects by role and category
  const filteredProjects = sampleProjects.filter(project => {
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
    <section className="section-padding bg-gradient-to-br from-white via-pink-50/30 to-purple-50/20 relative overflow-hidden">
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
        </motion.div>

        {/* Category Filters - Refined Apple style */}
        {activeView === 'all' && categories.length > 0 && (
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

        {/* Projects Content */}
        {role === "designer" && activeView === 'featured' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-20"
          >
            <GraphicDesignGallery className="mb-16" defaultOpen={true} />
            <UIUXProjectsGallery 
              projects={sampleProjects} 
              defaultOpen={false} 
              className="mb-16" 
            />
          </motion.div>
        )}

        {role === "developer" && activeView === 'featured' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            {/* Featured development projects grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.slice(0, 6).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCardNew 
                    project={project} 
                    index={index}
                    onClick={handleProjectClick}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeView === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            {role === "designer" ? (
              <div className="space-y-20">
                <GraphicDesignGallery className="mb-16" defaultOpen={true} />
                <UIUXProjectsGallery 
                  projects={sampleProjects} 
                  defaultOpen={true} 
                  className="mb-16" 
                />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ProjectCardNew 
                      project={project} 
                      index={index}
                      onClick={handleProjectClick}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}



        {/* Call to Action - Apple-inspired design */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="gradient-card border border-pink-100/50 rounded-3xl p-12 md:p-16 max-w-4xl mx-auto 
                        bg-gradient-to-br from-white via-pink-50/20 to-purple-50/20 shadow-xl">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-16 h-16 mx-auto mb-8 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                       rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>

            <motion.h2 
              className="text-4xl md:text-5xl font-outfit font-light text-gray-800 mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Ready to start{' '}
              <span className="bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] bg-clip-text text-transparent font-medium">
                something amazing?
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Whether you're looking to create a new brand identity, design a digital experience, 
              or build a cutting-edge application, I'd love to help bring your vision to life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                         text-white px-8 py-4 rounded-full font-outfit font-medium text-lg 
                         hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 
                         focus:outline-none focus:ring-4 focus:ring-pink-500/20 btn-glow"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Get In Touch
              </motion.button>

              {loadingState?.loading ? (
                <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm text-gray-700 
                              px-8 py-4 rounded-full font-outfit font-medium text-lg border border-gray-200/50 opacity-70">
                  <div className="w-4 h-4 border-2 border-[#fb6c85] border-t-transparent rounded-full animate-spin"></div>
                  Loading resume... {loadingState.progress}%
                </div>
              ) : (
                <motion.a
                  href={getAssetUrl(assets, 'resume/Armojallas, Desiree P. (2025) Resume.docx.pdf') || '#'}
                  download="Armojallas, Desiree P. (2025) Resume.docx.pdf"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm text-gray-700 
                           px-8 py-4 rounded-full font-outfit font-medium text-lg hover:bg-white/80 
                           border border-gray-200/50 transition-all duration-300
                           focus:outline-none focus:ring-4 focus:ring-gray-200/50"
                >
                  <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Download Resume
                </motion.a>
              )}
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