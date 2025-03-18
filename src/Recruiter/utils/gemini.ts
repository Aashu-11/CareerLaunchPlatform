import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyAygXhBwCExtihlHDPqWjcciwEBtbDhxgs';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent';

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export const generateHackathonDescription = async (topic: string): Promise<string> => {
  try {
    const response = await axios.post<GeminiResponse>(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Generate a compelling and professional hackathon description for the following topic: ${topic}. 
                   Include key points about what participants will learn, the challenge they'll face, and potential impact. 
                   Keep it concise but engaging, in around less than 150 words and ensure you write everything in plain text and dont include any kind of special characters like * , # etc and ensure it looks very nice and appealing for participants.`
          }]
        }]
      }
    );

    return response.data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error('Error generating description:', error);
    return '';
  }
};

export const suggestHackathonRequirements = async (topic: string): Promise<string> => {
  try {
    const response = await axios.post<GeminiResponse>(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Generate a list of technical requirements and prerequisites for a hackathon on the topic: ${topic}. 
                   Include necessary skills, tools, and any specific knowledge areas participants should have. Keep it concise but engaging, in around less than 150 words and ensure you write everything in plain text and dont include any kind of special characters like * , # etc and ensure it clerly depicts the requirements for the hackathon.`
          }]
        }]
      }
    );

    return response.data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error('Error generating requirements:', error);
    return '';
  }
};

export const suggestSkills = async (topic: string): Promise<string[]> => {
  try {
    const response = await axios.post<GeminiResponse>(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Generate a comma-separated list of 5-8 relevant technical skills required for a hackathon on: ${topic}. 
                   Keep each skill concise (1-2 words).`
          }]
        }]
      }
    );

    const skillsText = response.data.candidates[0].content.parts[0].text;
    return skillsText.split(',').map(skill => skill.trim());
  } catch (error) {
    console.error('Error generating skills:', error);
    return [];
  }
};