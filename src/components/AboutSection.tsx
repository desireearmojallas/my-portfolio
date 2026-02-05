import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../config/cloudinaryAssets';
import { 
  ArrowRight,
  Eye,
  Palette,
  Code,
  Sparkles,
  Heart,
  Search,
  X
} from 'lucide-react';
import {
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobeindesign,
  SiAdobepremierepro,
  SiAdobeaftereffects,
  SiFigma,
  SiCanva,
  SiFramer,
  SiSketch,
  SiReact,
  SiTypescript,
  SiFlutter,
  SiJavascript,
  SiDart,
  SiHtml5,
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiFirebase,
  SiMongodb,
  SiMysql,
  SiCloudinary,
  SiGithub,
  SiVercel,
  SiNetlify,
  SiAndroidstudio,
  SiXcode,
  SiPostman,
  SiWebpack,
  SiEslint,
  SiReplit,
  SiWix,
  SiShopify,
  SiWordpress
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { FiTool } from 'react-icons/fi';

interface AboutSectionProps {
  role: 'designer' | 'developer';
}

export default function AboutSection({ role }: AboutSectionProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [showCompleteStack, setShowCompleteStack] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState<string>('All');

  // Define a Tool interface for type safety
  interface Tool {
    name: string;
    level: string;
    desc: string;
    icon?: React.ComponentType<{ className?: string }>;
  }

  // Helper function to filter tools by search query and expertise level
  const filterTools = (tools: Tool[]) => {
    let filteredTools = tools;
    
    // Filter by expertise level
    if (expertiseFilter !== 'All') {
      filteredTools = filteredTools.filter(tool => tool.level === expertiseFilter);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredTools = filteredTools.filter(tool => 
        tool.name.toLowerCase().includes(query) || 
        tool.desc.toLowerCase().includes(query)
      );
    }
    
    return filteredTools;
  };

  // Dynamic content based on selected role
  const roleContent = {
    designer: {
      title: "End-to-End Experience Architect",
      subtitle: "with Deep Design Expertise",
      description: "...and you can call me Des. I design complete digital experiences that drive real business results. But here's what makes me different: I also build them. This means your designs aren't just beautiful—they're technically feasible and optimized for performance.",
      highlight: "Design-focused, development-informed",
      processEmphasis: "design and user experience",
      callout: "🎨 Design-focused with development expertise — I create beautiful designs that actually work in code",
      serviceOrder: ['Graphic Design', 'Design + Code Combo', 'Social Media Management', 'Web Development', 'Mobile Apps'],
      highlightedServices: ['Graphic Design', 'Design + Code Combo']
    },
    developer: {
      title: "End-to-End Experience Architect", 
      subtitle: "with Full-Stack Development Power",
      description: "...and you can call me Des. I build scalable, high-performance applications that solve real business problems. But here's my edge: I also design them. This means your applications aren't just functional—they're beautiful, intuitive, and user-centered.",
      highlight: "Development-focused, design-enhanced",
      processEmphasis: "technical architecture and development",
      callout: "💻 Development-focused with design sensibility — I build functional apps that users actually love",
      serviceOrder: ['Web Development', 'Mobile Apps', 'Design + Code Combo', 'Social Media Management', 'Graphic Design'],
      highlightedServices: ['Web Development', 'Design + Code Combo']
    }
  };

  const currentContent = roleContent[role];

  const craftSteps = [
    {
      title: "Strategize",
      description: role === 'designer' 
        ? "Deep user research and design strategy to create experiences that resonate with your audience."
        : "Deep technical analysis and architecture planning to build solutions that scale with your business.",
      icon: Eye,
      gradient: "from-pink-50 to-rose-50"
    },
    {
      title: role === 'designer' ? "Design" : "Architect", 
      description: role === 'designer'
        ? "Craft user experiences that balance aesthetic excellence with conversion optimization and technical feasibility."
        : "Design system architecture that balances performance, scalability, and beautiful user interfaces.",
      icon: role === 'designer' ? Palette : Code,
      gradient: "from-rose-50 to-pink-50"
    },
    {
      title: role === 'designer' ? "Prototype" : "Develop",
      description: role === 'designer'
        ? "Build interactive prototypes and design systems that developers can implement flawlessly."
        : "Build scalable, high-performance solutions using modern technologies and design best practices.",
      icon: role === 'designer' ? Sparkles : Code,
      gradient: "from-pink-50 to-purple-50"
    },
    {
      title: "Deliver",
      description: role === 'designer'
        ? "Launch pixel-perfect designs with ongoing optimization and seamless developer handoff."
        : "Deploy complete solutions with beautiful interfaces and ongoing optimization for maximum business impact.",
      icon: Sparkles,
      gradient: "from-purple-50 to-pink-50"
    }
  ];

  const interests = [
    { title: "Photography", description: "Capturing moments through light and composition", emoji: "📸" },
    { title: "Music", description: "Exploring rhythm and melody in creative work", emoji: "🎵" },
    { title: "Code", description: "Building interactive prototypes and experiments", emoji: "💻" },
    { title: "Reading", description: "Design theory, tech trends, and inspiring stories", emoji: "📚" },
    { title: "Travel", description: "Experiencing global design and culture", emoji: "✈️" }
  ];

  // Suppress unused parameter warning
  console.log('About section for role:', role);

  return (
    <section className="section-padding bg-gradient-to-br from-white via-pink-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Subtle background elements matching your theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-100/40 to-rose-100/40 rounded-full blur-3xl animate-pulse-soft"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-100/30 to-pink-100/30 rounded-full blur-3xl animate-float"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        {/* Hero Introduction - Heading First, Then Photo + Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="mb-32 lg:mb-40"
        >
          {/* Main Heading First */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="text-center mb-24 lg:mb-32"
          >
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-outfit font-light text-gray-800 mb-6 leading-[1.2]"
            >
              {currentContent.title}{' '}
              <span className="bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] bg-clip-text text-transparent font-medium">
                {currentContent.subtitle}
              </span>
            </h1>

            {/* Photo + Name Below */}
          <div className="flex flex-col items-center gap-8 lg:gap-12">
            {/* Professional Photo - Centered */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <img
                src={profile.formal}
                alt="Desiree Armojallas - Software Developer & UX/UI Designer"
                className="w-72 h-96 md:w-80 md:h-[420px] lg:w-96 lg:h-[500px] rounded-3xl object-cover shadow-2xl shadow-pink-500/30 [mask-image:radial-gradient(ellipse_at_center,black_95%,transparent_100%)]"
              />
            </motion.div>

            {/* Name Introduction - Below Photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-light text-gray-700 mb-3">
                I'm{' '}
                <span className="bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] bg-clip-text text-transparent font-medium">
                  Desiree Armojallas
                </span>
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-500 font-light tracking-wide">
                Based in the Philippines PH
              </p>
            </motion.div>
          </div>
        </motion.div>
            
            {/* Description under heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="space-y-4 lg:space-y-6 max-w-3xl mx-auto text-center"
            >
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                {currentContent.description}
              </p>
              
              <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                When design and technology work as one, extraordinary results happen.
              </p>
            </motion.div>
          </motion.div>

          

        {/* My Craft Section - Apple card design */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                       rounded-2xl flex items-center justify-center shadow-lg animate-float"
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-outfit font-light text-gray-800 mb-4">
              My Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From {currentContent.processEmphasis} to final delivery — a proven approach that delivers results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {craftSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveCard(index)}
                onHoverEnd={() => setActiveCard(null)}
                className="group relative h-full cursor-pointer"
              >
                <div className={`gradient-card border border-pink-100/50 rounded-2xl p-8 h-full 
                               transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-pink-500/10 
                               hover:-translate-y-2 bg-gradient-to-br ${step.gradient}`}>
                  <div className="w-14 h-14 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 
                                group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <step.icon className="w-7 h-7 text-[rgb(251,108,133)]" />
                  </div>
                  
                  <h3 className="text-xl font-outfit font-semibold text-gray-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Apple-style hover indicator */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: activeCard === index ? "100%" : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="h-0.5 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] mt-4 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Section - Apple Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-20">
            <motion.h2 
              className="text-4xl md:text-5xl font-outfit font-light text-gray-800 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              Built with{' '}
              <span className="bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] bg-clip-text text-transparent font-medium">
                precision
              </span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              Every project leverages industry-leading tools and cutting-edge technologies 
              to deliver experiences that are both beautiful and performant.
            </motion.p>
          </div>

          {/* Featured Tech Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {[
              {
                title: "Design",
                description: "Adobe Creative Suite professional & modern tools",
                icon: "🎨",
                gradient: "from-pink-500/10 to-rose-500/10",
                border: "border-pink-200/30",
                highlight: "group-hover:border-[rgb(251,108,133)]/40"
              },
              {
                title: "Development", 
                description: "Modern frameworks for robust applications",
                icon: "⚡",
                gradient: "from-purple-500/10 to-indigo-500/10",
                border: "border-purple-200/30",
                highlight: "group-hover:border-purple-400/40"
              },
              {
                title: "Platform",
                description: "Deployment and collaboration ecosystems", 
                icon: "🚀",
                gradient: "from-emerald-500/10 to-teal-500/10",
                border: "border-emerald-200/30",
                highlight: "group-hover:border-emerald-400/40"
              }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative bg-white/60 backdrop-blur-sm rounded-2xl border ${category.border} 
                          ${category.highlight} transition-all duration-500 p-8 text-center h-full
                          hover:shadow-xl hover:shadow-gray-500/10`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-2xl opacity-0 
                               group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-outfit font-semibold text-gray-800 mb-3">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Complete Tech Stack - Comprehensive List */}
          {showCompleteStack && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white via-gray-50/30 to-pink-50/20 rounded-3xl 
                     border border-gray-200/50 p-8 md:p-12 max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-outfit font-light text-gray-800 mb-4">
                Complete Tech Stack
              </h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                            mx-auto rounded-full" />
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Every tool and technology I use to create exceptional digital experiences
              </p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-8 max-w-md mx-auto"
              >
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[rgb(251,108,133)] transition-colors">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search tools and platforms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 
                             focus:border-[rgb(251,108,133)]/50 focus:outline-none focus:ring-2 focus:ring-[rgb(251,108,133)]/20
                             transition-all duration-300 text-sm placeholder-gray-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Clear search"
                      aria-label="Clear search"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Expertise Level Filters */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-6 flex flex-wrap justify-center gap-3"
              >
                {['All', 'Expert', 'Advanced', 'Intermediate'].map((level) => (
                  <motion.button
                    key={level}
                    onClick={() => setExpertiseFilter(level)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 cursor-pointer ${
                      expertiseFilter === level
                        ? level === 'Expert'
                          ? 'bg-green-500 text-white shadow-md shadow-green-200'
                          : level === 'Advanced'
                          ? 'bg-blue-500 text-white shadow-md shadow-blue-200'
                          : level === 'Intermediate'
                          ? 'bg-purple-500 text-white shadow-md shadow-purple-200'
                          : 'bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] text-white shadow-md shadow-pink-200'
                        : 'bg-white/70 text-gray-600 border border-gray-200/50 hover:border-gray-300 hover:bg-white'
                    }`}
                  >
                    {level}
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Organized Tech Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Design Tools - Adobe Professional */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-xl flex items-center justify-center">
                    <Palette className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-outfit font-semibold text-gray-800">Design Tools</h4>
                    <p className="text-xs text-pink-600 font-medium">Adobe Creative Professional</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {filterTools([
                    { name: 'Adobe Photoshop', level: 'Expert', desc: 'Photo Editing & Digital Art', icon: SiAdobephotoshop },
                    { name: 'Adobe Illustrator', level: 'Expert', desc: 'Vector Graphics & Logo Design', icon: SiAdobeillustrator },
                    { name: 'Adobe InDesign', level: 'Advanced', desc: 'Layout & Publication Design', icon: SiAdobeindesign },
                    { name: 'Adobe Premiere Pro', level: 'Advanced', desc: 'Video Editing & Production', icon: SiAdobepremierepro },
                    { name: 'Adobe After Effects', level: 'Intermediate', desc: 'Motion Graphics & Animation', icon: SiAdobeaftereffects },
                    { name: 'Figma', level: 'Expert', desc: 'UI/UX Design & Prototyping', icon: SiFigma },
                    { name: 'Canva', level: 'Expert', desc: 'Quick Design & Social Media', icon: SiCanva },
                    { name: 'Framer', level: 'Intermediate', desc: 'Advanced Prototyping', icon: SiFramer },
                    { name: 'Sketch', level: 'Intermediate', desc: 'Vector Design & UI', icon: SiSketch },
                    { name: 'Principle', level: 'Intermediate', desc: 'Interaction Design', icon: FiTool }
                  ]).map((tool, index) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.03 }}
                      viewport={{ once: true }}
                      className={`group flex items-center justify-between p-3 bg-white/50 backdrop-blur-sm 
                               rounded-xl border transition-all duration-300 ${
                                 tool.name.includes('Adobe') 
                                   ? 'border-pink-200/70 hover:border-pink-300/70 hover:bg-pink-50/50 shadow-sm' 
                                   : 'border-pink-100/50 hover:border-pink-200/50 hover:bg-white/70'
                               }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {tool.icon && (
                              <tool.icon className="w-5 h-5 text-gray-700 flex-shrink-0" />
                            )}
                            <h5 className={`font-outfit font-medium text-sm ${
                              tool.name.includes('Adobe') ? 'text-gray-900' : 'text-gray-800'
                            }`}>
                              {tool.name}
                            </h5>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            tool.level === 'Expert' 
                              ? 'bg-green-100 text-green-700' 
                              : tool.level === 'Advanced' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {tool.level}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{tool.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Development Tools */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center">
                    <Code className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-outfit font-semibold text-gray-800">Development</h4>
                </div>
                
                <div className="space-y-3">
                  {filterTools([
                    { name: 'React', level: 'Expert', desc: 'Frontend Framework', icon: SiReact },
                    { name: 'TypeScript', level: 'Expert', desc: 'Type-Safe JavaScript', icon: SiTypescript },
                    { name: 'Flutter', level: 'Expert', desc: 'Cross-Platform Mobile', icon: SiFlutter },
                    { name: 'JavaScript (ES6+)', level: 'Expert', desc: 'Modern Web Development', icon: SiJavascript },
                    { name: 'Dart', level: 'Advanced', desc: 'Flutter Programming Language', icon: SiDart },
                    { name: 'HTML5 & CSS3', level: 'Expert', desc: 'Web Fundamentals', icon: SiHtml5 },
                    { name: 'Next.js', level: 'Advanced', desc: 'React Meta-Framework', icon: SiNextdotjs },
                    { name: 'Vite', level: 'Advanced', desc: 'Build Tool & Dev Server', icon: SiVite },
                    { name: 'Tailwind CSS', level: 'Expert', desc: 'Utility-First CSS', icon: SiTailwindcss },
                    { name: 'Framer Motion', level: 'Advanced', desc: 'React Animation Library', icon: SiFramer },
                    { name: 'Node.js', level: 'Intermediate', desc: 'Backend Runtime', icon: SiNodedotjs },
                    { name: 'Python', level: 'Intermediate', desc: 'General Purpose Language', icon: SiPython }
                  ]).map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.9 + index * 0.03 }}
                      viewport={{ once: true }}
                      className="group flex items-center justify-between p-3 bg-white/50 backdrop-blur-sm 
                               rounded-xl border border-purple-100/50 hover:border-purple-200/50 
                               hover:bg-white/70 transition-all duration-300"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          {tech.icon && (
                            <tech.icon className="w-5 h-5 text-gray-700 flex-shrink-0" />
                          )}
                          <h5 className="font-outfit font-medium text-gray-800 text-sm">{tech.name}</h5>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            tech.level === 'Expert' 
                              ? 'bg-green-100 text-green-700' 
                              : tech.level === 'Advanced' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {tech.level}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{tech.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Tools & Platforms */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="text-lg font-outfit font-semibold text-gray-800">Tools & Platforms</h4>
                </div>
                
                <div className="space-y-3">
                  {filterTools([
                    { name: 'Firebase', level: 'Advanced', desc: 'Backend-as-a-Service', icon: SiFirebase },
                    { name: 'MongoDB', level: 'Advanced', desc: 'NoSQL Database', icon: SiMongodb },
                    { name: 'MySQL', level: 'Advanced', desc: 'Relational Database', icon: SiMysql },
                    { name: 'Cloudinary', level: 'Advanced', desc: 'Media Management & CDN', icon: SiCloudinary },
                    { name: 'Git & GitHub', level: 'Advanced', desc: 'Version Control & Collaboration', icon: SiGithub },
                    { name: 'VS Code', level: 'Expert', desc: 'Code Editor & IDE', icon: VscVscode },
                    { name: 'Vercel', level: 'Advanced', desc: 'Frontend Deployment', icon: SiVercel },
                    { name: 'Netlify', level: 'Advanced', desc: 'Static Site Hosting', icon: SiNetlify },
                    { name: 'Replit', level: 'Advanced', desc: 'Cloud Development Environment', icon: SiReplit },
                    { name: 'Android Studio', level: 'Intermediate', desc: 'Android Development', icon: SiAndroidstudio },
                    { name: 'Xcode', level: 'Intermediate', desc: 'iOS Development', icon: SiXcode },
                    { name: 'Postman', level: 'Intermediate', desc: 'API Testing & Development', icon: SiPostman },
                    { name: 'Webpack', level: 'Intermediate', desc: 'Module Bundler', icon: SiWebpack },
                    { name: 'ESLint & Prettier', level: 'Advanced', desc: 'Code Quality & Formatting', icon: SiEslint },
                    { name: 'Flutter Flow', level: 'Intermediate', desc: 'Low-Code Flutter App Builder', icon: SiFlutter },
                    { name: 'MCP', level: 'Advanced', desc: 'Model Context Protocol', icon: FiTool },
                    { name: 'Chrome DevTools', level: 'Advanced', desc: 'Browser Debugging', icon: SiReact },
                    { name: 'Wix', level: 'Intermediate', desc: 'Website Builder Platform', icon: SiWix },
                    { name: 'Shopify', level: 'Advanced', desc: 'E-commerce Platform', icon: SiShopify },
                    { name: 'WordPress', level: 'Advanced', desc: 'Content Management System', icon: SiWordpress }
                  ]).map((platform, index) => (
                    <motion.div
                      key={platform.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 1.0 + index * 0.03 }}
                      viewport={{ once: true }}
                      className="group flex items-center justify-between p-3 bg-white/50 backdrop-blur-sm 
                               rounded-xl border border-emerald-100/50 hover:border-emerald-200/50 
                               hover:bg-white/70 transition-all duration-300"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          {platform.icon && (
                            <platform.icon className="w-5 h-5 text-gray-700 flex-shrink-0" />
                          )}
                          <h5 className="font-outfit font-medium text-gray-800 text-sm">{platform.name}</h5>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            platform.level === 'Expert' 
                              ? 'bg-green-100 text-green-700' 
                              : platform.level === 'Advanced' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {platform.level}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{platform.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Specialization Areas */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="border-t border-gray-200/50 pt-12 mt-12"
            >
              <div className="text-center mb-8">
                <h4 className="text-lg font-outfit font-semibold text-gray-700 mb-6">
                  Areas of Specialization
                </h4>
                <p className="text-sm text-gray-500 max-w-2xl mx-auto">
                  Core competencies where I deliver exceptional results
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'Mobile App Development',
                  'UI/UX Design',
                  'Frontend Development',
                  'Cross-Platform Solutions',
                  'Design Systems',
                  'Motion Graphics',
                  'Video Production',
                  'Brand Identity',
                  'Database Design',
                  'API Integration',
                  'Responsive Design',
                  'Performance Optimization'
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.2 + index * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="px-4 py-2.5 bg-gradient-to-r from-gray-100/80 to-white/80 
                             border border-gray-200/50 rounded-full text-sm font-medium text-gray-700
                             hover:border-[rgb(251,108,133)]/30 hover:text-[rgb(251,108,133)]
                             hover:shadow-md hover:bg-white transition-all duration-300 backdrop-blur-sm
                             cursor-pointer"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          )}

          {/* Toggle Button for Complete Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              onClick={() => setShowCompleteStack(!showCompleteStack)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group px-10 py-5 bg-white/90 hover:bg-white text-gray-700 
                       rounded-2xl font-outfit font-medium text-base border border-gray-200/50
                       hover:border-[rgb(251,108,133)]/30 hover:text-[rgb(251,108,133)]
                       transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-200/50
                       flex items-center justify-center gap-3 mx-auto shadow-lg hover:shadow-xl
                       cursor-pointer backdrop-blur-sm"
            >
              <span>
                {showCompleteStack ? 'Hide' : 'View'} Complete Tech Stack
              </span>
              <motion.div
                animate={{ rotate: showCompleteStack ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="w-5 h-5 rotate-90" />
              </motion.div>
            </motion.button>
            
            <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto">
              {showCompleteStack 
                ? 'Showing all tools and technologies I use professionally'
                : 'Click to see my complete toolkit including Adobe Creative Suite details'
              }
            </p>
          </motion.div>

          {/* Simple Statement - Apple Style */}
          {!showCompleteStack && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Every tool, every framework, every choice is made with one goal:{' '}
              <span className="text-gray-800 font-medium">
                creating experiences that users love and businesses value.
              </span>
            </p>
          </motion.div>
          )}
        </motion.div>

        {/* Beyond Design Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-outfit font-light text-gray-800 mb-6">
              Beyond Design
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Outside of work, I'm constantly exploring creativity in motion — from coding small UI experiments 
              to composing music and capturing moments through photography. These projects keep my perspective 
              fresh, grounded, and always learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group"
              >
                <div className="gradient-card border border-pink-100/50 rounded-xl p-6 h-full 
                              hover:shadow-xl hover:shadow-pink-500/5 transition-all duration-300 
                              bg-gradient-to-br from-white to-pink-50/30">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {interest.emoji}
                  </div>
                  
                  <h3 className="text-lg font-outfit font-semibold text-gray-800 mb-2">
                    {interest.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {interest.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Client Testimonials - Premium Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-outfit font-light text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              Client Feedback
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              Authentic recommendations from professionals I've worked with
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-gray-200/50 
                          shadow-xl hover:shadow-2xl transition-all duration-300">
              
              {/* LinkedIn Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-[#0077B5] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">in</span>
                </div>
                <div>
                  <h3 className="font-outfit font-semibold text-gray-800 text-lg">LinkedIn Recommendation</h3>
                  <p className="text-gray-500 text-sm">Professional endorsement</p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 text-xl leading-relaxed mb-8 italic">
                "It gives me the utmost pleasure to recommend Desiree because we have worked together on the social media content for our company. She is able to take my concepts and turn them into creative, functional designs that speak to our intended audience."
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200/50">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full 
                              flex items-center justify-center">
                  <span className="text-[rgb(251,108,133)] font-semibold text-lg">JT</span>
                </div>
                <div>
                  <p className="font-outfit font-semibold text-gray-800">Jochelle Tumulak</p>
                  <p className="text-gray-600 text-sm">Naval Architect and Marine Engineer</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Service Tiers - Premium Positioning */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-outfit font-light text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              What I Deliver
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              {role === 'designer' 
                ? "Design and development services that bring your visual ideas to life"
                : "Development and design services that turn your technical visions into reality"
              }
            </motion.p>
            
            {/* Role-specific callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto mt-6"
            >
              <div className="bg-gradient-to-r from-gray-50 to-pink-50/30 rounded-2xl p-6 border border-gray-200/50">
                <p className="text-gray-700 text-center">
                  {currentContent.callout}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(() => {
              // Define base services
              const baseServices = [
                {
                  title: "Graphic Design",
                  icon: "🎨",
                  description: "Visual designs that communicate your message effectively across all platforms.",
                  deliverables: [
                    "Social media graphics & posts",
                    "Digital ads & banners", 
                    "Print materials (flyers, brochures)",
                    "Brand identity & logos",
                    "Marketing materials"
                  ],
                  perfect_for: "Businesses needing visual content"
                },
                {
                  title: "Social Media Management",
                  icon: "📱",
                  description: "Complete social media presence that engages your audience and grows your brand.",
                  deliverables: [
                    "Content strategy & planning",
                    "Post creation & scheduling",
                    "Graphics & visual content",
                    "Community engagement",
                    "Performance analytics"
                  ],
                  perfect_for: "Brands wanting active social presence"
                },
                {
                  title: "Web Development",
                  icon: "💻",
                  description: "Custom websites and web applications built with modern technology.",
                  deliverables: [
                    "Responsive websites",
                    "E-commerce platforms",
                    "Web applications",
                    "Performance optimization",
                    "Mobile-friendly design"
                  ],
                  perfect_for: "Businesses needing online presence"
                },
                {
                  title: "Mobile Apps",
                  icon: "📲",
                  description: "Native and cross-platform mobile applications for iOS and Android.",
                  deliverables: [
                    "iOS & Android apps",
                    "Cross-platform solutions",
                    "App Store deployment",
                    "User interface design",
                    "Backend integration"
                  ],
                  perfect_for: "Companies wanting mobile solutions"
                },
                {
                  title: "Design + Code Combo",
                  icon: "⚡",
                  description: "Complete digital solutions where I handle both design and development seamlessly.",
                  deliverables: [
                    "Full website design & build",
                    "App design & development",
                    "Brand identity + website",
                    "Social media + landing pages",
                    "Print + digital campaigns"
                  ],
                  perfect_for: "Projects needing unified approach"
                }
              ];

              // Order services based on role and set highlights
              const orderedServices = currentContent.serviceOrder.map(title => {
                const service = baseServices.find(s => s.title === title);
                if (!service) return null;
                return {
                  ...service,
                  highlight: currentContent.highlightedServices.includes(title)
                };
              }).filter((service): service is NonNullable<typeof service> => service !== null);

              return orderedServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
                className={`relative rounded-2xl p-8 border transition-all duration-300 h-full ${
                  service.highlight 
                    ? 'bg-gradient-to-br from-[rgb(251,108,133)]/5 to-[rgb(245,89,119)]/5 border-[rgb(251,108,133)]/30 shadow-xl' 
                    : 'bg-white/60 backdrop-blur-sm border-gray-200/50 hover:shadow-lg'
                }`}
              >
                {service.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                                   text-white px-4 py-1 rounded-full text-xs font-medium">
                      Popular Choice
                    </span>
                  </div>
                )}
                
                <div className="mb-6">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-outfit font-semibold text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">What you get:</h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, dIndex) => (
                      <li key={dIndex} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-[rgb(251,108,133)] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200/50 pt-4 mt-auto">
                  <p className="text-xs text-gray-500">
                    <strong>Perfect for:</strong> {service.perfect_for}
                  </p>
                </div>
              </motion.div>
            ));
            })()}
          </div>
        </motion.div>

        {/* Closing Section - Apple-inspired CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="gradient-card border border-pink-100/50 rounded-3xl p-8 md:p-12 lg:p-16 max-w-5xl mx-auto 
                        bg-gradient-to-br from-white via-pink-50/20 to-purple-50/20 shadow-xl overflow-visible">
            <motion.h2 
              className="text-4xl md:text-5xl font-outfit font-light text-gray-800 mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              Transform your business with{' '}
              <span className="bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] bg-clip-text text-transparent font-medium">
                design that converts?
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              From startups to established companies, I help businesses increase revenue through strategic design and development. 
              Let's discuss your project and create solutions that drive real results.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                       text-white px-10 py-5 rounded-full font-outfit font-semibold text-xl 
                       hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 
                       focus:outline-none focus:ring-4 focus:ring-pink-500/20 btn-glow cursor-pointer"
            >
              🎯 See My Success Stories
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}