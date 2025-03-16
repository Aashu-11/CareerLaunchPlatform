import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  GraduationCap,
  Star,
  Filter as FilterIcon,
  X
} from 'lucide-react';

const jobCategories = [
  {
    name: 'Technology',
    subcategories: [
      'Software Development',
      'Data Science',
      'DevOps',
      'Cloud Computing',
      'Cybersecurity',
      'AI/ML',
      'Frontend Development',
      'Backend Development',
      'Full Stack Development',
      'Mobile Development'
    ]
  },
  {
    name: 'Design',
    subcategories: [
      'UI/UX Design',
      'Graphic Design',
      'Product Design',
      'Motion Design',
      'Brand Design',
      'Web Design',
      'Interior Design',
      'Industrial Design'
    ]
  },
  {
    name: 'Marketing',
    subcategories: [
      'Digital Marketing',
      'Content Marketing',
      'Social Media',
      'SEO/SEM',
      'Brand Marketing',
      'Marketing Analytics',
      'Email Marketing',
      'Growth Marketing'
    ]
  },
  {
    name: 'Business',
    subcategories: [
      'Project Management',
      'Business Analysis',
      'Product Management',
      'Operations',
      'Sales',
      'Finance',
      'Consulting',
      'Strategy'
    ]
  },
  {
    name: 'Healthcare',
    subcategories: [
      'Nursing',
      'Medical Assistant',
      'Pharmacy',
      'Radiology',
      'Surgery',
      'Therapy',
      'Healthcare Administration'
    ]
  }
];

const experienceLevels = [
  'Internship',
  'Entry Level',
  'Associate',
  'Mid-Senior',
  'Senior',
  'Lead',
  'Manager',
  'Director',
  'Executive'
];

const salaryRanges = [
  'Under $50K',
  '$50K - $75K',
  '$75K - $100K',
  '$100K - $125K',
  '$125K - $150K',
  '$150K - $200K',
  '$200K+'
];

const jobTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship',
  'Remote',
  'Hybrid',
  'On-site'
];

interface JobFiltersProps {
  filters: any;
  setFilters: (filters: any) => void;
  onReset: () => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ filters, setFilters, onReset }) => {
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);

  const handleFilterChange = (category: string, value: string) => {
    setFilters({
      ...filters,
      [category]: filters[category]?.includes(value)
        ? filters[category].filter((v: string) => v !== value)
        : [...(filters[category] || []), value]
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FilterIcon className="h-5 w-5 text-purple-600" />
          <h2 className="font-heading text-xl font-semibold">Filters</h2>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          Reset All
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search filters..."
          className="input-premium pl-10"
        />
      </div>

      {/* Job Categories */}
      <div className="space-y-4">
        <h3 className="font-display font-semibold">Job Categories</h3>
        {jobCategories.map((category) => (
          <div key={category.name} className="space-y-2">
            <button
              onClick={() => setExpandedCategory(
                expandedCategory === category.name ? null : category.name
              )}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="font-medium text-gray-700">{category.name}</span>
              <motion.span
                animate={{ rotate: expandedCategory === category.name ? 180 : 0 }}
                className="text-gray-400"
              >
                ▼
              </motion.span>
            </button>
            <motion.div
              initial={false}
              animate={{
                height: expandedCategory === category.name ? 'auto' : 0,
                opacity: expandedCategory === category.name ? 1 : 0
              }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pt-2">
                {category.subcategories.map((subcategory) => (
                  <label
                    key={subcategory}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 
                             cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.categories?.includes(subcategory)}
                      onChange={() => handleFilterChange('categories', subcategory)}
                      className="rounded border-gray-300 text-purple-600 
                               focus:ring-purple-500"
                    />
                    {subcategory}
                  </label>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Experience Level */}
      <div className="space-y-4">
        <h3 className="font-display font-semibold">Experience Level</h3>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <label
              key={level}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 
                       cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.experience?.includes(level)}
                onChange={() => handleFilterChange('experience', level)}
                className="rounded border-gray-300 text-purple-600 
                         focus:ring-purple-500"
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div className="space-y-4">
        <h3 className="font-display font-semibold">Salary Range</h3>
        <div className="space-y-2">
          {salaryRanges.map((range) => (
            <label
              key={range}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 
                       cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.salary?.includes(range)}
                onChange={() => handleFilterChange('salary', range)}
                className="rounded border-gray-300 text-purple-600 
                         focus:ring-purple-500"
              />
              {range}
            </label>
          ))}
        </div>
      </div>

      {/* Job Type */}
      <div className="space-y-4">
        <h3 className="font-display font-semibold">Job Type</h3>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 
                       cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.type?.includes(type)}
                onChange={() => handleFilterChange('type', type)}
                className="rounded border-gray-300 text-purple-600 
                         focus:ring-purple-500"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      {Object.entries(filters).some(([_, values]) => (values as string[])?.length > 0) && (
        <div className="space-y-2">
          <h3 className="font-display font-semibold">Active Filters</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([category, values]) =>
              (values as string[])?.map((value) => (
                <span
                  key={`${category}-${value}`}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 
                           text-purple-700 rounded-full text-sm"
                >
                  {value}
                  <button
                    onClick={() => handleFilterChange(category, value)}
                    className="hover:text-purple-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilters;