import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import ProjectModal from './ProjectModal';
import { ArrowUpRight } from 'lucide-react';

const Work: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-24 md:py-32 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Selected Work.
          </h2>
          <p className="text-neutral-400 max-w-xl text-lg">
            A curated selection of projects demonstrating performance, aesthetic, and usability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-6 bg-neutral-900">
                 {/* Image Overlay */}
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                 
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-500 text-sm">{project.category}</p>
                </div>
                <div className="hidden md:flex flex-wrap gap-2 justify-end max-w-[200px]">
                  {project.tools.slice(0, 2).map((tool) => (
                     <span key={tool} className="text-xs text-neutral-400 border border-neutral-800 px-2 py-1 rounded">
                       {tool}
                     </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Work;