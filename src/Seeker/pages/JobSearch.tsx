import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Briefcase,
  Clock,
  Star,
  Filter,
  ChevronDown,
  X
} from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'Google',
    location: 'Mountain View, CA',
    salary: '$150,000 - $200,000',
    type: 'Part-Time',
    description: 'We are looking for a Senior React Developer to join our team...',
    requirements: [
      'Expert in React and TypeScript',
      'Experience with state management',
      'Strong understanding of web performance',
      'Experience with CI/CD pipelines'
    ],
    postedDate: '2 days ago',
    matchScore: 95
  },
  {
    id: 2,
    title: 'Junior Frontend Developer',
    company: 'Facebook',
    location: 'Menlo Park, CA',
    salary: '$80,000 - $120,000',
    type: 'Full-time',
    description: 'Join our team as a Junior Frontend Developer...',
    requirements: [
      'Proficient in HTML, CSS, and JavaScript',
      'Experience with React',
      'Good understanding of web design principles'
    ],
    postedDate: '1 week ago',
    matchScore: 85
  },
  {
    id: 3,
    title: 'Backend Developer',
    company: 'Amazon',
    location: 'Seattle, WA',
    salary: '$130,000 - $170,000',
    type: 'Full-time',
    description: 'We are looking for a Backend Developer to work on our cloud services...',
    requirements: [
      'Experience with Node.js and Express',
      'Knowledge of databases (SQL and NoSQL)',
      'Understanding of RESTful APIs'
    ],
    postedDate: '3 days ago',
    matchScore: 90
  },
  {
    id: 4,
    title: 'Full Stack Developer',
    company: 'Microsoft',
    location: 'Redmond, WA',
    salary: '$140,000 - $180,000',
    type: 'Full-time',
    description: 'We need a Full Stack Developer to join our team...',
    requirements: [
      'Experience with React and Node.js',
      'Knowledge of cloud services (Azure)',
      'Strong problem-solving skills'
    ],
    postedDate: '5 days ago',
    matchScore: 92
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'Netflix',
    location: 'Los Gatos, CA',
    salary: '$160,000 - $210,000',
    type: 'Full-time',
    description: 'We are looking for a Data Scientist to analyze our data...',
    requirements: [
      'Experience with Python and R',
      'Knowledge of machine learning algorithms',
      'Strong statistical analysis skills'
    ],
    postedDate: '1 week ago',
    matchScore: 88
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    company: 'Spotify',
    location: 'Remote',
    salary: '$120,000 - $160,000',
    type: 'Full-time',
    description: 'Join our team as a DevOps Engineer...',
    requirements: [
      'Experience with CI/CD pipelines',
      'Knowledge of Docker and Kubernetes',
      'Understanding of cloud services (AWS)'
    ],
    postedDate: '2 weeks ago',
    matchScore: 87
  },
  {
    id: 7,
    title: 'UI/UX Designer',
    company: 'Adobe',
    location: 'San Francisco, CA',
    salary: '$100,000 - $140,000',
    type: 'Full-time',
    description: 'We are looking for a UI/UX Designer to design our products...',
    requirements: [
      'Experience with design tools (Sketch, Figma)',
      'Knowledge of user-centered design principles',
      'Strong portfolio of design projects'
    ],
    postedDate: '3 days ago',
    matchScore: 89
  },
  {
    id: 8,
    title: 'Mobile Developer',
    company: 'Uber',
    location: 'San Francisco, CA',
    salary: '$110,000 - $150,000',
    type: 'Full-time',
    description: 'We need a Mobile Developer to build our mobile apps...',
    requirements: [
      'Experience with iOS and Android development',
      'Knowledge of Swift and Kotlin',
      'Understanding of mobile UI/UX design'
    ],
    postedDate: '4 days ago',
    matchScore: 91
  },
  {
    id: 9,
    title: 'Product Manager',
    company: 'Twitter',
    location: 'San Francisco, CA',
    salary: '$130,000 - $170,000',
    type: 'Full-time',
    description: 'Join our team as a Product Manager...',
    requirements: [
      'Experience with product management',
      'Knowledge of agile methodologies',
      'Strong communication skills'
    ],
    postedDate: '1 week ago',
    matchScore: 86
  },
  {
    id: 10,
    title: 'QA Engineer',
    company: 'LinkedIn',
    location: 'Sunnyvale, CA',
    salary: '$90,000 - $130,000',
    type: 'Full-time',
    description: 'We are looking for a QA Engineer to test our products...',
    requirements: [
      'Experience with manual and automated testing',
      'Knowledge of testing tools (Selenium, JUnit)',
      'Strong attention to detail'
    ],
    postedDate: '2 weeks ago',
    matchScore: 84
  },
  {
    id: 11,
    title: 'Cloud Engineer',
    company: 'IBM',
    location: 'Remote',
    salary: '$140,000 - $180,000',
    type: 'Full-time',
    description: 'We need a Cloud Engineer to manage our cloud infrastructure...',
    requirements: [
      'Experience with cloud services (AWS, Azure, GCP)',
      'Knowledge of infrastructure as code (Terraform)',
      'Understanding of networking and security'
    ],
    postedDate: '3 days ago',
    matchScore: 90
  },
  {
    id: 12,
    title: 'Cybersecurity Analyst',
    company: 'Cisco',
    location: 'San Jose, CA',
    salary: '$120,000 - $160,000',
    type: 'Full-time',
    description: 'Join our team as a Cybersecurity Analyst...',
    requirements: [
      'Experience with cybersecurity tools and techniques',
      'Knowledge of network security',
      'Strong analytical skills'
    ],
    postedDate: '1 week ago',
    matchScore: 88
  },
  {
    id: 13,
    title: 'Machine Learning Engineer',
    company: 'Apple',
    location: 'Cupertino, CA',
    salary: '$150,000 - $200,000',
    type: 'Full-time',
    description: 'We are looking for a Machine Learning Engineer to develop ML models...',
    requirements: [
      'Experience with Python and TensorFlow',
      'Knowledge of machine learning algorithms',
      'Strong problem-solving skills'
    ],
    postedDate: '2 days ago',
    matchScore: 92
  },
  {
    id: 14,
    title: 'Systems Administrator',
    company: 'Oracle',
    location: 'Redwood City, CA',
    salary: '$100,000 - $140,000',
    type: 'Full-time',
    description: 'We need a Systems Administrator to manage our IT infrastructure...',
    requirements: [
      'Experience with Linux and Windows servers',
      'Knowledge of networking and security',
      'Strong troubleshooting skills'
    ],
    postedDate: '1 week ago',
    matchScore: 85
  },
  {
    id: 15,
    title: 'Technical Support Engineer',
    company: 'Salesforce',
    location: 'San Francisco, CA',
    salary: '$80,000 - $120,000',
    type: 'Full-time',
    description: 'Join our team as a Technical Support Engineer...',
    requirements: [
      'Experience with customer support',
      'Knowledge of CRM systems',
      'Strong communication skills'
    ],
    postedDate: '2 weeks ago',
    matchScore: 83
  },
  {
    id: 16,
    title: 'Network Engineer',
    company: 'Intel',
    location: 'Santa Clara, CA',
    salary: '$110,000 - $150,000',
    type: 'Full-time',
    description: 'We are looking for a Network Engineer to manage our network infrastructure...',
    requirements: [
      'Experience with network design and implementation',
      'Knowledge of routing and switching',
      'Strong troubleshooting skills'
    ],
    postedDate: '3 days ago',
    matchScore: 87
  },
  {
    id: 17,
    title: 'Database Administrator',
    company: 'SAP',
    location: 'Palo Alto, CA',
    salary: '$120,000 - $160,000',
    type: 'Full-time',
    description: 'We need a Database Administrator to manage our databases...',
    requirements: [
      'Experience with SQL and NoSQL databases',
      'Knowledge of database design and optimization',
      'Strong problem-solving skills'
    ],
    postedDate: '1 week ago',
    matchScore: 89
  },
  {
    id: 18,
    title: 'Business Analyst',
    company: 'Accenture',
    location: 'Remote',
    salary: '$90,000 - $130,000',
    type: 'Full-time',
    description: 'Join our team as a Business Analyst...',
    requirements: [
      'Experience with business analysis',
      'Knowledge of data analysis tools',
      'Strong communication skills'
    ],
    postedDate: '2 weeks ago',
    matchScore: 84
  },
  {
    id: 19,
    title: 'IT Support Specialist',
    company: 'HP',
    location: 'Palo Alto, CA',
    salary: '$70,000 - $110,000',
    type: 'Full-time',
    description: 'We are looking for an IT Support Specialist to provide technical support...',
    requirements: [
      'Experience with IT support',
      'Knowledge of hardware and software troubleshooting',
      'Strong communication skills'
    ],
    postedDate: '3 days ago',
    matchScore: 82
  },
  {
    id: 20,
    title: 'Software Engineer',
    company: 'Tesla',
    location: 'Palo Alto, CA',
    salary: '$140,000 - $180,000',
    type: 'Full-time',
    description: 'We need a Software Engineer to develop our software products...',
    requirements: [
      'Experience with Python and JavaScript',
      'Knowledge of software development methodologies',
      'Strong problem-solving skills'
    ],
    postedDate: '1 week ago',
    matchScore: 91
  }
];

