import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Palette,
  Code,
  Sparkles,
  Search,
  X,
  ChevronDown
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

interface TechStackSectionProps {
  role: 'designer' | 'developer';
}

interface Tool {
  name: string;
  level: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface CategoryGroup {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  borderColor: string;
  tools: Tool[];
}

export default function TechStackSection({ role }: TechStackSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [stackView, setStackView] = useState<'designer' | 'developer' | 'all'>(role);
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({
    'design': false,
    'development': false,
    'platforms': false
  });

  useEffect(() => {
    setStackView(role);
  }, [role]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const filterTools = (tools: Tool[]) => {
    let filteredTools = tools;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredTools = filteredTools.filter(tool =>
        tool.name.toLowerCase().includes(query)
      );
    }

    return filteredTools;
  };

  // Design tools
  const designTools: Tool[] = [
    { name: 'Adobe Photoshop', level: 'Expert', icon: SiAdobephotoshop },
    { name: 'Adobe Illustrator', level: 'Expert', icon: SiAdobeillustrator },
    { name: 'Figma', level: 'Expert', icon: SiFigma },
    { name: 'Canva', level: 'Expert', icon: SiCanva },
    { name: 'Adobe InDesign', level: 'Advanced', icon: SiAdobeindesign },
    { name: 'Adobe Premiere Pro', level: 'Advanced', icon: SiAdobepremierepro },
    { name: 'Adobe After Effects', level: 'Intermediate', icon: SiAdobeaftereffects },
    { name: 'Framer', level: 'Intermediate', icon: SiFramer },
    { name: 'Sketch', level: 'Intermediate', icon: SiSketch },
  ];

  // Development tools
  const developmentTools: Tool[] = [
    { name: 'React', level: 'Expert', icon: SiReact },
    { name: 'TypeScript', level: 'Expert', icon: SiTypescript },
    { name: 'Flutter', level: 'Expert', icon: SiFlutter },
    { name: 'JavaScript', level: 'Expert', icon: SiJavascript },
    { name: 'HTML5 & CSS3', level: 'Expert', icon: SiHtml5 },
    { name: 'Tailwind CSS', level: 'Expert', icon: SiTailwindcss },
    { name: 'VS Code', level: 'Expert', icon: VscVscode },
    { name: 'Next.js', level: 'Advanced', icon: SiNextdotjs },
    { name: 'Vite', level: 'Advanced', icon: SiVite },
    { name: 'Framer Motion', level: 'Advanced', icon: SiFramer },
    { name: 'Dart', level: 'Advanced', icon: SiDart },
    { name: 'Node.js', level: 'Intermediate', icon: SiNodedotjs },
    { name: 'Python', level: 'Intermediate', icon: SiPython },
  ];

  // Platform & DevOps tools
  const platformTools: Tool[] = [
    { name: 'Firebase', level: 'Advanced', icon: SiFirebase },
    { name: 'MongoDB', level: 'Advanced', icon: SiMongodb },
    { name: 'Git & GitHub', level: 'Advanced', icon: SiGithub },
    { name: 'MySQL', level: 'Advanced', icon: SiMysql },
    { name: 'Vercel', level: 'Advanced', icon: SiVercel },
    { name: 'Netlify', level: 'Advanced', icon: SiNetlify },
    { name: 'ESLint & Prettier', level: 'Advanced', icon: SiEslint },
    { name: 'Shopify', level: 'Advanced', icon: SiShopify },
    { name: 'Cloudinary', level: 'Advanced', icon: SiCloudinary },
    { name: 'WordPress', level: 'Advanced', icon: SiWordpress },
    { name: 'Replit', level: 'Advanced', icon: SiReplit },
    { name: 'Postman', level: 'Intermediate', icon: SiPostman },
    { name: 'Webpack', level: 'Intermediate', icon: SiWebpack },
    { name: 'Android Studio', level: 'Intermediate', icon: SiAndroidstudio },
    { name: 'Xcode', level: 'Intermediate', icon: SiXcode },
    { name: 'Wix', level: 'Intermediate', icon: SiWix },
  ];

  const categoryGroups: CategoryGroup[] = [
    {
      id: 'design',
      title: 'Design Tools',
      subtitle: 'Adobe Creative Professional',
      icon: Palette,
      gradient: 'from-pink-500/20 to-rose-500/20',
      borderColor: 'border-pink-200/50',
      tools: designTools
    },
    {
      id: 'development',
      title: 'Development',
      subtitle: 'Modern Frameworks & Languages',
      icon: Code,
      gradient: 'from-purple-500/20 to-indigo-500/20',
      borderColor: 'border-purple-200/50',
      tools: developmentTools
    },
    {
      id: 'platforms',
      title: 'Platforms & Tools',
      subtitle: 'Deployment & Collaboration',
      icon: Sparkles,
      gradient: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-emerald-200/50',
      tools: platformTools
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true }}
      className="mb-24"
    >
      <div className="text-center mb-12 md:mb-16">
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
          className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
        >
          Industry-leading tools and cutting-edge technologies to deliver beautiful, performant experiences.
        </motion.p>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-8 md:mb-12"
      >
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[rgb(251,108,133)] transition-colors z-10">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50
                     focus:border-[rgb(251,108,133)]/50 focus:outline-none focus:ring-2 focus:ring-[rgb(251,108,133)]/20
                     transition-all duration-300 text-sm placeholder-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
              title="Clear search"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Tech Stack Categories Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-white via-gray-50/30 to-pink-50/20 rounded-3xl
                 border border-gray-200/50 p-6 md:p-8 lg:p-10 max-w-6xl mx-auto"
      >
        {/* Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {categoryGroups.map((category, catIndex) => {
          const filteredTools = filterTools(category.tools);
          const isExpanded = expandedCategories[category.id];
          const displayedTools = isExpanded ? filteredTools : filteredTools.slice(0, 4);
          const hasMore = filteredTools.length > 4;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + catIndex * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className={`rounded-2xl border ${category.borderColor} bg-white/60 backdrop-blur-sm
                        p-6 md:p-8 hover:shadow-lg transition-all duration-300 space-y-6`}
            >
              {/* Category Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <category.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-outfit font-semibold text-gray-800">
                      {category.title}
                    </h3>
                    {category.subtitle && (
                      <p className="text-xs md:text-sm text-gray-500 mt-1">
                        {category.subtitle}
                      </p>
                    )}
                  </div>
                </div>
                {hasMore && filteredTools.length > 0 && (
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="p-2 hover:bg-white/50 rounded-lg transition-colors ml-2 flex-shrink-0"
                    title={isExpanded ? 'Show less' : 'Show more'}
                    aria-label={isExpanded ? 'Show less' : 'Show more'}
                  >
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    </motion.div>
                  </button>
                )}
              </div>

              {/* Tools Grid - Icon + label format */}
              {displayedTools.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + catIndex * 0.1 + 0.05 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                >
                  {displayedTools.map((tool, toolIndex) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.75 + catIndex * 0.1 + toolIndex * 0.04 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="group flex flex-col items-center p-4 bg-white/50 rounded-2xl
                               border border-gray-100/50 hover:border-current/20 hover:bg-white/70
                               transition-all duration-300 cursor-default"
                    >
                      {/* Icon */}
                      <div className="mb-3">
                        {tool.icon && (
                          <tool.icon className="w-7 h-7 md:w-8 md:h-8 text-gray-700 group-hover:scale-110 transition-transform" />
                        )}
                      </div>
                      
                      {/* Tool Name */}
                      <p className="text-xs md:text-sm font-medium text-gray-800 text-center line-clamp-2">
                        {tool.name}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-sm text-gray-500">
                    {searchQuery
                      ? 'No tools match your search'
                      : 'No tools available'}
                  </p>
                </div>
              )}

              {/* Show More / Show Less Button */}
              {hasMore && filteredTools.length > 0 && (
                <motion.button
                  onClick={() => toggleCategory(category.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 text-sm font-medium text-gray-600 hover:text-[rgb(251,108,133)]
                           bg-white/30 hover:bg-white/50 rounded-lg border border-gray-200/50
                           hover:border-gray-300/50 transition-all duration-300"
                >
                  {isExpanded ? `Show Less (${filteredTools.length - 4} hidden)` : `Show More (${filteredTools.length - 4} more)`}
                </motion.button>
              )}

              {/* Tool Count */}
              <div className="text-xs text-gray-500 text-center border-t border-gray-200/50 pt-4">
                {displayedTools.length} of {filteredTools.length} tools
              </div>
            </motion.div>
          );
        })}
        </div>
      </motion.div>

      {/* Specialization Skills Section - Bottom summary */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mt-12 md:mt-16 text-center"
      >
        <h3 className="text-2xl md:text-3xl font-outfit font-light text-gray-800 mb-8">
          Core Specializations
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            'Mobile Development',
            'UI/UX Design',
            'Frontend Development',
            'Cross-Platform',
            'Design Systems',
            'Motion Graphics',
            'API Integration',
            'Responsive Design',
            'Database Design',
            'Performance Optimization',
            'Brand Identity',
            'Component Libraries'
          ].map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 1.1 + index * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-4 py-2.5 bg-white/70 border border-gray-200/50 rounded-full text-sm font-medium text-gray-700
                       hover:border-[rgb(251,108,133)]/30 hover:text-[rgb(251,108,133)]
                       hover:shadow-md hover:bg-white transition-all duration-300 backdrop-blur-sm
                       cursor-default"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer Message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true }}
        className="text-center mt-12 md:mt-16"
      >
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Every tool, every framework, every choice is made with one goal:{' '}
          <span className="text-gray-800 font-medium">
            creating experiences that users love and businesses value.
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
}
