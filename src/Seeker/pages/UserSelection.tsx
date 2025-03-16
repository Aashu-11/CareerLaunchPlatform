import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Building } from 'lucide-react';
import Button from '../components/welcome page/Button';
import { cn } from '../lib/utils';

interface UserSelectionProps {
  onSelect: (role: 'seeker' | 'recruiter') => void;
}

const UserSelection: React.FC<UserSelectionProps> = ({ onSelect }) => {
  const [hoveredOption, setHoveredOption] = useState<'seeker' | 'recruiter' | null>(null);
  const [selectedOption, setSelectedOption] = useState<'seeker' | 'recruiter' | null>(null);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleOptionSelect = (option: 'seeker' | 'recruiter') => {
    setSelectedOption(option);
    setExpanded(true);
    onSelect(option);

    // Only navigate to login page if "Job Seeker" or "Job Recruiter" is selected
    if (option === 'seeker') {
      setTimeout(() => {
        navigate('/login'); // Updated route for seeker
      }, 700); // Adjust the timeout duration to match the animation duration
    } else if (option === 'recruiter') {
      setTimeout(() => {
        navigate('/recruiter/login'); // Updated route for recruiter
      }, 700); // Adjust the timeout duration to match the animation duration
    }
  };

  return (
    <div className={cn(
      "relative z-20 w-full max-w-2xl mx-auto transition-all duration-700 ease-out",
      expanded ? "scale-110 opacity-0" : "scale-100 opacity-100"
    )}>
      <div className="glass-dark p-8 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white text-center">
          Who Are You?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Job Seeker Option */}
          <div 
            className={cn(
              "relative p-6 rounded-xl transition-all duration-300",
              hoveredOption === 'recruiter' ? "opacity-50 blur-[1px]" : "opacity-100 blur-0",
              selectedOption === 'seeker' ? "scale-105" : "scale-100",
              "group"
            )}
            onMouseEnter={() => setHoveredOption('seeker')}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className="glass rounded-xl p-6 h-full flex flex-col items-center justify-center border border-purple-500/20 group-hover:border-purple-500/50 transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-500/10 mb-4 group-hover:bg-purple-500/20 transition-colors duration-300">
                <Briefcase className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-white">Job Seeker</h3>
              <p className="text-white/70 mb-6 text-center">Find Jobs with AI</p>
              
              <Button 
                variant="seeker" 
                glow 
                onClick={() => handleOptionSelect('seeker')}
                className="w-full"
              >
                Get Started
              </Button>
            </div>
          </div>
          
          {/* Job Recruiter Option */}
          <div 
            className={cn(
              "relative p-6 rounded-xl transition-all duration-300",
              hoveredOption === 'seeker' ? "opacity-50 blur-[1px]" : "opacity-100 blur-0",
              selectedOption === 'recruiter' ? "scale-105" : "scale-100",
              "group"
            )}
            onMouseEnter={() => setHoveredOption('recruiter')}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className="glass rounded-xl p-6 h-full flex flex-col items-center justify-center border border-gold-500/20 group-hover:border-gold-500/50 transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gold-500/10 mb-4 group-hover:bg-gold-500/20 transition-colors duration-300">
                <Building className="w-8 h-8 text-gold-400 group-hover:text-gold-300 transition-colors duration-300" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-white">Job Recruiter</h3>
              <p className="text-white/70 mb-6 text-center">Discover Top Talent</p>
              
              <Button 
                variant="recruiter" 
                glow 
                onClick={() => handleOptionSelect('recruiter')}
                className="w-full"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
