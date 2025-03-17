
import React from 'react';
import { Button } from "../components/welcome page/ui/button";
import { Badge } from "../components/welcome page/ui/badge";
import { companies } from '../lib/data';
import { ArrowRight, Briefcase } from 'lucide-react';

const CompanySlider = () => {
  return (
    <section id="companies" className="py-16 px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block px-4 py-1.5 bg-hackohire-blue/10 rounded-full text-hackohire-blue font-medium text-sm mb-6">
            Top Recruiters
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Companies <span className="bg-gradient-purple-blue bg-clip-text text-transparent">Hiring Through</span> Hackathons
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These leading companies are actively recruiting talented developers, designers, and engineers directly from our hackathon events.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {companies.slice(0, 6).map((company) => (
            <div 
              key={company.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 animate-scale-in"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 mr-4 bg-gray-50 rounded-lg flex items-center justify-center p-3">
                  <img src={company.logo} alt={company.name} className="max-w-full max-h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{company.name}</h3>
                  <p className="text-sm text-gray-500">{company.openPositions} open positions</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{company.description}</p>
              
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Actively Hiring</p>
                <div className="flex flex-wrap gap-2">
                  {company.hiring.map((position, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50 border-gray-200">
                      {position}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button variant="outline" className="w-full rounded-lg border-hackohire-purple text-hackohire-purple hover:bg-hackohire-purple/10 mt-2">
                <Briefcase className="mr-2 h-4 w-4" /> View Opportunities
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center animate-fade-in">
          <Button className="rounded-full bg-white border border-hackohire-purple text-hackohire-purple hover:bg-hackohire-purple/10 px-8">
            View All Companies <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CompanySlider;
