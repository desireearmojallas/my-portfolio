import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2, ArrowUpRight } from 'lucide-react';
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
  const outcomes = project.outcomes || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="h-full"
    >
      <div
        onClick={() => onClick?.(project)}
        className="group relative h-full overflow-hidden rounded-2xl bg-white shadow-lg 
                   transition-all duration-500 ease-out hover:-translate-y-2 
                   hover:shadow-2xl hover:shadow-pink-500/15 border border-gray-100/70"
      >
        {/* Visual header */}
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/45" />
          <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-gray-800 backdrop-blur">
            <span className="text-[rgb(251,108,133)]">●</span>
            {project.category || 'Web'}
          </div>
          <div className="absolute top-3 right-3 flex items-center justify-center w-10 h-10 rounded-full bg-white/85 backdrop-blur">
            <Code2 className="w-5 h-5 text-[rgb(251,108,133)]" />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 rounded-xl bg-gray-50 px-2.5 py-2 text-[11px] font-semibold text-gray-600 border border-gray-100"
            >
              Live
            </motion.div>
          </div>

          {outcomes.length > 0 && (
            <div className="rounded-xl bg-gray-50/80 border border-gray-100 px-3 py-2.5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Outcomes</p>
              <ul className="space-y-1.5">
                {outcomes.slice(0, 3).map((item) => (
                  <li key={item} className="text-sm text-gray-700 leading-snug flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[rgb(251,108,133)]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {techStack.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 border border-gray-100"
                >
                  <span>{getTechIcon(tech)}</span>
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="mt-2 flex flex-wrap gap-3">
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] px-4 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:shadow-pink-500/30 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                View Live
              </motion.a>
            )}
            {project.caseStudyLink ? (
              <motion.a
                href={project.caseStudyLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-[rgb(251,108,133)] hover:text-[rgb(251,108,133)] transition-all"
              >
                <ArrowUpRight className="w-4 h-4" />
                Case Study
              </motion.a>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClick?.(project);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-[rgb(251,108,133)] hover:text-[rgb(251,108,133)] transition-all"
              >
                <ArrowUpRight className="w-4 h-4" />
                View Details
              </motion.button>
            )}
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-all"
              >
                <Github className="w-4 h-4" />
                Repository
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
