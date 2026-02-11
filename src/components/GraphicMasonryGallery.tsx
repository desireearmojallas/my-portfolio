import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GraphicProjectCard, { type GraphicProject, type GraphicProjectType } from './GraphicProjectCard';
import GraphicProjectModal from './GraphicProjectModal';
import { graphicDesign, videoProduction } from '../config/cloudinaryAssets';
import './GalleryStyles.css';

interface GraphicMasonryGalleryProps {
  className?: string;
}

export default function GraphicMasonryGallery({
  className = "",
}: GraphicMasonryGalleryProps) {
  const [columns, setColumns] = useState(3);
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

      // Video Projects
      if (videoProduction?.delishDeli?.thumbnail) {
        projectsList.push({
          id: "ig-video-1",
          title: "Delish Deli - 1Nito Tower",
          description: "Short-form Instagram video created for Purple Cow's client, Delish Deli at 1Nito Tower.",
          category: "Social Media",
          subcategory: "Instagram Video",
          type: "video",
          client: "Purple Cow Agency",
          tools: ["Premiere Pro", "Adobe Audition", "After Effects"],
          thumbnail: videoProduction.delishDeli.thumbnail,
          assets: videoProduction.delishDeli.videos || [],
          date: "2023",
          featured: true, // Wide card
        });
      }

      if (videoProduction?.purpleCowAgency?.thumbnail) {
        projectsList.push({
          id: "ig-video-2",
          title: "Purple Cow Agency",
          description: "Promotional video showcasing Purple Cow Agency's brand and services.",
          category: "Social Media",
          subcategory: "Instagram Video",
          type: "video",
          client: "Purple Cow Agency",
          tools: ["Premiere Pro", "CapCut", "After Effects"],
          thumbnail: videoProduction.purpleCowAgency.thumbnail,
          assets: videoProduction.purpleCowAgency.videos || [],
          date: "2023",
        });
      }

      if (videoProduction?.synergy?.thumbnail) {
        projectsList.push({
          id: "ig-video-4",
          title: "Synergy768",
          description: "Promotional video created for Synergy768, highlighting their services and benefits.",
          category: "Social Media",
          subcategory: "Instagram Video",
          type: "video",
          client: "Purple Cow Agency",
          tools: ["Premiere Pro", "Adobe Audition", "CapCut"],
          thumbnail: videoProduction.synergy.thumbnail,
          assets: videoProduction.synergy.videos || [],
          date: "2023",
        });
      }

      if (videoProduction?.xeleqtAgility?.thumbnail) {
        projectsList.push({
          id: "xeleqt-video-1",
          title: "Xeleqt Agility AVP",
          description: "Audio-visual presentation showcasing Xeleqt's agility products and services.",
          category: "Video Production",
          subcategory: "AVP",
          type: "video",
          client: "Xeleqt",
          tools: ["Premiere Pro", "Adobe Audition", "After Effects"],
          thumbnail: videoProduction.xeleqtAgility.thumbnail,
          assets: videoProduction.xeleqtAgility.videos || [],
          date: "2022",
          featured: true, // Wide card
        });
      }

      if (videoProduction?.xeleqtAware?.thumbnail) {
        projectsList.push({
          id: "xeleqt-video-2",
          title: "Xeleqt Aware AVP",
          description: "Audio-visual presentation for Xeleqt's Aware product line.",
          category: "Video Production",
          subcategory: "AVP",
          type: "video",
          client: "Xeleqt",
          tools: ["Premiere Pro", "Adobe Audition", "After Effects"],
          thumbnail: videoProduction.xeleqtAware.thumbnail,
          assets: videoProduction.xeleqtAware.videos || [],
          date: "2022",
        });
      }

      if (videoProduction?.xeleqtMobility?.thumbnail) {
        projectsList.push({
          id: "xeleqt-video-3",
          title: "Xeleqt Mobility",
          description: "Product showcase video highlighting Xeleqt's mobility solutions.",
          category: "Video Production",
          subcategory: "Product Video",
          type: "video",
          client: "Xeleqt",
          tools: ["Premiere Pro", "After Effects", "CapCut"],
          thumbnail: videoProduction.xeleqtMobility.thumbnail,
          assets: videoProduction.xeleqtMobility.videos || [],
          date: "2022",
        });
      }

      // Place Purple Cow Philippines here - separated from Purple Cow Agency by multiple projects
      if (videoProduction?.purpleCowPhilippines?.thumbnail) {
        projectsList.push({
          id: "ig-video-3",
          title: "Purple Cow Philippines",
          description: "Brand highlight video for Purple Cow Philippines' social media presence.",
          category: "Social Media",
          subcategory: "Instagram Video",
          type: "video",
          client: "Purple Cow Agency",
          tools: ["Premiere Pro", "CapCut", "After Effects"],
          thumbnail: videoProduction.purpleCowPhilippines.thumbnail,
          assets: videoProduction.purpleCowPhilippines.videos || [],
          date: "2023",
        });
      }

      if (videoProduction?.boligcenterGarden?.thumbnail) {
        projectsList.push({
          id: "boligcenter-1",
          title: "Boligcenter.dk Garden Video",
          description: "Video created for Boligcenter.dk showcasing garden products and design.",
          category: "Video Production",
          subcategory: "Commercial",
          type: "video",
          client: "Boligcenter.dk",
          tools: ["Premiere Pro", "After Effects", "Color Grading"],
          thumbnail: videoProduction.boligcenterGarden.thumbnail,
          assets: videoProduction.boligcenterGarden.videos || [],
          date: "2022",
          featured: true, // Wide card
        });
      }

      if (videoProduction?.queenPoblacion?.thumbnail) {
        projectsList.push({
          id: "queen-poblacion-1",
          title: "Queen of Poblacion Intro",
          description: "Video introduction created for a local beauty pageant in Poblacion.",
          category: "Video Production",
          subcategory: "Event Intro",
          type: "video",
          client: "Queen of Poblacion Pageant",
          tools: ["Premiere Pro", "After Effects", "Motion Graphics"],
          thumbnail: videoProduction.queenPoblacion.thumbnail,
          assets: videoProduction.queenPoblacion.videos || [],
          date: "2023",
        });
      }

      if (videoProduction?.returnZero?.thumbnail) {
        projectsList.push({
          id: "return-zero-1",
          title: "Return Zero Band VTR",
          description: "Video presentation for Return Zero, a school band from the SCS Department.",
          category: "Video Production",
          subcategory: "Band Promo",
          type: "video",
          client: "Return Zero Band",
          tools: ["Premiere Pro", "After Effects", "Audio Editing"],
          thumbnail: videoProduction.returnZero.thumbnail,
          assets: videoProduction.returnZero.videos || [],
          date: "2023",
          featured: true, // Wide card
        });
      }

      // Graphic Design Projects
      if (graphicDesign?.businessCards?.thumbnail) {
        projectsList.push({
          id: "business-cards-1",
          title: "Modern Business Card Collection",
          description: "A collection of modern business card designs created for various clients.",
          category: "Print Design",
          subcategory: "Business Cards",
          type: "card",
          tools: ["Adobe Illustrator", "Photoshop", "InDesign"],
          thumbnail: graphicDesign.businessCards.thumbnail,
          assets: graphicDesign.businessCards.images || [],
          date: "2021-2023",
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

      if (graphicDesign?.coffeescapePackaging?.thumbnail) {
        projectsList.push({
          id: "coffeescape-packaging-1",
          title: "Coffeescape Cup Design",
          description: "Hot cup packaging design for Coffeescape, featuring their branding and aesthetic.",
          category: "Packaging",
          subcategory: "Cup Design",
          type: "packaging",
          client: "Coffeescape",
          tools: ["Adobe Illustrator", "Photoshop", "Mockup Design"],
          thumbnail: graphicDesign.coffeescapePackaging.thumbnail,
          assets: graphicDesign.coffeescapePackaging.images || [],
          date: "2021",
        });
      }

      if (graphicDesign?.coffeescapeLogo?.thumbnail) {
        projectsList.push({
          id: "coffeescape-logo-1",
          title: "Coffeescape Logo Design",
          description: "Logo design for Coffeescape, featuring various versions and applications.",
          category: "Branding",
          subcategory: "Logo Design",
          type: "logo",
          client: "Coffeescape",
          tools: ["Adobe Illustrator", "Brand Strategy"],
          thumbnail: graphicDesign.coffeescapeLogo.thumbnail,
          assets: graphicDesign.coffeescapeLogo.images || [],
          date: "2021",
        });
      }

      if (graphicDesign?.coffeescapeCards?.thumbnail) {
        projectsList.push({
          id: "coffeescape-cards-1",
          title: "Coffeescape Business Cards & Brochure",
          description: "Business card and brochure designs for Coffeescape, featuring their brand identity and logo.",
          category: "Print Design",
          subcategory: "Business Cards",
          type: "card",
          client: "Coffeescape",
          tools: ["Adobe Illustrator", "InDesign", "Photoshop"],
          thumbnail: graphicDesign.coffeescapeCards.thumbnail,
          assets: graphicDesign.coffeescapeCards.images || [],
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

  // Responsive column calculation
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      setIsMobile(mobile);
      if (width < 640) setColumns(1);
      else if (width < 1024) setColumns(2);
      else if (width < 1536) setColumns(3);
      else setColumns(4);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
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

  // Smart distribution: Place featured items strategically across columns
  const distributeProjects = () => {
    const columnArrays: GraphicProject[][] = Array.from({ length: columns }, () => []);
    
    // Separate featured and regular items
    const featuredItems = displayedProjects.filter(p => p.featured);
    const regularItems = displayedProjects.filter(p => !p.featured);
    
    // First, distribute featured items evenly across columns
    featuredItems.forEach((project, index) => {
      const targetColumn = index % columns;
      columnArrays[targetColumn].push(project);
    });
    
    // Then fill in with regular items, balancing column heights
    // Featured items are taller (400px) vs regular (280px)
    // Add 8px gap to height calculations
    regularItems.forEach((project) => {
      const columnHeights = columnArrays.map(col => 
        col.reduce((height, item) => height + (item.featured ? 400 : 280) + 8, 0)
      );
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      columnArrays[shortestColumnIndex].push(project);
    });
    
    return columnArrays;
  };

  const distributedProjects = distributeProjects();

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
      <div className={`relative w-screen left-1/2 -translate-x-1/2 overflow-hidden py-8 px-2 ${className}`}>
        <div
          ref={containerRef}
          className={`flex w-full ${
            columns === 1 ? 'flex-col' : 'flex-row'
          }`}
          style={{
            gap: '8px' // Small aesthetic gap between columns
          }}
        >
          {distributedProjects.map((column, columnIndex) => (
            <div 
              key={columnIndex} 
              className="flex flex-col"
              style={{
                flex: '1 1 0',
                minWidth: 0,
                gap: '8px' // Small aesthetic gap between items in column
              }}
            >
              {column.map((project, projectIndex) => (
                <motion.div
                  key={project.id}
                  className={`w-full ${isMobile ? 'mb-6 rounded-lg overflow-hidden shadow-md' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: projectIndex * 0.08 }}
                  viewport={{ once: true }}
                >
                  <GraphicProjectCard
                    project={project}
                    index={columnIndex * 10 + projectIndex}
                    onClick={(project) => {
                      window._lastScrollPosition = window.scrollY;
                      setSelectedProject(project);
                    }}
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
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {project.description}
                        </p>
                      )}
                      {project.tools && project.tools.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.tools.slice(0, 3).map((tool, toolIdx) => (
                            <span
                              key={toolIdx}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                            >
                              {tool}
                            </span>
                          ))}
                          {project.tools.length > 3 && (
                            <span className="px-2 py-1 bg-[#fb6c85]/10 text-[#fb6c85] rounded-full text-xs font-medium">
                              +{project.tools.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
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
