
import React, { useEffect } from 'react';
import { Button } from "../components/ui/button";
import { companies, hiringUpdates } from '../lib/data';
import { ArrowRight, Users, Zap, Briefcase } from 'lucide-react';

const Hero = () => {
  // For auto-scrolling updates
  const [currentUpdate, setCurrentUpdate] = React.useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUpdate((prev) => (prev + 1) % hiringUpdates.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-32 pb-20 px-4 md:px-6 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-hackohire-purple/5 to-transparent opacity-70 pointer-events-none"></div>
      
      {/* Floating elements - decorative */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-hackohire-blue/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-hackohire-pink/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto max-w-7xl">
        {/* Main hero content */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-hackohire-purple/10 rounded-full text-hackohire-purple font-medium text-sm mb-6 animate-fade-in">
            Connecting Top Talent with Leading Companies 
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            <span className="block">Showcase Your Skills.</span>
            <span className="bg-gradient-purple-blue bg-clip-text text-transparent">Get Hired Through Hackathons.</span>
          </h1>
          
          <p className="text-gray-600 max-w-3xl mb-8 text-lg md:text-xl animate-fade-in">
            Join premier hackathons worldwide and get directly noticed by recruiters from top tech companies looking for exceptional talent.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in">
            <Button className="rounded-full bg-gradient-purple-blue hover:shadow-lg hover:shadow-hackohire-purple/20 transition-all duration-300 text-white px-8 py-6 text-lg">
              Find Hackathons <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="rounded-full border-hackohire-purple text-hackohire-purple hover:bg-hackohire-purple/10 px-8 py-6 text-lg">
              For Companies
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full mt-4 animate-fade-in">
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-3 bg-hackohire-purple/10 rounded-full mb-3">
                <Zap className="h-6 w-6 text-hackohire-purple" />
              </div>
              <p className="text-3xl font-bold text-hackohire-black">200+</p>
              <p className="text-gray-500">Premium Hackathons</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-3 bg-hackohire-pink/10 rounded-full mb-3">
                <Users className="h-6 w-6 text-hackohire-pink" />
              </div>
              <p className="text-3xl font-bold text-hackohire-black">50K+</p>
              <p className="text-gray-500">Talented Developers</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-3 bg-hackohire-blue/10 rounded-full mb-3">
                <Briefcase className="h-6 w-6 text-hackohire-blue" />
              </div>
              <p className="text-3xl font-bold text-hackohire-black">5K+</p>
              <p className="text-gray-500">Jobs Secured</p>
            </div>
          </div>
        </div>
        
        {/* Live hiring updates */}
        <div className="w-full bg-gradient-purple-blue p-0.5 rounded-xl mb-16 animate-fade-in">
          <div className="bg-white rounded-[9px] py-4 px-6">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
              <p className="text-sm font-medium">LIVE HIRING UPDATES</p>
            </div>
            <p className="text-lg font-medium mt-2 h-6 overflow-hidden">
              {hiringUpdates[currentUpdate]}
            </p>
          </div>
        </div>
        
        {/* Companies */}
        <div id="companies" className="mb-16">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Top Companies <span className="bg-gradient-purple-blue bg-clip-text text-transparent">Hiring Now</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Leading tech companies are actively seeking talent through our hackathons.
              Showcase your skills and get noticed!
            </p>
          </div>
          
          {/* Auto-scrolling companies slider */}
          <div className="relative overflow-hidden py-4">
            <div className="animate-marquee flex space-x-8">
              {companies.map((company) => (
                <div 
                  key={company.id}
                  className="flex-shrink-0 w-48 h-36 p-4 flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="h-12 object-contain mb-4" 
                  />
                  <p className="text-sm font-semibold text-center">{company.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{company.openPositions} open positions</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
