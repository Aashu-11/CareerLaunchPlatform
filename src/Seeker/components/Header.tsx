
import React, { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { Button } from "../components/welcome page/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-sm py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-purple-blue bg-clip-text text-transparent">
            Hack-O-Hire
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-hackohire-black hover:text-hackohire-purple transition-colors duration-300">Home</a>
          <a href="#hackathons" className="text-hackohire-black hover:text-hackohire-purple transition-colors duration-300">Hackathons</a>
          <a href="#companies" className="text-hackohire-black hover:text-hackohire-purple transition-colors duration-300">Companies</a>
          <a href="#about" className="text-hackohire-black hover:text-hackohire-purple transition-colors duration-300">About</a>
        </nav>

        

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg animate-fade-in">
          <div className="flex flex-col p-4 space-y-4">
            <a href="#" className="py-2 text-hackohire-black hover:text-hackohire-purple transition-colors duration-300">Home</a>
            <a href="#hackathons" className="py-2 text-hackohire-black hover:text-hackohire-purple transition-colors duration-300">Hackathons</a>
            <a href="#companies" className="py-2 text-hackohire-black hover:text-hackohire-purple transition-colors duration-300">Companies</a>
            <a href="#about" className="py-2 text-hackohire-black hover:text-hackohire-purple transition-colors duration-300">About</a>
            <div className="pt-4 flex flex-col space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                  type="text" 
                  placeholder="Search hackathons..." 
                  className="pl-10 py-2 pr-4 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-hackohire-purple/30 text-sm w-full"
                />
              </div>
              <Button variant="outline" className="rounded-full border-hackohire-purple text-hackohire-purple">
                Sign In
              </Button>
              <Button className="rounded-full bg-gradient-purple-blue text-white">
                Get Noticed
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