const JobSearch = () => {
  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    experience: '',
    salary: ''
  });

  const handleFilterChange = (filterType: 'location' | 'type' | 'experience' | 'salary', value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType] === value ? '' : value
    }));
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.location === '' || job.location.includes(filters.location)) &&
      (filters.type === '' || job.type === filters.type) &&
      (filters.experience === '' || job.requirements.some(req => req.includes(filters.experience))) &&
      (filters.salary === '' || job.salary.includes(filters.salary))
    );
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex gap-6">
      {/* Filters Sidebar */}
      <div className="w-80 bg-white rounded-xl p-6 shadow-lg h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          <button 
            className="text-sm text-purple-600 hover:text-purple-700"
            onClick={() => setFilters({ location: '', type: '', experience: '', salary: '' })}
          >
            Reset All
          </button>
        </div>

        <div className="space-y-6">
          {[
            {
              label: 'Location',
              options: ['Remote', 'On-site', 'Hybrid'],
              icon: MapPin,
              filterType: 'location'
            },
            {
              label: 'Job Type',
              options: ['Full-time', 'Part-time', 'Contract'],
              icon: Briefcase,
              filterType: 'type'
            },
            {
              label: 'Experience',
              options: ['Entry Level', 'Mid Level', 'Senior'],
              icon: Clock,
              filterType: 'experience'
            },
            {
              label: 'Salary Range',
              options: ['$50k-$100k', '$100k-$150k', '$150k+'],
              icon: DollarSign,
              filterType: 'salary'
            }
          ].map((filter) => (
            <div key={filter.label}>
              <div className="flex items-center gap-2 mb-3">
                <filter.icon className="h-4 w-4 text-gray-600" />
                <h3 className="font-medium">{filter.label}</h3>
              </div>
              <div className="space-y-2">
                {filter.options.map((option) => (
                    <label
                    key={option}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 
                         cursor-pointer"
                    >
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-purple-600 
                           focus:ring-purple-500"
                      checked={filters[filter.filterType as keyof typeof filters] === option}
                      onChange={() => handleFilterChange(filter.filterType as 'location' | 'type' | 'experience' | 'salary', option)}
                    />
                    {option}
                    </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Listings */}
      <div className="flex-1 bg-white rounded-xl p-6 shadow-lg h-full overflow-hidden">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search job titles or keywords..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 
                         hover:bg-gray-50">
            <ChevronDown className="h-5 w-5" />
            Sort by
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 h-[calc(100%-4rem)] overflow-y-auto">
          {/* Job List */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-200 
                           ${selectedJob.id === job.id 
                             ? 'bg-purple-50 border-2 border-purple-500' 
                             : 'bg-gray-50 hover:bg-gray-100'}`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                        <img
                          src={`https://logo.clearbit.com/${job.company.toLowerCase()}.com`}
                          alt={job.company}
                          className="h-8 w-8"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-5 w-5 fill-current" />
                      <span className="font-semibold">{job.matchScore}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {job.type}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Job Details */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
                <div className="flex items-center gap-4 text-gray-600">
                  <span>{selectedJob.company}</span>
                  <span>•</span>
                  <span>{selectedJob.location}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 
                         text-white rounded-lg font-semibold shadow-lg"
              >
                Apply Now
              </motion.button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                <p className="text-gray-600">{selectedJob.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <div className="h-2 w-2 rounded-full bg-purple-500" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Posted {selectedJob.postedDate}</span>
                <button className="text-purple-600 hover:text-purple-700">
                  Save for later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;