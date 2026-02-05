import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Code, 
  Lightbulb, 
  Heart, 
  Target, 
  Layers, 
  Database, 
  Globe, 
  ArrowDown,
  Star,
  Figma,
  Paintbrush,
  Cpu,
  Film,
  Share
} from 'lucide-react';
import SkillDropdown from './SkillDropdown';
import { 
  SiJavascript, SiTypescript, SiHtml5, SiCss3, SiPhp, SiC, 
  SiCplusplus, SiDart, SiReact, SiAngular, SiNextdotjs,
  SiTailwindcss, SiBootstrap, SiVite, SiFramer,
  SiMysql, SiFirebase, SiNodedotjs,
  SiGit, SiNetlify, SiVercel, SiGithub,
  SiAdobephotoshop, SiAdobeillustrator, SiAdobexd, SiAdobeaftereffects,
  SiAdobepremierepro, SiAdobeindesign, SiFigma, SiCanva, SiWix,
  SiFlutter, SiAndroidstudio, SiArduino, SiMaterialdesign
} from 'react-icons/si';
import { DiJava, DiVisualstudio, DiNetbeans } from 'react-icons/di';
import { FaCreditCard } from 'react-icons/fa';

interface JourneySectionProps {
  role: 'designer' | 'developer';
}

// Function to map tool names to their corresponding icons
const getToolIcon = (toolName: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    // Programming languages
    'JavaScript': SiJavascript,
    'TypeScript': SiTypescript,
    'HTML': SiHtml5,
    'CSS': SiCss3,
    'PHP': SiPhp,
    'C': SiC,
    'C++': SiCplusplus,
    'Java': DiJava,
    'Dart': SiDart,
    
    // Frameworks & Libraries
    'React': SiReact,
    'Angular': SiAngular,
    'Next.js': SiNextdotjs,
    'Tailwind CSS': SiTailwindcss,
    'Bootstrap': SiBootstrap,
    'Vite': SiVite,
    'Framer Motion': SiFramer,
    'Material UI': SiMaterialdesign,
    
    // Backend & Database
    'MySQL': SiMysql,
    'Firebase': SiFirebase,
    'Node.js': SiNodedotjs,
    
    // Tools & IDEs
    'Visual Studio': DiVisualstudio,
    'VS Code': DiVisualstudio,
    'Git': SiGit,
    'Netlify': SiNetlify,
    'Vercel': SiVercel,
    'GitHub Pages': SiGithub,
    'Xendit': FaCreditCard,
    'NetBeans': DiNetbeans,
    
    // Design Tools
    'Adobe Photoshop': SiAdobephotoshop,
    'Photoshop': SiAdobephotoshop,
    'Adobe Illustrator': SiAdobeillustrator,
    'Illustrator': SiAdobeillustrator,
    'Adobe XD': SiAdobexd,
    'After Effects': SiAdobeaftereffects,
    'Premiere Pro': SiAdobepremierepro,
    'InDesign': SiAdobeindesign,
    'Figma': SiFigma,
    'Canva': SiCanva,
    'Wix': SiWix,
    
    // Mobile Development
    'Flutter': SiFlutter,
    'React Native': SiReact,
    'Android Studio': SiAndroidstudio,
    'Arduino IDE': SiArduino,
  };
  
  return iconMap[toolName] || null;
};

export default function JourneySection({ role }: JourneySectionProps) {
  // State to track which skill dropdown is open
  const [openSkillId, setOpenSkillId] = useState<string | null>(null);

  // Toggle skill dropdown
  const toggleSkill = (skillId: string) => {
    if (openSkillId === skillId) {
      setOpenSkillId(null); // Close if already open
    } else {
      setOpenSkillId(skillId); // Open the clicked skill
    }
  };

  const designerContent = {
    title: "My Design Journey",
    description: "Creating beautiful, user-centered experiences that tell a story and solve real problems.",
    skills: [
      { 
        id: 'uiux',
        name: "UI/UX Design", 
        icon: Figma,
        tools: ['Figma', 'Adobe XD', 'Adobe Illustrator', 'Adobe Photoshop', 'Canva', 'Wix'].map(name => ({
          name,
          icon: getToolIcon(name)
        })).filter(tool => tool.icon) // Only include tools with valid icons
      },
      { 
        id: 'graphic',
        name: "Graphic Design", 
        icon: Paintbrush,
        tools: ['Adobe Photoshop', 'Illustrator', 'Canva', 'InDesign', 'Figma'].map(name => ({
          name,
          icon: getToolIcon(name)
        })).filter(tool => tool.icon)
      },
      { 
        id: 'motion',
        name: "Motion Graphics", 
        icon: Film,
        tools: ['After Effects', 'Premiere Pro', 'Canva', 'CapCut'].map(name => ({
          name,
          icon: getToolIcon(name)
        })).filter(tool => tool.icon)
      },
      { 
        id: 'branding',
        name: "Brand Identity", 
        icon: Heart,
        tools: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Typography', 'Color Theory']
      },
      { 
        id: 'tools',
        name: "Design Tools", 
        icon: Share,
        tools: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Canva', 'MS Office', 'Google Docs'].map(name => ({
          name,
          icon: getToolIcon(name)
        })).filter(tool => tool.icon)
      }
    ],
    philosophy: "Design is not just what it looks like — design is how it works. I believe in creating experiences that are both visually stunning and functionally exceptional.",
    icon: Palette
  };

