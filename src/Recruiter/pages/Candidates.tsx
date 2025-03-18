import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, MapPin, Briefcase, Award, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Candidate } from '../types';

const initialCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    title: 'Senior Frontend Developer',
    experience: 7,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    location: 'San Francisco, CA',
    matchScore: 95,
    aiInsights: [
      'Strong technical leadership experience',
      'Excellent problem-solving skills',
      'Great cultural fit potential'
    ],
    education: 'MS Computer Science, Stanford University',
    previousCompanies: ['Google', 'Microsoft'],
    availability: 'Immediate'
  },
  {
    id: '2',
    name: 'Michael Chen',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    title: 'AI Engineer',
    experience: 5,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps', 'Docker'],
    location: 'Remote',
    matchScore: 88,
    aiInsights: [
      'Deep expertise in machine learning',
      'Published research papers',
      'Active open source contributor'
    ],
    education: 'PhD Artificial Intelligence, MIT',
    previousCompanies: ['OpenAI', 'DeepMind'],
    availability: '2 weeks'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    title: 'Full Stack Developer',
    experience: 4,
    skills: ['React', 'Node.js', 'MongoDB', 'Docker', 'TypeScript'],
    location: 'Austin, TX',
    matchScore: 92,
    aiInsights: [
      'Full stack expertise with modern technologies',
      'Strong problem-solving abilities',
      'Excellent team collaboration skills'
    ],
    education: 'BS Computer Science, UT Austin',
    previousCompanies: ['Amazon', 'Dell'],
    availability: 'Immediate'
  },
  {
    id: '4',
    name: 'David Kim',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    title: 'DevOps Engineer',
    experience: 6,
    skills: ['Kubernetes', 'AWS', 'Terraform', 'Python', 'CI/CD'],
    location: 'Seattle, WA',
    matchScore: 87,
    aiInsights: [
      'Infrastructure automation expert',
      'Strong security background',
      'Excellent troubleshooting skills'
    ],
    education: 'BS Computer Engineering, University of Washington',
    previousCompanies: ['AWS', 'Oracle'],
    availability: '1 month'
  }
];

export const Candidates = () => {
  const [candidates] = useState<Candidate[]>(initialCandidates);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minExperience: 0,
    maxExperience: 10,
    location: '',
    availability: '',
    minMatchScore: 0
  });

  const allSkills = useMemo(() => 
    Array.from(new Set(candidates.flatMap(candidate => candidate.skills))),
    [candidates]
  );

  const filteredCandidates = useMemo(() => {
    return candidates.filter(candidate => {
      // Search term filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        candidate.name.toLowerCase().includes(searchLower) ||
        candidate.title.toLowerCase().includes(searchLower) ||
        candidate.location.toLowerCase().includes(searchLower) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchLower));

      // Skills filter
      const matchesSkills = selectedSkills.length === 0 || 
        selectedSkills.every(skill => candidate.skills.includes(skill));

      // Experience filter
      const matchesExperience = 
        candidate.experience >= filters.minExperience &&
        candidate.experience <= filters.maxExperience;

      // Location filter
      const matchesLocation = !filters.location ||
        candidate.location.toLowerCase().includes(filters.location.toLowerCase());

      // Availability filter
      const matchesAvailability = !filters.availability ||
        candidate.availability.toLowerCase() === filters.availability.toLowerCase();

      // Match score filter
      const matchesScore = candidate.matchScore >= filters.minMatchScore;

      return matchesSearch && matchesSkills && matchesExperience && 
             matchesLocation && matchesAvailability && matchesScore;
    });
  }, [candidates, searchTerm, selectedSkills, filters]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Candidate Search</h1>
        <p className="text-gray-600 mt-2">Find and evaluate top talent for your positions</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, skills, or location..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 backdrop-blur-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
          />
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-3 rounded-xl border text-gray-700 hover:border-purple-500 transition-all flex items-center gap-2
            ${showFilters ? 'bg-purple-50 border-purple-500' : 'bg-white/80 backdrop-blur-xl border-gray-200'}`}
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </button>
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 mb-6"
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Range (years)
              </label>
              <div className="flex gap-4">
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={filters.minExperience}
                  onChange={(e) => setFilters(prev => ({ ...prev, minExperience: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  placeholder="Min"
                />
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={filters.maxExperience}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxExperience: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  placeholder="Max"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                placeholder="Enter location..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                value={filters.availability}
                onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              >
                <option value="">Any</option>
                <option value="Immediate">Immediate</option>
                <option value="2 weeks">2 weeks</option>
                <option value="1 month">1 month</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Match Score
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.minMatchScore}
                onChange={(e) => setFilters(prev => ({ ...prev, minMatchScore: parseInt(e.target.value) }))}
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-1">
                {filters.minMatchScore}% or higher
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Skills Filter</h3>
        <div className="flex flex-wrap gap-2">
          {allSkills.map(skill => (
            <button
              key={skill}
              onClick={() => {
                setSelectedSkills(prev =>
                  prev.includes(skill)
                    ? prev.filter(s => s !== skill)
                    : [...prev, skill]
                );
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedSkills.includes(skill)
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredCandidates.map(candidate => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-purple-200 transition-all"
          >
            <div className="flex gap-6">
              <img
                src={candidate.photo}
                alt={candidate.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{candidate.name}</h2>
                    <p className="text-gray-600">{candidate.title}</p>
                    <p className="text-sm text-gray-500">{candidate.education}</p>
                  </div>
                  <div className="flex items-center gap-2 text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-medium">{candidate.matchScore}% Match</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {candidate.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {candidate.experience} years
                  </div>
                  <div className="text-sm text-gray-500">
                    Previously at: {candidate.previousCompanies.join(', ')}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {candidate.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-purple-700 mb-2">
                    <Award className="w-5 h-5" />
                    <h3 className="font-medium">AI Insights</h3>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {candidate.aiInsights.map((insight, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end mt-4 gap-3">
                  <button
                    onClick={() => window.location.href = `/shortlist?candidate=${candidate.id}`}
                    className="px-4 py-2 rounded-xl bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => window.location.href = `/recruiter/scheduler?candidate=${candidate.id}`}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all"
                  >
                    Schedule Interview
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredCandidates.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No candidates match your search criteria
          </div>
        )}
      </div>
    </div>
  );
};