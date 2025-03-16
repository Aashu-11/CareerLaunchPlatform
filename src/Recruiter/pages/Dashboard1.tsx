import React from 'react';
import { Users, Briefcase, UserCheck, TrendingUp } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';
import { JobCard } from '../components/JobCard';

const mockJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'Remote',
    type: 'Full-time',
    description: 'Looking for an experienced frontend developer...',
    requirements: ['React', 'TypeScript', '5+ years experience'],
    postedDate: '2d ago',
    views: 245,
    applications: 12
  },
  {
    id: '2',
    title: 'AI Engineer',
    company: 'AI Solutions Ltd',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Join our AI team...',
    requirements: ['Python', 'Machine Learning', 'PhD preferred'],
    postedDate: '5d ago',
    views: 189,
    applications: 8
  }
];

export const Dashboard1 = () => {
  return (
    <div style={{ zIndex: 2 }} className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Sarah!</h1>
        <p className="text-gray-600">Here's what's happening with your recruitment pipeline.</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <DashboardCard
          title="Total Applications"
          value="1,234"
          icon={<Users className="w-6 h-6 text-white" />}
          trend={12}
          gradient="bg-gradient-to-r from-purple-600 to-pink-600"
        />
        <DashboardCard
          title="Active Jobs"
          value="45"
          icon={<Briefcase className="w-6 h-6 text-white" />}
          trend={5}
          gradient="bg-gradient-to-r from-blue-600 to-indigo-600"
        />
        <DashboardCard
          title="Shortlisted"
          value="89"
          icon={<UserCheck className="w-6 h-6 text-white" />}
          trend={-2}
          gradient="bg-gradient-to-r from-emerald-600 to-teal-600"
        />
        <DashboardCard
          title="Time to Hire"
          value="12 days"
          icon={<TrendingUp className="w-6 h-6 text-white" />}
          trend={-8}
          gradient="bg-gradient-to-r from-orange-600 to-red-600"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Job Postings</h2>
        <div className="grid grid-cols-2 gap-6">
          {mockJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard1;