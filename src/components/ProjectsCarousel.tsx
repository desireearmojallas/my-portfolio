import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Grid,
  Filter,
  Mail,
  FileText
} from 'lucide-react';
import { type Project } from './ProjectCardNew';
import ProjectDetailModal from './ProjectDetailModal';
import UIUXProjectsGallery from './UIUXProjectsGallery';
import MasonryProjects from './MasonryProjects';
import GraphicMasonryGallery from './GraphicMasonryGallery';
import { useAssets, getAssetUrl } from '../Assets';
import { webDevelopment } from '../config/cloudinaryAssets';

interface ProjectsCarouselProps {
  role: 'designer' | 'developer';
}

const sampleProjects: Array<Project & { techStack?: string[] }> = [
  {
    id: 'web-1',
    title: 'Clymbiq Corporate Website',
    description: "Built a corporate presence that elevates credibility, clarifies services, and drives inbound inquiries.",
    outcomes: ['+28% time-on-page from refined navigation', 'Clear service storytelling for conversions', 'Responsive layouts for enterprise audiences'],
    tags: ['React', 'TypeScript', 'Corporate', 'Web Development'],
    image: webDevelopment.clymbiq.thumbnail,
    link: 'https://www.clymbiq.com',
    role: 'developer',
    type: 'development',
    category: 'Web Development',
    techStack: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    featured: true,
  },
  {
    id: 'web-2',
    title: 'Freehill Capital',
    description: 'Investment landing experience that communicates trust, showcases portfolio, and captures qualified leads.',
    outcomes: ['Lead-focused hero and CTA journey', 'Lightweight build for fast first paint', 'Mobile-first layout for on-the-go investors'],
    tags: ['React', 'Landing Page', 'Business', 'Finance'],
    image: webDevelopment.freehillCapital.thumbnail,
    link: 'https://www.freehillcapital.com',
    role: 'developer',
    type: 'development',
    category: 'Web Development',
    techStack: ['React', 'TypeScript', 'Tailwind'],
  },
  {
    id: 'web-3',
    title: 'A1 CRM',
    description: 'CRM web app that unifies contacts, pipelines, and activities into a single operator-friendly workspace.',
    outcomes: ['Pipeline visibility with configurable stages', 'Faster data entry with inline edits', 'Role-based access for teams'],
    tags: ['CRM', 'Web App', 'Business Tools', 'React'],
    image: webDevelopment.a1crm.thumbnail,
    link: 'https://www.a1crm.clymbiq.com',
    role: 'developer',
    type: 'development',
    category: 'Web Applications',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'web-4',
    title: 'A1 Canvasser',
    description: 'Field canvassing tool that tracks outreach, territory coverage, and real-time activity logs.',
    outcomes: ['Geo-tagged submissions for field validation', 'Offline-friendly data capture', 'Live dashboards for managers'],
    tags: ['Field Tools', 'Web App', 'Data Collection', 'Maps'],
    image: webDevelopment.a1canvasser.thumbnail,
    link: 'https://www.a1canvasser.clymbiq.com',
    role: 'developer',
    type: 'development',
    category: 'Web Applications',
    techStack: ['React', 'TypeScript', 'Google Maps', 'Firebase'],
  },
  {
    id: 'web-5',
    title: 'A1 Production Dashboard',
    description: 'Production management dashboard with live metrics, inventory status, and quality control signals.',
    outcomes: ['Real-time line status monitoring', 'Bottleneck highlights for supervisors', 'Exports for daily ops reviews'],
    tags: ['Dashboard', 'Production', 'Analytics', 'Web App'],
    image: webDevelopment.a1production.thumbnail,
    link: 'https://www.a1production.clymbiq.com',
    role: 'developer',
    type: 'development',
    category: 'Web Applications',
    techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io'],
  },
  {
    id: 'web-6',
    title: 'A1 Billing',
    description: 'Billing and invoicing app with payment processing, subscription management, and financial reporting.',
    outcomes: ['Automated invoice schedules', 'Payment tracking with alerts', 'Role-based financial views'],
    tags: ['Billing', 'Finance', 'Web App', 'Payment Processing'],
    image: webDevelopment.a1billing.thumbnail,
    link: 'https://www.a1billing.clymbiq.com',
    role: 'developer',
    type: 'development',
    category: 'Web Applications',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
  },
  {
    id: 'dev-15',
    title: 'Mobile Collaboration App',
    description: 'Cross-platform mobile app for team collaboration with real-time chat, file sharing, task management, and offline-first architecture.',
    tags: ['React Native', 'Firebase', 'Node.js', 'Express', 'Redux'],
    image: 'https://placehold.co/600x800/EC4899/FFFFFF?text=Collaboration+App',
    link: '#',
    github: 'https://github.com/desireearmojallas/collab-app',
    role: 'developer',
    type: 'development',
    category: 'Full Stack',
    techStack: ['React Native', 'Firebase', 'Node.js', 'Express', 'Redux'],
  },
  {
    id: 'uiux-1',
    title: 'FerryEasy - Mobile Ticketing App Design',
    description: 'A comprehensive ferry ticketing mobile app with seamless booking experience, real-time schedules, and user-friendly interface for maritime transportation.',
    overview: 'FerryEasy is a mobile ticketing app designed to streamline ferry travel for passengers in Cebu and Lapu-Lapu. The project focuses on creating a smooth and intuitive booking experience by enabling users to view ferry schedules in real time, purchase tickets digitally, and manage their trips directly from their smartphones.\n\nThe goal of this project was to eliminate common pain points such as long queues, physical tickets, and confusing schedules. Through a clean interface, user-centered UX decisions, and a visual identity inspired by maritime travel, FerryEasy delivers a simple, accessible, and reliable solution for everyday ferry commuters.',
    tags: ['Figma', 'UI Design', 'Mobile App', 'UX Research'],
    image: 'https://res.cloudinary.com/du4nug3uk/image/upload/v1770567653/FerryEasy_UI_UX_Portfolio_2.0_page-0001_lcrj4x.jpg',
    images: [
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770567653/FerryEasy_UI_UX_Portfolio_2.0_page-0001_lcrj4x.jpg',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770567659/FerryEasy_UI_UX_Portfolio_2.0_page-0002_cyq5ej.jpg',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770567680/FerryEasy_UI_UX_Portfolio_2.0_page-0003_oajmf1.jpg',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770567680/FerryEasy_UI_UX_Portfolio_2.0_page-0004_ykxtge.jpg',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770567679/FerryEasy_UI_UX_Portfolio_2.0_page-0005_udfjsf.jpg',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770567681/FerryEasy_UI_UX_Portfolio_2.0_page-0006_nkzrzk.jpg',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770567684/FerryEasy_UI_UX_Portfolio_2.0_page-0007_qs3q2o.jpg',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770567683/FerryEasy_UI_UX_Portfolio_2.0_page-0008_fdut3d.jpg',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770567685/FerryEasy_UI_UX_Portfolio_2.0_page-0009_q9kh6j.jpg',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770567682/FerryEasy_UI_UX_Portfolio_2.0_page-0010_xpfvrg.jpg',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770567686/FerryEasy_UI_UX_Portfolio_2.0_page-0011_immgsz.jpg',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770567684/FerryEasy_UI_UX_Portfolio_2.0_page-0012_oo9sas.jpg',
    ],
    link: '#',
    role: 'designer',
    type: 'uiux',
    category: 'UI/UX Design',
  },
  {
    id: 'uiux-2',
    title: 'Co-Vaccine - Mobile Vaccine Management App',
    description: 'A comprehensive vaccine management mobile app designed to streamline vaccination tracking, appointments, and health records.',
    tags: ['Figma', 'UI Design', 'Mobile App', 'Healthcare'],
    image: 'https://res.cloudinary.com/du4nug3uk/image/upload/v1770569996/1-co-vaccine-uiux-1920_v4doyx.png',
    images: [
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770569996/1-co-vaccine-uiux-1920_v4doyx.png',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770569999/9-co-vaccine-uiux-1920_vjufd8.png',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770569996/17-co-vaccine-uiux-1920_r3fama.png',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770569996/25-co-vaccine-uiux-1920_i7o4om.png',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770569998/33-co-vaccine-uiux-1920_l798z2.png',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770569998/41-co-vaccine-uiux-1920_bon2ha.png',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770569997/49-co-vaccine-uiux-1920_cuubmf.png',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770569996/57-co-vaccine-uiux-1920_lgsw1m.png',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770569998/65-co-vaccine-uiux-1920_hxlrid.png',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770569996/73-co-vaccine-uiux-1920_g05d89.png',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770569999/81-co-vaccine-uiux-1920_gta32c.png',
      'https://res.cloudinary.com/du4nug3uk/image/upload/v1770569998/89-co-vaccine-uiux-1920_wnkwju.png',
    ],
    link: '#',
    role: 'designer',
    type: 'uiux',
    category: 'UI/UX Design',
  }
];
export default function ProjectsCarousel({ role }: ProjectsCarouselProps) {
  const { assets, loadingState } = useAssets();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'featured' | 'all'>('all');

  const uiuxProjects = useMemo(() => sampleProjects.filter(project => project.type === 'uiux'), []);

  useEffect(() => {
    setActiveView('all');
    setActiveCategory(null);
  }, [role]);

  const filteredProjects = useMemo(() => {
    return sampleProjects.filter(project => {
      const hasValidData = project.title && project.image && project.description && project.tags && project.tags.length > 0;
      if (!hasValidData) return false;
      const roleMatch = project.role === role || project.role === 'both';
      if (!roleMatch) return false;
      return activeCategory ? project.category === activeCategory : true;
    });
  }, [role, activeCategory]);

  const displayedProjects = useMemo(() => {
    if (activeView === 'featured') return filteredProjects.slice(0, 6);
    return filteredProjects;
  }, [filteredProjects, activeView]);

  const categories = useMemo(() => {
    return [...new Set(
      sampleProjects
        .filter(p => p.role === role || p.role === 'both')
        .map(p => p.category)
        .filter(Boolean)
    )] as string[];
  }, [role]);

  const handleProjectClick = (project: Project) => {
    window._lastScrollPosition = window.scrollY;
    document.body.style.overflow = 'hidden';
    setSelectedProject(project);
  };

  const handleCloseModal = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    document.body.style.overflow = '';
    setSelectedProject(null);
    if (window._lastScrollPosition !== undefined) {
      setTimeout(() => {
        window.scrollTo(0, window._lastScrollPosition || 0);
      }, 10);
    }
  };

  return (
    <section className="section-padding bg-gradient-to-br from-white via-pink-50/30 to-purple-50/20 relative overflow-visible">
      <div className="absolute inset-0 overflow-x-hidden pointer-events-none">
        <div className="absolute top-32 right-32 w-80 h-80 bg-gradient-to-r from-pink-100/30 to-rose-100/30 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-32 left-32 w-96 h-96 bg-gradient-to-r from-purple-100/20 to-pink-100/20 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-16 h-16 mx-auto mb-8 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] rounded-2xl flex items-center justify-center shadow-lg animate-float"
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
                ? 'A curated collection of design projects that solve real problems through thoughtful visual solutions and user-centered thinking.'
                : 'A showcase of development projects built with modern technologies, clean architecture, and attention to performance and usability.'}
            </p>
          </motion.div>

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

        {role === 'developer' && displayedProjects.length > 0 && (
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-10"
          >
            <MasonryProjects
              projects={displayedProjects}
              onProjectClick={handleProjectClick}
            />

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
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] text-white px-10 py-5 rounded-2xl font-outfit font-semibold text-lg hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-500/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">💬 Let's Discuss Your Project</span>
              </motion.button>

              {loadingState?.loading ? (
                <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm text-gray-700 px-10 py-5 rounded-2xl font-outfit font-semibold text-lg border border-gray-200/50 opacity-70">
                  <div className="w-5 h-5 border-2 border-[#fb6c85] border-t-transparent rounded-full animate-spin"></div>
                  Loading resume... {loadingState.progress}%
                </div>
              ) : (
                <motion.a
                  href={getAssetUrl(assets, 'resume/Armojallas, Desiree P. (2025) Resume.docx.pdf') || '#'}
                  download="Armojallas, Desiree P. (2025) Resume.docx.pdf"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm text-gray-700 px-10 py-5 rounded-2xl font-outfit font-semibold text-lg hover:bg-white/90 border border-gray-200/50 hover:border-gray-300/50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-200/50 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FileText className="w-6 h-6 group-hover:scale-110 transition-transform relative z-10" />
                  <span className="relative z-10">Download Resume</span>
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        )}

        {role === 'designer' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgb(251,108,133)]/50 to-transparent" />
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.14em] bg-white/80 border border-pink-100 text-[rgb(251,108,133)] shadow-sm">
                  Graphic & Video Gallery
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgb(251,108,133)]/50 to-transparent" />
              </div>
              <GraphicMasonryGallery className="mb-4" />
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgb(251,108,133)]/50 to-transparent" />
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.14em] bg-white/80 border border-pink-100 text-[rgb(251,108,133)] shadow-sm">
                  UI/UX Case Studies
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgb(251,108,133)]/50 to-transparent" />
              </div>
              <div className="rounded-3xl border border-gray-200/70 bg-white/60 backdrop-blur-sm shadow-sm p-8">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-outfit font-semibold text-gray-800 mb-3">
                    UI/UX Projects
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Product design explorations, flows, and visuals focused on real user outcomes.
                  </p>
                </div>
                <UIUXProjectsGallery projects={uiuxProjects} />
              </div>
            </div>
          </motion.div>
        )}

        {role === 'designer' && uiuxProjects.length === 0 && (
          <p className="text-center text-gray-600">UI/UX projects are coming soon.</p>
        )}

        <ProjectDetailModal
          project={selectedProject}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
}
