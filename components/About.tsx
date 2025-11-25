import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-neutral-900 border-t border-neutral-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          
          <div className="md:w-1/2">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-8"
            >
              About Me.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-neutral-400 text-lg leading-relaxed space-y-6"
            >
              <p>
                I am Ronak Kanojia, a Front-End Developer driven by the intersection of design and technology. 
                With a background in creative coding, I focus on building applications that are not just functional, but memorable.
              </p>
              <p>
                My approach combines clean code architecture with fluid animations to create digital experiences that feel tangible. 
                I believe the best interfaces are the ones you barely notice—seamless, intuitive, and fast.
              </p>
            </motion.div>
          </div>

          <div className="md:w-1/2">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
               className="text-xl font-semibold text-white mb-8 border-b border-neutral-800 pb-4 inline-block"
            >
              Technical Arsenal
            </motion.h3>
            
            <div className="flex flex-wrap gap-x-4 gap-y-4">
              {SKILLS.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="text-2xl md:text-3xl font-light text-neutral-500 hover:text-white transition-colors cursor-default"
                >
                  {skill} {index !== SKILLS.length - 1 && <span className="text-accent-500/50 text-lg align-middle ml-2">•</span>}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;