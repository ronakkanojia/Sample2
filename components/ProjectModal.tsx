import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/90 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-neutral-800 relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
          <div className="mb-8">
            <span className="text-accent-400 text-sm font-medium tracking-wider uppercase mb-2 block">
              {project.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {project.title}
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-white font-semibold mb-3">Role & Tools</h3>
              <p className="text-neutral-400 text-sm mb-3">{project.role}</p>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span key={tool} className="px-3 py-1 bg-neutral-800 text-neutral-300 text-xs rounded-full border border-neutral-700">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <h3 className="text-white font-semibold mb-2">Challenges</h3>
                <ul className="list-disc list-inside text-neutral-400 text-sm space-y-1">
                  {project.challenges.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Outcomes</h3>
                <ul className="list-disc list-inside text-neutral-400 text-sm space-y-1">
                  {project.outcomes.map((o, i) => <li key={i}>{o}</li>)}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800 flex gap-4">
               <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-neutral-200 transition-colors">
                 Visit Site <ExternalLink size={16} />
               </button>
               <button className="flex items-center gap-2 border border-neutral-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-neutral-800 transition-colors">
                 Code <Github size={16} />
               </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;