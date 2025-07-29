import { motion } from 'framer-motion';

interface ProjectThumbnailProps {
  title: string;
  imageSrc: string;
  onClick?: () => void;
  index?: number;
}

export default function ProjectThumbnail({ 
  title, 
  imageSrc, 
  onClick,
  index = 0
}: ProjectThumbnailProps) {
  return (
    <motion.div
      className="relative rounded-xl shadow-md overflow-hidden cursor-pointer group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1
      }}
    >
      {/* Project Image */}
      <div className="aspect-[4/3] w-full">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Title */}
      <div className="absolute bottom-0 left-0 w-full p-4">
        <h3 className="text-white font-semibold text-lg transition-transform duration-300 group-hover:translate-y-[-4px]">
          {title}
        </h3>
        <div className="w-12 h-1 bg-[rgb(251,108,133)] rounded-full mt-2 transform origin-left scale-0 transition-transform duration-300 group-hover:scale-100" />
      </div>
    </motion.div>
  );
}
