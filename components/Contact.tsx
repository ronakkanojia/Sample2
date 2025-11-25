import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-neutral-950 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight"
          >
            Let’s build something <span className="text-neutral-600">immersive.</span>
          </motion.h2>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24 mt-16">
            <div className="flex-1">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm text-neutral-500 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-transparent border-b border-neutral-800 py-4 text-white focus:outline-none focus:border-accent-400 transition-colors text-lg"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-neutral-500 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-transparent border-b border-neutral-800 py-4 text-white focus:outline-none focus:border-accent-400 transition-colors text-lg"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-neutral-500 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-transparent border-b border-neutral-800 py-4 text-white focus:outline-none focus:border-accent-400 transition-colors text-lg resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="group flex items-center gap-3 text-white text-xl font-medium pt-4 hover:text-accent-400 transition-colors"
                >
                  Send Message
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

            <div className="md:w-1/3 space-y-12">
              <div>
                <h4 className="text-neutral-500 text-sm uppercase tracking-wider mb-4">Contact Info</h4>
                <a href="mailto:hello@ronak.dev" className="text-xl text-white hover:text-accent-400 flex items-center gap-2 transition-colors">
                  <Mail size={20} /> hello@ronak.dev
                </a>
              </div>
              
              <div>
                <h4 className="text-neutral-500 text-sm uppercase tracking-wider mb-4">Socials</h4>
                <ul className="space-y-2">
                  {SOCIAL_LINKS.map((link) => (
                    <li key={link.name}>
                      <a href={link.url} className="text-lg text-white/80 hover:text-white transition-colors">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;