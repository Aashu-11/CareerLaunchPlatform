import React from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/auth/LoginForm';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';

const Login = () => {
  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="w-1/2 flex items-center justify-center p-8 relative">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            particles: {
              color: {
                value: "#6366f1",
              },
              links: {
                color: "#6366f1",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                enable: true,
                speed: 1,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.2,
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
          }}
          className="absolute inset-0"
        />
        <LoginForm />
      </div>

      {/* Right side - Features */}
      <div className="w-1/2 bg-gradient-to-br from-purple-600 via-blue-500 to-pink-500 
                    flex items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-white max-w-lg"
        >
          <h1 className="text-4xl font-bold mb-6">
            Elevate Your Career Journey
          </h1>
          
          <div className="space-y-6">
            {[
              {
                title: "AI-Powered Job Matching",
                description: "Our advanced AI algorithms find the perfect job matches based on your skills and preferences."
              },
              {
                title: "Smart Resume Builder",
                description: "Create stunning resumes with our AI-assisted builder and professional templates."
              },
              {
                title: "Real-time Application Tracking",
                description: "Track your job applications and interviews with our intuitive dashboard."
              },
              {
                title: "Career Growth Analytics",
                description: "Get personalized insights and recommendations to boost your career growth."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-white/80">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;