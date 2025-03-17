
import React, { useState } from 'react';
import { Button } from "../components/welcome page/ui/button";
import { Badge } from "../components/welcome page/ui/badge";
import { Calendar, MapPin, Clock, Zap } from 'lucide-react';
import { Hackathon } from '../lib/data';

interface HackathonCardProps {
  hackathon: Hackathon;
}

const HackathonCard: React.FC<HackathonCardProps> = ({ hackathon }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  // Generate a random skill match score between 80-100
  const skillMatchScore = Math.floor(Math.random() * 21) + 80;
  
  return (
    <div 
      className="perspective h-[420px] w-full"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={toggleFlip}
    >
      <div className={`relative w-full h-full transition-all duration-1000 transform-gpu ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
        {/* Front of Card */}
        <div className="absolute inset-0 bg-white rounded-xl shadow-md overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
          <div className="h-40 overflow-hidden">
            <img 
              src={hackathon.logo} 
              alt={hackathon.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-0 text-hackohire-black font-medium">
                {hackathon.mode}
              </Badge>
            </div>
            <div className="absolute top-4 left-4">
              <div className="flex items-center bg-hackohire-purple text-white px-2 py-1 rounded-md text-xs font-medium">
                <Zap className="h-3 w-3 mr-1" />
                {skillMatchScore}% Match
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="font-bold text-xl mb-2">{hackathon.title}</h3>
            <p className="text-sm text-gray-500 mb-4">by {hackathon.organizer}</p>
            
            <div className="flex flex-col space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-hackohire-purple" />
                {hackathon.date}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-hackohire-purple" />
                {hackathon.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-hackohire-purple" />
                Registration Deadline: {hackathon.registrationDeadline}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {hackathon.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        {/* Back of Card */}
        <div 
          className="absolute inset-0 bg-gradient-purple-blue p-[1px] rounded-xl shadow-md overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="bg-white h-full w-full rounded-[10px] p-6 flex flex-col">
            <h3 className="font-bold text-xl mb-2">{hackathon.title}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{hackathon.description}</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Prize Pool & Perks</h4>
              <p className="text-lg font-bold text-hackohire-purple mb-2">{hackathon.prizePool}</p>
              <div className="space-y-2">
                {hackathon.perks.map((perk, index) => {
                  const Icon = perk.icon;
                  return (
                    <div key={index} className="flex items-center text-sm">
                      <Icon className="h-4 w-4 mr-2 text-hackohire-purple" />
                      <span>{perk.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Hiring Companies</h4>
              <div className="flex flex-wrap gap-2">
                {hackathon.hiringCompanies.map((company, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-50 border-gray-200">
                    {company}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-auto">
              <Button className="w-full rounded-lg bg-gradient-purple-blue hover:shadow-lg hover:shadow-hackohire-purple/20 transition-all duration-300">
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;
