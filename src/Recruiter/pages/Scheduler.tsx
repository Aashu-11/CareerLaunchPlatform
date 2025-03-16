import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { format, addDays } from 'date-fns';
import { AlertCircle, Calendar, Clock, Video, Users, MessageSquare, X } from 'lucide-react';
import { useLocation } from 'wouter';
import {
  LiveKitRoom,
  VideoConference,
  ControlBar,
  RoomAudioRenderer,
} from '@livekit/components-react';
import 'react-datepicker/dist/react-datepicker.css';
import '@livekit/components-styles';
import { useQuery } from '@tanstack/react-query';

// Define token data type for LiveKit
interface TokenResponse {
  token: string;
}

interface Interview {
  id: string;
  candidateName: string;
  candidatePhoto: string;
  position: string;
  date: Date;
  time: string;
  type: 'video' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
  participants: string[];
  roomName: string;
}

// Using LiveKit server URL from environment variables
// This allows us to connect to the real LiveKit cloud service
const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL || 'wss://job-recruitment-5uls31m0.livekit.cloud';

export default function Scheduler() {
  // Get query parameters using wouter's useLocation
  const [pathname] = useLocation();
  // We need to manually parse the query string since wouter doesn't provide query params
  const urlParams = typeof window !== 'undefined' ? 
    new URLSearchParams(window.location.search) : 
    new URLSearchParams('');
  const candidateId = urlParams.get('candidate');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [activeInterview, setActiveInterview] = useState<Interview | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  
  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: '1',
      candidateName: 'Sarah Johnson',
      candidatePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      position: 'Senior Frontend Developer',
      date: new Date(),
      time: '10:00 AM',
      type: 'video',
      status: 'scheduled',
      participants: ['John Doe (Hiring Manager)', 'Alice Smith (Tech Lead)'],
      roomName: 'interview-sarah-1',
    },
    {
      id: '2',
      candidateName: 'Michael Chen',
      candidatePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      position: 'AI Engineer',
      date: new Date(),
      time: '2:00 PM',
      type: 'video',
      status: 'scheduled',
      participants: ['Emma Wilson (AI Director)', 'David Brown (Senior Engineer)'],
      roomName: 'interview-michael-1',
    }
  ]);

  useEffect(() => {
    if (candidateId) {
      // In a real app, fetch candidate details and pre-fill the form
      console.log('Candidate ID:', candidateId);
    }
  }, [candidateId]);

  // Fetch token when an interview is selected for video call
  const { data: tokenData, isError, error, refetch: refetchToken } = useQuery<TokenResponse>({
    queryKey: ['/api/livekit/token', activeInterview?.roomName],
    queryFn: async () => {
      if (!activeInterview?.roomName) {
        throw new Error('No room name provided');
      }
      console.log(`Fetching token for room: ${activeInterview.roomName}`);
      const response = await fetch(`/api/livekit/token?roomName=${encodeURIComponent(activeInterview.roomName)}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Token fetch error:', errorText);
        throw new Error(`Failed to fetch token: ${response.status} ${response.statusText}`);
      }
      return response.json();
    },
    enabled: !!activeInterview && showVideoCall,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const availableTimeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const handleScheduleInterview = () => {
    if (!selectedDate || !selectedTime) return;

    const newInterview: Interview = {
      id: String(Date.now()),
      candidateName: 'New Candidate',
      candidatePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      position: 'Position Title',
      date: selectedDate,
      time: selectedTime,
      type: 'video',
      status: 'scheduled',
      participants: ['John Doe (Hiring Manager)'],
      roomName: `interview-${Date.now()}`,
    };

    setInterviews(prev => [...prev, newInterview]);
    setSelectedDate(null);
    setSelectedTime('10:00 AM');
  };

  const fetchToken = async (roomName: string) => {
    try {
      console.log(`Fetching token for room: ${roomName}`);
      const response = await fetch(`/api/livekit/token?roomName=${encodeURIComponent(roomName)}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Token fetch error:', errorText);
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Token fetched successfully:', data.token);
      return data.token;
    } catch (error) {
      console.error('Token fetch error:', error);
      throw error;
    }
  };

  const startVideoCall = async (interview: Interview) => {
    setActiveInterview(interview);
    setShowVideoCall(true);

    try {
      const token = await fetchToken(interview.roomName);
      if (token) {
        console.log('Token fetched successfully:', token);
        console.log('Starting video call for room:', interview.roomName);
      } else {
        throw new Error('Token is null or undefined');
      }
    } catch (err) {
      console.error('Error fetching token:', err);
      setConnectionError('Failed to get video call token. Please try again later.');
    }
  };

  const handleRoomConnected = () => {
    setIsConnected(true);
    setConnectionError(null);
  };

  const handleRoomDisconnected = () => {
    setIsConnected(false);
  };

  const handleRoomError = (error: Error) => {
    console.error('LiveKit Room Error:', error);
    
    // User-friendly error messages based on the error type
    if (error.message.includes('ServerUnreachable')) {
      setConnectionError(
        `Unable to reach the video server. Please check your internet connection and try again.`
      );
    } else if (error.message.includes('NotAllowed')) {
      setConnectionError(
        `Camera or microphone access denied. Please allow access to your media devices.`
      );
    } else if (error.message.includes('Cancelled')) {
      // This is usually triggered when a user closes the connection, so we can handle it silently
      console.log('Connection cancelled by the user');
    } else {
      setConnectionError(`Video call error: ${error.message}`);
    }
  };

  // Close the video call modal and clean up
  const closeVideoCall = () => {
    // When closing the video call, we need to ensure proper cleanup
    setShowVideoCall(false);
    setActiveInterview(null);
    setIsConnected(false);
    setConnectionError(null);
  };
  
  // Effect to handle cleanup when component unmounts or video call is closed
  useEffect(() => {
    // This will run when showVideoCall changes from true to false
    if (!showVideoCall) {
      // Additional cleanup can be added here if needed
      setIsConnected(false);
      setConnectionError(null);
    }
    
    // Cleanup function runs when component unmounts
    return () => {
      // Any final cleanup for LiveKit can go here
    };
  }, [showVideoCall]);

  // Create a derived value for the token from tokenData
  const token = tokenData?.token || null;

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Interview Scheduler</h1>
        <p className="text-gray-600 mt-2">Manage and schedule your interviews</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-purple-100">
          <div className="mb-6">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              maxDate={addDays(new Date(), 30)}
              inline
              calendarClassName="!bg-transparent"
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Available Time Slots</h3>
            <div className="grid grid-cols-2 gap-2">
              {availableTimeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 rounded-xl text-sm font-medium transition-colors ${
                    selectedTime === time
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-purple-50'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <button
              onClick={handleScheduleInterview}
              disabled={!selectedDate || !selectedTime}
              className="w-full mt-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all disabled:opacity-50"
            >
              Schedule Interview
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {interviews.map((interview) => (
            <motion.div
              key={interview.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-purple-100"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={interview.candidatePhoto}
                    alt={interview.candidateName}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{interview.candidateName}</h3>
                    <p className="text-sm text-gray-600">{interview.position}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  interview.status === 'scheduled'
                    ? 'bg-purple-100 text-purple-700'
                    : interview.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                  <Calendar className="w-5 h-5 text-gray-700" />
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium text-gray-900">
                      {format(interview.date, 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                  <Clock className="w-5 h-5 text-gray-700" />
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-medium text-gray-900">{interview.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                  <Video className="w-5 h-5 text-gray-700" />
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-medium text-gray-900">
                      {interview.type === 'video' ? 'Video Call' : 'In-person'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                  <Users className="w-5 h-5 text-gray-700" />
                  <div>
                    <p className="text-sm text-gray-600">Participants</p>
                    <p className="font-medium text-gray-900">
                      {interview.participants.length} people
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const updatedInterviews = interviews.map(i =>
                      i.id === interview.id
                        ? { ...i, status: 'cancelled' as const }
                        : i
                    );
                    setInterviews(updatedInterviews);
                  }}
                  className="flex-1 py-2 rounded-xl bg-red-50 text-red-700 font-medium hover:bg-red-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => startVideoCall(interview)}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all"
                >
                  Join Interview
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {showVideoCall && activeInterview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <div className="absolute inset-4 bg-white rounded-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Interview with {activeInterview.candidateName}
              </h2>
              <button
                onClick={closeVideoCall}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 bg-gray-900">
              {connectionError ? (
                <div className="h-full">
                  {/* Mock video conference UI to show what LiveKit would display */}
                  <div className="p-6 flex flex-col h-full">
                    {/* Video tiles grid */}
                    <div className="flex-1 grid grid-cols-2 gap-4 mb-6">
                      {/* Interviewer tile */}
                      <div className="relative bg-gray-800 rounded-lg flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="w-32 h-32 rounded-full bg-blue-500 mx-auto mb-3 flex items-center justify-center">
                            <Users size={64} className="text-white" />
                          </div>
                          <p className="font-medium">{activeInterview.participants[0]}</p>
                          <p className="text-sm text-gray-400">Camera disabled</p>
                        </div>
                      </div>
                      
                      {/* Candidate tile */}
                      <div className="relative bg-gray-800 rounded-lg flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="w-32 h-32 rounded-full mx-auto mb-3 overflow-hidden">
                            <img 
                              src={activeInterview.candidatePhoto} 
                              alt={activeInterview.candidateName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="font-medium">{activeInterview.candidateName}</p>
                          <p className="text-sm text-gray-400">Camera disabled</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Error message */}
                    <div className="bg-gray-800/60 rounded-lg p-4 mb-6">
                      <h3 className="text-xl font-semibold mb-2 text-white">Video Connection Error</h3>
                      <div className="flex items-center mb-3">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                        <p className="text-gray-200">{connectionError}</p>
                      </div>
                      <p className="text-gray-400 text-sm">Please check your camera and microphone permissions. This application uses LiveKit for real-time video conferencing.</p>
                    </div>
                    
                    {/* Mock control bar */}
                    <div className="bg-gray-800 p-3 rounded-lg flex justify-center space-x-4">
                      <button className="p-3 bg-gray-700 rounded-full" disabled>
                        <Video className="text-red-500" />
                      </button>
                      <button className="p-3 bg-gray-700 rounded-full" disabled>
                        <MessageSquare className="text-gray-400" />
                      </button>
                      <button 
                        className="p-3 bg-red-600 rounded-full"
                        onClick={closeVideoCall}
                      >
                        <X className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : token ? (
                <LiveKitRoom
                  token={token}
                  serverUrl={LIVEKIT_URL}
                  connect={true} // Ensure connect is true when we have a token
                  video={true}
                  audio={true}
                  onConnected={handleRoomConnected}
                  onDisconnected={handleRoomDisconnected}
                  onError={handleRoomError}
                  options={{}}
                  data-lk-theme="default"
                >
                  {isConnected ? (
                    <>
                      <VideoConference />
                      <RoomAudioRenderer />
                      <ControlBar />
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-white">
                      <div className="animate-pulse">Establishing connection to LiveKit...</div>
                    </div>
                  )}
                </LiveKitRoom>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-white">
                  <div className="animate-pulse mb-4">Connecting to video call...</div>
                  <p className="text-center text-gray-400 text-sm">Waiting for token from server...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
