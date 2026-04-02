// Utility Functions

// Show loading spinner
function showLoading() {
    document.getElementById('loadingSpinner').classList.remove('hidden');
}

// Hide loading spinner
function hideLoading() {
    document.getElementById('loadingSpinner').classList.add('hidden');
}

// Show success modal
function showSuccess(title = 'Success!', message = 'Your resume has been generated successfully.') {
    document.getElementById('successTitle').textContent = title;
    document.getElementById('successMessage').textContent = message;
    document.getElementById('successModal').classList.remove('hidden');
}

// Close success modal
function closeSuccess() {
    document.getElementById('successModal').classList.add('hidden');
}

// Generate PDF from HTML
async function generatePDF(htmlContent, filename = 'resume.pdf') {
    showLoading();
    try {
        const element = document.createElement('div');
        element.innerHTML = htmlContent;
        
        const opt = {
            margin: 10,
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        await html2pdf().set(opt).from(element).save();
        
        hideLoading();
        showSuccess('PDF Downloaded!', 'Your resume has been downloaded successfully.');
    } catch (error) {
        hideLoading();
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
    }
}

// Generate Portfolio HTML
function generatePortfolioHTML(data) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.fullName} - Portfolio</title>
    <link href="https://cdn.tailwindcss.com" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        html { scroll-behavior: smooth; }
        .hero-gradient { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .section-title {
            position: relative;
            display: inline-block;
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
        }
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 50px;
            height: 4px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 2px;
        }
        .skill-badge {
            background: rgba(102, 126, 234, 0.1);
            border: 1px solid rgba(102, 126, 234, 0.5);
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            display: inline-block;
            margin: 0.5rem 0.5rem 0.5rem 0;
            transition: all 0.3s ease;
        }
        .skill-badge:hover {
            background: rgba(102, 126, 234, 0.3);
            transform: translateY(-2px);
        }
        .project-card {
            background: white;
            border-radius: 0.75rem;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        .project-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .nav-active { color: #667eea; font-weight: bold; }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: fadeInUp 0.6s ease-out; }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="sticky top-0 z-50 bg-white shadow-md">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    ${data.fullName}
                </span>
                <div class="hidden md:flex space-x-8">
                    <a href="#about" class="nav-link hover:text-indigo-600 transition">About</a>
                    <a href="#experience" class="nav-link hover:text-indigo-600 transition">Experience</a>
                    <a href="#skills" class="nav-link hover:text-indigo-600 transition">Skills</a>
                    ${data.projects && data.projects.length > 0 ? `<a href="#projects" class="nav-link hover:text-indigo-600 transition">Projects</a>` : ''}
                    <a href="#contact" class="nav-link hover:text-indigo-600 transition">Contact</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-gradient text-white py-20 px-4">
        <div class="max-w-6xl mx-auto text-center animate-in">
            <h1 class="text-5xl md:text-6xl font-bold mb-4">${data.fullName}</h1>
            <p class="text-2xl md:text-3xl mb-6 opacity-90">${data.title || 'Professional'}</p>
            <p class="text-lg md:text-xl max-w-2xl mx-auto opacity-80">${data.summary || 'Creating amazing solutions with passion and dedication.'}</p>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-16 px-4 bg-white">
        <div class="max-w-6xl mx-auto">
            <h2 class="section-title">About Me</h2>
            <div class="mt-8 grid md:grid-cols-2 gap-8 animate-in">
                <div>
                    <p class="text-gray-600 leading-relaxed text-lg">${data.summary || 'Professional with comprehensive experience in delivering high-quality solutions.'}</p>
                </div>
                <div class="space-y-3">
                    ${data.email ? `<p class="text-gray-700"><strong>Email:</strong> ${data.email}</p>` : ''}
                    ${data.phone ? `<p class="text-gray-700"><strong>Phone:</strong> ${data.phone}</p>` : ''}
                    ${data.location ? `<p class="text-gray-700"><strong>Location:</strong> ${data.location}</p>` : ''}
                    ${data.linkedin ? `<p class="text-gray-700"><strong>LinkedIn:</strong> <a href="${data.linkedin}" class="text-indigo-600 hover:underline">${data.linkedin}</a></p>` : ''}
                    ${data.website ? `<p class="text-gray-700"><strong>Website:</strong> <a href="${data.website}" class="text-indigo-600 hover:underline">${data.website}</a></p>` : ''}
                </div>
            </div>
        </div>
    </section>

    ${data.experience && data.experience.length > 0 ? `
    <!-- Experience Section -->
    <section id="experience" class="py-16 px-4 bg-gray-50">
        <div class="max-w-6xl mx-auto">
            <h2 class="section-title">Work Experience</h2>
            <div class="mt-8 space-y-6 animate-in">
                ${data.experience.map((exp, idx) => `
                    <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <h3 class="text-xl font-bold text-gray-800">${exp.position}</h3>
                                <p class="text-indigo-600 font-semibold">${exp.company}</p>
                            </div>
                            <span class="text-gray-500 text-sm">${exp.startDate} - ${exp.endDate}</span>
                        </div>
                        <p class="text-gray-600 mt-3">${exp.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${data.education && data.education.length > 0 ? `
    <!-- Education Section -->
    <section class="py-16 px-4 bg-white">
        <div class="max-w-6xl mx-auto">
            <h2 class="section-title">Education</h2>
            <div class="mt-8 space-y-6 animate-in">
                ${data.education.map((edu, idx) => `
                    <div class="bg-gray-50 p-6 rounded-lg border-l-4 border-indigo-600">
                        <h3 class="text-xl font-bold text-gray-800">${edu.degree}</h3>
                        <p class="text-indigo-600 font-semibold">${edu.school}</p>
                        <div class="flex justify-between text-sm text-gray-600 mt-2">
                            <span>${edu.field}</span>
                            <span>${edu.graduationYear}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Skills Section -->
    <section id="skills" class="py-16 px-4 bg-gray-50">
        <div class="max-w-6xl mx-auto">
            <h2 class="section-title">Skills</h2>
            <div class="mt-8 flex flex-wrap animate-in">
                ${data.skills && data.skills.length > 0 ? data.skills.map(skill => `
                    <div class="skill-badge">${skill}</div>
                `).join('') : '<p class="text-gray-600">No skills listed yet.</p>'}
            </div>
        </div>
    </section>

    ${data.projects && data.projects.length > 0 ? `
    <!-- Projects Section -->
    <section id="projects" class="py-16 px-4 bg-white">
        <div class="max-w-6xl mx-auto">
            <h2 class="section-title">Projects</h2>
            <div class="mt-8 grid md:grid-cols-2 gap-8 animate-in">
                ${data.projects.map((proj, idx) => `
                    <div class="project-card">
                        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                            <h3 class="text-xl font-bold">${proj.title}</h3>
                        </div>
                        <div class="p-6">
                            <p class="text-gray-600 mb-4">${proj.description}</p>
                            ${proj.link ? `<a href="${proj.link}" class="text-indigo-600 hover:text-purple-600 font-semibold transition">View Project →</a>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Contact Section -->
    <section id="contact" class="py-16 px-4 hero-gradient text-white">
        <div class="max-w-6xl mx-auto text-center animate-in">
            <h2 class="text-3xl font-bold mb-8">Let's Connect</h2>
            <p class="text-lg mb-8 opacity-90">Interested in working together or just want to chat? Feel free to reach out!</p>
            <div class="flex justify-center gap-6">
                ${data.email ? `<a href="mailto:${data.email}" class="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"><i class="fas fa-envelope"></i> Email Me</a>` : ''}
                ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" class="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"><i class="fab fa-linkedin"></i> LinkedIn</a>` : ''}
                ${data.website ? `<a href="${data.website}" target="_blank" class="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"><i class="fas fa-globe"></i> Website</a>` : ''}
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8 px-4">
        <div class="max-w-6xl mx-auto text-center">
            <p>© 2024 ${data.fullName}. Created with <i class="fas fa-heart text-red-500"></i> using AI Resume Builder.</p>
        </div>
    </footer>
</body>
</html>
    `;
}

// Download portfolio as HTML
function downloadPortfolioHTML(portfolioHTML) {
    const blob = new Blob([portfolioHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// AI Suggestions Engine (Simulated)
const aiSuggestions = {
    skills: [
        { current: 'JavaScript', suggestion: 'JavaScript, ES6, React, Node.js' },
        { current: 'Python', suggestion: 'Python, Django, Flask, Data Science' },
        { current: 'Java', suggestion: 'Java, Spring Boot, Microservices' },
        { current: 'CSS', suggestion: 'CSS, Responsive Design, Tailwind CSS' },
        { current: 'Project Management', suggestion: 'Project Management, Agile, Scrum, Leadership' }
    ],

    summary: [
        'Passionate developer with expertise in full-stack development and creating user-centric solutions.',
        'Results-driven professional with proven track record in delivering high-impact projects.',
        'Creative problem-solver committed to writing clean, maintainable code and best practices.',
        'Detail-oriented professional with strong communication skills and collaborative team approach.',
        'Innovative thinker who stays updated with latest technologies and industry trends.'
    ],

    jobDescriptions: {
        softwware_engineer: 'Developed robust web applications using modern technologies. Collaborated with cross-functional teams to deliver scalable solutions on time and within budget.',
        project_manager: 'Led project execution from conception through delivery. Managed stakeholder expectations and ensured 100% on-time project completion.',
        designer: 'Created compelling user interfaces and experiences that increased user engagement and satisfaction.',
        marketing: 'Crafted marketing strategies that resulted in significant brand awareness and customer acquisition.'
    }
};

// Get AI Suggestions
function getAISuggestions(fieldType, currentValue) {
    if (fieldType === 'skills' && currentValue) {
        for (let suggestion of aiSuggestions.skills) {
            if (suggestion.current.toLowerCase() === currentValue.toLowerCase()) {
                return suggestion.suggestion;
            }
        }
        return currentValue;
    }
    if (fieldType === 'summary') {
        return aiSuggestions.summary[Math.floor(Math.random() * aiSuggestions.summary.length)];
    }
    return null;
}

// Local Storage Methods
const Storage = {
    save: (data) => {
        localStorage.setItem('resumeData', JSON.stringify(data));
    },
    
    load: () => {
        const data = localStorage.getItem('resumeData');
        return data ? JSON.parse(data) : getEmptyData();
    },
    
    clear: () => {
        localStorage.removeItem('resumeData');
    }
};

// Empty data structure
function getEmptyData() {
    return {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        title: '',
        summary: '',
        linkedin: '',
        website: '',
        education: [],
        experience: [],
        skills: [],
        projects: []
    };
}
