import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Seeker/pages/Login';
import Dashboard from './Seeker/pages/Dashboard';
import JobSearch from './Seeker/pages/JobSearch';
import ResumeBuilder from './Seeker/pages/ResumeBuilder';
import Profile from './Seeker/pages/Profile';
import Achievements from './Seeker/pages/Achievements';
import Applications from './Seeker/pages/Applications';
import Interviews from './Seeker/pages/Interviews';
import Layout from './Seeker/components/layout/Layout';
import ProtectedRoute from './Seeker/components/auth/ProtectedRoute';
import HackOHire from './Seeker/pages/HackOHire';
import Index from './Seeker/pages/Index';

import Login1 from './Recruiter/pages/Login1'
import { Sidebar } from './Recruiter/components/Sidebar';
import { Dashboard1 } from './Recruiter/pages/Dashboard1';
import { Jobs } from './Recruiter/pages/Jobs';
import { Candidates } from './Recruiter/pages/Candidates';
import { Shortlist } from './Recruiter/pages/Shortlist';
import  Scheduler  from './Recruiter/pages/Scheduler';
import { Analytics } from './Recruiter/pages/Analytics';
import { Settings } from './Recruiter/pages/Settings';
import { queryClient } from "./Recruiter/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import RecruiterHackOHire from './Recruiter/pages/HackOHire';

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Seeker Routes */}
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs" element={<JobSearch />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/index" element={<HackOHire />} />
            <Route path="/seeker/dashboard" element={<Dashboard />} /> {/* New route for seeker */}
          </Route>
          {/* Recruiter Routes */}
          <Route path="/recruiter/login" element={<Login1 />} />
          <Route path="/recruiter/*" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
              <Sidebar />
              <div className="ml-64 p-8">
                <Routes>
                  <Route path="dashboard1" element={<Dashboard1 />} /> {/* Updated route path */}
                  <Route path="jobs" element={<Jobs />} />
                  <Route path="candidates" element={<Candidates />} />
                  <Route path="shortlist" element={<Shortlist />} />
                  <Route path="scheduler" element={<Scheduler />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="hackathons" element={<RecruiterHackOHire />} /> {/* New route for recruiter */}
                </Routes>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;