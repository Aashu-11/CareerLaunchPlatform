export interface User {
  id: string;
  name: string;
  email: string;
  profileCompletion: number;
  achievements: Achievement[];
  applications: JobApplication[];
  skills: string[];
  experience: WorkExperience[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface JobApplication {
  id: string;
  jobTitle: string;
  company: string;
  status: 'applied' | 'in-review' | 'interview' | 'offer' | 'rejected';
  appliedDate: Date;
  interviews?: Interview[];
}

export interface Interview {
  id: string;
  date: Date;
  type: 'phone' | 'video' | 'onsite';
  notes?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  postedDate: Date;
  matchScore?: number;
}