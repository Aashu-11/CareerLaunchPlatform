
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface AnimatedTaglineProps {
  taglines: string[];
  interval?: number;
  className?: string;
}

const AnimatedTagline: React.FC<AnimatedTaglineProps> = ({
  taglines,
  interval = 4000,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      
      // Wait for fade out animation
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % taglines.length);
        setIsAnimating(false);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [taglines.length, interval]);

  return (
    <div className="relative h-12 md:h-14 overflow-hidden flex items-center justify-center">
      <h2
        className={cn(
          "absolute w-full transition-all duration-500 ease-in-out transform",
          isAnimating ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0",
          className
        )}
      >
        {taglines[currentIndex]}
      </h2>
    </div>
  );
};

export default AnimatedTagline;
