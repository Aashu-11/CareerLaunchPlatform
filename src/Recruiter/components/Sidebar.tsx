import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Search,
  UserCheck,
  Calendar,
  LineChart,
  Settings,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/recruiter/dashboard1' },
  { icon: Briefcase, label: 'Job Listings', path: '/recruiter/jobs' },
  { icon: Search, label: 'Candidate Search', path: '/recruiter/candidates' },
  { icon: UserCheck, label: 'AI Shortlisting', path: '/recruiter/shortlist' },
  { icon: Calendar, label: 'Interview Scheduler', path: '/recruiter/scheduler' },
  { icon: Calendar, label: 'Hackathons', path: '/recruiter/hackathons' }, // New nav item
  { icon: LineChart, label: 'Analytics', path: '/recruiter/analytics' },
  { icon: Settings, label: 'Settings', path: '/recruiter/settings' },

];

export const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white/80 backdrop-blur-xl shadow-lg border-r border-purple-100 p-6 space-y-8">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          AI Recruiter
        </h1>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                  : 'hover:bg-purple-50 text-gray-700'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};