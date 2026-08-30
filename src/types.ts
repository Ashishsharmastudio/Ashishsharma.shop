export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  client: string;
  services: string[];
  challenge: string;
  strategy: string;
  designProcess: string;
  developmentApproach: string;
  techStack: string[];
  image: string; // Background color or visual layout type to dynamically render premium imagery
  results: string[];
  keyMetrics: {
    value: string;
    label: string;
  }[];
  testimonial: {
    text: string;
    author: string;
    role: string;
  };
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  details: string[];
}

export interface LabExperiment {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'Shaders' | 'Backgrounds' | 'Heroes' | 'ASCII' | 'Motion' | 'Interactions';
  complexity: 'Low' | 'Medium' | 'High';
  date: string;
}
