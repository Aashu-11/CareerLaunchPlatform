import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import DatePicker from 'react-datepicker';
import { ChromePicker } from 'react-color';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { format } from 'date-fns';
import { FileText, Plus, Trash2, Download, Wand2, Loader, Palette, Layout, Type, Image, Settings, Share, Calendar, Link, Award, PenTool as Tool, Globe, Phone, MapPin, Mail, Github, Linkedin, Upload, X } from 'lucide-react';

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI('AIzaSyAAzxjwlmE0Si1K7si4kzXpoZA5QHnbgnU');

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [accentColor, setAccentColor] = useState('#6366f1');
  const [template, setTemplate] = useState('modern');
  const [fontSize, setFontSize] = useState(16);
  const [formData, setFormData] = useState({
    personal: {
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      linkedin: '',
      github: '',
      portfolio: '',
      photo: ''
    },
    experience: [
      {
        company: '',
        position: '',
        startDate: null as Date | null,
        endDate: null as Date | null,
        current: false,
        location: '',
        description: '',
        achievements: [''],
        technologies: ['']
      }
    ],
    education: [
      {
        school: '',
        degree: '',
        field: '',
        startDate: null as Date | null,
        endDate: null as Date | null,
        gpa: '',
        location: '',
        achievements: ['']
      }
    ],
    skills: {
      technical: [''],
      soft: [''],
      languages: [''],
      certifications: [
        {
          name: '',
          issuer: '',
          date: null as Date | null,
          link: ''
        }
      ]
    },
    projects: [
      {
        name: '',
        description: '',
        technologies: [''],
        link: '',
        github: '',
        image: '',
        startDate: null,
        endDate: null
      }
    ]
  });

  const enhanceWithAI = async (section: string, text: string) => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const prompt = `Enhance this ${section} description professionally: ${text} in less than 80 words and ensure you use no special symbols like * , # etc and also ensure everything is in plain text and looks very nice on resume.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const enhancedText = response.text();
      setLoading(false);
      return enhancedText;
    } catch (error) {
      console.error('Error enhancing with AI:', error);
      setLoading(false);
      return text;
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.isArray(formData[result.source.droppableId as keyof typeof formData])
      ? Array.from(formData[result.source.droppableId as keyof typeof formData] as any[])
      : [];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFormData({
      ...formData,
      [result.source.droppableId]: items
    });
  };

  const exportToPDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    try {
      setLoading(true);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });

      const scale = 2;
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      let currentHeight = 0;
      let pageNumber = 1;

      const renderPage = async () => {
        const canvas = await html2canvas(element, {
          scale: scale,
          useCORS: true,
          logging: false,
          windowHeight: element.scrollHeight,
          y: currentHeight,
          height: Math.min(element.scrollHeight - currentHeight, pdfHeight)
        });

        const imgData = canvas.toDataURL('image/png', 1.0);
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (pdfWidth * imgProps.height) / imgProps.width;

        if (pageNumber > 1) {
          pdf.addPage();
        }

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
        currentHeight += pdfHeight;
        pageNumber++;

        if (currentHeight < element.scrollHeight) {
          await renderPage();
        }
      };

      await renderPage();
      pdf.save(`${formData.personal.name.replace(/\s+/g, '_')}_resume.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPersonalSection = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 
                         focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={formData.personal.name}
                onChange={(e) => setFormData({
                  ...formData,
                  personal: { ...formData.personal, name: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.personal.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    personal: { ...formData.personal, email: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.personal.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    personal: { ...formData.personal, phone: e.target.value }
                  })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.personal.location}
                  onChange={(e) => setFormData({
                    ...formData,
                    personal: { ...formData.personal, location: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn
              </label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="url"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.personal.linkedin}
                  onChange={(e) => setFormData({
                    ...formData,
                    personal: { ...formData.personal, linkedin: e.target.value }
                  })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GitHub
              </label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="url"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.personal.github}
                  onChange={(e) => setFormData({
                    ...formData,
                    personal: { ...formData.personal, github: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-32">
          <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 
                       flex flex-col items-center justify-center cursor-pointer
                       hover:border-purple-500 transition-colors duration-200">
            {formData.personal.photo ? (
              <img
                src={formData.personal.photo}
                alt="Profile"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-center">
             
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Professional Summary
        </label>
        <div className="relative">
          <textarea
            className="w-full px-4 py-2 rounded-lg border border-gray-200 
                     focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={4}
            value={formData.personal.summary}
            onChange={(e) => setFormData({
              ...formData,
              personal: { ...formData.personal, summary: e.target.value }
            })}
          />
          <button
            onClick={async () => {
              const enhanced = await enhanceWithAI('summary', formData.personal.summary);
              setFormData({
                ...formData,
                personal: { ...formData.personal, summary: enhanced }
              });
            }}
            className="absolute right-2 bottom-2 p-2 text-purple-600 
                     hover:bg-purple-50 rounded-lg transition-colors duration-200"
          >
            {loading ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              <Wand2 className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const renderExperienceSection = () => (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="experience">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-6"
          >
            {formData.experience.map((exp, index) => (
              <Draggable
                key={index}
                draggableId={`experience-${index}`}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-4 bg-gray-50 rounded-lg space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Experience {index + 1}</h3>
                      <button
                        onClick={() => {
                          const newExp = [...formData.experience];
                          newExp.splice(index, 1);
                          setFormData({ ...formData, experience: newExp });
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg
                                 transition-colors duration-200"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={exp.company}
                          onChange={(e) => {
                            const newExp = [...formData.experience];
                            newExp[index].company = e.target.value;
                            setFormData({ ...formData, experience: newExp });
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Position
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={exp.position}
                          onChange={(e) => {
                            const newExp = [...formData.experience];
                            newExp[index].position = e.target.value;
                            setFormData({ ...formData, experience: newExp });
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date
                        </label>
                        <DatePicker
                          selected={exp.startDate}
                          onChange={(date) => {
                            const newExp = [...formData.experience];
                            newExp[index].startDate = date;
                            setFormData({ ...formData, experience: newExp });
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          dateFormat="MM/yyyy"
                          showMonthYearPicker
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date
                        </label>
                        <div className="flex items-center gap-2">
                          <DatePicker
                            selected={exp.endDate}
                            onChange={(date) => {
                              const newExp = [...formData.experience];
                              newExp[index].endDate = date;
                              setFormData({ ...formData, experience: newExp });
                            }}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                     focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            disabled={exp.current}
                          />
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={exp.current}
                              onChange={(e) => {
                                const newExp = [...formData.experience];
                                newExp[index].current = e.target.checked;
                                if (e.target.checked) {
                                  newExp[index].endDate = null;
                                }
                                setFormData({ ...formData, experience: newExp });
                              }}
                              className="rounded border-gray-300 text-purple-600 
                                       focus:ring-purple-500"
                            />
                            <span className="text-sm text-gray-600">Current</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <div className="relative">
                        <textarea
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          rows={4}
                          value={exp.description}
                          onChange={(e) => {
                            const newExp = [...formData.experience];
                            newExp[index].description = e.target.value;
                            setFormData({ ...formData, experience: newExp });
                          }}
                        />
                        <button
                          onClick={async () => {
                            const enhanced = await enhanceWithAI('experience', exp.description);
                            const newExp = [...formData.experience];
                            newExp[index].description = enhanced;
                            setFormData({ ...formData, experience: newExp });
                          }}
                          className="absolute right-2 bottom-2 p-2 text-purple-600 
                                   hover:bg-purple-50 rounded-lg"
                        >
                          {loading ? (
                            <Loader className="h-5 w-5 animate-spin" />
                          ) : (
                            <Wand2 className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Key Achievements
                      </label>
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex items-center gap-2 mb-2">
                          <input
                            type="text"
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 
                                     focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={achievement}
                            onChange={(e) => {
                              const newExp = [...formData.experience];
                              newExp[index].achievements[achievementIndex] = e.target.value;
                              setFormData({ ...formData, experience: newExp });
                            }}
                          />
                          <button
                            onClick={() => {
                              const newExp = [...formData.experience];
                              newExp[index].achievements = newExp[index].achievements.filter(
                                (_, i) => i !== achievementIndex
                              );
                              setFormData({ ...formData, experience: newExp });
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newExp = [...formData.experience];
                          newExp[index].achievements.push('');
                          setFormData({ ...formData, experience: newExp });
                        }}
                        className="flex items-center gap-2 text-sm text-purple-600 
                                 hover:text-purple-700"
                      >
                        <Plus className="h-4 w-4" />
                        Add Achievement
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Technologies Used
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <div
                            key={techIndex}
                            className="flex items-center gap-1 px-3 py-1 bg-gray-100 
                                     rounded-full"
                          >
                            <input
                              type="text"
                              className="w-20 bg-transparent focus:outline-none"
                              value={tech}
                              onChange={(e) => {
                                const newExp = [...formData.experience];
                                newExp[index].technologies[techIndex] = e.target.value;
                                setFormData({ ...formData, experience: newExp });
                              }}
                            />
                            <button
                              onClick={() => {
                                const newExp = [...formData.experience];
                                newExp[index].technologies = newExp[index].technologies.filter(
                                  (_, i) => i !== techIndex
                                );
                                setFormData({ ...formData, experience: newExp });
                              }}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newExp = [...formData.experience];
                            newExp[index].technologies.push('');
                            setFormData({ ...formData, experience: newExp });
                          }}
                          className="flex items-center gap-1 px-3 py-1 text-purple-600 
                                   border border-dashed border-purple-300 rounded-full 
                                   hover:bg-purple-50"
                        >
                          <Plus className="h-4 w-4" />
                          Add Tech
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <button
        onClick={() => setFormData({
          ...formData,
          experience: [
            ...formData.experience,
            {
              company: '',
              position: '',
              startDate: null,
              endDate: null,
              current: false,
              location: '',
              description: '',
              achievements: [''],
              technologies: ['']
            }
          ]
        })}
        className="flex items-center gap-2 px-4 py-2 mt-4 text-purple-600 
                 hover:bg-purple-50 rounded-lg transition-colors duration-200"
      >
        <Plus className="h-5 w-5" />
        Add Experience
      </button>
    </DragDropContext>
  );

  const renderEducationSection = () => (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="education">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-6"
          >
            {formData.education.map((edu, index) => (
              <Draggable
                key={index}
                draggableId={`education-${index}`}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-4 bg-gray-50 rounded-lg space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Education {index + 1}</h3>
                      <button
                        onClick={() => {
                          const newEdu = [...formData.education];
                          newEdu.splice(index, 1);
                          setFormData({ ...formData, education: newEdu });
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          School
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={edu.school}
                          onChange={(e) => {
                            const newEdu = [...formData.education];
                            newEdu[index].school = e.target.value;
                            setFormData({ ...formData, education: newEdu });
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Degree
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={edu.degree}
                          onChange={(e) => {
                            const newEdu = [...formData.education];
                            newEdu[index].degree = e.target.value;
                            setFormData({ ...formData, education: newEdu });
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Field of Study
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={edu.field}
                          onChange={(e) => {
                            const newEdu = [...formData.education];
                            newEdu[index].field = e.target.value;
                            setFormData({ ...formData, education: newEdu });
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          GPA
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={edu.gpa}
                          onChange={(e) => {
                            const newEdu = [...formData.education];
                            newEdu[index].gpa = e.target.value;
                            setFormData({ ...formData, education: newEdu });
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date
                        </label>
                        <DatePicker
                          selected={edu.startDate}
                          onChange={(date) => {
                            const newEdu = [...formData.education];
                            newEdu[index].startDate = date;
                            setFormData({ ...formData, education: newEdu });
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          dateFormat="MM/yyyy"
                          showMonthYearPicker
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date
                        </label>
                        <DatePicker
                          selected={edu.endDate}
                          onChange={(date) => {
                            const newEdu = [...formData.education];
                            newEdu[index].endDate = date ? date : null;
                            setFormData({ ...formData, education: newEdu });
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          dateFormat="MM/yyyy"
                          showMonthYearPicker
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Achievements
                      </label>
                      {edu.achievements.map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex items-center gap-2 mb-2">
                          <input
                            type="text"
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 
                                     focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={achievement}
                            onChange={(e) => {
                              const newEdu = [...formData.education];
                              newEdu[index].achievements[achievementIndex] = e.target.value;
                              setFormData({ ...formData, education: newEdu });
                            }}
                          />
                          <button
                            onClick={() => {
                              const newEdu = [...formData.education];
                              newEdu[index].achievements = newEdu[index].achievements.filter(
                                (_, i) => i !== achievementIndex
                              );
                              setFormData({ ...formData, education: newEdu });
                            }}
                            
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newEdu = [...formData.education];
                          newEdu[index].achievements.push('');
                          setFormData({ ...formData, education: newEdu });
                        }}
                        className="flex items-center gap-2 text-sm text-purple-600 
                                 hover:text-purple-700"
                      >
                        <Plus className="h-4 w-4" />
                        Add Achievement
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <button
        onClick={() => setFormData({
          ...formData,
          education: [
            ...formData.education,
            {
              school: '',
              degree: '',
              field: '',
              startDate: null,
              endDate: null,
              gpa: '',
              location: '',
              achievements: ['']
            }
          ]
        })}
        className="flex items-center gap-2 px-4 py-2 mt-4 text-purple-600 
                 hover:bg-purple-50 rounded-lg transition-colors duration-200"
      >
        <Plus className="h-5 w-5" />
        Add Education
      </button>
    </DragDropContext>
  );

  const renderSkillsSection = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Technical Skills</h3>
        <div className="flex flex-wrap gap-2">
          {formData.skills.technical.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full"
            >
              <input
                type="text"
                className="w-20 bg-transparent focus:outline-none"
                value={skill}
                onChange={(e) => {
                  const newSkills = { ...formData.skills };
                  newSkills.technical[index] = e.target.value;
                  setFormData({ ...formData, skills: newSkills });
                }}
              />
              <button
                onClick={() => {
                  const newSkills = { ...formData.skills };
                  newSkills.technical = newSkills.technical.filter((_, i) => i !== index);
                  setFormData({ ...formData, skills: newSkills });
                }}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const newSkills = { ...formData.skills };
              newSkills.technical.push('');
              setFormData({ ...formData, skills: newSkills });
            }}
            className="flex items-center gap-1 px-3 py-1 text-purple-600 
                     border border-dashed border-purple-300 rounded-full 
                     hover:bg-purple-50"
          >
            <Plus className="h-4 w-4" />
            Add Skill
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Soft Skills</h3>
        <div className="flex flex-wrap gap-2">
          {formData.skills.soft.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full"
            >
              <input
                type="text"
                className="w-20 bg-transparent focus:outline-none"
                value={skill}
                onChange={(e) => {
                  const newSkills = { ...formData.skills };
                  newSkills.soft[index] = e.target.value;
                  setFormData({ ...formData, skills: newSkills });
                }}
              />
              <button
                onClick={() => {
                  const newSkills = { ...formData.skills };
                  newSkills.soft = newSkills.soft.filter((_, i) => i !== index);
                  setFormData({ ...formData, skills: newSkills });
                }}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const newSkills = { ...formData.skills };
              newSkills.soft.push('');
              setFormData({ ...formData, skills: newSkills });
            }}
            className="flex items-center gap-1 px-3 py-1 text-purple-600 
                     border border-dashed border-purple-300 rounded-full 
                     hover:bg-purple-50"
          >
            <Plus className="h-4 w-4" />
            Add Skill
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Languages</h3>
        <div className="flex flex-wrap gap-2">
          {formData.skills.languages.map((language, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full"
            >
              <input
                type="text"
                className="w-20 bg-transparent focus:outline-none"
                value={language}
                onChange={(e) => {
                  const newSkills = { ...formData.skills };
                  newSkills.languages[index] = e.target.value;
                  setFormData({ ...formData, skills: newSkills });
                }}
              />
              <button
                onClick={() => {
                  const newSkills = { ...formData.skills };
                  newSkills.languages = newSkills.languages.filter((_, i) => i !== index);
                  setFormData({ ...formData, skills: newSkills });
                }}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const newSkills = { ...formData.skills };
              newSkills.languages.push('');
              setFormData({ ...formData, skills: newSkills });
            }}
            className="flex items-center gap-1 px-3 py-1 text-purple-600 
                     border border-dashed border-purple-300 rounded-full 
                     hover:bg-purple-50"
          >
            <Plus className="h-4 w-4" />
            Add Language
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Certifications</h3>
        {formData.skills.certifications.map((cert, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-4 mb-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Certification {index + 1}</h4>
              <button
                onClick={() => {
                  const newSkills = { ...formData.skills };
                  newSkills.certifications = newSkills.certifications.filter(
                    (_, i) => i !== index
                  );
                  setFormData({ ...formData, skills: newSkills });
                }}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={cert.name}
                  onChange={(e) => {
                    const newSkills = { ...formData.skills };
                    newSkills.certifications[index].name = e.target.value;
                    setFormData({ ...formData, skills: newSkills });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issuer
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={cert.issuer}
                  onChange={(e) => {
                    const newSkills = { ...formData.skills };
                    newSkills.certifications[index].issuer = e.target.value;
                    setFormData({ ...formData, skills: newSkills });
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <DatePicker
                  selected={cert.date}
                  onChange={(date) => {
                    const newSkills = { ...formData.skills };
                    newSkills.certifications[index].date = date;
                    setFormData({ ...formData, skills: newSkills });
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={cert.link}
                  onChange={(e) => {
                    const newSkills = { ...formData.skills };
                    newSkills.certifications[index].link = e.target.value;
                    setFormData({ ...formData, skills: newSkills });
                  }}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            const newSkills = { ...formData.skills };
            newSkills.certifications.push({
              name: '',
              issuer: '',
              date: null,
              link: ''
            });
            setFormData({ ...formData, skills: newSkills });
          }}
          className="flex items-center gap-2 px-4 py-2 text-purple-600 
                   hover:bg-purple-50 rounded-lg"
        >
          <Plus className="h-5 w-5" />
          Add Certification
        </button>
      </div>
    </div>
  );

  const renderProjectsSection = () => (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="projects">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-6"
          >
            {formData.projects.map((project, index) => (
              <Draggable
                key={index}
                draggableId={`project-${index}`}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-4 bg-gray-50 rounded-lg space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Project {index + 1}</h3>
                      <button
                        onClick={() => {
                          const newProjects = [...formData.projects];
                          newProjects.splice(index, 1);
                          setFormData({ ...formData, projects: newProjects });
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={project.name}
                        onChange={(e) => {
                          const newProjects = [...formData.projects];
                          newProjects[index].name = e.target.value;
                          setFormData({ ...formData, projects: newProjects });
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <div className="relative">
                        <textarea
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          rows={4}
                          value={project.description}
                          onChange={(e) => {
                            const newProjects = [...formData.projects];
                            newProjects[index].description = e.target.value;
                            setFormData({ ...formData, projects: newProjects });
                          }}
                        />
                        <button
                          onClick={async () => {
                            const enhanced = await enhanceWithAI('project', project.description);
                            const newProjects = [...formData.projects];
                            newProjects[index].description = enhanced;
                            setFormData({ ...formData, projects: newProjects });
                          }}
                          className="absolute right-2 bottom-2 p-2 text-purple-600 
                                   hover:bg-purple-50 rounded-lg"
                        >
                          {loading ? (
                            <Loader className="h-5 w-5 animate-spin" />
                          ) : (
                            <Wand2 className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Live Link
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 
                                        text-gray-400" />
                          <input
                            type="url"
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                                     focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={project.link}
                            onChange={(e) => {
                              const newProjects = [...formData.projects];
                              newProjects[index].link = e.target.value;
                              setFormData({ ...formData, projects: newProjects });
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          GitHub Link
                        </label>
                        <div className="relative">
                          <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 
                                         text-gray-400" />
                          <input
                            type="url"
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                                     focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={project.github}
                            onChange={(e) => {
                              const newProjects = [...formData.projects];
                              newProjects[index].github = e.target.value;
                              setFormData({ ...formData, projects: newProjects });
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Technologies Used
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <div
                            key={techIndex}
                            className="flex items-center gap-1 px-3 py-1 bg-gray-100 
                                     rounded-full"
                          >
                            <input
                              type="text"
                              className="w-20 bg-transparent focus:outline-none"
                              value={tech}
                              onChange={(e) => {
                                const newProjects = [...formData.projects];
                                newProjects[index].technologies[techIndex] = e.target.value;
                                setFormData({ ...formData, projects: newProjects });
                              }}
                            />
                            <button
                              onClick={() => {
                                const newProjects = [...formData.projects];
                                newProjects[index].technologies = newProjects[index].technologies
                                  .filter((_, i) => i !== techIndex);
                                setFormData({ ...formData, projects: newProjects });
                              }}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newProjects = [...formData.projects];
                            newProjects[index].technologies.push('');
                            setFormData({ ...formData, projects: newProjects });
                          }}
                          className="flex items-center gap-1 px-3 py-1 text-purple-600 
                                   border border-dashed border-purple-300 rounded-full 
                                   hover:bg-purple-50"
                        >
                          <Plus className="h-4 w-4" />
                          Add Tech
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <button
        onClick={() => setFormData({
          ...formData,
          projects: [
            ...formData.projects,
            {
              name: '',
              description: '',
              technologies: [''],
              link: '',
              github: '',
              image: '',
              startDate: null,
              endDate: null
            }
          ]
        })}
        className="flex items-center gap-2 px-4 py-2 mt-4 text-purple-600 
                 hover:bg-purple-50 rounded-lg transition-colors duration-200"
      >
        <Plus className="h-5 w-5" />
        Add Project
      </button>
    </DragDropContext>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Professional Resume Builder</h1>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm
                       hover:shadow-md transition-all duration-200"
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              <Palette className="h-5 w-5" />
              Theme
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white 
                       rounded-lg shadow-sm hover:bg-indigo-700 transition-colors duration-200"
              onClick={exportToPDF}
              disabled={loading}
            >
              {loading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <Download className="h-5 w-5" />
              )}
              Export PDF
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
            <div className="flex items-center gap-4 mb-6">
              {['personal', 'experience', 'education', 'skills', 'projects'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
                           ${activeSection === section
                             ? 'bg-purple-100 text-purple-700'
                             : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>

            {activeSection === 'personal' && renderPersonalSection()}
            {activeSection === 'experience' && renderExperienceSection()}
            {activeSection === 'education' && renderEducationSection()}
            {activeSection === 'skills' && renderSkillsSection()}
            {activeSection === 'projects' && renderProjectsSection()}
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Live Preview</h2>
              <div className="flex items-center gap-4">
                <button
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  onClick={() => setTemplate(template === 'modern' ? 'classic' : 'modern')}
                >
                  <Layout className="h-5 w-5" />
                </button>
                <button
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  onClick={() => setFontSize(fontSize === 16 ? 14 : 16)}
                >
                  <Type className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div 
              id="resume-preview" 
              className={`prose max-w-none ${template} text-[${fontSize}px] p-8 bg-white`}
              style={{ 
                '--accent-color': accentColor,
                maxWidth: '816px',
                margin: '0 auto',
                fontFamily: 'Times New Roman, serif',
                lineHeight: '1.5'
              } as React.CSSProperties}
            >
              {/* Personal Information */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{formData.personal.name}</h1>
                <div className="flex items-center gap-4 text-gray-600">
                  {formData.personal.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {formData.personal.email}
                    </div>
                  )}
                  {formData.personal.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {formData.personal.phone}
                    </div>
                  )}
                  {formData.personal.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {formData.personal.location}
                    </div>
                  )}
                </div>
                {(formData.personal.linkedin || formData.personal.github) && (
                  <div className="flex items-center gap-4 mt-2 text-gray-600">
                    {formData.personal.linkedin && (
                      <a
                        href={formData.personal.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-purple-600"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    )}
                    {formData.personal.github && (
                      <a
                        href={formData.personal.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-purple-600"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Summary */}
              {formData.personal.summary && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
                  <p className="text-gray-600">{formData.personal.summary}</p>
                </div>
              )}

              {/* Experience */}
              {formData.experience.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Experience</h2>
                  <div className="space-y-6">
                    {formData.experience.map((exp, index) => (
                      <div key={index}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-medium">{exp.position}</h3>
                            <div className="text-gray-600">{exp.company}</div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {exp.startDate && format(exp.startDate, 'MMM yyyy')} -{' '}
                            {exp.current
                              ? 'Present'
                              : exp.endDate && format(exp.endDate, 'MMM yyyy')}
                          </div>
                        </div>
                        <p className="mt-2 text-gray-600">{exp.description}</p>
                        {exp.achievements.length > 0 && (
                          <ul className="mt-2 space-y-1">
                            {exp.achievements.filter(Boolean).map((achievement, i) => (
                              <li key={i} className="flex items-center gap-2 text-gray-600">
                                <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        )}
                        {exp.technologies.filter(Boolean).length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {exp.technologies.filter(Boolean).map((tech, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 text-sm bg-gray-100 text-gray-600 
                                         rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {formData.education.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Education</h2>
                  <div className="space-y-6">
                    {formData.education.map((edu, index) => (
                      <div key={index}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-medium">{edu.degree}</h3>
                            <div className="text-gray-600">
                              {edu.school}
                              {edu.field && ` • ${edu.field}`}
                              {edu.gpa && ` • GPA: ${edu.gpa}`}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {edu.startDate && format(edu.startDate, 'MMM yyyy')} -{' '}
                            {edu.endDate && format(edu.endDate, 'MMM yyyy')}
                          </div>
                        </div>
                        {edu.achievements.filter(Boolean).length > 0 && (
                          <ul className="mt-2 space-y-1">
                            {edu.achievements.filter(Boolean).map((achievement, i) => (
                              <li key={i} className="flex items-center gap-2 text-gray-600">
                                <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {(formData.skills.technical.filter(Boolean).length > 0 ||
                formData.skills.soft.filter(Boolean).length > 0 ||
                formData.skills.languages.filter(Boolean).length > 0 ||
                formData.skills.certifications.filter((cert) => cert.name).length > 0) && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Skills & Certifications</h2>
                  <div className="space-y-4">
                    {formData.skills.technical.filter(Boolean).length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-2">Technical Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.technical.filter(Boolean).map((skill, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.skills.soft.filter(Boolean).length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-2">Soft Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.soft.filter(Boolean).map((skill, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.skills.languages.filter(Boolean).length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-2">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.languages.filter(Boolean).map((language, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
                            >
                              {language}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.skills.certifications.filter((cert) => cert.name).length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-2">Certifications</h3>
                        <div className="space-y-2">
                          {formData.skills.certifications
                            .filter((cert) => cert.name)
                            .map((cert, i) => (
                              <div key={i} className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium">{cert.name}</div>
                                  <div className="text-sm text-gray-600">{cert.issuer}</div>
                                </div>
                                <div className="text-sm text-gray-500">
                                  {cert.date && format(cert.date, 'MMM yyyy')}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Projects */}
              {formData.projects.filter((project) => project.name).length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Projects</h2>
                  <div className="space-y-6">
                    {formData.projects
                      .filter((project) => project.name)
                      .map((project, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">{project.name}</h3>
                            <div className="flex items-center gap-2">
                              {project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-purple-600 hover:text-purple-700"
                                >
                                  <Globe className="h-5 w-5" />
                                </a>
                              )}
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-purple-600 hover:text-purple-700"
                                >
                                  <Github className="h-5 w-5" />
                                </a>
                              )}
                            </div>
                          </div>
                          <p className="mt-2 text-gray-600">{project.description}</p>
                          {project.technologies.filter(Boolean).length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {project.technologies.filter(Boolean).map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 text-sm bg-gray-100 text-gray-600 
                                           rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showColorPicker && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 bg-white rounded-xl shadow-lg p-4"
          >
            <ChromePicker
              color={accentColor}
              onChange={(color) => setAccentColor(color.hex)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeBuilder;