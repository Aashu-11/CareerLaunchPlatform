import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HackathonCard from '../components/HackathonCard';
import CategoryFilters from '../components/CategoryFilters';
import CompanySlider from '../components/CompanySlider';
import { Button } from "../components/ui/button";
import { ArrowRight } from 'lucide-react';
import { hackathons } from '../lib/data';

const HackOHire = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredHackathons, setFilteredHackathons] = useState(hackathons);
  
  // Apply filters
  useEffect(() => {
    let result = hackathons;
    
    if (selectedCategory) {
      result = result.filter(hackathon => 
        hackathon.categories.includes(selectedCategory) || 
        hackathon.skills.includes(selectedCategory)
      );
    }
    
    if (selectedCompany) {
      result = result.filter(hackathon => 
        hackathon.hiringCompanies.includes(selectedCompany)
      );
    }
    
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(hackathon => 
        hackathon.title.toLowerCase().includes(lowercasedSearch) ||
        hackathon.description.toLowerCase().includes(lowercasedSearch) ||
        hackathon.organizer.toLowerCase().includes(lowercasedSearch)
      );
    }
    
    setFilteredHackathons(result);
  }, [selectedCategory, selectedCompany, searchTerm]);
  
  // Animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-animation');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight * 0.85;
        
        if (elementPosition < screenPosition) {
          element.classList.add('animate');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-hackohire-bg">
      
      <main className="overflow-hidden">
        <Hero />
        
        <section id="hackathons" className="py-16 px-4 md:px-6 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <CategoryFilters 
              onCategoryChange={setSelectedCategory}
              onCompanyChange={setSelectedCompany}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              selectedCompany={selectedCompany}
            />
            
            {filteredHackathons.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredHackathons.map((hackathon) => (
                    <div key={hackathon.id} className="scroll-animation">
                      <HackathonCard hackathon={hackathon} />
                    </div>
                  ))}
                </div>
                
                {filteredHackathons.length > 8 && (
                  <div className="mt-12 text-center">
                    <Button className="rounded-full bg-gradient-purple-blue hover:shadow-lg hover:shadow-hackohire-purple/20 transition-all duration-300 text-white px-8">
                      Load More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="min-h-[300px] flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-hackohire-purple/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-hackohire-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">No hackathons found</h3>
                <p className="text-gray-600 max-w-md mb-6">
                  We couldn't find any hackathons matching your current filters. Try adjusting your search criteria.
                </p>
                <Button 
                  className="rounded-full border border-hackohire-purple text-hackohire-purple hover:bg-hackohire-purple/10"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedCompany(null);
                    setSearchTerm('');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
        
        <CompanySlider />
        
        <section className="py-20 px-4 md:px-6 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-radial from-hackohire-blue/5 to-transparent opacity-70 pointer-events-none"></div>
          <div className="absolute top-20 right-10 w-64 h-64 bg-hackohire-pink/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-hackohire-purple/10 rounded-full filter blur-3xl"></div>
          
          <div className="container mx-auto max-w-7xl relative">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-block px-4 py-1.5 bg-hackohire-purple/10 rounded-full text-hackohire-purple font-medium text-sm mb-6">
                    For Companies
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                    Find Your <span className="bg-gradient-purple-blue bg-clip-text text-transparent">Perfect Talent</span> Through Hackathons
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Host or sponsor hackathons to identify, assess, and hire top tech talent. Our platform provides a unique opportunity to evaluate candidates' skills in action.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="rounded-full bg-gradient-purple-blue hover:shadow-lg hover:shadow-hackohire-purple/20 transition-all duration-300 text-white px-8">
                      Host a Hackathon
                    </Button>
                    <Button className="rounded-full border border-hackohire-purple text-hackohire-purple hover:bg-hackohire-purple/10">
                      Learn More
                    </Button>
                  </div>
                </div>
                <div className="relative min-h-[300px] md:min-h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Team working on a hackathon" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-24 text-center max-w-3xl mx-auto scroll-animation">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Ready to <span className="bg-gradient-purple-blue bg-clip-text text-transparent">Showcase</span> Your Skills?
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Join our vibrant community of developers and companies. Participate in hackathons, build amazing projects, and get hired by top companies.
              </p>
              <Button className="rounded-full bg-gradient-purple-blue hover:shadow-lg hover:shadow-hackohire-purple/20 transition-all duration-300 text-white px-8 py-6 text-lg">
                Join Hack-O-Hire Today
              </Button>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
};

export default HackOHire;
