
import { 
  Trophy, Zap, Award, Rocket, Clock, Calendar, 
  Briefcase, Users, Star, Code, Heart 
} from 'lucide-react';

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  hiring: string[];
  openPositions: number;
}

export interface Hackathon {
  id: string;
  title: string;
  organizer: string;
  logo: string;
  date: string;
  location: string;
  mode: 'Online' | 'In-Person' | 'Hybrid';
  registrationDeadline: string;
  description: string;
  prizePool: string;
  skills: string[];
  hiringCompanies: string[];
  categories: string[];
  perks: {
    icon: any;
    text: string;
  }[];
}

export const companies: Company[] = [
  {
    id: '1',
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png',
    description: 'Tech giant looking for innovative talent through hackathons',
    hiring: ['Frontend Engineers', 'ML/AI Specialists', 'UX Designers'],
    openPositions: 12
  },
  {
    id: '2',
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
    description: 'Leading tech company seeking creative problem solvers',
    hiring: ['Cloud Engineers', 'Full Stack Developers', 'Product Managers'],
    openPositions: 8
  },
  {
    id: '3',
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
    description: 'E-commerce and cloud computing leader looking for innovators',
    hiring: ['DevOps Engineers', 'Data Scientists', 'Backend Developers'],
    openPositions: 15
  },
  {
    id: '4',
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png',
    description: 'Tech innovator seeking exceptional talent for next-gen products',
    hiring: ['iOS Developers', 'Hardware Engineers', 'AI Researchers'],
    openPositions: 10
  },
  {
    id: '5',
    name: 'Meta',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1280px-Meta_Platforms_Inc._logo.svg.png',
    description: 'Social media giant looking for talented engineers for metaverse projects',
    hiring: ['AR/VR Developers', 'Frontend Engineers', 'ML Engineers'],
    openPositions: 14
  },
  {
    id: '6',
    name: 'Tesla',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/800px-Tesla_logo.png',
    description: 'EV and clean energy company seeking innovative engineers',
    hiring: ['Automotive Engineers', 'ML Engineers', 'Frontend Developers'],
    openPositions: 7
  },
  {
    id: '7',
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png',
    description: 'Streaming giant looking for engineering talent to enhance platform',
    hiring: ['Streaming Engineers', 'UI/UX Designers', 'Data Scientists'],
    openPositions: 9
  },
  {
    id: '8',
    name: 'Spotify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png',
    description: 'Music streaming platform seeking innovative developers',
    hiring: ['Audio Engineers', 'Mobile Developers', 'ML Engineers'],
    openPositions: 6
  }
];

