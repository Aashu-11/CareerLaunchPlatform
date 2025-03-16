import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, TrendingUp } from 'lucide-react';
import type { Job } from '../types';

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-purple-100"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
        </div>
        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
          {job.type}
        </span>
      </div>

      <div className="flex items-center space-x-4 text-gray-600 mb-4">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {job.location}
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {job.postedDate}
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center text-gray-600">
          <Users className="w-4 h-4 mr-1" />
          {job.applications} applications
        </div>
        <div className="flex items-center text-gray-600">
          <TrendingUp className="w-4 h-4 mr-1" />
          {job.views} views
        </div>
      </div>

      <div className="flex space-x-3">
        <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-xl font-medium shadow-lg shadow-purple-500/20 hover:shadow-xl transition-shadow">
          View Details
        </button>
        <button className="flex-1 bg-purple-50 text-purple-700 py-2 px-4 rounded-xl font-medium hover:bg-purple-100 transition-colors">
          Edit
        </button>
      </div>
    </motion.div>
  );
};