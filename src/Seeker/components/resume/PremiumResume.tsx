import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font
} from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2' },
    { 
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2',
      fontWeight: 700 
    }
  ]
});

Font.register({
  family: 'Playfair Display',
  src: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2'
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Inter'
  },
  header: {
    marginBottom: 20
  },
  name: {
    fontSize: 24,
    fontFamily: 'Playfair Display',
    marginBottom: 5
  },
  contact: {
    fontSize: 10,
    color: '#666',
    marginBottom: 3
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 10,
    color: '#1a1a1a',
    borderBottom: '1 solid #eee',
    paddingBottom: 5
  },
  experienceItem: {
    marginBottom: 15
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 3
  },
  company: {
    fontSize: 11,
    color: '#666',
    marginBottom: 3
  },
  date: {
    fontSize: 10,
    color: '#888',
    marginBottom: 5
  },
  description: {
    fontSize: 10,
    color: '#444',
    lineHeight: 1.5
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#f3f4f6',
    padding: '4 8',
    borderRadius: 4
  },
  education: {
    marginBottom: 10
  },
  school: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 3
  },
  degree: {
    fontSize: 10,
    color: '#666'
  }
});


// Define Education type
type Education = {
  school: string;
  degree: string;
  field: string;
  graduationDate: string;
};

// Define Experience type
type Experience = {
  company: string;
  position: string;
  startDate: Date | null;
  endDate: Date | null;
  current: boolean;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
};
// Resume Component
type FormData = {
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    linkedin: string;
    github: string;
    portfolio: string;
    photo: string;
  };
  experience: {
    company: string;
    position: string;
    startDate: Date | null;
    endDate: Date | null;
    current: boolean;
    location: string;
    description: string;
    achievements: string[];
    technologies: string[];
  }[];
  education: {
    school: string;
    degree: string;
    field: string;
    startDate: Date | null;
    endDate: Date | null;
    gpa: string;
    location: string;
    achievements: string[];
    graduationDate: string;
  }[];
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
    certifications: {
      name: string;
      issuer: string;
      date: Date | null;
      link: string;
    }[];
  };
  projects: {
    name: string;
    description: string;
    technologies: string[];
    link: string;
    github: string;
    image: string;
    startDate: Date | null;
    endDate: Date | null;
  }[];
};
const PremiumResume = ({ formData }: { formData: FormData }) => (
  <PDFViewer style={{ width: '100%', height: '100%' }}>
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{formData.personal.name}</Text>
          <Text style={styles.contact}>{formData.personal.email}</Text>
          <Text style={styles.contact}>{formData.personal.phone}</Text>
          <Text style={styles.contact}>{formData.personal.location}</Text>
        </View>

        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.description}>{formData.personal.summary}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
            {formData.experience.map((exp: Experience, index: number) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{exp.position}</Text>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.date}>
              {exp.startDate ? exp.startDate.toLocaleDateString() : ''} - {exp.endDate ? exp.endDate.toLocaleDateString() : 'Present'}
              </Text>
              <Text style={styles.description}>{exp.description}</Text>
            </View>
            ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
            {formData.education.map((edu: Education, index: number) => (
            <View key={index} style={styles.education}>
              <Text style={styles.school}>{edu.school}</Text>
              <Text style={styles.degree}>
              {edu.degree} in {edu.field}
              </Text>
              <Text style={styles.date}>{edu.graduationDate}</Text>
            </View>
            ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skills}>
            {formData.skills.technical.map((skill: string, index: number) => (
              <Text key={index} style={styles.skill}>
              {skill}
              </Text>
            ))}
            {formData.skills.soft.map((skill: string, index: number) => (
              <Text key={index} style={styles.skill}>
              {skill}
              </Text>
            ))}
            {formData.skills.languages.map((skill: string, index: number) => (
              <Text key={index} style={styles.skill}>
              {skill}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default PremiumResume;