export const hackathons: Hackathon[] = [
  {
    id: '1',
    title: 'TechX Innovate 2024',
    organizer: 'TechX Foundation',
    logo: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    date: 'June 15-17, 2024',
    location: 'San Francisco, CA',
    mode: 'Hybrid',
    registrationDeadline: 'May 25, 2024',
    description: 'Join the largest hackathon for innovation and get hired by top tech companies. Build futuristic solutions in AI, blockchain, and more.',
    prizePool: '$50,000',
    skills: ['AI/ML', 'Blockchain', 'Web Development'],
    hiringCompanies: ['Google', 'Microsoft', 'Amazon'],
    categories: ['AI/ML', 'Blockchain', 'Open Innovation'],
    perks: [
      { icon: Trophy, text: '$50,000 in prizes' },
      { icon: Briefcase, text: 'Job interviews with 3 tech giants' },
      { icon: Rocket, text: 'Startup funding opportunities' }
    ]
  },
  {
    id: '2',
    title: 'AI Revolution Hackathon',
    organizer: 'DeepTech Labs',
    logo: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=2074&auto=format&fit=crop',
    date: 'July 8-10, 2024',
    location: 'Virtual',
    mode: 'Online',
    registrationDeadline: 'June 30, 2024',
    description: 'Focus on advanced AI solutions to real-world problems. Get noticed by leading AI companies seeking top talent.',
    prizePool: '$30,000',
    skills: ['AI/ML', 'NLP', 'Computer Vision'],
    hiringCompanies: ['Google', 'Meta', 'Tesla'],
    categories: ['AI/ML', 'NLP', 'Healthcare'],
    perks: [
      { icon: Trophy, text: '$30,000 in prizes' },
      { icon: Zap, text: 'AI computing credits worth $15,000' },
      { icon: Briefcase, text: 'Fast-track hiring process with 5 companies' }
    ]
  },
  {
    id: '3',
    title: 'Blockchain Build Summit',
    organizer: 'Crypto Alliance',
    logo: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=2134&auto=format&fit=crop',
    date: 'August 5-7, 2024',
    location: 'Miami, FL',
    mode: 'In-Person',
    registrationDeadline: 'July 20, 2024',
    description: 'Build the future of Web3 with innovative blockchain solutions. Connect with top crypto companies hiring on-site.',
    prizePool: '$45,000',
    skills: ['Blockchain', 'Smart Contracts', 'DeFi'],
    hiringCompanies: ['Coinbase', 'Binance', 'ConsenSys'],
    categories: ['Web3', 'DeFi', 'NFT'],
    perks: [
      { icon: Trophy, text: '$45,000 in crypto prizes' },
      { icon: Award, text: 'Scholarship to Blockchain Academy' },
      { icon: Briefcase, text: 'On-site interviews with 8 crypto companies' }
    ]
  },
  {
    id: '4',
    title: 'HealthTech Innovators',
    organizer: 'MedTech Foundation',
    logo: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop',
    date: 'September 12-14, 2024',
    location: 'Boston, MA',
    mode: 'Hybrid',
    registrationDeadline: 'August 25, 2024',
    description: 'Develop cutting-edge solutions for healthcare challenges. Connect with leading health tech companies looking for talent.',
    prizePool: '$35,000',
    skills: ['Healthcare', 'AI/ML', 'Mobile Development'],
    hiringCompanies: ['Philips', 'Johnson & Johnson', 'Apple'],
    categories: ['Healthcare', 'Telemedicine', 'Health AI'],
    perks: [
      { icon: Trophy, text: '$35,000 in prizes' },
      { icon: Heart, text: 'Implement with real hospitals' },
      { icon: Briefcase, text: 'Job placements in health tech' }
    ]
  },
  {
    id: '5',
    title: 'Sustainable Future Hack',
    organizer: 'GreenTech Initiative',
    logo: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=2074&auto=format&fit=crop',
    date: 'October 18-20, 2024',
    location: 'Berlin, Germany',
    mode: 'In-Person',
    registrationDeadline: 'September 30, 2024',
    description: 'Create solutions for environmental challenges. Top green tech companies are looking to hire innovators.',
    prizePool: '$40,000',
    skills: ['CleanTech', 'IoT', 'Data Science'],
    hiringCompanies: ['Tesla', 'Siemens', 'Vestas'],
    categories: ['Sustainability', 'Climate Tech', 'Energy'],
    perks: [
      { icon: Trophy, text: '$40,000 in prizes' },
      { icon: Award, text: 'Project implementation funding' },
      { icon: Briefcase, text: 'Career opportunities with sustainability leaders' }
    ]
  },
  {
    id: '6',
    title: 'Quantum Computing Challenge',
    organizer: 'Quantum Labs',
    logo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
    date: 'November 8-10, 2024',
    location: 'Virtual',
    mode: 'Online',
    registrationDeadline: 'October 25, 2024',
    description: 'Push the boundaries of quantum computing applications. Connect with pioneering companies in quantum tech.',
    prizePool: '$60,000',
    skills: ['Quantum Computing', 'Physics', 'Algorithm Design'],
    hiringCompanies: ['IBM', 'Google', 'Microsoft'],
    categories: ['Quantum', 'Advanced Computing', 'Research'],
    perks: [
      { icon: Trophy, text: '$60,000 in prizes' },
      { icon: Star, text: 'Publication opportunities' },
      { icon: Briefcase, text: 'Research positions with quantum leaders' }
    ]
  },
  {
    id: '7',
    title: 'Web3 DeFi Challenge',
    organizer: 'DeFi Alliance',
    logo: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2032&auto=format&fit=crop',
    date: 'July 22-24, 2024',
    location: 'Singapore',
    mode: 'Hybrid',
    registrationDeadline: 'July 10, 2024',
    description: 'Build the future of decentralized finance. Major crypto companies are hiring directly from this event.',
    prizePool: '$55,000',
    skills: ['DeFi', 'Smart Contracts', 'Web3'],
    hiringCompanies: ['Binance', 'Coinbase', 'Uniswap'],
    categories: ['DeFi', 'Web3', 'Finance'],
    perks: [
      { icon: Trophy, text: '$55,000 in crypto prizes' },
      { icon: Rocket, text: 'Startup incubation program' },
      { icon: Briefcase, text: 'DeFi jobs with 6-figure packages' }
    ]
  },
  {
    id: '8',
    title: 'Mobile App Masters',
    organizer: 'App Developers Association',
    logo: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
    date: 'August 18-20, 2024',
    location: 'New York, NY',
    mode: 'In-Person',
    registrationDeadline: 'August 1, 2024',
    description: 'Create innovative mobile applications with potential for massive user adoption. Top tech companies scouting for mobile talent.',
    prizePool: '$25,000',
    skills: ['Mobile Development', 'UI/UX', 'App Architecture'],
    hiringCompanies: ['Apple', 'Google', 'Spotify'],
    categories: ['Mobile', 'UX/UI', 'Consumer Tech'],
    perks: [
      { icon: Trophy, text: '$25,000 in prizes' },
      { icon: Users, text: 'App promotion to 1M+ users' },
      { icon: Briefcase, text: 'Interviews with 12 tech companies' }
    ]
  },
  {
    id: '9',
    title: 'Cybersecurity Defenders',
    organizer: 'SecureTech Alliance',
    logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop',
    date: 'September 25-27, 2024',
    location: 'Virtual',
    mode: 'Online',
    registrationDeadline: 'September 10, 2024',
    description: 'Tackle challenging cybersecurity problems. Security firms are looking to hire top talent from participants.',
    prizePool: '$35,000',
    skills: ['Cybersecurity', 'Ethical Hacking', 'Security Architecture'],
    hiringCompanies: ['Microsoft', 'Crowdstrike', 'Palo Alto Networks'],
    categories: ['Security', 'Privacy', 'Defense'],
    perks: [
      { icon: Trophy, text: '$35,000 in prizes' },
      { icon: Award, text: 'Certified security credentials' },
      { icon: Briefcase, text: 'Fast-track security clearance hiring' }
    ]
  },
  {
    id: '10',
    title: 'Game Developers Summit',
    organizer: 'Global Game Jam',
    logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop',
    date: 'October 10-12, 2024',
    location: 'Los Angeles, CA',
    mode: 'In-Person',
    registrationDeadline: 'September 25, 2024',
    description: 'Design and develop innovative games with market potential. Game studios scouting for creative talent.',
    prizePool: '$30,000',
    skills: ['Game Development', '3D Graphics', 'Game AI'],
    hiringCompanies: ['EA', 'Ubisoft', 'Epic Games'],
    categories: ['Gaming', 'Entertainment', 'Interactive'],
    perks: [
      { icon: Trophy, text: '$30,000 in prizes' },
      { icon: Star, text: 'Publishing deals for top games' },
      { icon: Briefcase, text: 'Studio hiring interviews on-site' }
    ]
  },
  {
    id: '11',
    title: 'DevOps Pipeline Challenge',
    organizer: 'Cloud Native Foundation',
    logo: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=2076&auto=format&fit=crop',
    date: 'November 15-17, 2024',
    location: 'Seattle, WA',
    mode: 'Hybrid',
    registrationDeadline: 'October 31, 2024',
    description: 'Build efficient DevOps solutions for modern cloud environments. Cloud companies hiring DevOps engineers.',
    prizePool: '$40,000',
    skills: ['DevOps', 'Cloud Architecture', 'Containerization'],
    hiringCompanies: ['Amazon', 'Microsoft', 'Google'],
    categories: ['Cloud', 'DevOps', 'Infrastructure'],
    perks: [
      { icon: Trophy, text: '$40,000 in prizes' },
      { icon: Zap, text: 'Cloud credits worth $50,000' },
      { icon: Briefcase, text: 'DevOps positions with 6-figure salaries' }
    ]
  },
  {
    id: '12',
    title: 'AR/VR Experience Design',
    organizer: 'Immersive Tech Association',
    logo: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=2012&auto=format&fit=crop',
    date: 'December 5-7, 2024',
    location: 'Austin, TX',
    mode: 'In-Person',
    registrationDeadline: 'November 20, 2024',
    description: 'Create compelling AR/VR experiences. Leading immersive tech companies recruiting participants.',
    prizePool: '$45,000',
    skills: ['AR/VR', '3D Modeling', 'UX Design'],
    hiringCompanies: ['Meta', 'Apple', 'Magic Leap'],
    categories: ['AR/VR', 'Metaverse', 'Spatial Computing'],
    perks: [
      { icon: Trophy, text: '$45,000 in prizes' },
      { icon: Code, text: 'Access to prototype hardware' },
      { icon: Briefcase, text: 'Immersive tech career opportunities' }
    ]
  }
];

export const categories = [
  'AI/ML',
  'Blockchain',
  'Web Development',
  'Mobile',
  'Cybersecurity',
  'Gaming',
  'AR/VR',
  'Healthcare',
  'Sustainability',
  'DevOps',
  'Quantum Computing',
  'Open Innovation'
];

export const hiringUpdates = [
  "Google just hired 2 developers from CodeX Hackathon!",
  "Amazon is looking for ML engineers from Hack The Future 2023!",
  "Microsoft hired 5 fullstack developers from Web Summit hackathon!",
  "Meta offering interviews to top 10 finishers at AI Revolution Hackathon",
  "Tesla recruiting battery engineers from Sustainable Future Hack",
  "Apple seeking AR/VR talent from immersive tech hackathons",
  "Netflix hired 3 streaming optimization engineers from CloudNative Hack",
  "Spotify offering record-breaking packages to audio AI developers"
];
