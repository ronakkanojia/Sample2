import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-200 selection:bg-accent-500/30 selection:text-white">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;