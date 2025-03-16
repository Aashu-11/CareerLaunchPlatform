import React from 'react';
import { motion } from 'framer-motion';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Edit,
  Plus,
  Trash2,
  X
} from 'lucide-react';

const Profile = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-start gap-6">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 
                       flex items-center justify-center text-white text-3xl font-bold">
            JD
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">John Doe</h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 flex items-center gap-2 bg-purple-50 text-purple-700 
                         rounded-lg hover:bg-purple-100"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </motion.button>
            </div>
            <p className="text-gray-600 mt-2">Senior Frontend Developer</p>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                john.doe@example.com
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                San Francisco, CA
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Experience */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-gray-600" />
                <h2 className="text-xl font-semibold">Work Experience</h2>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-purple-600 
                             hover:bg-purple-50 rounded-lg">
                <Plus className="h-4 w-4" />
                Add Experience
              </button>
            </div>

            <div className="space-y-6">
              {[
                {
                  company: 'Google',
                  position: 'Senior Frontend Developer',
                  duration: '2020 - Present',
                  description: 'Led the development of key features...'
                },
                {
                  company: 'Facebook',
                  position: 'Frontend Developer',
                  duration: '2018 - 2020',
                  description: 'Developed and maintained...'
                }
              ].map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.duration}</p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-red-500 
                                   hover:bg-red-50 rounded-lg">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-2 text-gray-600">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-gray-600" />
                <h2 className="text-xl font-semibold">Education</h2>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-purple-600 
                             hover:bg-purple-50 rounded-lg">
                <Plus className="h-4 w-4" />
                Add Education
              </button>
            </div>

            <div className="space-y-4">
              {[
                {
                  school: 'Stanford University',
                  degree: 'Master of Computer Science',
                  duration: '2016 - 2018'
                },
                {
                  school: 'MIT',
                  degree: 'Bachelor of Computer Science',
                  duration: '2012 - 2016'
                }
              ].map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.school}</p>
                      <p className="text-sm text-gray-500">{edu.duration}</p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-red-500 
                                   hover:bg-red-50 rounded-lg">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills & Achievements */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Skills</h2>
              <button className="flex items-center gap-2 px-4 py-2 text-purple-600 
                             hover:bg-purple-50 rounded-lg">
                <Plus className="h-4 w-4" />
                Add Skill
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                'React',
                'TypeScript',
                'Node.js',
                'GraphQL',
                'AWS',
                'Docker',
                'Kubernetes',
                'CI/CD'
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full 
                           flex items-center gap-2"
                >
                  {skill}
                  <button className="hover:text-red-500">
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <Award className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-semibold">Achievements</h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Rising Star',
                  description: 'Completed profile with 100% completion',
                  icon: '🌟'
                },
                {
                  title: 'Job Seeker Pro',
                  description: 'Applied to 10+ relevant positions',
                  icon: '👑'
                },
                {
                  title: 'Interview Master',
                  description: 'Successfully completed 5 interviews',
                  icon: '🎯'
                }
              ].map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">
                      {achievement.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;