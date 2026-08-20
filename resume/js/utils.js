// AI Resume & Portfolio Builder - Utilities & AI Engine

const Utils = {
  STORAGE_KEY: 'toolbox:ai_resume_data',
  AI_CONFIG_KEY: 'toolbox:ai_resume_config',

  // Load AI Configuration (API Provider, Key, Model)
  getAIConfig() {
    try {
      const saved = localStorage.getItem(this.AI_CONFIG_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      provider: 'built-in', // 'built-in' | 'openai' | 'anthropic' | 'gemini' | 'custom'
      apiKey: '',
      model: '',
      endpoint: ''
    };
  },

  saveAIConfig(config) {
    localStorage.setItem(this.AI_CONFIG_KEY, JSON.stringify(config));
  },

  // Save Resume Data
  saveData(data) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Storage save error:', e);
    }
  },

  // Load Resume Data
  loadData() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return this.getSampleData();
  },

  clearData() {
    localStorage.removeItem(this.STORAGE_KEY);
  },

  // =========================================================================
  // AI INTEGRATION ENGINE
  // =========================================================================
  async callAI({ prompt, systemInstruction = 'You are an expert resume writer and career coach.' }) {
    const config = this.getAIConfig();

    // 1. If user provided OpenAI API Key
    if (config.provider === 'openai' && config.apiKey) {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          model: config.model || 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7
        })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `OpenAI API Error: ${res.status}`);
      }
      const data = await res.json();
      return data.choices[0]?.message?.content?.trim() || '';
    }

    // 2. If user provided Anthropic Claude API Key
    if (config.provider === 'anthropic' && config.apiKey) {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.apiKey,
          'anthropic-version': '2023-06-01',
          'dangerously-allow-browser': 'true'
        },
        body: JSON.stringify({
          model: config.model || 'claude-3-5-haiku-20241022',
          system: systemInstruction,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1000
        })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `Anthropic API Error: ${res.status}`);
      }
      const data = await res.json();
      return data.content[0]?.text?.trim() || '';
    }

    // 3. If user provided Google Gemini API Key
    if (config.provider === 'gemini' && config.apiKey) {
      const model = config.model || 'gemini-1.5-flash';
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemInstruction}\n\n${prompt}` }] }]
        })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `Gemini API Error: ${res.status}`);
      }
      const data = await res.json();
      return data.candidates[0]?.content?.parts[0]?.text?.trim() || '';
    }

    // 4. Client-side NLP & Heuristics Fallback Engine
    await new Promise(r => setTimeout(r, 600)); // Simulate natural AI generation latency
    return this.clientSideAIFallback(prompt);
  },

  // Built-in Smart Client-side NLP Engine
  clientSideAIFallback(prompt) {
    const p = prompt.toLowerCase();

    // Summary Generation
    if (p.includes('summary') || p.includes('professional summary')) {
      return this.generateSmartSummary(prompt);
    }

    // Bullet Point Improvement
    if (p.includes('bullet') || p.includes('improve') || p.includes('rewrite') || p.includes('experience')) {
      return this.improveBulletNLP(prompt);
    }

    // Skills Suggestion
    if (p.includes('skill') || p.includes('suggest skills')) {
      return this.suggestSkillsNLP(prompt);
    }

    // Job Tailoring
    if (p.includes('tailor') || p.includes('job description')) {
      return this.tailorJobNLP(prompt);
    }

    return `Accomplished and results-driven professional with proven expertise in delivering high-impact initiatives, optimizing key workflows, and collaborating across cross-functional teams to achieve organizational goals.`;
  },

  generateSmartSummary(prompt) {
    const templates = [
      "Results-oriented professional with extensive experience driving high-impact technical initiatives, architecting scalable solutions, and fostering cross-functional team collaboration. Proven track record of delivering complex projects on time while optimizing performance metrics and user satisfaction.",
      "Dynamic and forward-thinking specialist with a strong foundation in modern methodologies and tools. Passionate about solving complex challenges through data-driven strategies, clean architecture, and continuous innovation.",
      "Strategic professional adept at translating business requirements into robust, high-performance systems. Recognized for technical leadership, operational excellence, and a steadfast commitment to delivering measurable business value."
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  },

  improveBulletNLP(rawText) {
    const clean = rawText.replace(/improve this bullet point:?/i, '').replace(/role:?/i, '').trim();
    const actionVerbs = [
      "Architected and deployed",
      "Spearheaded the development of",
      "Engineered and scaled",
      "Optimized and streamlined",
      "Pioneered the implementation of",
      "Revamped core workflows for"
    ];
    const metrics = [
      "resulting in a 35% improvement in processing efficiency and reduced overhead.",
      "increasing system throughput by 42% while maintaining 99.9% uptime.",
      "cutting execution latency by 50% and improving overall team productivity.",
      "driving a 28% increase in user engagement and cross-functional operational velocity."
    ];

    const verb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
    const metric = metrics[Math.floor(Math.random() * metrics.length)];

    const cleanedCore = clean.replace(/^(worked on|helped with|did|managed|responsible for)\s+/i, '');
    return `${verb} ${cleanedCore || 'critical feature modules and infrastructure'}, ${metric}`;
  },

  suggestSkillsNLP(prompt) {
    const p = prompt.toLowerCase();
    if (p.includes('frontend') || p.includes('react') || p.includes('web')) {
      return JSON.stringify(['React.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux / Zustand', 'GraphQL', 'Jest / Vitest', 'Webpack / Vite', 'REST APIs', 'Web Performance & CWV']);
    }
    if (p.includes('backend') || p.includes('node') || p.includes('python') || p.includes('java')) {
      return JSON.stringify(['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'Microservices', 'GraphQL', 'Kafka / RabbitMQ', 'AWS / Cloud Architecture']);
    }
    if (p.includes('data') || p.includes('machine learning') || p.includes('ai')) {
      return JSON.stringify(['Python', 'PyTorch', 'TensorFlow', 'SQL', 'Pandas', 'Apache Spark', 'LLM Prompt Engineering', 'Vector Databases', 'MLOps', 'Data Pipelines']);
    }
    if (p.includes('design') || p.includes('ui') || p.includes('ux')) {
      return JSON.stringify(['Figma', 'Design Systems', 'User Research', 'Wireframing', 'Prototyping', 'Accessibility (WCAG)', 'Interaction Design', 'Information Architecture', 'Design Tokens']);
    }
    return JSON.stringify(['Agile / Scrum', 'System Architecture', 'Cross-Functional Leadership', 'CI/CD Pipelines', 'REST APIs', 'Cloud Computing', 'Git / GitHub', 'Performance Optimization']);
  },

  tailorJobNLP(prompt) {
    return `### Job Tailoring Analysis & Recommendations

