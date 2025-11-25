import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-neutral-950 border-t border-neutral-900">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
        <p>© {new Date().getFullYear()} Ronak Kanojia. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed & Built with React.</p>
      </div>
    </footer>
  );
};

export default Footer;