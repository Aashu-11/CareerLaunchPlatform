import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  User, 
  Trophy,
  Calendar,
  ListChecks,
  LogOut
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Briefcase, label: 'Job Search', path: '/jobs' },
  { icon: FileText, label: 'Resume Builder', path: '/resume-builder' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Trophy, label: 'Achievements', path: '/achievements' },
  { icon: Calendar, label: 'Interviews', path: '/interviews' },
  { icon: ListChecks, label: 'Applications', path: '/applications' },
  { icon: LayoutDashboard, label: 'HackOHire', path: '/index' }
];

const Sidebar = () => {
  return (
    <div className="w-64 h-[calc(100vh-4rem)] sticky top-16 bg-white/50 backdrop-blur-lg 
                  border-r border-gray-200 py-8 flex flex-col">
      <div className="flex-1 px-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'hover:bg-gray-100 text-gray-700'}
              `}
            >
              {({ isActive }) => (
                <motion.div
                  initial={false}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  className="flex items-center gap-3"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="px-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 
                        hover:bg-gray-100 transition-colors duration-200">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;