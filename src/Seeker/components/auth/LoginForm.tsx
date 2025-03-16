import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login for demo
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md p-8 glassmorphism rounded-2xl"
    >
      <h2 className="text-3xl font-bold mb-6 gradient-text text-center">
        Welcome Back
      </h2>
      
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white/50 backdrop-blur-sm
                     focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white/50 backdrop-blur-sm
                     focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="neon-button w-full py-2 rounded-lg font-semibold relative overflow-hidden
                   group hover:scale-105 transition-transform duration-200"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 
                         opacity-50 group-hover:opacity-100 transition-opacity duration-200"></span>
          <span className="relative flex items-center justify-center gap-2">
            {loading ? (
              <>
                <Loader className="animate-spin h-5 w-5" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </span>
        </button>

        <div className="flex items-center gap-4 mt-6">
          <hr className="flex-1 border-gray-300" />
          <span className="text-sm text-gray-500">or continue with</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2 px-4 border rounded-lg
                     hover:bg-gray-50 transition-colors duration-200"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2 px-4 border rounded-lg
                     hover:bg-gray-50 transition-colors duration-200"
          >
            <img src="https://www.linkedin.com/favicon.ico" alt="LinkedIn" className="w-5 h-5" />
            LinkedIn
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginForm;