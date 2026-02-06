import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Palette,
  Code,
  Sparkles,
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

interface TechStackSectionProps {
  role: 'designer' | 'developer';
}

interface Tool {
  name: string;
  level: string;
  desc: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function TechStackSection({ role }: TechStackSectionProps) {
  const [showCompleteStack, setShowCompleteStack] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState<string>('All');
  const [stackView, setStackView] = useState<'designer' | 'developer' | 'all'>(role);

  useEffect(() => {
    setStackView(role);
  }, [role]);

  const filterTools = (tools: Tool[]) => {
    let filteredTools = tools;

    if (expertiseFilter !== 'All') {
      filteredTools = filteredTools.filter(tool => tool.level === expertiseFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredTools = filteredTools.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.desc.toLowerCase().includes(query)
      );
    }

    return filteredTools;
  };

  return (
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {[
          {
            title: 'Design',
            description: 'Adobe Creative Suite professional & modern tools',
            icon: '🎨',
            gradient: 'from-pink-500/10 to-rose-500/10',
            border: 'border-pink-200/30',
            highlight: 'group-hover:border-[rgb(251,108,133)]/40'
          },
          {
            title: 'Development',
            description: 'Modern frameworks for robust applications',
            icon: '⚡',
            gradient: 'from-purple-500/10 to-indigo-500/10',
            border: 'border-purple-200/30',
            highlight: 'group-hover:border-purple-400/40'
          },
          {
            title: 'Platform',
            description: 'Deployment and collaboration ecosystems',
            icon: '🚀',
            gradient: 'from-emerald-500/10 to-teal-500/10',
            border: 'border-emerald-200/30',
            highlight: 'group-hover:border-emerald-400/40'
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

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            viewport={{ once: true }}
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            {[
              { key: 'designer', label: 'Designer' },
              { key: 'developer', label: 'Developer' },
              { key: 'all', label: 'Full stack' }
            ].map((view) => (
              <motion.button
                key={view.key}
                onClick={() => setStackView(view.key as 'designer' | 'developer' | 'all')}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 cursor-pointer ${
                  stackView === view.key
                    ? 'bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] text-white shadow-md shadow-pink-200'
                    : 'bg-white/70 text-gray-600 border border-gray-200/50 hover:border-gray-300 hover:bg-white'
                }`}
              >
                {view.label}
              </motion.button>
            ))}
          </motion.div>

          <div className={`grid grid-cols-1 ${stackView === 'all' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8`}>
            {(stackView === 'designer' || stackView === 'all') && (
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
            )}

            {(stackView === 'developer' || stackView === 'all') && (
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
            )}

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
  );
}
