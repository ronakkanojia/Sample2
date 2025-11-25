import { Project, SiteSettings } from './types';

export const SITE_SETTINGS: SiteSettings = {
  theme: 'dark',
  accentColors: ['#6366f1', '#a5b4fc'],
  typography: {
    headingSize: 'large',
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Neon Finance',
    category: 'FinTech Dashboard',
    role: 'Lead Frontend Developer',
    tools: ['React', 'D3.js', 'Tailwind', 'WebSockets'],
    challenges: [
      'Visualizing real-time high-frequency trading data without performance lag.',
      'Maintaining 60fps animations on mobile devices.'
    ],
    outcomes: [
      'Reduced load time by 40% using lazy-loading strategies.',
      'Increased user engagement time by 25% via interactive charts.'
    ],
    image: 'https://picsum.photos/800/600?random=1',
    description: 'A real-time financial analytics platform designed for high-frequency traders, featuring sub-millisecond data updates and WebGL-powered visualizations.'
  },
  {
    id: 'p2',
    title: 'Aura Commerce',
    category: 'E-Commerce Experience',
    role: 'UI/UX Engineer',
    tools: ['Next.js', 'Framer Motion', 'Shopify API'],
    challenges: [
      'Creating a seamless transition between product catalog and detailed views.',
      'Implementing a custom headless checkout flow.'
    ],
    outcomes: [
      'Achieved a perfect 100 Lighthouse performance score.',
      'Boosted conversion rates by 15% through streamlined UX.'
    ],
    image: 'https://picsum.photos/800/600?random=2',
    description: 'An immersive headless e-commerce experience emphasizing visual storytelling and smooth page transitions for a luxury fashion brand.'
  },
  {
    id: 'p3',
    title: 'Orbit AI',
    category: 'SaaS Platform',
    role: 'Frontend Architect',
    tools: ['TypeScript', 'Three.js', 'OpenAI API'],
    challenges: [
      'Integrating 3D interactive models with conversational AI responses.',
      'Managing complex global state for multi-step user workflows.'
    ],
    outcomes: [
      'Scaled to 10k+ daily active users with zero downtime.',
      'Featured on Awwwards for "Site of the Day".'
    ],
    image: 'https://picsum.photos/800/600?random=3',
    description: 'A generative AI workspace allowing users to manipulate 3D environments via natural language prompts.'
  }
];

export const SKILLS = [
  "React / Next.js",
  "TypeScript",
  "Tailwind CSS",
  "WebGL / Three.js",
  "Framer Motion / GSAP",
  "Node.js",
  "UI/UX Design",
  "Performance Optimization"
];

export const SOCIAL_LINKS = [
  { name: 'GitHub', url: '#' },
  { name: 'LinkedIn', url: '#' },
  { name: 'Twitter', url: '#' },
  { name: 'Dribbble', url: '#' }
];