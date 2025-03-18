import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, ThumbsUp, ThumbsDown, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import type { Candidate } from '../types';
import { generateContent } from '../lib/gemini';

interface ShortlistedCandidate extends Candidate {
  status: 'shortlisted' | 'rejected' | 'reviewing';
  feedback?: string;
  shortlistReason?: string;
}

const initialCandidates: ShortlistedCandidate[] = [
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
    availability: 'Immediate',
    status: 'shortlisted',
    shortlistReason: 'Perfect match for the role with extensive experience in required technologies and proven leadership track record.'
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
    availability: '2 weeks',
    status: 'reviewing'
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
    availability: 'Immediate',
    status: 'shortlisted',
    shortlistReason: 'Strong full-stack capabilities and proven experience with our tech stack. Great cultural fit potential.'
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
    availability: '1 month',
    status: 'rejected',
    shortlistReason: 'While technically strong, the candidate\'s experience is more focused on infrastructure than our current needs.'
  }
];

export const Shortlist = () => {
  const [candidates, setCandidates] = useState<ShortlistedCandidate[]>(initialCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'shortlisted' | 'reviewing' | 'rejected'>('all');

  const filteredCandidates = candidates.filter(candidate => 
    filter === 'all' || candidate.status === filter
  );

  const generateAIFeedback = async (candidate: ShortlistedCandidate) => {
    setLoading(true);
    try {
      const prompt = `Analyze this candidate profile and provide detailed feedback:
        Name: ${candidate.name}
        Role: ${candidate.title}
        Experience: ${candidate.experience} years
        Skills: ${candidate.skills.join(', ')}
        Education: ${candidate.education}
        Previous Companies: ${candidate.previousCompanies.join(', ')}
        
        Please provide:
        1. Overall assessment
        2. Key strengths and alignment with role
        3. Potential areas for discussion
        4. Specific interview recommendations
        5. Cultural fit evaluation
        
        Also provide the entire details in plain text format and ensure that you dont include any kind of special characters like * , # etc and ensure it would help the recruiter to analyze the resume thoroughly.`;

      const feedback = await generateContent(prompt);
      setCandidates(prev => prev.map(c => 
        c.id === candidate.id ? { ...c, feedback } : c
      ));
      setLoading(false);
      return feedback;
    } catch (error) {
      setLoading(false);
      console.error('Failed to generate feedback:', error);
      return 'Failed to generate AI feedback. Please try again.';
    }
  };

  const handleStatusChange = async (candidateId: string, newStatus: ShortlistedCandidate['status']) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate) return;

    const prompt = `Based on the following candidate profile, provide a detailed reason for ${
      newStatus === 'shortlisted' ? 'shortlisting' : 'rejecting'
    } the candidate:
    
    Name: ${candidate.name}
    Role: ${candidate.title}
    Experience: ${candidate.experience} years
    Skills: ${candidate.skills.join(', ')}
    Education: ${candidate.education}
    Previous Companies: ${candidate.previousCompanies.join(', ')}
    Match Score: ${candidate.matchScore}%
    
    Consider technical skills, experience, and potential cultural fit.`;

    try {
      const shortlistReason = await generateContent(prompt);
      setCandidates(prev => prev.map(c => 
        c.id === candidateId ? { ...c, status: newStatus, shortlistReason } : c
      ));
    } catch (error) {
      console.error('Failed to generate shortlist reason:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Shortlisting</h1>
        <p className="text-gray-600 mt-2">AI-powered candidate evaluation and shortlisting</p>
      </div>

      <div className="flex gap-4 mb-6">
        {(['all', 'shortlisted', 'reviewing', 'rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-700 hover:bg-purple-50'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== 'all' && ` (${candidates.filter(c => c.status === status).length})`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-purple-100">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">Candidates</h2>
          </div>

          <div className="space-y-4">
            {filteredCandidates.map(candidate => (
              <motion.div
                key={candidate.id}
                onClick={() => setSelectedCandidate(candidate.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedCandidate === candidate.id
                    ? 'bg-purple-50 border-purple-200'
                    : 'hover:bg-gray-50 border-transparent'
                } border`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={candidate.photo}
                    alt={candidate.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                    <p className="text-sm text-gray-600">{candidate.title}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Star className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-600">
                        {candidate.matchScore}% Match
                      </span>
                    </div>
                  </div>
                  {candidate.status === 'shortlisted' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {candidate.status === 'rejected' && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          {selectedCandidate ? (
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-purple-100">
              {candidates.find(c => c.id === selectedCandidate) && (
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <img
                        src={candidates.find(c => c.id === selectedCandidate)?.photo}
                        alt={candidates.find(c => c.id === selectedCandidate)?.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {candidates.find(c => c.id === selectedCandidate)?.name}
                        </h2>
                        <p className="text-gray-600">
                          {candidates.find(c => c.id === selectedCandidate)?.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(selectedCandidate, 'shortlisted')}
                        className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
                      >
                        <ThumbsUp className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedCandidate, 'rejected')}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                      >
                        <ThumbsDown className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => window.location.href = `/scheduler?candidate=${selectedCandidate}`}
                        className="p-2 rounded-lg hover:bg-purple-50 text-purple-600 transition-colors"
                      >
                        <MessageSquare className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-purple-50">
                      <h3 className="font-medium text-purple-900 mb-2">Skills Match</h3>
                      <div className="space-y-2">
                        {candidates
                          .find(c => c.id === selectedCandidate)
                          ?.skills.map((skill, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">{skill}</span>
                              <div className="w-24 h-2 bg-purple-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-purple-600"
                                  style={{ width: `${Math.random() * 40 + 60}%` }}
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50">
                      <h3 className="font-medium text-blue-900 mb-2">AI Insights</h3>
                      <ul className="space-y-2">
                        {candidates
                          .find(c => c.id === selectedCandidate)
                          ?.aiInsights.map((insight, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                              {insight}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>

                  {candidates.find(c => c.id === selectedCandidate)?.shortlistReason && (
                    <div className="p-4 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-gray-900 mb-2">AI Evaluation</h3>
                      <p className="text-sm text-gray-700">
                        {candidates.find(c => c.id === selectedCandidate)?.shortlistReason}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => generateAIFeedback(candidates.find(c => c.id === selectedCandidate)!)}
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    {loading ? 'Generating AI Feedback...' : 'Generate Detailed AI Feedback'}
                  </button>

                  {candidates.find(c => c.id === selectedCandidate)?.feedback && (
                    <div className="p-4 rounded-xl bg-green-50">
                      <h3 className="font-medium text-green-900 mb-2">AI Feedback</h3>
                      <p className="text-sm text-gray-700 whitespace-pre-line">
                        {candidates.find(c => c.id === selectedCandidate)?.feedback}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a candidate to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};