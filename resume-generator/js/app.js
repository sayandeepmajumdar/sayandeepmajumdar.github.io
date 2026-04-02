// Main Application Logic

const app = {
    currentStep: 0,
    data: getEmptyData(),
    totalSteps: 6,

    // Initialize app
    init() {
        this.data = Storage.load();
        this.render();
        this.attachEventListeners();
    },

    // Attach event listeners
    attachEventListeners() {
        // Template selection
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', (e) => {
                document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                const input = card.querySelector('input');
                input.checked = true;
            });
        });

        // Form field changes - auto-save
        document.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('change', () => this.saveFormData());
            field.addEventListener('blur', () => this.saveFormData());
        });

        // Render education and experience on init
        this.renderEducation();
        this.renderExperience();
        this.renderSkills();
        this.renderProjects();

        // Add initial education entry if none exists
        if (this.data.education.length === 0) {
            this.addEducation();
        }

        // Add initial experience entry if none exists
        if (this.data.experience.length === 0) {
            this.addExperience();
        }

        // Add initial project entry if none exists
        if (this.data.projects.length === 0) {
            this.addProject();
        }

        this.updateProgress();
    },

    // Save form data
    saveFormData() {
        const formElements = document.querySelectorAll('[name]');
        formElements.forEach(element => {
            if (element.type === 'radio') {
                if (element.checked) {
                    this.data[element.name] = element.value;
                }
            } else if (element.type === 'checkbox') {
                this.data[element.name] = element.checked;
            } else {
                this.data[element.name] = element.value;
            }
        });
        Storage.save(this.data);
        this.updateProgress();
    },

    // Update progress bar
    updateProgress() {
        let filledFields = 0;
        const totalFields = 8;

        if (this.data.fullName) filledFields++;
        if (this.data.email) filledFields++;
        if (this.data.phone) filledFields++;
        if (this.data.title) filledFields++;
        if (this.data.summary) filledFields++;
        if (this.data.education.length > 0) filledFields++;
        if (this.data.experience.length > 0) filledFields++;
        if (this.data.skills.length > 0) filledFields++;

        const percentage = Math.round((filledFields / totalFields) * 100);
        document.getElementById('progressPercent').textContent = percentage + '%';
        document.getElementById('progressBar').style.width = percentage + '%';
    },

    // Render input fields from data
    render() {
        // Personal info
        document.querySelector('input[name="fullName"]').value = this.data.fullName || '';
        document.querySelector('input[name="email"]').value = this.data.email || '';
        document.querySelector('input[name="phone"]').value = this.data.phone || '';
        document.querySelector('input[name="location"]').value = this.data.location || '';
        document.querySelector('input[name="title"]').value = this.data.title || '';
        document.querySelector('textarea[name="summary"]').value = this.data.summary || '';
        document.querySelector('input[name="linkedin"]').value = this.data.linkedin || '';
        document.querySelector('input[name="website"]').value = this.data.website || '';
    },

    // Add education entry
    addEducation() {
        const newEducation = {
            degree: '',
            school: '',
            field: '',
            graduationYear: new Date().getFullYear().toString(),
            id: Date.now()
        };
        this.data.education.push(newEducation);
        Storage.save(this.data);
        this.renderEducation();
    },

    // Render education list
    renderEducation() {
        const container = document.getElementById('educationList');
        container.innerHTML = this.data.education.map((edu, idx) => `
            <div class="entry-card">
                <button type="button" class="remove-btn" onclick="app.removeEducation(${idx})" title="Remove">
                    <i class="fas fa-trash"></i>
                </button>
                <div class="space-y-3">
                    <input type="text" placeholder="Bachelor of Science" class="input-field w-full" value="${edu.degree || ''}" 
                           onchange="app.updateEducation(${idx}, 'degree', this.value)">
                    <input type="text" placeholder="University Name" class="input-field w-full" value="${edu.school || ''}"
                           onchange="app.updateEducation(${idx}, 'school', this.value)">
                    <input type="text" placeholder="Computer Science" class="input-field w-full" value="${edu.field || ''}"
                           onchange="app.updateEducation(${idx}, 'field', this.value)">
                    <input type="text" placeholder="2024" class="input-field w-full" value="${edu.graduationYear || ''}"
                           onchange="app.updateEducation(${idx}, 'graduationYear', this.value)">
                </div>
            </div>
        `).join('');
    },

    // Update education field
    updateEducation(idx, field, value) {
        this.data.education[idx][field] = value;
        Storage.save(this.data);
    },

    // Remove education entry
    removeEducation(idx) {
        this.data.education.splice(idx, 1);
        Storage.save(this.data);
        this.renderEducation();
    },

    // Add experience entry
    addExperience() {
        const newExperience = {
            position: '',
            company: '',
            startDate: '',
            endDate: '',
            description: '',
            id: Date.now()
        };
        this.data.experience.push(newExperience);
        Storage.save(this.data);
        this.renderExperience();
    },

    // Render experience list
    renderExperience() {
        const container = document.getElementById('experienceList');
        container.innerHTML = this.data.experience.map((exp, idx) => `
            <div class="entry-card">
                <button type="button" class="remove-btn" onclick="app.removeExperience(${idx})" title="Remove">
                    <i class="fas fa-trash"></i>
                </button>
                <div class="space-y-3">
                    <input type="text" placeholder="Senior Software Engineer" class="input-field w-full" value="${exp.position || ''}"
                           onchange="app.updateExperience(${idx}, 'position', this.value)">
                    <input type="text" placeholder="Company Name" class="input-field w-full" value="${exp.company || ''}"
                           onchange="app.updateExperience(${idx}, 'company', this.value)">
                    <div class="grid md:grid-cols-2 gap-3">
                        <input type="text" placeholder="Start Date (e.g., Jan 2020)" class="input-field w-full" value="${exp.startDate || ''}"
                               onchange="app.updateExperience(${idx}, 'startDate', this.value)">
                        <input type="text" placeholder="End Date (e.g., Present)" class="input-field w-full" value="${exp.endDate || ''}"
                               onchange="app.updateExperience(${idx}, 'endDate', this.value)">
                    </div>
                    <textarea placeholder="Describe your responsibilities and achievements..." class="input-field w-full h-20 resize-none" 
                              onchange="app.updateExperience(${idx}, 'description', this.value)">${exp.description || ''}</textarea>
                </div>
            </div>
        `).join('');
    },

    // Update experience field
    updateExperience(idx, field, value) {
        this.data.experience[idx][field] = value;
        Storage.save(this.data);
    },

    // Remove experience entry
    removeExperience(idx) {
        this.data.experience.splice(idx, 1);
        Storage.save(this.data);
        this.renderExperience();
    },

    // Add skill
    addSkill() {
        const input = document.getElementById('skillInput');
        const skill = input.value.trim();

        if (!skill) {
            alert('Please enter a skill');
            return;
        }

        if (this.data.skills.includes(skill)) {
            alert('This skill already exists');
            return;
        }

        this.data.skills.push(skill);
        Storage.save(this.data);
        input.value = '';
        this.renderSkills();
    },

    // Render skills
    renderSkills() {
        const container = document.getElementById('skillsList');
        if (this.data.skills.length === 0) {
            container.innerHTML = '<p class="text-gray-400">No skills added yet. Add your first skill above.</p>';
            return;
        }

        container.innerHTML = `
            <div class="flex flex-wrap gap-2">
                ${this.data.skills.map((skill, idx) => `
                    <div class="skill-tag">
                        ${skill}
                        <span class="remove-skill" onclick="app.removeSkill(${idx})">&times;</span>
                    </div>
                `).join('')}
            </div>
        `;
    },

    // Remove skill
    removeSkill(idx) {
        this.data.skills.splice(idx, 1);
        Storage.save(this.data);
        this.renderSkills();
    },

    // Add project
    addProject() {
        const newProject = {
            title: '',
            description: '',
            link: '',
            id: Date.now()
        };
        this.data.projects.push(newProject);
        Storage.save(this.data);
        this.renderProjects();
    },

    // Render projects
    renderProjects() {
        const container = document.getElementById('projectsList');
        container.innerHTML = this.data.projects.map((proj, idx) => `
            <div class="entry-card">
                <button type="button" class="remove-btn" onclick="app.removeProject(${idx})" title="Remove">
                    <i class="fas fa-trash"></i>
                </button>
                <div class="space-y-3">
                    <input type="text" placeholder="Project Title" class="input-field w-full" value="${proj.title || ''}"
                           onchange="app.updateProject(${idx}, 'title', this.value)">
                    <textarea placeholder="Project description and your role..." class="input-field w-full h-20 resize-none"
                              onchange="app.updateProject(${idx}, 'description', this.value)">${proj.description || ''}</textarea>
                    <input type="url" placeholder="Project link (optional)" class="input-field w-full" value="${proj.link || ''}"
                           onchange="app.updateProject(${idx}, 'link', this.value)">
                </div>
            </div>
        `).join('');
    },

    // Update project field
    updateProject(idx, field, value) {
        this.data.projects[idx][field] = value;
        Storage.save(this.data);
    },

    // Remove project
    removeProject(idx) {
        this.data.projects.splice(idx, 1);
        Storage.save(this.data);
        this.renderProjects();
    },

    // Navigate steps
    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showStep(this.currentStep);
        }
    },

    nextStep() {
        this.saveFormData();
        if (this.currentStep < this.totalSteps - 1) {
            this.currentStep++;
            this.showStep(this.currentStep);
        }
    },

    // Show specific step
    showStep(stepIndex) {
        this.saveFormData();

        // Hide all steps
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
        });

        // Show current step
        document.querySelectorAll('.form-step')[stepIndex].classList.add('active');

        // Update step indicators
        document.querySelectorAll('.step-indicator').forEach((indicator, idx) => {
            if (idx <= stepIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });

        // Update button text
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        prevBtn.style.display = stepIndex === 0 ? 'none' : 'flex';
        if (stepIndex === this.totalSteps - 1) {
            nextBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Complete';
            nextBtn.onclick = () => this.completeResume();
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right ml-2"></i>';
            nextBtn.onclick = () => this.nextStep();
        }

        // Scroll to top
        document.querySelector('form').scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    // Complete resume
    completeResume() {
        this.saveFormData();
        this.showSuccess('Resume Created!', 'Your resume is ready. Download or generate your portfolio now!');
    },

    // Preview resume
    previewResume() {
        this.saveFormData();
        const template = document.querySelector('input[name="template"]:checked')?.value || 'modern';
        const templateFunc = templates[template];
        const resumeHTML = templateFunc.render(this.data);

        const modal = document.getElementById('previewModal');
        document.getElementById('previewContent').innerHTML = resumeHTML;
        modal.classList.remove('hidden');
    },

    // Close preview
    closePreview() {
        document.getElementById('previewModal').classList.add('hidden');
    },

    // Download PDF
    async downloadPDF() {
        this.saveFormData();
        const template = document.querySelector('input[name="template"]:checked')?.value || 'modern';
        const templateFunc = templates[template];
        const resumeHTML = templateFunc.render(this.data);

        await generatePDF(resumeHTML, `${this.data.fullName || 'Resume'}.pdf`);
    },

    // Generate portfolio
    generatePortfolio() {
        this.saveFormData();
        showLoading();

        setTimeout(() => {
            hideLoading();
            const portfolioHTML = generatePortfolioHTML(this.data);
            downloadPortfolioHTML(portfolioHTML);
            showSuccess('Portfolio Generated!', 'Your portfolio website has been generated and downloaded.');
        }, 1000);
    },

    // Generate AI suggestions
    generateAISuggestions() {
        showLoading();

        setTimeout(() => {
            hideLoading();
            
            // Get suggestions for summary
            const summaryInput = document.querySelector('textarea[name="summary"]');
            const suggestedSummary = getAISuggestions('summary', summaryInput.value);
            
            if (confirm('Would you like to use this AI-suggested professional summary?\n\n' + suggestedSummary)) {
                summaryInput.value = suggestedSummary;
                this.saveFormData();
                showSuccess('Summary Updated!', 'Your professional summary has been enhanced.');
            }
        }, 1500);
    },

    // Save draft
    saveDraft() {
        this.saveFormData();
        showSuccess('Draft Saved!', 'Your resume data has been saved locally. You can continue editing anytime.');
    },

    // Load draft
    loadDraft() {
        this.data = Storage.load();
        this.render();
        this.renderEducation();
        this.renderExperience();
        this.renderSkills();
        this.renderProjects();
    },

    // Show landing page
    showLanding() {
        document.getElementById('landing').classList.remove('hidden');
        document.getElementById('builder').classList.add('hidden');
    },

    // Show builder page
    showBuilder() {
        document.getElementById('landing').classList.add('hidden');
        document.getElementById('builder').classList.remove('hidden');
    },

    // Close success modal
    closeSuccess() {
        document.getElementById('successModal').classList.add('hidden');
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

// Prevent accidental page unload if there's unsaved data
window.addEventListener('beforeunload', (e) => {
    const hasData = app.data.fullName || app.data.email || app.data.skills.length > 0;
    if (hasData) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// Allow Enter key in skill input
document.addEventListener('keypress', (e) => {
    if (e.target.id === 'skillInput' && e.key === 'Enter') {
        e.preventDefault();
        app.addSkill();
    }
});
