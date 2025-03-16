
import { useEffect, useState, useRef } from 'react';
import { generateParticles } from '../../utils/animations';

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<any[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    setParticles(generateParticles(50));

    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const { width, height } = canvas.getBoundingClientRect();
        setDimensions({ width, height });
        canvas.width = width;
        canvas.height = height;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      particles.forEach((particle) => {
        // Draw particle
        ctx.beginPath();
        const x = (particle.x / 100) * dimensions.width;
        const y = (particle.y / 100) * dimensions.height;
        
        // Create gradient for glowing effect
        const gradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, particle.size * 4
        );
        
        gradient.addColorStop(0, 'rgba(99, 91, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(99, 91, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(99, 91, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(x, y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Move particle
        particle.y += particle.speed;
        if (particle.y > 100) {
          particle.y = 0;
          particle.x = Math.random() * 100;
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particles, dimensions]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-[-1]">
      <div className="absolute inset-0 bg-navy-500 bg-gradient-to-br from-navy-500 via-navy-700 to-navy-900" />
      
      {/* Canvas for animated particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-navy-900 opacity-70" />
      
      {/* Mesh grid effect */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ 
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "-0.5px -0.5px"
        }}
      />
    </div>
  );
};

export default Background;
