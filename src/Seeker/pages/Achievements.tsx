import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Award, Zap, Users, Briefcase } from 'lucide-react';
import CountUp from 'react-countup';
import Confetti from 'react-confetti';

const Achievements = () => {
  const [showConfetti, setShowConfetti] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      {showConfetti && <Confetti />}
      
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block"
        >
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Your Achievements
          </h1>
          <p className="text-gray-600">
            Track your progress and unlock new milestones
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        {[
          {
            icon: Briefcase,
            label: 'Applications',
            value: 24,
            color: 'from-blue-500 to-blue-600'
          },
          {
            icon: Users,
            label: 'Interviews',
            value: 8,
            color: 'from-purple-500 to-purple-600'
          },
          {
            icon: Star,
            label: 'Profile Score',
            value: 85,
            suffix: '%',
            color: 'from-yellow-500 to-yellow-600'
          },
          {
            icon: Target,
            label: 'Success Rate',
            value: 92,
            suffix: '%',
            color: 'from-green-500 to-green-600'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${stat.color} 
                         flex items-center justify-center text-white mb-4`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
            <div className="text-3xl font-bold">
              <CountUp end={stat.value} duration={2} />
              {stat.suffix}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-3 gap-6">
        {[
          {
            title: 'Rising Star',
            description: 'Complete your profile to 100%',
            progress: 85,
            icon: '🌟',
            color: 'from-yellow-500 to-yellow-600'
          },
          {
            title: 'Job Seeker Pro',
            description: 'Apply to 10+ relevant positions',
            progress: 100,
            completed: true,
            icon: '👑',
            color: 'from-purple-500 to-purple-600'
          },
          {
            title: 'Interview Master',
            description: 'Successfully complete 5 interviews',
            progress: 60,
            icon: '🎯',
            color: 'from-blue-500 to-blue-600'
          },
          {
            title: 'Networking Guru',
            description: 'Connect with 20+ professionals',
            progress: 40,
            icon: '🤝',
            color: 'from-green-500 to-green-600'
          },
          {
            title: 'Skill Champion',
            description: 'Add and verify 15 key skills',
            progress: 75,
            icon: '💪',
            color: 'from-red-500 to-red-600'
          },
          {
            title: 'Perfect Resume',
            description: 'Get your resume rated 5 stars',
            progress: 100,
            completed: true,
            icon: '📝',
            color: 'from-indigo-500 to-indigo-600'
          }
        ].map((achievement, index) => (
          <motion.div
            key={achievement.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-xl p-6 shadow-lg relative overflow-hidden
                     ${achievement.completed ? 'border-2 border-green-500' : ''}`}
          >
            {achievement.completed && (
              <div className="absolute top-2 right-2">
                <Award className="h-6 w-6 text-green-500" />
              </div>
            )}
            
            <div className="flex items-start gap-4">
              <div className="text-3xl">{achievement.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{achievement.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {achievement.description}
                </p>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${achievement.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${achievement.color}`}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium">
                    {achievement.progress}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upcoming Achievements */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold">Next Milestones</h2>
        </div>

        <div className="space-y-4">
          {[
            {
              title: 'Resume Master',
              description: 'Get 10 resume views from top companies',
              reward: '50 XP',
              icon: '📊'
            },
            {
              title: 'Quick Responder',
              description: 'Respond to 5 interview invitations within 24 hours',
              reward: '75 XP',
              icon: '⚡'
            },
            {
              title: 'Portfolio Pro',
              description: 'Add 3 projects to your portfolio',
              reward: '100 XP',
              icon: '💼'
            }
          ].map((milestone, index) => (
            <motion.div
              key={milestone.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="text-2xl">{milestone.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold">{milestone.title}</h3>
                <p className="text-sm text-gray-600">
                  {milestone.description}
                </p>
              </div>
              <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                {milestone.reward}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;