import type {
  MetricItem,
  WorkExperience,
  PillarItem,
  AiProjectItem,
  EducationItem,
  ContactItem,
} from '../../types/portfolio';

export const personalInfo = {
  name: 'Sayandeep Majumdar',
  role: 'Senior Software Engineer',
  location: 'Kolkata, India',
  availability: 'Available for projects',
  bioShort: 'Kolkata-based, 9+ years building scalable web apps, CMS platforms, cloud infrastructure, and SEO-ready sites with Laravel, and modern tooling.',
  bioParagraphs: [
    'I am a Kolkata-based Senior Software Engineer with 9+ years of experience building scalable web applications, CMS platforms, microservices, cloud infrastructure, and SEO-optimised websites.',
    'Full stack by responsibility: backend architecture, frontend delivery, database schema design, technical SEO, deployment, monitoring, and performance all matter to me because real products need all of them working together.',
    'I currently build and lead engineering work at Volition LLP, including Laravel applications, WordPress platforms, integrations, REST APIs, code reviews, tests, and delivery standards.',
  ],
  profileImage: '/assets/img/profile.jpg',
  email: 'sayandeepmajumdar.official@gmail.com',
  phone: '+91 82401 31911',
  phoneHref: 'tel:+918240131911',
  github: 'https://github.com/sayandeepmajumdar',
  linkedin: 'https://www.linkedin.com/in/connectwithsayandeep/',
  twitter: 'https://twitter.com/mesayandeep',
  devTo: 'https://dev.to/sayandeepmajumdar',
};

export const metrics: MetricItem[] = [
  { value: '9+', label: 'Years experience' },
  { value: '90+', label: 'PageSpeed scores' },
  { value: '5+', label: 'Years at Volition' },
];

export const workExperiences: WorkExperience[] = [
  {
    title: 'Assetcomply App',
    pill: 'Current',
    role: 'Laravel / Livewire / APIs',
    description: 'Enterprise asset-compliance workflows with Laravel, Livewire, Blade, REST APIs, migrations, payment gateways, RFID integrations, PHPUnit suites, and database ownership.',
    tags: ['Laravel', 'Livewire', 'RFID', 'Payments', 'PHPUnit'],
  },
  {
    title: 'CMS Platforms',
    pill: 'Production',
    role: 'WordPress / SEO',
    description: 'WordPress websites with custom themes, plugins, Elementor Pro, Gutenberg, WooCommerce, ACF, WPML, structured data, sitemaps, canonical tags, and responsive UI.',
    tags: ['WordPress', 'Gutenberg', 'ACF', 'SEO', 'WooCommerce'],
  },
  {
    title: 'Speed Optimisation',
    pill: 'Performance',
    role: 'Core Web Vitals',
    description: '90+ Google PageSpeed targets through image optimisation, lazy loading, CSS/JS minification, CDN integration, caching, and cross-browser responsive delivery.',
    tags: ['Core Web Vitals', 'CDN', 'Cache', 'LCP', 'CLS'],
  },
  {
    title: 'Infrastructure',
    pill: 'Cloud',
    role: 'AWS / Docker / K8s',
    description: 'AWS EC2, S3, IAM, Docker, Kubernetes, GitHub Actions, environment provisioning, load testing, monitoring, and observable production deployments.',
    tags: ['AWS', 'Docker', 'Kubernetes', 'Grafana', 'k6'],
  },
];

export const aiProjects: AiProjectItem[] = [
  {
    name: 'Toolzy',
    slug: 'tools',
    emoji: '🛠️',
    description: 'Privacy-focused developer utilities, code formatting, security calculators, and encoding suite.',
    category: 'Developer Tools',
    href: '/tools/',
    featured: true,
  },
  {
    name: 'Mathlify',
    slug: 'mathlify',
    emoji: '⚡',
    description: '35+ interactive financial, health, scientific, and everyday calculators with instant computation.',
    category: 'Calculators & Math',
    href: '/mathlify/',
    featured: true,
  },
  {
    name: 'Games',
    slug: 'games',
    emoji: '🎮',
    description: 'ArcadeLab — 17 browser games including WebRTC P2P multiplayer, 3D WebGL racing, and classic puzzles.',
    category: 'Gaming Playground',
    href: '/games/',
    featured: true,
  },
  {
    name: 'Rasoi',
    slug: 'rasoi',
    emoji: '🍛',
    description: 'Curated traditional Indian culinary recipes with portion scaling, nutrition calculations, and dietary filters.',
    category: 'Culinary Recipes',
    href: '/rasoi/',
    featured: false,
  },
  {
    name: 'Itihaas',
    slug: 'itihaas',
    emoji: '🇮🇳',
    description: 'Indian history, freedom struggle movements, dynastic chronologies, and historical leader profiles.',
    category: 'History & Heritage',
    href: '/itihaas/',
    featured: false,
  },
  {
    name: 'Vigyan',
    slug: 'vigyan',
    emoji: '🔬',
    description: 'Space missions, deep science, ISRO exploration milestones, scientific discoveries, and astronomy.',
    category: 'Science & Cosmos',
    href: '/vigyan/',
    featured: false,
  },
  {
    name: 'Yatra',
    slug: 'yatra',
    emoji: '🧭',
    description: 'Cultural travel itineraries, regional destinations, heritage trails, and adventure guides across India.',
    category: 'Travel & Destinations',
    href: '/yatra/',
    featured: false,
  },
];

export const techSkills: string[] = [
  'PHP',
  'Laravel',
  'Python',
  'Java',
  'Go',
  'WordPress',
  'HTML5',
  'CSS3',
  'JavaScript',
  'Tailwind CSS',
  'Livewire',
  'AWS',
  'Docker',
  'Kubernetes',
  'GitHub Actions',
  'PostgreSQL',
  'MySQL',
];

export const engineeringPillars: PillarItem[] = [
  {
    title: 'Clean Code',
    description: 'Maintainable architecture, tests, reviews, and documentation.',
  },
  {
    title: 'Performance',
    description: 'Fast loads, caching, CDN, compression, and Core Web Vitals.',
  },
  {
    title: 'Responsive',
    description: 'Mobile-first layouts across Chrome, Safari, Firefox, and Edge.',
  },
  {
    title: 'SEO First',
    description: 'Schema, metadata, crawl optimisation, sitemaps, and intent-led pages.',
  },
];

export const educationAndCommunity: EducationItem[] = [
  {
    title: 'B.Tech Computer Science',
    institution: 'Swami Vivekananda Institute of Science & Technology',
    period: 'April 2012 - June 2016',
    description: 'Swami Vivekananda Institute of Science & Technology, April 2012 - June 2016.',
  },
  {
    title: 'Community',
    institution: 'Google Developers Group',
    description: 'Google Developers Group active member since September 2019. AMCAT Certified Data Processing Specialist and IBM career challenge participant.',
  },
];

export const contacts: ContactItem[] = [
  {
    label: 'Email',
    value: 'sayandeepmajumdar.official@gmail.com',
    href: 'mailto:sayandeepmajumdar.official@gmail.com',
  },
  {
    label: 'Phone',
    value: '+91 82401 31911',
    href: 'tel:+918240131911',
  },
  {
    label: 'GitHub',
    value: 'github.com/sayandeepmajumdar',
    href: 'https://github.com/sayandeepmajumdar',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'connectwithsayandeep',
    href: 'https://www.linkedin.com/in/connectwithsayandeep/',
    external: true,
  },
];
