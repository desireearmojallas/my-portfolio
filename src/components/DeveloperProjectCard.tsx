import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import { type Project } from './ProjectCardNew';

interface DeveloperProjectCardProps {
  project: Project & { techStack?: string[] };
  index: number;
  onClick?: (project: Project) => void;
}

const getTechIcon = (tech: string) => {
  const iconMap: { [key: string]: string } = {
    'React': '⚛️',
    'TypeScript': 'TS',
    'Node.js': '🟢',
    'MongoDB': '🍃',
    'PostgreSQL': '🐘',
    'Firebase': '🔥',
    'Next.js': '▲',
    'Vue.js': '💚',
    'Python': '🐍',
    'Django': '🦕',
    'Flask': '🧪',
    'Express': '⚡',
    'GraphQL': '⬡',
    'REST': '🔄',
    'Docker': '🐳',
    'Kubernetes': '☸️',
    'AWS': '☁️',
    'Socket.io': '🔌',
    'Redis': '🔴',
    'Tailwind': '🎨',
    'Vite': '⚡',
    'Figma': '🎭',
  };
  return iconMap[tech] || '📦';
};

export default function DeveloperProjectCard({ 
  project, 
  index, 
  onClick 
}: DeveloperProjectCardProps) {
  const techStack = project.techStack || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className="h-full"
    >
      <motion.div
        whileHover={{ 
          y: -8,
          transition: { type: 'spring', stiffness: 400, damping: 25 }
        }}
        className="h-full"
      >
        <div
          onClick={() => onClick?.(project)}
          className="group relative h-full bg-white border border-gray-200/50 rounded-2xl p-6 
                   shadow-lg hover:shadow-2xl hover:shadow-pink-500/10 
                   transition-all duration-300 ease-out cursor-pointer
                   hover:border-pink-200/50 overflow-hidden"
        >
          {/* Subtle gradient accent on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50/0 to-purple-50/0 
                        group-hover:from-pink-50/40 group-hover:to-purple-50/30 
                        transition-all duration-300 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            {/* Header with icon and title */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-outfit font-semibold text-gray-800 mb-2 
                             group-hover:text-[rgb(251,108,133)] transition-colors duration-300 line-clamp-2">
                  {project.title}
                </h3>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs font-mono text-gray-500 hover:text-[rgb(251,108,133)] 
                             transition-colors duration-200 line-clamp-1"
                  >
                    {project.github.replace('https://', '').replace('http://', '')}
                  </a>
                )}
              </div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[rgb(251,108,133)]/10 
                          to-[rgb(245,89,119)]/10 rounded-full flex items-center justify-center 
                          group-hover:from-[rgb(251,108,133)]/20 group-hover:to-[rgb(245,89,119)]/20
                          transition-all duration-300"
              >
                <Code2 className="w-5 h-5 text-[rgb(251,108,133)]" />
              </motion.div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {project.description}
            </p>

            {/* Tech Stack */}
            {techStack.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <motion.div
                      key={tech}
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-1.5 bg-gray-50 hover:bg-[rgb(251,108,133)]/10 
                               border border-gray-200 hover:border-[rgb(251,108,133)]/30
                               rounded-full px-3 py-1.5 transition-all duration-200"
                      title={tech}
                    >
                      <span className="text-sm">{getTechIcon(tech)}</span>
                      <span className="text-xs font-medium text-gray-700 hover:text-[rgb(251,108,133)] 
                                     transition-colors">
                        {tech}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100/50">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg 
                           bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)]
                           text-white font-medium text-sm transition-all duration-300
                           hover:shadow-lg hover:shadow-pink-500/30 flex-1"
                >
                  <Github className="w-4 h-4" />
                  Repository
                </motion.a>
              )}
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg 
                           bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm 
                           transition-all duration-300 flex-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </motion.a>
              )}
              {!project.github && !project.link && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onClick?.(project)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 hover:bg-[rgb(251,108,133)]/10 
                           text-gray-700 hover:text-[rgb(251,108,133)] font-medium text-sm 
                           transition-all duration-300"
                >
                  View Details
                </motion.button>
              )}
            </div>
          </div>
        </div>
        </motion.div>
      </motion.div>
  );
}
