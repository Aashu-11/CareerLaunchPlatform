import React, { useState } from 'react';
import { Plus, Search, Filter, Briefcase, MapPin, Clock, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Job } from '../types';
import { generateContent } from '../lib/gemini';

export const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'Remote',
      type: 'Full-time',
      description: 'Looking for an experienced frontend developer with expertise in React, TypeScript, and modern web technologies. The ideal candidate will lead our frontend team and drive technical decisions.',
      requirements: ['React', 'TypeScript', '5+ years experience', 'Team leadership', 'System design'],
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
      description: 'Join our cutting-edge AI team to develop and implement machine learning solutions. Work with state-of-the-art models and contribute to groundbreaking projects.',
      requirements: ['Python', 'Machine Learning', 'Deep Learning', 'MLOps', 'PhD preferred'],
      postedDate: '5d ago',
      views: 189,
      applications: 8
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    type: 'Full-time'
  });

  const handleGenerateDescription = async () => {
    if (!newJob.title) return;
    
    const prompt = `Generate a detailed job description for a ${newJob.title} position. Include key responsibilities and requirements. Make it professional and engaging.`;
    
    try {
      const description = await generateContent(prompt);
      setNewJob(prev => ({ ...prev, description }));
    } catch (error) {
      console.error('Failed to generate description:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>
          <p className="text-gray-600 mt-2">Manage and track your job postings</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Post New Job
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 backdrop-blur-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
          />
        </div>
        <button className="px-4 py-3 rounded-xl bg-white/80 backdrop-blur-xl border border-gray-200 text-gray-700 hover:border-purple-500 transition-all flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      <div className="grid gap-6">
        {jobs.map(job => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-purple-200 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                  <p className="text-gray-600">{job.company}</p>
                </div>
              </div>
              <span className="px-4 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                {job.type}
              </span>
            </div>

            <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.requirements.map((req, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                >
                  {req}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {job.postedDate}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {job.applications} applications
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {job.views} views
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isCreating && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Job Posting</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  value={newJob.title}
                  onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  placeholder="e.g. Senior Frontend Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={newJob.company}
                  onChange={(e) => setNewJob(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  placeholder="e.g. TechCorp Inc."
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Job Description
                  </label>
                  <button
                    onClick={handleGenerateDescription}
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    Generate with AI
                  </button>
                </div>
                <textarea
                  value={newJob.description}
                  onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 h-32"
                  placeholder="Describe the role and responsibilities..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newJob.location}
                    onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    placeholder="e.g. Remote, New York, NY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Type
                  </label>
                  <select
                    value={newJob.type}
                    onChange={(e) => setNewJob(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setIsCreating(false)}
                className="px-6 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const newJobPost: Job = {
                    id: String(Date.now()),
                    ...newJob,
                    requirements: [],
                    postedDate: 'Just now',
                    views: 0,
                    applications: 0
                  };
                  setJobs(prev => [newJobPost, ...prev]);
                  setIsCreating(false);
                }}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all"
              >
                Create Job Posting
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};