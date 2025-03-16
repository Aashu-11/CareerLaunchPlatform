import React from 'react';
import { motion } from 'framer-motion';
import { 
  CircularProgressbar, 
  buildStyles 
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Briefcase, 
  Trophy, 
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';

const applicationData = [
  { month: 'Jan', applications: 12 },
  { month: 'Feb', applications: 19 },
  { month: 'Mar', applications: 15 },
  { month: 'Apr', applications: 25 },
  { month: 'May', applications: 22 },
  { month: 'Jun', applications: 30 }
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Welcome back, John! 👋</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your job search</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white 
                   rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200"
        >
          Quick Apply
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { 
            icon: Briefcase, 
            label: 'Active Applications', 
            value: '24',
            color: 'from-blue-500 to-blue-600' 
          },
          { 
            icon: Calendar, 
            label: 'Upcoming Interviews', 
            value: '3',
            color: 'from-purple-500 to-purple-600' 
          },
          { 
            icon: Trophy, 
            label: 'Profile Score', 
            value: '85%',
            color: 'from-yellow-500 to-yellow-600' 
          },
          { 
            icon: TrendingUp, 
            label: 'Job Match Rate', 
            value: '92%',
            color: 'from-green-500 to-green-600' 
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${stat.color} 
                           flex items-center justify-center text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-gray-600 text-sm">{stat.label}</h3>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Applications Chart */}
        <div className="col-span-8 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Application Activity</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="applications" 
                  fill="url(#colorGradient)" 
                  radius={[4, 4, 0, 0]} 
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="col-span-4 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Profile Completion</h2>
          <div className="w-48 mx-auto mb-6">
            <CircularProgressbar
              value={85}
              text={`${85}%`}
              styles={buildStyles({
                pathColor: `#8B5CF6`,
                textColor: '#1F2937',
                trailColor: '#E5E7EB'
              })}
            />
          </div>
          <div className="space-y-4">
            {[
              { label: 'Basic Info', complete: true },
              { label: 'Work Experience', complete: true },
              { label: 'Education', complete: true },
              { label: 'Skills', complete: false },
              { label: 'Portfolio', complete: false }
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-gray-600">{item.label}</span>
                {item.complete ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Clock className="h-5 w-5 text-yellow-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="col-span-12 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Recent Applications</h2>
          <div className="space-y-4">
            {[
              {
                company: 'Google',
                position: 'Senior React Developer',
                status: 'In Review',
                icon: Clock,
                statusColor: 'text-yellow-500'
              },
              {
                company: 'Microsoft',
                position: 'Frontend Engineer',
                status: 'Rejected',
                icon: X,
                statusColor: 'text-red-500'
              },
              {
                company: 'Amazon',
                position: 'Full Stack Developer',
                status: 'Interview',
                icon: Calendar,
                statusColor: 'text-blue-500'
              }
            ].map((application, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 
                         transition-colors duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <img 
                      src={`https://logo.clearbit.com/${application.company.toLowerCase()}.com`}
                      alt={application.company}
                      className="h-8 w-8"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{application.position}</h3>
                    <p className="text-sm text-gray-600">{application.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <application.icon className={`h-5 w-5 ${application.statusColor}`} />
                  <span className={`${application.statusColor}`}>{application.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;