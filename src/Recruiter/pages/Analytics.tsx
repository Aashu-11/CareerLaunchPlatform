import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, Users, Clock, Target } from 'lucide-react';

const data = [
  { name: 'Jan', applications: 65, interviews: 28, hires: 4 },
  { name: 'Feb', applications: 85, interviews: 35, hires: 6 },
  { name: 'Mar', applications: 120, interviews: 45, hires: 8 },
  { name: 'Apr', applications: 95, interviews: 38, hires: 5 },
  { name: 'May', applications: 145, interviews: 52, hires: 10 },
  { name: 'Jun', applications: 160, interviews: 58, hires: 12 }
];

const sourceData = [
  { name: 'LinkedIn', value: 45 },
  { name: 'Company Website', value: 30 },
  { name: 'Job Boards', value: 15 },
  { name: 'Referrals', value: 10 }
];

const timeToHireData = [
  { stage: 'Application Review', days: 2 },
  { stage: 'Initial Screening', days: 3 },
  { stage: 'Technical Interview', days: 5 },
  { stage: 'Final Interview', days: 3 },
  { stage: 'Offer & Negotiation', days: 4 }
];

export const Analytics = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
        <p className="text-gray-600 mt-2">Track your recruitment metrics and performance</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white/80">Total Applications</p>
              <h3 className="text-2xl font-bold">1,234</h3>
            </div>
          </div>
          <div className="text-sm text-white/80">
            <span className="text-green-300">↑ 12%</span> vs last month
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white/80">Active Candidates</p>
              <h3 className="text-2xl font-bold">89</h3>
            </div>
          </div>
          <div className="text-sm text-white/80">
            <span className="text-green-300">↑ 8%</span> vs last month
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white/80">Avg. Time to Hire</p>
              <h3 className="text-2xl font-bold">12 days</h3>
            </div>
          </div>
          <div className="text-sm text-white/80">
            <span className="text-red-300">↓ 2 days</span> vs last month
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white/80">Conversion Rate</p>
              <h3 className="text-2xl font-bold">18.5%</h3>
            </div>
          </div>
          <div className="text-sm text-white/80">
            <span className="text-green-300">↑ 2.3%</span> vs last month
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recruitment Pipeline</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stackId="1"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="interviews"
                  stackId="1"
                  stroke="#ec4899"
                  fill="#ec4899"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="hires"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Candidate Sources</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Time to Hire Breakdown</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeToHireData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="days"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};