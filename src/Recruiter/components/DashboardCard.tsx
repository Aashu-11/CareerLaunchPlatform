import React from 'react';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  gradient: string;
}

export const DashboardCard = ({ title, value, icon, trend, gradient }: DashboardCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl ${gradient} p-6 shadow-lg`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            {icon}
          </div>
          {trend !== undefined && (
            <span className={`text-sm font-medium ${trend >= 0 ? 'text-green-100' : 'text-red-100'}`}>
              {trend >= 0 ? '+' : ''}{trend}%
            </span>
          )}
        </div>
        <h3 className="text-white/80 font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </motion.div>
  );
};