export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  postedDate: string;
  views: number;
  applications: number;
}

export interface Candidate {
  id: string;
  name: string;
  photo: string;
  title: string;
  experience: number;
  skills: string[];
  location: string;
  matchScore: number;
  aiInsights: string[];
  education: string;
  previousCompanies: string[];
  availability: string;
}

export interface Analytics {
  jobViews: number;
  applications: number;
  shortlisted: number;
  hired: number;
  trend: {
    date: string;
    value: number;
  }[];
}