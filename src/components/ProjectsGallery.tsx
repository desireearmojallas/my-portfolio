import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, FileText, Grid, Filter, Sparkles } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";
import GraphicDesignGallery from "./GraphicDesignGallery";
import UIUXProjectsGallery from "./UIUXProjectsGallery";
import type { Project } from "./ProjectCard";
import "./GalleryStyles.css";
import "./GraphicGalleryStyles.css";
import { useAssets, getAssetUrl } from '../Assets';

interface ProjectsGalleryProps {
  role: "designer" | "developer";
}

// Sample projects data - you can replace this with your actual projects
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Mobile App",
    description:
      "A sleek mobile shopping experience with intuitive navigation and seamless checkout flow.",
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
    description:
      "Complete brand redesign including logo, color palette, typography, and brand guidelines.",
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
    description:
      "Clean, data-driven dashboard design focusing on usability and information hierarchy.",
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
    description:
      "Full-stack task management application with real-time updates and team collaboration.",
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
    description:
      "Responsive portfolio website built with modern web technologies and smooth animations.",
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
    description:
      "Real-time chat application with AI integration and beautiful user interface.",
    tags: ["Next.js", "Socket.io", "AI/ML", "PostgreSQL"],
    image: "https://placehold.co/600x800/f8f9fa/6c757d?text=AI+Chat+App",
    link: "#",
    github: "#",
    role: "developer",
    type: "development",
    category: "Web Development",
  },
  {
    id: "7",
    title: "Design System",
    description:
      "Comprehensive design system with components, tokens, and documentation.",
    tags: ["Design System", "Figma", "React", "Storybook"],
    image: "https://placehold.co/600x800/f8f9fa/6c757d?text=Design+System",
    link: "#",
    github: "#",
    role: "both",
    type: "uiux",
    category: "UI/UX Design",
  },
  // Graphic Design Projects
  {
    id: "8",
    title: "Brand Logo Collection",
    description: "A collection of logo designs for various clients across different industries.",
    tags: ["Branding", "Logo Design", "Illustrator", "Identity"],
    image: "https://placehold.co/600x800/fcf1f4/FB6C85?text=Logo+Collection",
    images: [
      "https://placehold.co/600x800/fcf1f4/FB6C85?text=Logo+1",
      "https://placehold.co/600x800/fcf1f4/FB6C85?text=Logo+2",
      "https://placehold.co/600x800/fcf1f4/FB6C85?text=Logo+3"
    ],
    role: "designer",
    type: "graphic",
    category: "Branding",
  },
  {
    id: "9",
    title: "Event Poster Series",
    description: "Creative posters designed for conferences, concerts and cultural events.",
    tags: ["Poster Design", "Typography", "Print", "Photoshop"],
    image: "https://placehold.co/600x800/fcf1f4/FB6C85?text=Poster+Series",
    images: [
      "https://placehold.co/600x800/fcf1f4/FB6C85?text=Poster+1",
      "https://placehold.co/600x800/fcf1f4/FB6C85?text=Poster+2"
    ],
    role: "designer",
    type: "graphic",
    category: "Print Design",
  },
  {
    id: "10",
    title: "Social Media Campaign",
    description: "Engaging visual content created for brands' social media channels.",
    tags: ["Social Media", "Digital Marketing", "Content Creation"],
    image: "https://placehold.co/600x800/fcf1f4/FB6C85?text=Social+Media",
    images: [
      "https://placehold.co/600x800/fcf1f4/FB6C85?text=Social+1",
      "https://placehold.co/600x800/fcf1f4/FB6C85?text=Social+2",
      "https://placehold.co/600x800/fcf1f4/FB6C85?text=Social+3",
      "https://placehold.co/600x800/fcf1f4/FB6C85?text=Social+4"
    ],
    role: "designer",
    type: "graphic",
    category: "Social Media",
  },
  {
    id: "11",
    title: "Product Packaging Design",
    description: "Compelling packaging designs that stand out on shelves and reflect brand values.",
    tags: ["Packaging", "3D Mockup", "Print Design"],
    image: "https://placehold.co/600x800/fcf1f4/FB6C85?text=Packaging",
    images: [
      "https://placehold.co/600x800/fcf1f4/FB6C85?text=Package+1",
      "https://placehold.co/600x800/fcf1f4/FB6C85?text=Package+2"
    ],
    role: "designer",
    type: "graphic",
    category: "Packaging",
  }
];

export default function ProjectsGallery({ role }: ProjectsGalleryProps) {
  const { assets, loadingState } = useAssets();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Filter projects by role and category if set
  const filteredProjects = sampleProjects.filter(
    (project) => {
      // Filter by role first
      const roleMatch = project.role === role || project.role === "both";
      
      // Then filter by category if one is selected
      if (activeCategory && roleMatch) {
        return project.category === activeCategory;
      }
      
      return roleMatch;
    }
  );
  
  // Get unique categories for the current role
  const categories = [...new Set(
    sampleProjects
      .filter(p => p.role === role || p.role === "both")
      .map(p => p.category)
      .filter(Boolean)
  )] as string[];

  // Group projects by type
  const uiuxProjects = filteredProjects.filter(p => p.type === "uiux" || (!p.type && p.role === "designer"));

  const handleProjectClick = (project: Project) => {
    // Store current scroll position before opening modal
    window._lastScrollPosition = window.scrollY;
    
    // Prevent any default behavior
    // document.body.style.overflow = 'hidden';
    
    // Set the selected project to open the modal
    setSelectedProject(project);
  };

  const handleCloseModal = (e?: React.MouseEvent) => {
    // If an event was passed, prevent default behavior
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Just update state, don't navigate
    setSelectedProject(null);
    
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
    
    // Restore scroll position after modal is closed
    if (window._lastScrollPosition !== undefined) {
      setTimeout(() => {
        window.scrollTo(0, window._lastScrollPosition || 0);
      }, 10);
    }
    
    // Restore scroll position
    if (typeof window._lastScrollPosition === 'number') {
      window.scrollTo(0, window._lastScrollPosition);
      window._lastScrollPosition = undefined;
    }
  };

  return (
    <section
      id="projects"
      className="section-padding bg-gradient-to-br from-gray-50/50 to-white px-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Header icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div
              className="w-16 h-16 mx-auto bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                          rounded-full flex items-center justify-center animate-float"
            >
              <Grid className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-outfit font-bold text-gray-800 mb-6 animate-slide-up">
            My {role === "designer" ? "Design" : "Development"} Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            {role === "designer"
              ? "A collection of design projects showcasing user-centered solutions and visual storytelling."
              : "A selection of development projects built with modern technologies and best practices."}
          </p>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                          ${activeCategory === null 
                            ? 'bg-[rgb(251,108,133)] text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                All Projects
              </motion.button>
              
              {categories.map(category => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                            ${activeCategory === category 
                              ? 'bg-[rgb(251,108,133)] text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          )}

          {/* Filter indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 flex items-center justify-center gap-2"
          >
            <Filter className="w-5 h-5 text-[rgb(251,108,133)]" />
            <span className="text-sm text-gray-500 font-medium">
              Showing {filteredProjects.length} {activeCategory ? activeCategory.toLowerCase() : ''} projects
            </span>
          </motion.div>
        </motion.div>

        {/* Designer Projects Sections - Graphic Design now comes first */}
        {role === "designer" && (
          <>
            <GraphicDesignGallery className="mb-16" defaultOpen={true} />
            {uiuxProjects.length > 0 && (
              <UIUXProjectsGallery 
                projects={sampleProjects} 
                defaultOpen={false} 
                className="mb-16" 
              />
            )}
          </>
        )}

        {/* Development Projects Section */}
        {role === "developer" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        )}

        {/* Project Detail Modal - only for UI/UX and Development projects */}
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={handleCloseModal} 
        />


        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="gradient-card rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[rgb(251,108,133)]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[rgb(251,108,133)]/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Sparkles className="w-12 h-12 mx-auto text-[rgb(251,108,133)]" />
            </motion.div>

            <h3 className="text-2xl md:text-3xl font-outfit font-semibold text-gray-800 mb-4">
              Interested in working together?
            </h3>
            <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
              I'm always excited to collaborate on meaningful projects and bring
              creative ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group px-8 py-4 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                         text-white rounded-full font-medium text-lg btn-glow
                         focus:outline-none focus:ring-4 focus:ring-[rgb(251,108,133)]/30
                         flex items-center justify-center gap-3  cursor-pointer"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Get In Touch
              </motion.button>
              {loadingState?.loading ? (
                <div className="px-8 py-4 btn-outline-glow rounded-full font-medium text-lg opacity-70 flex items-center justify-center gap-3">
                  <div className="w-4 h-4 border-2 border-[#fb6c85] border-t-transparent rounded-full animate-spin mr-2"></div>
                  Loading resume... {loadingState.progress}%
                </div>
              ) : (
                <motion.a
                  href={getAssetUrl(assets, 'resume/Armojallas, Desiree P. (2025) Resume.docx.pdf') || '#'}
                  download="Armojallas, Desiree P. (2025) Resume.docx.pdf"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 btn-outline-glow rounded-full font-medium text-lg
                        focus:outline-none focus:ring-4 focus:ring-[rgb(251,108,133)]/30
                        flex items-center justify-center gap-3"
                >
                  <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Download Resume
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}