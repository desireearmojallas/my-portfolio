import React from 'react';
import ProjectsGallery from './ProjectsGallery';

interface ProjectsSectionProps {
  role: 'designer' | 'developer';
}

// Default export of the ProjectsSection component
export default function ProjectsSection({ role }: ProjectsSectionProps) {
  return (
    <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto" id="projects-section">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
        {role === 'designer' ? 'Design' : 'Development'} Projects
      </h2>
      <ProjectsGallery role={role} />
    </div>
  );
}
