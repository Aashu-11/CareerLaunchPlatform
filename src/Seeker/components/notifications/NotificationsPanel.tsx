import React from 'react';
import { motion } from 'framer-motion';
import { X, Bell, Briefcase, Calendar, Trophy } from 'lucide-react';

interface NotificationsPanelProps {
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    type: 'job',
    icon: Briefcase,
    title: 'New Job Match',
    description: 'Senior React Developer position at Google matches your profile!',
    time: '2 minutes ago',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    type: 'interview',
    icon: Calendar,
    title: 'Interview Reminder',
    description: 'Technical interview with Amazon tomorrow at 2 PM',
    time: '1 hour ago',
    color: 'bg-purple-500'
  },
  {
    id: 3,
    type: 'achievement',
    icon: Trophy,
    title: 'Achievement Unlocked',
    description: 'You\'ve earned the "Job Search Pro" badge!',
    time: '2 hours ago',
    color: 'bg-yellow-500'
  }
];

const NotificationsPanel = ({ onClose }: NotificationsPanelProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-6 w-6 text-gray-600" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer 
                       transition-colors duration-200"
            >
              <div className={`h-10 w-10 rounded-full ${notification.color} 
                           flex items-center justify-center text-white`}>
                <notification.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                <p className="text-sm text-gray-600">{notification.description}</p>
                <span className="text-xs text-gray-400">{notification.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;