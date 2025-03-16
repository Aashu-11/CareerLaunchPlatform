import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedTagline from './AnimatedTagline';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const parallaxLayers = document.querySelectorAll('.parallax-layer');
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const offsetX = ((mouseX - centerX) / centerX) * 15;
      const offsetY = ((mouseY - centerY) / centerY) * 15;
      
      parallaxLayers.forEach((layer: Element, index) => {
        const htmlLayer = layer as HTMLElement;
        const speed = Number(htmlLayer.getAttribute('data-speed')) || 1;
        const x = offsetX * speed;
        const y = offsetY * speed;
        htmlLayer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const taglines = [
    "Your Career, Reimagined. Powered by AI.",
    "Recruit Smarter. Hire Faster. The Future is Here.",
    "Elevate Your Job Search with Next-Gen AI."
  ];

 

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* 3D parallax floating orbs */}
      <div ref={parallaxRef} className="absolute inset-0 z-0 overflow-hidden">
        {/* Floating orbs with different parallax speeds */}
        <div className="parallax-layer absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" data-speed="0.5"></div>
        <div className="parallax-layer absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-navy-400/20 blur-3xl" data-speed="0.3"></div>
        <div className="parallax-layer absolute top-2/3 right-1/3 w-48 h-48 rounded-full bg-gold-500/10 blur-3xl" data-speed="0.7"></div>
        
        {/* Small decorative orbs */}
        <div className="parallax-layer absolute top-1/2 left-1/2 w-10 h-10 -ml-40 -mt-20 rounded-full bg-white/20 animate-float shadow-neon-purple" data-speed="2"></div>
        <div className="parallax-layer absolute top-1/3 right-1/3 w-6 h-6 rounded-full bg-white/30 animate-float shadow-neon-gold" style={{animationDelay: '1s'}} data-speed="1.5"></div>
        <div className="parallax-layer absolute bottom-1/4 left-1/4 w-8 h-8 rounded-full bg-white/20 animate-float shadow-neon-purple" style={{animationDelay: '2s'}} data-speed="1.8"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-white glass rounded-full animate-pulse-glow">
          The Future of Job Matching
        </span>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white leading-tight">
          <span className="text-gradient-blue-purple text-glow">AI-Powered</span> Job Platform
        </h1>
        
        <AnimatedTagline
          taglines={taglines}
          className="text-xl md:text-2xl text-white/90 font-light"
        />
        
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="default"
            size="lg"
            glow
            className="group"
            icon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          >
            Get Started Now
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
