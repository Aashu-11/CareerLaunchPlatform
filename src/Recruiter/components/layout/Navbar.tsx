import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onNotificationsClick: () => void;
}

const Navbar = ({ onNotificationsClick }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <nav className="h-16 bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="h-full max-w-screen-2xl mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <motion.h1 
            className="text-2xl font-bold gradient-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            CareerLaunch AI
          </motion.h1>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs, companies, or skills..."
              className="pl-10 pr-4 py-2 w-96 rounded-lg border border-gray-200 focus:ring-2 
                       focus:ring-purple-500 focus:border-transparent bg-white/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
            onClick={onNotificationsClick}
          >
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full 
                         text-white text-xs flex items-center justify-center">
              3
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-100"
            onClick={() => navigate('/profile')}
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 
                         flex items-center justify-center text-white">
              <User className="h-5 w-5" />
            </div>
            <span className="font-medium">John Doe</span>
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;