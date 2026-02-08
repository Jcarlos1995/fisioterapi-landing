export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  image: string;
  bio: string;
}

export interface ClinicStory {
  id: string;
  title: string;
  patientName: string;
  summary: string;
  treatment: string;
  image: string;
  date: string;
}

export enum LoginType {
  CLIENT = 'CLIENT',
  PROFESSIONAL = 'PROFESSIONAL'
}

// types.ts (en la carpeta de tu Landing)
export interface Story {
  id?: string;
  patientName: string;
  diagnosis: string;
  testimony: string;
  displayDate: string; // El formato "YYYY-MM" que viene del sistema
  imageUrl?: string;
}