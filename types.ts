export interface Project {
  id: string;
  title: string;
  category: string;
  role: string;
  tools: string[];
  challenges: string[];
  outcomes: string[];
  image: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteSettings {
  theme: 'dark' | 'neutral';
  accentColors: string[];
  typography: {
    headingSize: string;
  };
}