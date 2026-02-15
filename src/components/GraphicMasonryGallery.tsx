import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GraphicProjectCard, { type GraphicProject, type GraphicProjectType } from './GraphicProjectCard';
import GraphicProjectModal from './GraphicProjectModal';
import { graphicDesign, videoProduction } from '../config/cloudinaryAssets';
import { useImagePreloader } from '../hooks/useImagePreloader';
import './GalleryStyles.css';

interface GraphicMasonryGalleryProps {
  className?: string;
}

export default function GraphicMasonryGallery({
  className = "",
}: GraphicMasonryGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<GraphicProject | null>(null);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const PROJECTS_PER_PAGE = 6; // Show 6 items per page on mobile

  // Create projects array with all work
  const projects = useMemo<GraphicProject[]>(() => {
    try {
      const projectsList: GraphicProject[] = [];

      // Video Projects - Xeleqt AVP Bundle
      const xeleqtBundle = [
        videoProduction?.xeleqtAgility,
        videoProduction?.xeleqtAware,
        videoProduction?.xeleqtMobility,
      ].filter(Boolean);

      if (xeleqtBundle.length) {
        const xeleqtAssets = xeleqtBundle.flatMap(item => item?.videos || []);
        const xeleqtThumb =
          videoProduction.xeleqtAgility?.thumbnail ||
          videoProduction.xeleqtAware?.thumbnail ||
          videoProduction.xeleqtMobility?.thumbnail ||
          xeleqtAssets[0];

        projectsList.push({
          id: "xeleqt-avp-suite",
          title: "Xeleqt AVP Collection",
          description: "Unified AVP series covering Xeleqt's Agility, Aware, and Mobility product lines.",
          category: "Video Production",
          subcategory: "AVP",
          type: "video",
          client: "Xeleqt",
          tools: ["Premiere Pro", "Adobe Audition", "After Effects", "CapCut"],
          thumbnail: xeleqtThumb,
          assets: xeleqtAssets,
          date: "2022",
          featured: true,
        });
      }

      const purpleCowBundle = [
        videoProduction?.delishDeli,
        videoProduction?.purpleCowAgency,
        videoProduction?.synergy,
        videoProduction?.purpleCowPhilippines,
      ].filter(Boolean);

      if (purpleCowBundle.length) {
        const bundleAssets = purpleCowBundle.flatMap(item => item?.videos || []);
        const bundleThumb =
          videoProduction.purpleCowAgency?.thumbnail ||
          videoProduction.delishDeli?.thumbnail ||
          videoProduction.synergy?.thumbnail ||
          videoProduction.purpleCowPhilippines?.thumbnail ||
          bundleAssets[0];

        projectsList.push({
          id: "purple-cow-campaigns",
          title: "Purple Cow Social Campaigns",
          description: "Cross-brand social video set (Delish Deli, Synergy768, Purple Cow Agency, Purple Cow Philippines).",
          category: "Social Media",
          subcategory: "Instagram Video",
          type: "video",
          client: "Purple Cow Agency",
          tools: ["Premiere Pro", "CapCut", "After Effects", "Adobe Audition"],
          thumbnail: bundleThumb,
          assets: bundleAssets,
          date: "2023",
          featured: true,
        });
      }

      if (graphicDesign?.packagingDesign?.thumbnail) {
        projectsList.push({
          id: "packaging-1",
          title: "AIM Nuance Packaging",
          description: "Product packaging design for AIM Nuance, featuring clean, modern aesthetics.",
          category: "Packaging",
          type: "packaging",
          client: "AIM",
          tools: ["Adobe Illustrator", "Photoshop", "Mockup Design"],
          thumbnail: graphicDesign.packagingDesign.thumbnail,
          assets: graphicDesign.packagingDesign.images || [],
          date: "2022",
          featured: true, // Wide card
        });
      }

      const coffeescapeExists = graphicDesign?.coffeescapeLogo || graphicDesign?.coffeescapeCards || graphicDesign?.coffeescapePackaging;
      if (coffeescapeExists) {
        const coffeescapeAssets = [
          ...(graphicDesign.coffeescapeLogo?.images || []),
          ...(graphicDesign.coffeescapeCards?.images || []),
          ...(graphicDesign.coffeescapePackaging?.images || []),
        ].filter(Boolean);

        const coffeescapeThumb =
          graphicDesign.coffeescapeCards?.thumbnail ||
          graphicDesign.coffeescapeLogo?.images?.[4] || // Use the 'w_ph' version
          graphicDesign.coffeescapePackaging?.thumbnail ||
          coffeescapeAssets[0];

        projectsList.push({
          id: "coffeescape-brand-kit",
          title: "Coffeescape Brand Kit",
          description: "Unified brand system covering logo suite, packaging, and printed collateral for Coffeescape.",
          category: "Branding & Packaging",
          subcategory: "Brand Kit",
          type: "logo",
          client: "Coffeescape",
          tools: ["Adobe Illustrator", "Photoshop", "InDesign", "Brand Strategy"],
          thumbnail: coffeescapeThumb,
          assets: coffeescapeAssets,
          date: "2021",
        });
      }

      if (graphicDesign?.ferryeasyLogo?.thumbnail) {
        projectsList.push({
          id: "ferryeasy-logo-1",
          title: "FerryEasy Logo Design",
          description: "Logo design and branding for FerryEasy, featuring various versions and applications.",
          category: "Branding",
          subcategory: "Logo Design",
          type: "logo",
          tools: ["Adobe Illustrator", "Brand Strategy"],
          thumbnail: graphicDesign.ferryeasyLogo.thumbnail,
          assets: graphicDesign.ferryeasyLogo.images || [],
          date: "2022",
        });
      }

      if (graphicDesign?.cebudocShirts?.thumbnail) {
        projectsList.push({
          id: "cebudoc-shirt-1",
          title: "CebuDoc Polo Shirt Design",
          description: "Custom polo shirt design commissioned by Cebu Doctors' University.",
          category: "Apparel Design",
          subcategory: "Polo Shirt",
          type: "apparel",
          client: "Cebu Doctors' University",
          tools: ["Adobe Illustrator", "Photoshop"],
          thumbnail: graphicDesign.cebudocShirts.thumbnail,
          assets: graphicDesign.cebudocShirts.images || [],
          date: "2022",
        });
      }

      if (graphicDesign?.scsPoloshirts?.thumbnail) {
        projectsList.push({
          id: "scs-shirt-1",
          title: "SCS Practicum Polo Shirt Design",
          description: "Practicum polo shirt design for the School of Computer Studies at University of San Jose - Recoletos.",
          category: "Apparel Design",
          subcategory: "Polo Shirt",
          type: "apparel",
          client: "USJR School of Computer Studies",
          tools: ["Adobe Illustrator", "Photoshop"],
          thumbnail: graphicDesign.scsPoloshirts.thumbnail,
          assets: graphicDesign.scsPoloshirts.images || [],
          date: "2023",
        });
      }

      if (graphicDesign?.tartetartBoxes?.thumbnail) {
        projectsList.push({
          id: "tartetart-box-1",
          title: "TarteTart Packaging Design",
          description: "Packaging design for TarteTart, a local tart and pastry business.",
          category: "Packaging",
          subcategory: "Food Packaging",
          type: "packaging",
          client: "TarteTart",
          tools: ["Adobe Illustrator", "Photoshop", "Mockup Design"],
          thumbnail: graphicDesign.tartetartBoxes.thumbnail,
          assets: graphicDesign.tartetartBoxes.images || [],
          date: "2022",
        });
      }

      if (graphicDesign?.pilgrimRise?.thumbnail) {
        projectsList.push({
          id: "pilgrim-rise-1",
          title: "Pilgrim Rise OBB",
          description: "Promotional video for Pilgrim Rise, showcasing their brand and services.",
          category: "Video Production",
          subcategory: "Promotional",
          type: "video",
          client: "Pilgrim Rise",
          tools: ["Premiere Pro", "After Effects"],
          thumbnail: graphicDesign.pilgrimRise.thumbnail,
          assets: graphicDesign.pilgrimRise.videos || [],
          date: "2024",
        });
      }

      return projectsList;
    } catch (error) {
      console.error('Error creating projects:', error);
      return [];
    }
  }, [graphicDesign, videoProduction]);

  // Initialize image preloader
  const { preloadAssets, preloadAssetsWithDelay } = useImagePreloader();

  // Responsive flags (preserve mobile pagination behavior)
  useEffect(() => {
    const updateFlags = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };

    updateFlags();
    window.addEventListener('resize', updateFlags);
    return () => window.removeEventListener('resize', updateFlags);
  }, []);

  const filteredProjects = useMemo(() => projects, [projects]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;

  // Limit projects on mobile based on current page
  const displayedProjects = useMemo(() => {
    if (isMobile) {
      return filteredProjects.slice(startIndex, endIndex);
    }
    return filteredProjects;
  }, [filteredProjects, isMobile, currentPage, startIndex, endIndex]);

  // Preload all project assets in the background
  useEffect(() => {
    if (!projects.length) return;

    // Collect all assets from all projects
    const allAssets: string[] = [];
    projects.forEach(project => {
      if (project.thumbnail) allAssets.push(project.thumbnail);
      if (project.assets) allAssets.push(...project.assets);
    });

    // Preload with a delay to not interfere with initial page load
    // Prioritize visible projects first (thumbnails), then all assets
    const thumbnails = projects.map(p => p.thumbnail).filter(Boolean);
    
    // Preload thumbnails immediately with high priority
    preloadAssets(thumbnails, { priority: 'high', loading: 'eager' });
    
    // Preload all other assets after 2 seconds with low priority
    preloadAssetsWithDelay(allAssets, 2000);
  }, [projects, preloadAssets, preloadAssetsWithDelay]);

  // Preload assets when page changes
  useEffect(() => {
    if (!isMobile || !displayedProjects.length) return;

    const assetsToPreload: string[] = [];
    displayedProjects.forEach(project => {
      if (project.assets) assetsToPreload.push(...project.assets);
    });

    // Preload current page assets
    preloadAssets(assetsToPreload, { priority: 'high' });
  }, [currentPage, displayedProjects, isMobile, preloadAssets]);

  // Function to preload a specific project's assets (called on hover)
  const preloadProjectAssets = (project: GraphicProject) => {
    const assetsToPreload = [project.thumbnail, ...(project.assets || [])];
    preloadAssets(assetsToPreload, { priority: 'high' });
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Enforce a repeating 2–1–2–1 rhythm: two supporting tiles then one hero
  const patternedProjects = useMemo(() => {
    const heroQueue = [...displayedProjects.filter(p => p.featured)];
    const supportingQueue = [...displayedProjects.filter(p => !p.featured)];
    const sequence: Array<{ project: GraphicProject; layout: 'hero' | 'masonry' }> = [];

    while (heroQueue.length > 0 || supportingQueue.length > 0) {
      // Two supporting tiles
      for (let i = 0; i < 2; i++) {
        if (supportingQueue.length > 0) {
          sequence.push({ project: supportingQueue.shift()!, layout: 'masonry' });
        } else if (heroQueue.length > 0) {
          sequence.push({ project: heroQueue.shift()!, layout: 'masonry' });
        }
      }

      // One hero tile
      if (heroQueue.length > 0) {
        sequence.push({ project: heroQueue.shift()!, layout: 'hero' });
      } else if (supportingQueue.length > 0) {
        sequence.push({ project: supportingQueue.shift()!, layout: 'hero' });
      }
    }

    return sequence;
  }, [displayedProjects]);

  const handleCloseModal = () => {
    setIsModalClosing(true);
    document.body.style.overflow = '';
    
    if (window._lastScrollPosition !== undefined) {
      setTimeout(() => {
        window.scrollTo(0, window._lastScrollPosition || 0);
      }, 10);
    }
    
    setTimeout(() => {
      setSelectedProject(null);
      setIsModalClosing(false);
    }, 300);
  };

  return (
    <>
      <div className={`relative w-screen left-1/2 -translate-x-1/2 overflow-hidden py-2 md:py-4 px-2 ${className}`}>
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 auto-rows-auto gap-0"
        >
          {patternedProjects.map(({ project, layout }, index) => (
            <motion.div
              key={project.id}
              className={`w-full h-full ${layout === 'hero' ? 'md:col-span-2' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.03, 0.25) }}
              viewport={{ once: true }}
            >
              <GraphicProjectCard
                project={project}
                index={index}
                onClick={(p) => {
                  window._lastScrollPosition = window.scrollY;
                  setSelectedProject(p);
                }}
                onHover={preloadProjectAssets}
                variant="masonry"
              />

              {/* Mobile: Show project info under card */}
              {isMobile && (
                <div className="bg-white px-4 py-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-[#FBD1D9]/20 text-[#E27396] rounded-full text-xs font-medium">
                      {project.subcategory || project.category}
                    </span>
                    {project.date && (
                      <span className="text-xs text-gray-500">{project.date}</span>
                    )}
                  </div>
                  <h4 className="text-base font-semibold text-gray-800 leading-tight">
                    {project.title}
                  </h4>
                  {project.client && (
                    <p className="text-xs text-gray-500">
                      {project.client}
                    </p>
                  )}
                  {project.description && (
                    <p className="text-xs text-gray-600 line-clamp-3">
                      {project.description}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Pagination Controls - Mobile Only */}
        {isMobile && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mt-8 px-4"
          >
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-gray-800">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-12 h-12 bg-[#fb6c85] rounded-full font-medium hover:bg-[#e95b74] transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Modal - Rendered outside gallery container to ensure proper viewport centering */}
      {selectedProject && (
        <GraphicProjectModal
          project={selectedProject}
          onClose={handleCloseModal}
          isClosing={isModalClosing}
        />
      )}
    </>
  );
}