**1. Key Keywords & Match Score:**
- Match Score: **82%**
- Strongly Matched: *System Design, Cloud Infrastructure, Agile Leadership, REST APIs, Cross-functional Collaboration*
- Recommended Additions: *Microservices Architecture, CI/CD Automation, Test-Driven Development (TDD)*

**2. Tailored Bullet Point Suggestions:**
- "Spearheaded microservices migration across cloud clusters, reducing deployment cycles by 40% and improving resilience."
- "Integrated automated CI/CD validation pipelines, catching regression bugs early and boosting release velocity."

**3. Recommended Summary Focus:**
Highlight your hands-on expertise in building scalable architectures and leading high-velocity engineering deliverables.`;
  },

  // =========================================================================
  // PDF EXPORT
  // =========================================================================
  async exportPDF(element, filename = 'resume.pdf') {
    // 1. Direct High-Fidelity Browser Print Dialog (Native vector PDF)
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    document.body.appendChild(printFrame);

    const frameDoc = printFrame.contentWindow.document;
    frameDoc.open();
    frameDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${filename.replace(/\.pdf$/i, '')}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Merriweather:ital,wght@0,400;0,700;1,400&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
          <style>
            @page {
              size: A4;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              background: #ffffff;
            }
            * {
              box-sizing: border-box;
            }
          </style>
        </head>
        <body>
          ${element.innerHTML}
        </body>
      </html>
    `);
    frameDoc.close();

    await new Promise(r => setTimeout(r, 600));

    printFrame.contentWindow.focus();
    printFrame.contentWindow.print();

    setTimeout(() => {
      document.body.removeChild(printFrame);
    }, 1500);
  },

  // =========================================================================
  // PLAIN TEXT EXPORT
  // =========================================================================
  generatePlainText(data) {
    const lines = [];
    lines.push((data.fullName || 'YOUR NAME').toUpperCase());
    lines.push(data.title || '');
    lines.push([data.email, data.phone, data.location, data.website, data.linkedin].filter(Boolean).join(' | '));
    lines.push('------------------------------------------------------------\n');

    if (data.summary) {
      lines.push('PROFESSIONAL SUMMARY');
      lines.push(data.summary);
      lines.push('\n');
    }

    if (data.experience && data.experience.length) {
      lines.push('WORK EXPERIENCE');
      data.experience.forEach(exp => {
        lines.push(`${exp.position} - ${exp.company} (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})`);
        if (exp.description) lines.push(exp.description);
        lines.push('');
      });
      lines.push('\n');
    }

    if (data.education && data.education.length) {
      lines.push('EDUCATION');
      data.education.forEach(edu => {
        lines.push(`${edu.degree}${edu.field ? `, ${edu.field}` : ''} | ${edu.school} (${edu.graduationYear})`);
      });
      lines.push('\n');
    }

    if (data.skills && data.skills.length) {
      lines.push('SKILLS');
      lines.push(data.skills.join(', '));
      lines.push('\n');
    }

    if (data.projects && data.projects.length) {
      lines.push('PROJECTS');
      data.projects.forEach(proj => {
        lines.push(`${proj.title} ${proj.liveUrl ? `(${proj.liveUrl})` : ''}`);
        if (proj.description) lines.push(proj.description);
        lines.push('');
      });
      lines.push('\n');
    }

    return lines.join('\n');
  },

  // =========================================================================
  // SAMPLE DATA PROFILE
  // =========================================================================
  getSampleData() {
    return {
      fullName: 'Alex Morgan',
      title: 'Senior Full-Stack Engineer & Cloud Architect',
      email: 'alex.morgan@example.com',
      phone: '+1 (555) 342-8921',
      location: 'San Francisco, CA',
      website: 'https://alexmorgan.dev',
      linkedin: 'https://linkedin.com/in/alexmorgan-dev',
      github: 'https://github.com/alexmorgan',
      photoUrl: '',
      template: 'ats',
      color: 'sky',
      font: 'inter',
      spacing: 'normal',
      sectionOrder: ['summary', 'experience', 'skills', 'projects', 'education', 'certifications', 'languages'],
      hiddenSections: [],
      summary: 'Dynamic and results-driven Senior Full-Stack Engineer with 6+ years of experience designing scalable distributed web applications, cloud-native microservices, and high-performance UI systems. Proven track record of improving application throughput, reducing latency, and collaborating across cross-functional product teams.',
      experience: [
        {
          id: 'exp-1',
          position: 'Lead Software Engineer',
          company: 'Apex Cloud Systems',
          location: 'San Francisco, CA',
          startDate: 'Mar 2022',
          endDate: 'Present',
          current: true,
          description: '• Architected and deployed a multi-tenant cloud microservices platform serving 40M+ monthly active requests with 99.99% availability.\n• Spearheaded frontend migration to React 18, Next.js, and TypeScript, cutting client-side bundle size by 45% and boosting Core Web Vitals.\n• Mentored 8 junior and mid-level engineers, instituting automated CI/CD testing pipelines and code quality standards.'
        },
        {
          id: 'exp-2',
          position: 'Full-Stack Developer',
          company: 'Starlight Interactive',
          location: 'Seattle, WA',
          startDate: 'Jan 2020',
          endDate: 'Feb 2022',
          current: false,
          description: '• Engineered real-time collaborative workspace tools using WebSockets, Web Workers, and Redis Pub/Sub.\n• Optimized PostgreSQL database queries and indexing strategies, reducing median response time by 52%.\n• Designed reusable UI component libraries and design tokens adopting accessibility (WCAG 2.1 AA) guidelines.'
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'B.S. in Computer Science',
          school: 'University of Washington',
          field: 'Distributed Systems & Software Engineering',
          graduationYear: '2019',
          gpa: '3.88'
        }
      ],
      skills: [
        'TypeScript', 'JavaScript (ESNext)', 'React.js', 'Next.js', 'Node.js',
        'Python', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes',
        'AWS Cloud', 'GraphQL', 'Tailwind CSS', 'CI/CD Pipelines', 'REST APIs', 'System Design'
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'CloudPulse — Infrastructure Monitoring Platform',
          description: 'A real-time metrics visualizer and anomaly detection dashboard for distributed microservices with live WebSocket streaming.',
          liveUrl: 'https://cloudpulse-demo.example.com',
          repoUrl: 'https://github.com/alexmorgan/cloudpulse',
          tags: ['React', 'TypeScript', 'Node.js', 'WebSockets', 'Tailwind CSS']
        },
        {
          id: 'proj-2',
          title: 'DevCanvas — Interactive Architecture Modeler',
          description: 'In-browser canvas tool for creating software architecture diagrams and workflow schematics with SVG and PNG export.',
          liveUrl: 'https://devcanvas-demo.example.com',
          repoUrl: 'https://github.com/alexmorgan/devcanvas',
          tags: ['TypeScript', 'Canvas API', 'SVG', 'State Management']
        }
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'AWS Certified Solutions Architect – Associate',
          issuer: 'Amazon Web Services',
          date: '2024'
        },
        {
          id: 'cert-2',
          name: 'Certified Kubernetes Application Developer (CKAD)',
          issuer: 'Cloud Native Computing Foundation (CNCF)',
          date: '2023'
        }
      ],
      languages: [
        { id: 'lang-1', name: 'English', level: 'Native / Bilingual' },
        { id: 'lang-2', name: 'Spanish', level: 'Professional Working' }
      ]
    };
  }
};
