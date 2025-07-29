import { useState, useMemo } from "react";
import { motion } from "framer-motion";
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
import "./GraphicGalleryStyles.css";

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
  const projects = useMemo<GraphicProject[]>(
    () => [
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
        thumbnail: "/src/assets/ig-videos-purplecow/Delish Deli - 1Nito Tower.mp4",
        assets: [
          "/src/assets/ig-videos-purplecow/Delish Deli - 1Nito Tower.mp4",
        ],
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
        thumbnail: "/src/assets/ig-videos-purplecow/Purple Cow Agency.mp4",
        assets: ["/src/assets/ig-videos-purplecow/Purple Cow Agency.mp4"],
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
        thumbnail: "/src/assets/ig-videos-purplecow/Purple Cow Philippines.mp4",
        assets: ["/src/assets/ig-videos-purplecow/Purple Cow Philippines.mp4"],
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
        thumbnail: "/src/assets/ig-videos-purplecow/Synergy768.mp4",
        assets: ["/src/assets/ig-videos-purplecow/Synergy768.mp4"],
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
        thumbnail: "/src/assets/xeleqt-videos/agility avp final.mp4",
        assets: ["/src/assets/xeleqt-videos/agility avp final.mp4"],
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
        thumbnail: "/src/assets/xeleqt-videos/aware avp final.mp4",
        assets: ["/src/assets/xeleqt-videos/aware avp final.mp4"],
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
        thumbnail: "/src/assets/xeleqt-videos/xeleqt mobility.mp4",
        assets: ["/src/assets/xeleqt-videos/xeleqt mobility.mp4"],
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
        thumbnail: "/src/assets/business-cards/bc-mockup-1.png",
        assets: [
          "/src/assets/business-cards/bc-mockup-1.png",
          "/src/assets/business-cards/bc-mockup-2.png",
          "/src/assets/business-cards/bc-mockup-3.png",
          "/src/assets/business-cards/bc-mockup-4.png",
          "/src/assets/business-cards/bc-mockup-5.png",
        ],
        date: "2021-2023",
      },
      {
        id: "business-cards-2",
        title: "Premium Business Card Design",
        description:
          "Premium business card designs with mockups showing various angles and presentations.",
        category: "Print Design",
        subcategory: "Business Cards",
        type: "card",
        tools: ["Adobe Illustrator", "Photoshop"],
        thumbnail: "/src/assets/business-cards/Business Card.png",
        assets: [
          "/src/assets/business-cards/Business Card.png",
          "/src/assets/business-cards/business card mockup 1.png",
          "/src/assets/business-cards/business card mockup 2.png",
          "/src/assets/business-cards/business card mockup 3.png",
        ],
        date: "2022",
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
        thumbnail: "/src/assets/packaging-design/aim nuance 1.png",
        assets: [
          "/src/assets/packaging-design/aim nuance 1.png",
          "/src/assets/packaging-design/aim nuance 2.png",
          "/src/assets/packaging-design/aim nuance 3.png",
          "/src/assets/packaging-design/box new perspective.png",
        ],
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
        thumbnail: "/src/assets/boligcenter.dk/is_your_garden_screaming_4.mp4",
        assets: ["/src/assets/boligcenter.dk/is_your_garden_screaming_4.mp4"],
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
        thumbnail: "/src/assets/coffeescape-packaging/mockup.jpg",
        assets: ["/src/assets/coffeescape-packaging/mockup.jpg"],
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
        thumbnail: "/src/assets/coffeescape-logo/logo - transparent.png",
        assets: [
          "/src/assets/coffeescape-logo/logo - transparent.png",
          "/src/assets/coffeescape-logo/logo - black transparent.png",
          "/src/assets/coffeescape-logo/logo with typeface - transparent.png",
          "/src/assets/coffeescape-logo/logo with typeface - black transparent.png",
          "/src/assets/coffeescape-logo/logo and typeface w ph.png",
          "/src/assets/coffeescape-logo/logo and typeface w ph - black.png",
          "/src/assets/coffeescape-logo/logo and typeface w ph - white.png",
        ],
        date: "2021",
      },

      // Coffeescape Cards
      {
        id: "coffeescape-cards-1",
        title: "Coffeescape Business Cards",
        description:
          "Business card designs for Coffeescape, featuring their brand identity and logo.",
        category: "Print Design",
        subcategory: "Business Cards",
        type: "card",
        client: "Coffeescape",
        tools: ["Adobe Illustrator", "InDesign"],
        thumbnail: "/src/assets/coffeescape-cards/business card front-01.png",
        assets: [
          "/src/assets/coffeescape-cards/business card front-01.png",
          "/src/assets/coffeescape-cards/to print - business cards-02 (back).png",
        ],
        date: "2021",
      },
      {
        id: "coffeescape-brochure-1",
        title: "Coffeescape Brochure",
        description:
          "Brochure design for Coffeescape, showcasing their products and services.",
        category: "Print Design",
        subcategory: "Brochure",
        type: "image",
        client: "Coffeescape",
        tools: ["Adobe Illustrator", "InDesign", "Photoshop"],
        thumbnail: "/src/assets/coffeescape-cards/coffeescape - brochure.png",
        assets: ["/src/assets/coffeescape-cards/coffeescape - brochure.png"],
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
        thumbnail: "/src/assets/ferryeasy-logo/ferryeasy-logo-01.png",
        assets: [
          "/src/assets/ferryeasy-logo/ferryeasy-logo-01.png",
          "/src/assets/ferryeasy-logo/ferryeasy-logo-02.png",
          "/src/assets/ferryeasy-logo/ferryeasy-logo-03.png",
          "/src/assets/ferryeasy-logo/ferryeasy-logo-04.png",
          "/src/assets/ferryeasy-logo/ferryeasy-logo-05.png"
        ],
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
        thumbnail: "/src/assets/cebudoc-shirt-design/new man front.png",
        assets: [
          "/src/assets/cebudoc-shirt-design/new man front.png",
          "/src/assets/cebudoc-shirt-design/new man back fac.png",
          "/src/assets/cebudoc-shirt-design/new man back soc.png",
          "/src/assets/cebudoc-shirt-design/new man front and back fac.png",
          "/src/assets/cebudoc-shirt-design/new man front and back soc.png",
          "/src/assets/cebudoc-shirt-design/new woman front.png",
          "/src/assets/cebudoc-shirt-design/new woman back fac.png",
          "/src/assets/cebudoc-shirt-design/new woman back soc.png",
          "/src/assets/cebudoc-shirt-design/new woman front and back fac.png",
          "/src/assets/cebudoc-shirt-design/new woman front and back soc.png"
        ],
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
        thumbnail: "/src/assets/scs-practicum-poloshirt-design/design 1 man front.png",
        assets: [
          "/src/assets/scs-practicum-poloshirt-design/design 1 man front.png",
          "/src/assets/scs-practicum-poloshirt-design/design 1 man back.png",
          "/src/assets/scs-practicum-poloshirt-design/design 1 woman front.png",
          "/src/assets/scs-practicum-poloshirt-design/design 1 woman back.png"
        ],
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
        thumbnail: "/src/assets/queen-of-poblacion-intro/queen poblacion into final.mp4",
        assets: ["/src/assets/queen-of-poblacion-intro/queen poblacion into final.mp4"],
        date: "2022"
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
        thumbnail: "/src/assets/return-zero-vtr/return zero vtr final.mp4",
        assets: ["/src/assets/return-zero-vtr/return zero vtr final.mp4"],
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
        thumbnail: "/src/assets/tartetart-box-mockups/tartetart box mockup.png",
        assets: [
          "/src/assets/tartetart-box-mockups/tarteart box mockup 1.png",
          "/src/assets/tartetart-box-mockups/tarteart box mockup 2.png",
          "/src/assets/tartetart-box-mockups/tarteart box mockup 3.png",
          "/src/assets/tartetart-box-mockups/tarteart box mockup 4.png",
          "/src/assets/tartetart-box-mockups/tarteart box mockup 5.png"
        ],
        date: "2022"
      },
    ],
    []
  );

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
      title="Graphic Design Projects"
      icon={<Palette className="w-6 h-6" />}
      defaultOpen={defaultOpen}
      className={className}
      onToggle={onToggle}
    >
      <div className={`graphic-design-gallery py-6`}>
        {/* Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="sticky top-20 z-10 bg-white/95 backdrop-blur-sm px-5 py-6 rounded-xl shadow-sm mb-10 border border-gray-100"
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
              <motion.button
                whileHover={{
                  y: -2,
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(null)}
                className={`filter-button px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === null ? "active" : ""
                }`}
              >
                All Categories
              </motion.button>

              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{
                    y: -2,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`filter-button px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap text-left ${
                    activeCategory === category ? "active" : ""
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Project Types Filters */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-3 text-left">
              Project Types
            </h4>
            <div className="flex flex-wrap gap-2.5 justify-start">
              <motion.button
                whileHover={{
                  y: -2,
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveType(null)}
                className={`filter-button px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeType === null ? "active" : ""
                }`}
              >
                All Types
              </motion.button>

              {types.map((type) => (
                <motion.button
                  key={type}
                  whileHover={{
                    y: -2,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveType(type)}
                  className={`filter-button flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

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
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 px-6 bg-gray-50 rounded-2xl shadow-inner"
          >
            <motion.div
              className="flex justify-center mb-4"
              animate={{
                rotate: [0, -5, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <div className="bg-white p-4 rounded-full shadow-md">
                <Filter className="w-8 h-8 text-gray-300" />
              </div>
            </motion.div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              No matching projects
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              We couldn't find any projects that match your current filters.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveCategory(null);
                setActiveType(null);
              }}
              className="px-6 py-2.5 bg-[rgb(251,108,133)] text-white rounded-full hover:bg-[rgb(231,88,113)] transition-colors duration-300 shadow-md"
            >
              Clear all filters
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-16">
            {Object.entries(projectsByCategory).map(
              ([category, categoryProjects]) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className="category-section"
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
                            document.body.style.overflow = 'hidden'; // Lock scrolling
                            setSelectedProject(project);
                          }}
                          style={{ "--index": index } as React.CSSProperties}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <GraphicProjectModal
            project={selectedProject}
            onClose={handleCloseModal}
            isClosing={isModalClosing}
          />
        )}
      </div>
    </CollapsibleSection>
  );
}
