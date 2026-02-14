import { useState, useMemo, useEffect } from "react";
import {
  Filter,
  Grid,
  Play,
  CreditCard,
  Package,
  Image as ImageIcon,
  Coffee,
  Palette,
  Shirt,
} from "lucide-react";
import GraphicProjectCard from "./GraphicProjectCard";
import GraphicProjectModal from "./GraphicProjectModal";
import type { GraphicProject, GraphicProjectType } from "./GraphicProjectCard";
import CollapsibleSection from "./CollapsibleSection";
import { useImagePreloader } from '../hooks/useImagePreloader';
import "./GraphicGalleryStyles.css";
import "./GraphicProjectInteractions.css";
import { graphicDesign, videoProduction } from '../config/cloudinaryAssets';

interface GraphicDesignGalleryProps {
  className?: string;
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export default function GraphicDesignGallery({
  className = "",
  defaultOpen = false,
  onToggle,
}: GraphicDesignGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<GraphicProject | null>(
    null
  );
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<GraphicProjectType | null>(null);

  // Handle modal close with animation
  const handleCloseModal = () => {
    setIsModalClosing(true);
    // Prevent body scrolling issues
    document.body.style.overflow = '';
    
    // Restore scroll position
    if (window._lastScrollPosition !== undefined) {
      setTimeout(() => {
        window.scrollTo(0, window._lastScrollPosition || 0);
      }, 10);
    }
    
    // Delay setting selectedProject to null to allow animation to complete
    setTimeout(() => {
      setSelectedProject(null);
      setIsModalClosing(false);
    }, 300); // Match this with your animation duration
  };

  const projects = useMemo<GraphicProject[]>(() => {
    return [
      // Instagram Videos - Purple Cow
      {
        id: "ig-video-1",
        title: "Delish Deli - 1Nito Tower",
        description:
          "Short-form Instagram video created for Purple Cow's client, Delish Deli at 1Nito Tower.",
        category: "Social Media",
        subcategory: "Instagram Video",
        type: "video",
        client: "Purple Cow Agency",
        tools: ["Premiere Pro", "Adobe Audition", "After Effects"],
        thumbnail: videoProduction.delishDeli.thumbnail,
        assets: videoProduction.delishDeli.videos || [],
        date: "2023",
      },
      {
        id: "ig-video-2",
        title: "Purple Cow Agency",
        description:
          "Promotional video showcasing Purple Cow Agency's brand and services.",
        category: "Social Media",
        subcategory: "Instagram Video",
        type: "video",
        client: "Purple Cow Agency",
        tools: ["Premiere Pro", "CapCut", "After Effects"],
        thumbnail: videoProduction.purpleCowAgency.thumbnail,
        assets: videoProduction.purpleCowAgency.videos || [],
        date: "2023",
      },
      {
        id: "ig-video-3",
        title: "Purple Cow Philippines",
        description:
          "Brand highlight video for Purple Cow Philippines' social media presence.",
        category: "Social Media",
        subcategory: "Instagram Video",
        type: "video",
        client: "Purple Cow Agency",
        tools: ["Premiere Pro", "CapCut", "After Effects"],
        thumbnail: videoProduction.purpleCowPhilippines.thumbnail,
        assets: videoProduction.purpleCowPhilippines.videos || [],
        date: "2023",
      },
      {
        id: "ig-video-4",
        title: "Synergy768",
        description:
          "Promotional video created for Synergy768, highlighting their services and benefits.",
        category: "Social Media",
        subcategory: "Instagram Video",
        type: "video",
        client: "Purple Cow Agency",
        tools: ["Premiere Pro", "Adobe Audition", "CapCut"],
        thumbnail: videoProduction.synergy.thumbnail,
        assets: videoProduction.synergy.videos || [],
        date: "2023",
      },

      // Xeleqt Videos
      {
        id: "xeleqt-video-1",
        title: "Xeleqt Agility AVP",
        description:
          "Audio-visual presentation showcasing Xeleqt's agility products and services.",
        category: "Video Production",
        subcategory: "AVP",
        type: "video",
        client: "Xeleqt",
        tools: ["Premiere Pro", "Adobe Audition", "After Effects"],
        thumbnail: videoProduction.xeleqtAgility.thumbnail,
        assets: videoProduction.xeleqtAgility.videos || [],
        date: "2022",
      },
      {
        id: "xeleqt-video-2",
        title: "Xeleqt Aware AVP",
        description:
          "Audio-visual presentation for Xeleqt's Aware product line.",
        category: "Video Production",
        subcategory: "AVP",
        type: "video",
        client: "Xeleqt",
        tools: ["Premiere Pro", "Adobe Audition", "After Effects"],
        thumbnail: videoProduction.xeleqtAware.thumbnail,
        assets: videoProduction.xeleqtAware.videos || [],
        date: "2022",
      },
      {
        id: "xeleqt-video-3",
        title: "Xeleqt Mobility",
        description:
          "Product showcase video highlighting Xeleqt's mobility solutions.",
        category: "Video Production",
        subcategory: "Product Video",
        type: "video",
        client: "Xeleqt",
        tools: ["Premiere Pro", "After Effects", "CapCut"],
        thumbnail: videoProduction.xeleqtMobility.thumbnail,
        assets: videoProduction.xeleqtMobility.videos || [],
        date: "2022",
      },

      // Business Cards
      {
        id: "business-cards-1",
        title: "Modern Business Card Collection",
        description:
          "A collection of modern business card designs created for various clients.",
        category: "Print Design",
        subcategory: "Business Cards",
        type: "card",
        tools: ["Adobe Illustrator", "Photoshop", "InDesign"],
        thumbnail: graphicDesign.businessCards.thumbnail,
        assets: graphicDesign.businessCards.images || [],
        date: "2021-2023",
      },

      // Packaging Design
      {
        id: "packaging-1",
        title: "AIM Nuance Packaging",
        description:
          "Product packaging design for AIM Nuance, featuring clean, modern aesthetics.",
        category: "Packaging",
        type: "packaging",
        client: "AIM",
        tools: ["Adobe Illustrator", "Photoshop", "Mockup Design"],
        thumbnail: graphicDesign.packagingDesign.thumbnail,
        assets: graphicDesign.packagingDesign.images || [],
        date: "2022",
      },

      // Boligcenter.dk
      {
        id: "boligcenter-1",
        title: "Boligcenter.dk Garden Video",
        description:
          "Video created for Boligcenter.dk showcasing garden products and design.",
        category: "Video Production",
        subcategory: "Commercial",
        type: "video",
        client: "Boligcenter.dk",
        tools: ["Premiere Pro", "After Effects", "Color Grading"],
        thumbnail: videoProduction.boligcenterGarden.thumbnail,
        assets: videoProduction.boligcenterGarden.videos || [],
        date: "2022",
      },

      // Coffeescape Packaging
      {
        id: "coffeescape-packaging-1",
        title: "Coffeescape Cup Design",
        description:
          "Hot cup packaging design for Coffeescape, featuring their branding and aesthetic.",
        category: "Packaging",
        subcategory: "Cup Design",
        type: "packaging",
        client: "Coffeescape",
        tools: ["Adobe Illustrator", "Photoshop", "Mockup Design"],
        thumbnail: graphicDesign.coffeescapePackaging.thumbnail,
        assets: graphicDesign.coffeescapePackaging.images || [],
        date: "2021",
      },

      // Coffeescape Logo
      {
        id: "coffeescape-logo-1",
        title: "Coffeescape Logo Design",
        description:
          "Logo design for Coffeescape, featuring various versions and applications.",
        category: "Branding",
        subcategory: "Logo Design",
        type: "logo",
        client: "Coffeescape",
        tools: ["Adobe Illustrator", "Brand Strategy"],
        thumbnail: graphicDesign.coffeescapeLogo.thumbnail,
        assets: graphicDesign.coffeescapeLogo.images || [],
        date: "2021",
      },

      // Coffeescape Cards
      {
        id: "coffeescape-cards-1",
        title: "Coffeescape Business Cards & Brochure",
        description:
          "Business card and brochure designs for Coffeescape, featuring their brand identity and logo.",
        category: "Print Design",
        subcategory: "Business Cards",
        type: "card",
        client: "Coffeescape",
        tools: ["Adobe Illustrator", "InDesign", "Photoshop"],
        thumbnail: graphicDesign.coffeescapeCards.thumbnail,
        assets: graphicDesign.coffeescapeCards.images || [],
        date: "2021",
      },
      
      // FerryEasy Logo
      {
        id: "ferryeasy-logo-1",
        title: "FerryEasy Logo Design",
        description: "Logo design and branding for FerryEasy, featuring various versions and applications.",
        category: "Branding",
        subcategory: "Logo Design",
        type: "logo",
        tools: ["Adobe Illustrator", "Brand Strategy"],
        thumbnail: graphicDesign.ferryeasyLogo.thumbnail,
        assets: graphicDesign.ferryeasyLogo.images || [],
        date: "2022"
      },

      // Cebu Doc Shirt Design
      {
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
        date: "2022"
      },

      // SCS Practicum Shirt Design
      {
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
        date: "2023"
      },

      // Queen of Poblacion Intro
      {
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
        date: "2023"
      },

      // Return Zero VTR
      {
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
        date: "2023"
      },

      // TarteTart Box Mockups
      {
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
        date: "2022"
      },

      // Pilgrim Rise OBB
      {
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
        date: "2024"
      },
    ];
  }, []);

  // Initialize image preloader
  const { preloadAssets, preloadAssetsWithDelay } = useImagePreloader();

  // Preload all project assets in the background
  useEffect(() => {
    if (!projects.length) return;

    // Collect all assets from all projects
    const allAssets: string[] = [];
    projects.forEach(project => {
      if (project.thumbnail) allAssets.push(project.thumbnail);
      if (project.assets) allAssets.push(...project.assets);
    });

    // Prioritize visible projects first (thumbnails), then all assets
    const thumbnails = projects.map(p => p.thumbnail).filter(Boolean);
    
    // Preload thumbnails immediately with high priority
    preloadAssets(thumbnails, { priority: 'high', loading: 'eager' });
    
    // Preload all other assets after 2 seconds with low priority
    preloadAssetsWithDelay(allAssets, 2000);
  }, [projects, preloadAssets, preloadAssetsWithDelay]);

  // Function to preload a specific project's assets (called on hover)
  const preloadProjectAssets = (project: GraphicProject) => {
    const assetsToPreload = [project.thumbnail, ...(project.assets || [])];
    preloadAssets(assetsToPreload, { priority: 'high' });
  };

  // Generate unique categories and types for filtering
  const categories = useMemo(() => {
    return [...new Set(projects.map((p) => p.category))];
  }, [projects]);

  const types = useMemo(() => {
    return [...new Set(projects.map((p) => p.type))];
  }, [projects]);

  // Filter projects based on active filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeCategory && project.category !== activeCategory) {
        return false;
      }
      if (activeType && project.type !== activeType) {
        return false;
      }
      return true;
    });
  }, [projects, activeCategory, activeType]);

  // Group projects by category for display
  const projectsByCategory = useMemo(() => {
    const grouped: Record<string, GraphicProject[]> = {};

    filteredProjects.forEach((project) => {
      if (!grouped[project.category]) {
        grouped[project.category] = [];
      }
      grouped[project.category].push(project);
    });

    return grouped;
  }, [filteredProjects]);

  // Get the appropriate icon for a type
  const getTypeIcon = (type: GraphicProjectType) => {
    switch (type) {
      case "video":
        return <Play className="w-4 h-4" />;
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "logo":
        return <Coffee className="w-4 h-4" />;
      case "card":
        return <CreditCard className="w-4 h-4" />;
      case "packaging":
        return <Package className="w-4 h-4" />;
      case "apparel":
        return <Shirt className="w-4 h-4" />;
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  return (
    <CollapsibleSection
      title="Graphic Projects"
      icon={<Palette className="w-6 h-6" />}
      defaultOpen={defaultOpen}
      className={className}
      onToggle={onToggle}
    >
      <div className={`graphic-design-gallery py-6`}>
        {/* Filter Controls */}
        <div
          className="sticky top-20 z-10 bg-white/95 backdrop-blur-sm px-5 py-6 rounded-xl shadow-sm mb-10 border border-gray-100"
          style={{
            animation: "fadeInSimple 0.4s ease-out forwards"
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Filter className="w-5 h-5 text-[rgb(251,108,133)]" />
            <h3 className="text-base font-semibold text-gray-800">
              Filter Projects
            </h3>
          </div>
          {/* Category Filters */}
          <div className="mb-5">
            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-3 text-left">
              Categories
            </h4>
            <div className="flex flex-wrap gap-2.5 justify-start">
              <button
                onClick={() => setActiveCategory(null)}
                className={`filter-button px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-1 active:scale-95 ${
                  activeCategory === null ? "active" : ""
                }`}
              >
                All Categories
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`filter-button px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap text-left hover:-translate-y-1 active:scale-95 ${
                    activeCategory === category ? "active" : ""
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Project Types Filters */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-3 text-left">
              Project Types
            </h4>
            <div className="flex flex-wrap gap-2.5 justify-start">
              <button
                onClick={() => setActiveType(null)}
                className={`filter-button px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-1 active:scale-95 ${
                  activeType === null ? "active" : ""
                }`}
              >
                All Types
              </button>

              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`filter-button flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-1 active:scale-95 ${
                    activeType === type ? "active" : ""
                  }`}
                >
                  <div
                    className={
                      activeType === type
                        ? "text-white"
                        : "text-[rgb(251,108,133)]"
                    }
                  >
                    {getTypeIcon(type)}
                  </div>
                  <span className="capitalize">{type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Display filter results */}
        <div className="flex items-center gap-2 mb-8 px-1.5 text-sm text-gray-600">
          <Grid className="w-4 h-4 text-[rgb(251,108,133)]" />
          <span>
            Showing{" "}
            <span className="font-semibold">{filteredProjects.length}</span>{" "}
            projects
            {activeCategory && (
              <>
                {" "}
                in <span className="font-semibold">{activeCategory}</span>
              </>
            )}
            {activeType && (
              <>
                {" "}
                of type{" "}
                <span className="font-semibold capitalize">{activeType}</span>
              </>
            )}
          </span>
        </div>

        {/* Project Gallery */}
        {Object.keys(projectsByCategory).length === 0 ? (
          <div
            className="text-center py-16 px-6 bg-gray-50 rounded-2xl shadow-inner"
            style={{
              animation: "fadeInSimple 0.5s ease-out forwards",
            }}
          >
            <div
              className="flex justify-center mb-4"
            >
              <div className="bg-white p-4 rounded-full shadow-md">
                <Filter className="w-8 h-8 text-gray-300" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              No matching projects
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              We couldn't find any projects that match your current filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory(null);
                setActiveType(null);
              }}
              className="px-6 py-2.5 bg-[rgb(251,108,133)] text-white rounded-full hover:bg-[rgb(231,88,113)] transition-colors duration-300 shadow-md hover:scale-105 active:scale-95"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {Object.entries(projectsByCategory).map(
              ([category, categoryProjects]) => (
                <div
                  key={category}
                  className="category-section"
                  style={{
                    animation: "fadeInSimple 0.5s ease-out forwards",
                  }}
                >
                  <div className="divider bg-gradient-to-r from-[#fbd1d9]/30 to-transparent p-0.5 rounded-lg mb-6"></div>

                  <div className="flex items-start mb-8">
                    <div className="bg-[#fbd1d9] w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-md">
                      {category === "Social Media" && (
                        <Play className="w-5 h-5 text-[rgb(251,108,133)]" />
                      )}
                      {category === "Video Production" && (
                        <Play className="w-5 h-5 text-[rgb(251,108,133)]" />
                      )}
                      {category === "Print Design" && (
                        <CreditCard className="w-5 h-5 text-[rgb(251,108,133)]" />
                      )}
                      {category === "Packaging" && (
                        <Package className="w-5 h-5 text-[rgb(251,108,133)]" />
                      )}
                      {category === "Branding" && (
                        <Coffee className="w-5 h-5 text-[rgb(251,108,133)]" />
                      )}
                      {category === "Apparel Design" && (
                        <Shirt className="w-5 h-5 text-[rgb(251,108,133)]" />
                      )}
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {category}
                      <span className="ml-2 text-sm font-normal text-gray-500">
                        ({categoryProjects.length} projects)
                      </span>
                    </h2>
                  </div>

                  <div className="overflow-x-auto pb-4 hide-scrollbar">
                    <div className="grid-masonry gap-6">
                      {categoryProjects.map((project, index) => (
                        <GraphicProjectCard
                          key={project.id}
                          project={project}
                          index={index}
                          onClick={(project) => {
                            // Store current scroll position
                            window._lastScrollPosition = window.scrollY;
                            // Prevent default browser behavior and set modal state
                            setSelectedProject(project);
                          }}
                          onHover={preloadProjectAssets}
                          style={{ "--index": index } as React.CSSProperties}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Project Detail Modal - Rendered outside to ensure proper viewport centering */}
      {selectedProject && (
        <GraphicProjectModal
          project={selectedProject}
          onClose={handleCloseModal}
          isClosing={isModalClosing}
        />
      )}
    </CollapsibleSection>
  );
}
