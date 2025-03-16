
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import Button from './Button';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300",
        scrolled ? "glass backdrop-blur-lg bg-navy-500/10" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-3xl font-bold text-white">
            <span className="text-gradient-blue-purple">CareerLaunch</span>
            <span className="ml-1">AI</span>
          </a>
        </div>
        
       
      
      </div>
    </header>
  );
};

export default Navbar;
