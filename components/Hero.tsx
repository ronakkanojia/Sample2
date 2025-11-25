import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <h2 className="text-accent-400 font-medium tracking-wide mb-6 uppercase text-sm md:text-base">
            Front-End Developer
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] text-white mb-8">
            I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">Ronak Kanojia</span>.
            <br />
            Creating sleek, animated digital experiences.
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed mb-12">
            Specializing in performance, interaction, and immersive web motion. 
            I build digital products that feel alive.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3 text-white border-b border-white/30 pb-1 hover:border-white transition-all group"
            >
              See Selected Work
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-500 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="w-6 h-6 opacity-50" />
      </motion.div>
    </section>
  );
};

export default Hero;