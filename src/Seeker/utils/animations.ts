
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  })
};

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

export const glowPulse = {
  initial: {
    boxShadow: "0 0 0 rgba(99, 91, 255, 0)"
  },
  pulse: {
    boxShadow: [
      "0 0 0 rgba(99, 91, 255, 0)",
      "0 0 10px rgba(99, 91, 255, 0.5)",
      "0 0 20px rgba(99, 91, 255, 0.3)",
      "0 0 10px rgba(99, 91, 255, 0.5)",
      "0 0 0 rgba(99, 91, 255, 0)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export function generateParticles(count: number) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2
    });
  }
  return particles;
}
