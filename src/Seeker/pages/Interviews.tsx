import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { 
  Calendar as CalendarIcon,
  Clock,
  Video,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  Plus
} from 'lucide-react';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Interviews = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [selectedInterview, setSelectedInterview] = useState<typeof interviews[0] | null>(null);

  const interviews = [
    {
      id: 1,
      company: 'Google',
      position: 'Senior React Developer',
      type: 'Technical Interview',
      date: new Date('2024-03-20T14:00:00'),
      status: 'upcoming',
      interviewers: [
        { name: 'John Smith', role: 'Tech Lead' },
        { name: 'Sarah Johnson', role: 'Senior Engineer' }
      ],
      preparation: [
        'Review system design concepts',
        'Practice React performance optimization',
        'Prepare questions about team structure'
      ]
    },
    {
      id: 2,
      company: 'Microsoft',
      position: 'Frontend Engineer',
      type: 'Culture Fit',
      date: new Date('2024-03-22T15:30:00'),
      status: 'upcoming',
      interviewers: [
        { name: 'Mike Brown', role: 'Engineering Manager' }
      ],
      preparation: [
        'Research company values',
        'Prepare STAR method responses',
        'Review recent Microsoft projects'
      ]
    },
    {
      id: 3,
      company: 'Amazon',
      position: 'Full Stack Developer',
      type: 'Technical Interview',
      date: new Date('2024-03-18T11:00:00'),
      status: 'completed',
      interviewers: [
        { name: 'Alice Chen', role: 'Senior Developer' }
      ],
      preparation: [
        'Review full stack architecture',
        'Practice system design',
        'Prepare questions about team culture'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-7rem)]">
      {/* Calendar Section */}
      <div className="col-span-3 bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <CalendarIcon className="h-5 w-5 text-gray-600" />
          <h2 className="text-xl font-semibold">Calendar</h2>
        </div>
        
        <Calendar
          onChange={setDate}
          value={date}
          className="w-full border-none shadow-none"
        />

        <div className="mt-6 space-y-2">
          <h3 className="font-medium text-gray-700 mb-3">Interview Types</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            Technical Interview
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="h-3 w-3 rounded-full bg-purple-500" />
            Culture Fit
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            Final Round
          </div>
        </div>
      </div>

      {/* Interviews List */}
      <div className="col-span-4 bg-white rounded-xl p-6 shadow-lg overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Upcoming Interviews</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
          >
            <Plus className="h-5 w-5" />
          </motion.button>
        </div>

        <div className="space-y-4">
          {interviews.map((interview, index) => (
            <motion.div
              key={interview.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedInterview(interview)}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200
                       ${selectedInterview?.id === interview.id 
                         ? 'bg-purple-50 border-2 border-purple-500'
                         : 'bg-gray-50 hover:bg-gray-100'}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{interview.position}</h3>
                  <p className="text-gray-600">{interview.company}</p>
                </div>
                {interview.status === 'upcoming' ? (
                  <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    Upcoming
                  </div>
                ) : (
                  <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Completed
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {interview.date.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Video className="h-4 w-4" />
                  {interview.type}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interview Details */}
      <div className="col-span-5 bg-white rounded-xl p-6 shadow-lg overflow-y-auto">
        {selectedInterview ? (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedInterview.position}</h2>
                <p className="text-gray-600">{selectedInterview.company}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg 
                         font-semibold shadow-lg"
              >
                Join Meeting
              </motion.button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Clock className="h-4 w-4" />
                  Date & Time
                </div>
                <p className="font-medium">
                  {selectedInterview.date.toLocaleDateString()} at{' '}
                  {selectedInterview.date.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Video className="h-4 w-4" />
                  Interview Type
                </div>
                <p className="font-medium">{selectedInterview.type}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Interviewers</h3>
              <div className="space-y-3">
                {selectedInterview.interviewers.map((interviewer, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="h-10 w-10 rounded-full bg-purple-100 
                                 flex items-center justify-center text-purple-700 font-medium">
                      {interviewer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium">{interviewer.name}</p>
                      <p className="text-sm text-gray-600">{interviewer.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Preparation Checklist</h3>
              <div className="space-y-3">
                {selectedInterview.preparation.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Additional Resources</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-gray-50 rounded-lg text-left hover:bg-gray-100">
                  <h4 className="font-medium mb-1">Interview Prep Guide</h4>
                  <p className="text-sm text-gray-600">
                    Common questions and best practices
                  </p>
                </button>
                <button className="p-4 bg-gray-50 rounded-lg text-left hover:bg-gray-100">
                  <h4 className="font-medium mb-1">Company Research</h4>
                  <p className="text-sm text-gray-600">
                    Latest news and culture insights
                  </p>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select an interview to view details
          </div>
        )}
      </div>
    </div>
  );
};

export default Interviews;