const developerContent = {
  title: "My Development Journey", 
  description: "Building robust, scalable applications with clean code and modern technologies.",
  skills: [
    { 
      id: 'languages',
      name: "Programming Languages", 
      icon: Code,
      tools: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'PHP', 'C', 'C++', 'Java', 'Dart'].map(name => ({
        name,
        icon: getToolIcon(name)
      })).filter(tool => tool.icon)
    },
    { 
      id: 'frontend',
      name: "Frontend Technologies", 
      icon: Layers,
      tools: ['Tailwind CSS', 'Bootstrap', 'Vite', 'Framer Motion', 'Material UI'].map(name => ({
        name,
        icon: getToolIcon(name)
      })).filter(tool => tool.icon)
    },
    { 
      id: 'database',
      name: "Database & Backend", 
      icon: Database,
      tools: ['MySQL', 'Firebase', 'SQL', 'NoSQL', 'PHP', 'REST API', 'Node.js'].map(name => ({
        name,
        icon: getToolIcon(name)
      })).filter(tool => tool.icon)
    },
    { 
      id: 'web',
      name: "Web Development", 
      icon: Globe,
      tools: ['React', 'Angular', 'Next.js', 'PHP', 'HTML', 'CSS', 'JavaScript', 'TypeScript'].map(name => ({
        name,
        icon: getToolIcon(name)
      })).filter(tool => tool.icon)
    },
    { 
      id: 'mobile',
      name: "Mobile Development",
      icon: Cpu,
      tools: ['React Native', 'Flutter', 'Android Studio'].map(name => ({
        name,
        icon: getToolIcon(name)
      })).filter(tool => tool.icon)
    },
    { 
      id: 'tools',
      name: "Developer Tools", 
      icon: Share,
      tools: ['Visual Studio', 'VS Code', 'Git', 'Git Kraken', 'NetBeans', 'Arduino IDE'].map(name => ({
        name,
        icon: getToolIcon(name)
      })).filter(tool => tool.icon)
    },
    { 
      id: 'deployment',
      name: "Deployment & Services", 
      icon: Share,
      tools: ['Netlify', 'Vercel', 'Replit', 'Firebase', 'Xendit', 'Wix', 'GitHub Pages'].map(name => ({
        name,
        icon: getToolIcon(name)
      })).filter(tool => tool.icon)
    }
  ],
  philosophy: "Code is poetry in motion. I craft applications that not only work flawlessly but are maintainable, scalable, and bring ideas to life through technology.",
  icon: Code
};

  const content = role === 'designer' ? designerContent : developerContent;
  const MainIcon = content.icon;

  return (
    <section id="role-content" className="section-padding bg-gradient-to-b from-white to-gray-50/50 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with icon */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                          rounded-full flex items-center justify-center mb-6 animate-float">
              <MainIcon className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-outfit font-bold text-gray-800 mb-6 animate-slide-up">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            {content.description}
          </p>
        </motion.div>

        {/* Philosophy Section - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center gap-4 mb-6 justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                         rounded-full flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-outfit font-semibold text-gray-800">
              My Philosophy
            </h3>
          </div>
          
          <div className="gradient-card p-8 rounded-3xl shadow-lg">
            <p className="text-gray-700 leading-relaxed text-lg mb-6 text-center">
              {content.philosophy}
            </p>
            
            {/* Decorative stars */}
            <div className="flex items-center justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                  viewport={{ once: true }}
                >
                  <Star className="w-5 h-5 text-[rgb(251,108,133)] fill-current" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4 mb-8 justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                         rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-outfit font-semibold text-gray-800">
              Core Skills
            </h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {content.skills.map((skill) => (
              <SkillDropdown
                key={skill.id}
                title={skill.name}
                icon={skill.icon}
                tools={skill.tools}
                isOpen={openSkillId === skill.id}
                onToggle={() => toggleSkill(skill.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-24"
        >
          <p className="text-lg text-gray-600 mb-8">
            Ready to see my {role === 'designer' ? 'design' : 'development'} work in action?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const projectsSection = document.getElementById('projects');
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group px-8 py-4 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                     text-white rounded-full font-medium text-lg btn-glow
                     focus:outline-none focus:ring-4 focus:ring-[rgb(251,108,133)]/30
                     flex items-center gap-3 mx-auto cursor-pointer"
          >
            View My Projects
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
