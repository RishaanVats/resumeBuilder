export interface currentAddressData {
  currentCity: string;
  currentState: string;
  currentCountry: string;
}

export interface personalInfoData {
  fullName: string;
  email: string;
  phone: string;
  currentAddress: currentAddressData;
  linkedin: string;
  github: string;
  portfolio?: string;
  professionalUrl?: string;
  nationality?: string;
  alternateContact?: string;
}

export interface professionalSummaryData {
    summary: string;
    skills: string;
    expYears: string;
    expMonths: string;
}

export interface workExperienceData {
    jobTitle: string;
    companyName: string;
    employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance';
    location: string;
    workType: 'On-site' | 'Remote' | 'Hybrid';
    startDate: Date;
    endDate?: Date;
    currentlyWorking: boolean;
    jobDescription: string;
    keyProjects: string[];
    responsibilities: string;
    technologiesUsed?: string[];
    achievements?: string;
    customInformation?: string;
}

export interface resumeData {
  personalInfoData?: personalInfoData;
  professionalSummaryData?: professionalSummaryData;
  workExperienceData?: workExperienceData;
}
