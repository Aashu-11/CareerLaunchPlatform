import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {
  Trophy,
  Users,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Brain,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { generateHackathonDescription, suggestHackathonRequirements, suggestSkills } from '../utils/gemini';

interface HackathonForm {
  title: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  prize: string;
  maxParticipants: string;
  skills: string[];
  coverImage: string;
  companyLogo: string;
  requirements: string;
}

interface ValidationErrors {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  prize?: string;
  maxParticipants?: string;
  skills?: string;
  requirements?: string;
}

const initialForm: HackathonForm = {
  title: '',
  description: '',
  startDate: null,
  endDate: null,
  prize: '',
  maxParticipants: '',
  skills: [],
  coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  companyLogo: '',
  requirements: '',
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4 }
  }
};

const FormInput: React.FC<{
  label: string;
  error?: string;
  children: React.ReactNode;
}> = ({ label, error, children }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {children}
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-xs mt-1 flex items-center gap-1"
      >
        <AlertCircle className="w-3 h-3" />
        {error}
      </motion.p>
    )}
  </div>
);

const HackathonPublisher: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<HackathonForm>(initialForm);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [skillInput, setSkillInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const validateForm = (step: number): boolean => {
    const newErrors: ValidationErrors = {};

    if (step === 1) {
      if (!form.title.trim()) {
        newErrors.title = 'Title is required';
      }
      if (!form.description.trim()) {
        newErrors.description = 'Description is required';
      }
      if (!form.startDate) {
        newErrors.startDate = 'Start date is required';
      }
      if (!form.endDate) {
        newErrors.endDate = 'End date is required';
      }
      if (form.startDate && form.endDate && form.startDate > form.endDate) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    if (step === 2) {
      if (!form.prize.trim()) {
        newErrors.prize = 'Prize amount is required';
      } else if (isNaN(Number(form.prize)) || Number(form.prize) <= 0) {
        newErrors.prize = 'Please enter a valid prize amount';
      }
      if (!form.maxParticipants.trim()) {
        newErrors.maxParticipants = 'Maximum participants is required';
      } else if (isNaN(Number(form.maxParticipants)) || Number(form.maxParticipants) <= 0) {
        newErrors.maxParticipants = 'Please enter a valid number';
      }
      if (form.skills.length === 0) {
        newErrors.skills = 'At least one skill is required';
      }
      if (!form.requirements.trim()) {
        newErrors.requirements = 'Requirements are required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSkillAdd = () => {
    try {
      if (skillInput && !form.skills.includes(skillInput)) {
        setForm(prev => ({
          ...prev,
          skills: [...prev.skills, skillInput.trim()]
        }));
        setSkillInput('');
        setErrors(prev => ({ ...prev, skills: undefined }));
      }
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    try {
      setForm(prev => ({
        ...prev,
        skills: prev.skills.filter(skill => skill !== skillToRemove)
      }));
    } catch (error) {
      console.error('Error removing skill:', error);
    }
  };

  const handleAIAssist = async () => {
    if (!form.title) return;
    
    setIsGenerating(true);
    setAiError(null);
    
    try {
      const [description, requirements, suggestedSkills] = await Promise.all([
        generateHackathonDescription(form.title),
        suggestHackathonRequirements(form.title),
        suggestSkills(form.title)
      ]);

      if (!description && !requirements && (!suggestedSkills || suggestedSkills.length === 0)) {
        throw new Error('Failed to generate content. Please try again.');
      }

      setForm(prev => ({
        ...prev,
        description: description || prev.description,
        requirements: requirements || prev.requirements,
        skills: [...new Set([...prev.skills, ...(suggestedSkills || [])])]
      }));
    } catch (error) {
      console.error('Error using AI assistance:', error);
      setAiError(error instanceof Error ? error.message : 'An error occurred while generating content');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAIAssistRequirements = async () => {
    if (!form.title) return;
  
    setIsGenerating(true);
    setAiError(null);
  
    try {
      const [requirements, suggestedSkills] = await Promise.all([
        suggestHackathonRequirements(form.title),
        suggestSkills(form.title)
      ]);
  
      if (!requirements && (!suggestedSkills || suggestedSkills.length === 0)) {
        throw new Error('Failed to generate content. Please try again.');
      }
  
      setForm(prev => ({
        ...prev,
        requirements: requirements || prev.requirements,
        skills: [...new Set([...prev.skills, ...(suggestedSkills || [])])]
      }));
    } catch (error) {
      console.error('Error using AI assistance:', error);
      setAiError(error instanceof Error ? error.message : 'An error occurred while generating content');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNext = () => {
    try {
      if (validateForm(currentStep)) {
        setCurrentStep(prev => Math.min(prev + 1, 3));
      }
    } catch (error) {
      console.error('Error moving to next step:', error);
    }
  };

  const handlePrevious = () => {
    try {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    } catch (error) {
      console.error('Error moving to previous step:', error);
    }
  };

  const createHackathonCard = () => {
    const card = {
      title: form.title,
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
      prize: form.prize,
      maxParticipants: form.maxParticipants,
      skills: form.skills,
      coverImage: form.coverImage,
      companyLogo: form.companyLogo,
      requirements: form.requirements,
    };
    console.log('Hackathon card created:', card);
    // Add logic to save or display the card as needed
  };

  const handleSubmit = () => {
    try {
      if (validateForm(1) && validateForm(2)) {
        // Handle form submission
        console.log('Form submitted:', form);
        createHackathonCard();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDateChange = (date: Date | null, field: 'startDate' | 'endDate') => {
    try {
      setForm(prev => ({ ...prev, [field]: date }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  const stepContent = [
    // Step 1: Basic Information
    <motion.div
      key="step1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Basic Details</h3>
          <div className="flex flex-col items-end gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAIAssist}
              disabled={!form.title || isGenerating}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isGenerating || !form.title
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              } transition-all duration-200`}
            >
              {isGenerating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Brain className="w-5 h-5" />
              )}
              AI Assist
            </motion.button>
            {aiError && (
              <p className="text-red-500 text-xs flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {aiError}
              </p>
            )}
          </div>
        </div>

        <FormInput label="Hackathon Title" error={errors.title}>
          <input
            type="text"
            value={form.title}
            onChange={(e) => {
              setForm(prev => ({ ...prev, title: e.target.value }));
              if (errors.title) setErrors(prev => ({ ...prev, title: undefined }));
            }}
            className={`mt-1 block w-full rounded-lg border ${
              errors.title ? 'border-red-300' : 'border-gray-200'
            } bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:ring-purple-500 sm:text-sm`}
            placeholder="Enter an engaging title"
          />
        </FormInput>

        <FormInput label="Description" error={errors.description}>
          <textarea
            value={form.description}
            onChange={(e) => {
              setForm(prev => ({ ...prev, description: e.target.value }));
              if (errors.description) setErrors(prev => ({ ...prev, description: undefined }));
            }}
            className={`mt-1 block w-full rounded-lg border ${
              errors.description ? 'border-red-300' : 'border-gray-200'
            } bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:ring-purple-500 sm:text-sm`}
            rows={4}
            placeholder="Describe your hackathon"
          />
        </FormInput>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="Start Date" error={errors.startDate}>
            <DatePicker
              selected={form.startDate}
              onChange={(date) => handleDateChange(date, 'startDate')}
              minDate={new Date()}
              className={`mt-1 block w-full rounded-lg border ${
                errors.startDate ? 'border-red-300' : 'border-gray-200'
              } bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:ring-purple-500 sm:text-sm`}
              placeholderText="Select start date"
            />
          </FormInput>

          <FormInput label="End Date" error={errors.endDate}>
            <DatePicker
              selected={form.endDate}
              onChange={(date) => handleDateChange(date, 'endDate')}
              minDate={form.startDate || new Date()}
              className={`mt-1 block w-full rounded-lg border ${
                errors.endDate ? 'border-red-300' : 'border-gray-200'
              } bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:ring-purple-500 sm:text-sm`}
              placeholderText="Select end date"
            />
          </FormInput>
        </div>
      </div>
    </motion.div>,

    // Step 2: Requirements and Prizes
    <motion.div
      key="step2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Prize & Requirements</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="Prize Pool" error={errors.prize}>
            <div className="mt-1 relative rounded-lg shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                value={form.prize}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d]/g, '');
                  setForm(prev => ({ ...prev, prize: value }));
                  if (errors.prize) setErrors(prev => ({ ...prev, prize: undefined }));
                }}
                className={`block w-full rounded-lg border ${
                  errors.prize ? 'border-red-300' : 'border-gray-200'
                } pl-7 pr-12 py-2 focus:border-purple-500 focus:ring-purple-500 sm:text-sm`}
                placeholder="5000"
              />
            </div>
          </FormInput>

          <FormInput label="Maximum Participants" error={errors.maxParticipants}>
            <input
              type="number"
              min="1"
              value={form.maxParticipants}
              onChange={(e) => {
                const value = Math.max(1, parseInt(e.target.value) || 0);
                setForm(prev => ({ ...prev, maxParticipants: value.toString() }));
                if (errors.maxParticipants) setErrors(prev => ({ ...prev, maxParticipants: undefined }));
              }}
              className={`mt-1 block w-full rounded-lg border ${
                errors.maxParticipants ? 'border-red-300' : 'border-gray-200'
              } bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:ring-purple-500 sm:text-sm`}
              placeholder="Enter max participants"
            />
          </FormInput>
        </div>

        <FormInput label="Required Skills" error={errors.skills}>
          <div className="mt-1 space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSkillAdd()}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Add a skill"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSkillAdd}
                className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition duration-200"
              >
                Add
              </motion.button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.skills.map((skill) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full flex items-center gap-2 text-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="hover:text-purple-900"
                  >
                    ×
                  </button>
                </motion.span>
              ))}
            </div>
          </div>
        </FormInput>

        <FormInput label="Requirements" error={errors.requirements}>
          <div className="flex justify-between items-center">
            <textarea
              value={form.requirements}
              onChange={(e) => {
                setForm(prev => ({ ...prev, requirements: e.target.value }));
                if (errors.requirements) setErrors(prev => ({ ...prev, requirements: undefined }));
              }}
              className={`mt-1 block w-full rounded-lg border ${
                errors.requirements ? 'border-red-300' : 'border-gray-200'
              } bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:ring-purple-500 sm:text-sm`}
              rows={4}
              placeholder="List any specific requirements"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAIAssistRequirements}
              disabled={!form.title || isGenerating}
              className={`ml-2 flex items-center gap-2 px-4 py-2 rounded-lg ${
                isGenerating || !form.title
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              } transition-all duration-200`}
            >
              {isGenerating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Brain className="w-5 h-5" />
              )}
              AI Assist
            </motion.button>
          </div>
          {aiError && (
            <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" />
              {aiError}
            </p>
          )}
        </FormInput>
      </div>
    </motion.div>,

    // Step 3: Preview
    <motion.div
      key="step3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="bg-white rounded-xl overflow-hidden">
          <motion.div 
            className="relative h-48"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={form.coverImage}
              alt="Hackathon cover"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
            <motion.div 
              className="absolute bottom-4 left-4 right-4 text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold">{form.title || "Hackathon Title"}</h2>
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {form.startDate?.toLocaleDateString()} - {form.endDate?.toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="p-6 space-y-6"
            variants={containerVariants}
          >
            <motion.div 
              className="grid grid-cols-2 gap-6"
              variants={itemVariants}
            >
              <div className="bg-purple-50 rounded-xl p-4 flex items-center gap-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-purple-600 font-medium">Prize Pool</p>
                  <p className="text-xl font-semibold text-purple-700">${form.prize || "0"}</p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-medium">Participants</p>
                  <p className="text-xl font-semibold text-blue-700">{form.maxParticipants || "0"}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="prose prose-sm max-w-none"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold text-gray-900">About</h3>
              <p className="text-gray-600">{form.description || "No description provided."}</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {form.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="prose prose-sm max-w-none"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold text-gray-900">Requirements</h3>
              <p className="text-gray-600">{form.requirements || "No requirements specified."}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <motion.h1 
              className="text-2xl font-bold text-gray-900 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Create Hackathon
              <Sparkles className="w-6 h-6 text-purple-600" />
            </motion.h1>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-500">Step {currentStep} of 3</span>
              <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-purple-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {stepContent[currentStep - 1]}
          </AnimatePresence>

          <motion.div 
            className="mt-8 flex justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {currentStep > 1 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePrevious}
                className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </motion.button>
            )}
            {currentStep < 3 ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="ml-auto flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="ml-auto flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
              >
                Publish Hackathon
                <CheckCircle2 className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HackathonPublisher;