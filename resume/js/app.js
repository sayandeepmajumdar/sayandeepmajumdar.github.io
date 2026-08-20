// AI Resume & Portfolio Builder - Main Application Controller

const App = {
  data: {},
  activeMode: 'resume', // 'resume' | 'portfolio'
  activeSection: 'personal',
  pendingAIAction: null,

  // Initialize
  init() {
    this.data = Utils.loadData();
    this.bindDOM();
    this.renderForm();
    this.renderPreview();
    this.setupEventListeners();
  },

  bindDOM() {
    // Mode Switcher
    this.btnModeResume = document.getElementById('btn-mode-resume');
    this.btnModePortfolio = document.getElementById('btn-mode-portfolio');

    // Controls
    this.selectTemplate = document.getElementById('select-template');
    this.selectFont = document.getElementById('select-font');
    this.selectSpacing = document.getElementById('select-spacing');
    this.colorPaletteContainer = document.getElementById('color-palette-container');

    // Action Buttons
    this.btnExportPdf = document.getElementById('btn-export-pdf');
    this.btnExportPortfolio = document.getElementById('btn-export-portfolio');
    this.btnCopyText = document.getElementById('btn-copy-text');
    this.btnAiSettings = document.getElementById('btn-ai-settings');
    this.btnTailorJob = document.getElementById('btn-tailor-job');
    this.btnImportExport = document.getElementById('btn-import-export');
    this.btnResetSample = document.getElementById('btn-reset-sample');
    this.btnClearData = document.getElementById('btn-clear-data');

    // Mobile View Tabs & Panes
    this.tabBtnForm = document.getElementById('tab-btn-form');
    this.tabBtnPreview = document.getElementById('tab-btn-preview');
    this.paneForm = document.getElementById('pane-form');
    this.panePreview = document.getElementById('pane-preview');

    // Preview Container
    this.previewViewport = document.getElementById('preview-viewport');
    this.previewFrame = document.getElementById('preview-frame');
    this.previewModeLabel = document.getElementById('preview-mode-label');

    // AI Review Modal
    this.modalAiReview = document.getElementById('modal-ai-review');
    this.aiOriginalText = document.getElementById('ai-original-text');
    this.aiSuggestedText = document.getElementById('ai-suggested-text');
    this.btnAcceptAi = document.getElementById('btn-accept-ai');
    this.btnDiscardAi = document.getElementById('btn-discard-ai');
    this.btnCloseAiModal = document.getElementById('btn-close-ai-modal');

    // AI Settings Modal
    this.modalAiSettings = document.getElementById('modal-ai-settings');
    this.selectAiProvider = document.getElementById('select-ai-provider');
    this.inputAiApiKey = document.getElementById('input-ai-api-key');
    this.inputAiModel = document.getElementById('input-ai-model');
    this.btnSaveAiSettings = document.getElementById('btn-save-ai-settings');
    this.btnCloseAiSettings = document.getElementById('btn-close-ai-settings');

    // Job Tailor Modal
    this.modalJobTailor = document.getElementById('modal-job-tailor');
    this.inputJobDescription = document.getElementById('input-job-description');
    this.btnRunJobTailor = document.getElementById('btn-run-job-tailor');
    this.jobTailorResults = document.getElementById('job-tailor-results');
    this.btnCloseJobTailor = document.getElementById('btn-close-job-tailor');

    // Import/Export Modal
    this.modalImportExport = document.getElementById('modal-import-export');
    this.textareaJsonData = document.getElementById('textarea-json-data');
    this.btnDownloadJson = document.getElementById('btn-download-json');
    this.btnApplyJson = document.getElementById('btn-apply-json');
    this.inputFileJson = document.getElementById('input-file-json');
    this.btnCloseImportExport = document.getElementById('btn-close-import-export');

    // Toast
    this.toast = document.getElementById('toast');
    this.toastMessage = document.getElementById('toast-message');
  },

  setupEventListeners() {
    // Mobile View Tab Switcher
    if (this.tabBtnForm && this.tabBtnPreview) {
      this.tabBtnForm.addEventListener('click', () => this.switchMobileTab('form'));
      this.tabBtnPreview.addEventListener('click', () => this.switchMobileTab('preview'));
    }

    // Mode Switcher
    this.btnModeResume.addEventListener('click', () => this.switchMode('resume'));
    this.btnModePortfolio.addEventListener('click', () => this.switchMode('portfolio'));

    // Design Customizer
    this.selectTemplate.addEventListener('change', (e) => {
      this.data.template = e.target.value;
      this.saveAndRender();
    });

    this.selectFont.addEventListener('change', (e) => {
      this.data.font = e.target.value;
      this.saveAndRender();
    });

    this.selectSpacing.addEventListener('change', (e) => {
      this.data.spacing = e.target.value;
      this.saveAndRender();
    });

    this.colorPaletteContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-color]');
      if (btn) {
        this.data.color = btn.dataset.color;
        this.updateColorPaletteActive();
        this.saveAndRender();
      }
    });

    // Exports
    this.btnExportPdf.addEventListener('click', () => {
      if (this.activeMode === 'portfolio') {
        this.downloadPortfolioFile();
      } else {
        Utils.exportPDF(this.previewFrame, `${this.data.fullName || 'Resume'}.pdf`);
      }
    });

    this.btnExportPortfolio.addEventListener('click', () => this.downloadPortfolioFile());

    this.btnCopyText.addEventListener('click', async () => {
      const text = Utils.generatePlainText(this.data);
      await navigator.clipboard.writeText(text);
      this.showToast('Resume plain text copied to clipboard!');
    });

    // Modals
    this.btnAiSettings.addEventListener('click', () => this.openAiSettings());
    this.btnCloseAiSettings.addEventListener('click', () => this.modalAiSettings.classList.add('hidden'));
    this.btnSaveAiSettings.addEventListener('click', () => this.saveAiSettings());

    this.btnTailorJob.addEventListener('click', () => this.modalJobTailor.classList.remove('hidden'));
    this.btnCloseJobTailor.addEventListener('click', () => this.modalJobTailor.classList.add('hidden'));
    this.btnRunJobTailor.addEventListener('click', () => this.runJobTailor());

    this.btnImportExport.addEventListener('click', () => this.openImportExport());
    this.btnCloseImportExport.addEventListener('click', () => this.modalImportExport.classList.add('hidden'));
    this.btnDownloadJson.addEventListener('click', () => this.downloadJsonFile());
    this.btnApplyJson.addEventListener('click', () => this.applyJsonFromTextarea());
    this.inputFileJson.addEventListener('change', (e) => this.handleJsonFileUpload(e));

    this.btnResetSample.addEventListener('click', () => {
      if (confirm('Load sample profile? This will replace your current edits with a comprehensive sample dataset.')) {
        this.data = Utils.getSampleData();
        this.saveAndRender();
        this.renderForm();
        this.showToast('Sample profile loaded!');
      }
    });

    this.btnClearData.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all data and start fresh?')) {
        this.data = {
          fullName: '', title: '', email: '', phone: '', location: '', website: '', linkedin: '', github: '',
          summary: '', experience: [], education: [], skills: [], projects: [], certifications: [], languages: [],
          template: 'ats', color: 'sky', font: 'inter', spacing: 'normal',
          sectionOrder: ['summary', 'experience', 'skills', 'projects', 'education', 'certifications', 'languages'],
          hiddenSections: []
        };
        this.saveAndRender();
        this.renderForm();
        this.showToast('Cleared all data.');
      }
    });

    // AI Review Modal Actions
    this.btnAcceptAi.addEventListener('click', () => this.applyAiSuggestion());
    this.btnDiscardAi.addEventListener('click', () => this.modalAiReview.classList.add('hidden'));
    this.btnCloseAiModal.addEventListener('click', () => this.modalAiReview.classList.add('hidden'));
  },

  switchMobileTab(tab) {
    if (!this.tabBtnForm || !this.tabBtnPreview || !this.paneForm || !this.panePreview) return;
    if (tab === 'preview') {
      this.tabBtnPreview.className = 'flex-1 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-center transition-all shadow-2xs';
      this.tabBtnForm.className = 'flex-1 py-1.5 rounded-xl text-theme-muted hover:text-theme-ink font-semibold text-center transition-all';
      this.paneForm.classList.add('hidden');
      this.panePreview.classList.remove('hidden');
    } else {
      this.tabBtnForm.className = 'flex-1 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-center transition-all shadow-2xs';
      this.tabBtnPreview.className = 'flex-1 py-1.5 rounded-xl text-theme-muted hover:text-theme-ink font-semibold text-center transition-all';
      this.paneForm.classList.remove('hidden');
      this.panePreview.classList.add('hidden');
    }
  },

  switchMode(mode) {
    this.activeMode = mode;
    if (mode === 'portfolio') {
      this.btnModePortfolio.className = 'px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-xs';
      this.btnModeResume.className = 'px-3 py-1.5 rounded-xl text-theme-muted hover:text-theme-ink font-semibold text-xs';
      this.previewModeLabel.innerText = 'Interactive Portfolio Preview';
    } else {
      this.btnModeResume.className = 'px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-xs';
      this.btnModePortfolio.className = 'px-3 py-1.5 rounded-xl text-theme-muted hover:text-theme-ink font-semibold text-xs';
      this.previewModeLabel.innerText = 'Live A4 Resume Preview';
    }
    this.renderPreview();
  },

  // Save data to localStorage & update preview
  saveAndRender() {
    Utils.saveData(this.data);
    this.renderPreview();
  },

  // Render Document Preview
  renderPreview() {
    if (!this.previewFrame) return;

    if (this.activeMode === 'portfolio') {
      const html = Templates.renderPortfolioHTML(this.data, this.data.color);
      this.previewFrame.innerHTML = `
        <div class="w-full h-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
          <iframe srcdoc="${escapeHtml(html)}" class="w-full h-[780px] border-0 rounded-2xl"></iframe>
        </div>
      `;
    } else {
      const html = Templates.renderResume(this.data, {
        template: this.data.template,
        color: this.data.color,
        font: this.data.font,
        spacing: this.data.spacing
      });
      this.previewFrame.innerHTML = `
        <div class="resume-sheet bg-white text-slate-900 shadow-2xl rounded-sm mx-auto overflow-hidden transition-all" style="width: 100%; max-width: 800px; min-height: 1050px;">
          ${html}
        </div>
      `;
    }
  },

  // =========================================================================
  // FORM RENDERING & BINDING
  // =========================================================================
  renderForm() {
    // Sync Selectors
    this.selectTemplate.value = this.data.template || 'ats';
    this.selectFont.value = this.data.font || 'inter';
    this.selectSpacing.value = this.data.spacing || 'normal';
    this.updateColorPaletteActive();

    // 1. Personal Info
    document.getElementById('input-fullname').value = this.data.fullName || '';
    document.getElementById('input-title').value = this.data.title || '';
    document.getElementById('input-email').value = this.data.email || '';
    document.getElementById('input-phone').value = this.data.phone || '';
    document.getElementById('input-location').value = this.data.location || '';
    document.getElementById('input-website').value = this.data.website || '';
    document.getElementById('input-linkedin').value = this.data.linkedin || '';
    document.getElementById('input-github').value = this.data.github || '';
    document.getElementById('input-photourl').value = this.data.photoUrl || '';

    // 2. Summary
    document.getElementById('input-summary').value = this.data.summary || '';

    // 3. Experience
    this.renderExperienceList();

    // 4. Education
    this.renderEducationList();

    // 5. Skills
    this.renderSkillsTags();

    // 6. Projects
    this.renderProjectsList();

    // 7. Certifications
    this.renderCertificationsList();

    // 8. Languages
    this.renderLanguagesList();

    this.bindFormInputs();
  },

  updateColorPaletteActive() {
    const activeColor = this.data.color || 'sky';
    this.colorPaletteContainer.querySelectorAll('[data-color]').forEach(btn => {
      if (btn.dataset.color === activeColor) {
        btn.classList.add('ring-2', 'ring-cyan-400', 'scale-110');
      } else {
        btn.classList.remove('ring-2', 'ring-cyan-400', 'scale-110');
      }
    });
  },

  bindFormInputs() {
    const fields = [
      { id: 'input-fullname', prop: 'fullName' },
      { id: 'input-title', prop: 'title' },
      { id: 'input-email', prop: 'email' },
      { id: 'input-phone', prop: 'phone' },
      { id: 'input-location', prop: 'location' },
      { id: 'input-website', prop: 'website' },
      { id: 'input-linkedin', prop: 'linkedin' },
      { id: 'input-github', prop: 'github' },
      { id: 'input-photourl', prop: 'photoUrl' },
      { id: 'input-summary', prop: 'summary' }
    ];

    fields.forEach(({ id, prop }) => {
      const el = document.getElementById(id);
      if (el) {
        el.oninput = (e) => {
          this.data[prop] = e.target.value;
          this.saveAndRender();
        };
      }
    });

    // Summary AI triggers
    const btnAiSummary = document.getElementById('btn-ai-summary');
    if (btnAiSummary) {
      btnAiSummary.onclick = () => this.triggerAiSummary();
    }

    const btnAiImproveSummary = document.getElementById('btn-ai-improve-summary');
    if (btnAiImproveSummary) {
      btnAiImproveSummary.onclick = () => this.triggerAiImproveSummary();
    }

    // Skills AI Trigger
    const btnAiSuggestSkills = document.getElementById('btn-ai-suggest-skills');
    if (btnAiSuggestSkills) {
      btnAiSuggestSkills.onclick = () => this.triggerAiSuggestSkills();
    }
  },

  // =========================================================================
  // REPEATABLE SECTIONS: EXPERIENCE
  // =========================================================================
  renderExperienceList() {
    const container = document.getElementById('experience-list-container');
    if (!container) return;

    container.innerHTML = (this.data.experience || []).map((exp, idx) => `
      <div class="p-4 rounded-2xl bg-theme-surface-alt/70 border border-theme-line space-y-3 relative group" data-idx="${idx}">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-theme-ink flex items-center gap-1.5">
            <span class="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">${idx + 1}</span>
            <span>${escapeHtml(exp.position || 'Position')}</span>
          </span>
          <div class="flex items-center gap-1 text-xs">
            <button type="button" class="btn-move-exp-up p-1 hover:text-cyan-400 text-theme-muted" data-idx="${idx}" title="Move Up">↑</button>
            <button type="button" class="btn-move-exp-down p-1 hover:text-cyan-400 text-theme-muted" data-idx="${idx}" title="Move Down">↓</button>
            <button type="button" class="btn-remove-exp p-1 hover:text-red-400 text-theme-muted" data-idx="${idx}" title="Delete">✕</button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label class="block text-[11px] font-mono text-theme-muted mb-1">Job Title / Role</label>
            <input type="text" class="input-field w-full exp-field" data-field="position" data-idx="${idx}" value="${escapeHtml(exp.position || '')}" placeholder="Staff Software Engineer" />
          </div>
          <div>
            <label class="block text-[11px] font-mono text-theme-muted mb-1">Company / Organization</label>
            <input type="text" class="input-field w-full exp-field" data-field="company" data-idx="${idx}" value="${escapeHtml(exp.company || '')}" placeholder="Google, Stripe, etc." />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label class="block text-[11px] font-mono text-theme-muted mb-1">Start Date</label>
            <input type="text" class="input-field w-full exp-field" data-field="startDate" data-idx="${idx}" value="${escapeHtml(exp.startDate || '')}" placeholder="Jan 2022" />
          </div>
          <div>
            <label class="block text-[11px] font-mono text-theme-muted mb-1">End Date</label>
            <input type="text" class="input-field w-full exp-field" data-field="endDate" data-idx="${idx}" value="${escapeHtml(exp.endDate || '')}" placeholder="Present" ${exp.current ? 'disabled' : ''} />
          </div>
          <div class="flex items-center gap-2 pt-5">
            <input type="checkbox" id="exp-current-${idx}" class="exp-current-checkbox rounded bg-theme-surface border-theme-line text-cyan-500" data-idx="${idx}" ${exp.current ? 'checked' : ''} />
            <label for="exp-current-${idx}" class="text-[11px] font-medium text-theme-ink cursor-pointer">Current Role</label>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="block text-[11px] font-mono text-theme-muted">Responsibilities & Achievements (Bullet points)</label>
            <button type="button" class="btn-ai-improve-bullet text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1" data-idx="${idx}">
              <span>✨ Improve with AI</span>
            </button>
          </div>
          <textarea class="input-field w-full h-24 resize-none font-mono text-xs exp-field leading-relaxed" data-field="description" data-idx="${idx}" placeholder="• Architected microservices mesh serving 45M daily requests...">${escapeHtml(exp.description || '')}</textarea>
        </div>
      </div>
    `).join('');

    // Add Exp Button
    const btnAddExp = document.getElementById('btn-add-exp');
    if (btnAddExp) {
      btnAddExp.onclick = () => {
        this.data.experience = this.data.experience || [];
        this.data.experience.push({
          id: 'exp-' + Date.now(),
          position: '', company: '', location: '', startDate: '', endDate: '', current: false, description: ''
        });
        this.saveAndRender();
        this.renderExperienceList();
      };
    }

    // Bind event listeners for experience
    container.querySelectorAll('.exp-field').forEach(input => {
      input.oninput = (e) => {
        const idx = Number(e.target.dataset.idx);
        const field = e.target.dataset.field;
        this.data.experience[idx][field] = e.target.value;
        this.saveAndRender();
      };
    });

    container.querySelectorAll('.exp-current-checkbox').forEach(cb => {
      cb.onchange = (e) => {
        const idx = Number(e.target.dataset.idx);
        this.data.experience[idx].current = e.target.checked;
        if (e.target.checked) this.data.experience[idx].endDate = 'Present';
        this.saveAndRender();
        this.renderExperienceList();
      };
    });

    container.querySelectorAll('.btn-remove-exp').forEach(btn => {
      btn.onclick = (e) => {
        const idx = Number(e.target.dataset.idx);
        this.data.experience.splice(idx, 1);
        this.saveAndRender();
        this.renderExperienceList();
      };
    });

    container.querySelectorAll('.btn-move-exp-up').forEach(btn => {
      btn.onclick = (e) => {
        const idx = Number(e.target.dataset.idx);
        if (idx > 0) {
          const temp = this.data.experience[idx];
          this.data.experience[idx] = this.data.experience[idx - 1];
          this.data.experience[idx - 1] = temp;
          this.saveAndRender();
          this.renderExperienceList();
        }
      };
    });

    container.querySelectorAll('.btn-move-exp-down').forEach(btn => {
      btn.onclick = (e) => {
        const idx = Number(e.target.dataset.idx);
        if (idx < this.data.experience.length - 1) {
          const temp = this.data.experience[idx];
          this.data.experience[idx] = this.data.experience[idx + 1];
          this.data.experience[idx + 1] = temp;
          this.saveAndRender();
          this.renderExperienceList();
        }
      };
    });

    container.querySelectorAll('.btn-ai-improve-bullet').forEach(btn => {
      btn.onclick = (e) => {
        const idx = Number(btn.dataset.idx);
        const exp = this.data.experience[idx];
        this.triggerAiImproveBullet(exp.description, (improved) => {
          this.data.experience[idx].description = improved;
          this.saveAndRender();
          this.renderExperienceList();
        });
      };
    });
  },

  // =========================================================================
  // REPEATABLE SECTIONS: EDUCATION
  // =========================================================================
  renderEducationList() {
    const container = document.getElementById('education-list-container');
    if (!container) return;

    container.innerHTML = (this.data.education || []).map((edu, idx) => `
      <div class="p-4 rounded-2xl bg-theme-surface-alt/70 border border-theme-line space-y-3 relative group">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-theme-ink flex items-center gap-1.5">
            <span class="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">${idx + 1}</span>
            <span>${escapeHtml(edu.degree || 'Degree')}</span>
          </span>
          <button type="button" class="btn-remove-edu p-1 hover:text-red-400 text-theme-muted text-xs" data-idx="${idx}">✕</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label class="block text-[11px] font-mono text-theme-muted mb-1">Degree / Certification</label>
            <input type="text" class="input-field w-full edu-field" data-field="degree" data-idx="${idx}" value="${escapeHtml(edu.degree || '')}" placeholder="B.S. in Computer Science" />
          </div>
          <div>
            <label class="block text-[11px] font-mono text-theme-muted mb-1">Institution / School</label>
            <input type="text" class="input-field w-full edu-field" data-field="school" data-idx="${idx}" value="${escapeHtml(edu.school || '')}" placeholder="UC Berkeley" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label class="block text-[11px] font-mono text-theme-muted mb-1">Graduation Year / Period</label>
            <input type="text" class="input-field w-full edu-field" data-field="graduationYear" data-idx="${idx}" value="${escapeHtml(edu.graduationYear || '')}" placeholder="2020 – 2024" />
          </div>
          <div>
            <label class="block text-[11px] font-mono text-theme-muted mb-1">GPA / Honors (Optional)</label>
            <input type="text" class="input-field w-full edu-field" data-field="gpa" data-idx="${idx}" value="${escapeHtml(edu.gpa || '')}" placeholder="3.9 GPA / Summa Cum Laude" />
          </div>
        </div>
      </div>
    `).join('');

    const btnAddEdu = document.getElementById('btn-add-edu');
    if (btnAddEdu) {
      btnAddEdu.onclick = () => {
        this.data.education = this.data.education || [];
        this.data.education.push({ id: 'edu-' + Date.now(), degree: '', school: '', graduationYear: '', gpa: '' });
        this.saveAndRender();
        this.renderEducationList();
      };
    }

    container.querySelectorAll('.edu-field').forEach(input => {
      input.oninput = (e) => {
        const idx = Number(e.target.dataset.idx);
        const field = e.target.dataset.field;
        this.data.education[idx][field] = e.target.value;
        this.saveAndRender();
      };
    });

    container.querySelectorAll('.btn-remove-edu').forEach(btn => {
      btn.onclick = (e) => {
        const idx = Number(e.target.dataset.idx);
        this.data.education.splice(idx, 1);
        this.saveAndRender();
        this.renderEducationList();
      };
    });
  },

  // =========================================================================
  // SKILLS TAGS INPUT
  // =========================================================================
  renderSkillsTags() {
    const container = document.getElementById('skills-tags-container');
    const inputSkill = document.getElementById('input-skill-tag');
    if (!container || !inputSkill) return;

    container.innerHTML = (this.data.skills || []).map((sk, idx) => `
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-theme-surface-alt border border-theme-line text-xs font-semibold text-theme-ink group">
        <span>${escapeHtml(sk)}</span>
        <button type="button" class="btn-remove-skill text-theme-muted hover:text-red-400 text-[10px]" data-idx="${idx}">✕</button>
      </span>
    `).join('');

    inputSkill.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const val = inputSkill.value.trim().replace(/^,|,$/g, '');
        if (val && !this.data.skills.includes(val)) {
          this.data.skills.push(val);
          inputSkill.value = '';
          this.saveAndRender();
          this.renderSkillsTags();
        }
      }
    };

    container.querySelectorAll('.btn-remove-skill').forEach(btn => {
      btn.onclick = (e) => {
        const idx = Number(e.target.dataset.idx);
        this.data.skills.splice(idx, 1);
        this.saveAndRender();
        this.renderSkillsTags();
      };
    });
  },

  // =========================================================================
  // REPEATABLE SECTIONS: PROJECTS
  // =========================================================================
  renderProjectsList() {
    const container = document.getElementById('projects-list-container');
    if (!container) return;

    container.innerHTML = (this.data.projects || []).map((proj, idx) => `
      <div class="p-4 rounded-2xl bg-theme-surface-alt/70 border border-theme-line space-y-3 relative group">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-theme-ink flex items-center gap-1.5">
            <span class="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">${idx + 1}</span>
            <span>${escapeHtml(proj.title || 'Project Name')}</span>
          </span>
          <button type="button" class="btn-remove-proj p-1 hover:text-red-400 text-theme-muted text-xs" data-idx="${idx}">✕</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label class="block text-[11px] font-mono text-theme-muted mb-1">Project Title</label>
            <input type="text" class="input-field w-full proj-field" data-field="title" data-idx="${idx}" value="${escapeHtml(proj.title || '')}" placeholder="Toolzy" />
          </div>
          <div>
            <label class="block text-[11px] font-mono text-theme-muted mb-1">Live URL</label>
            <input type="url" class="input-field w-full proj-field" data-field="liveUrl" data-idx="${idx}" value="${escapeHtml(proj.liveUrl || '')}" placeholder="https://..." />
          </div>
          <div>
            <label class="block text-[11px] font-mono text-theme-muted mb-1">GitHub Repo</label>
            <input type="url" class="input-field w-full proj-field" data-field="repoUrl" data-idx="${idx}" value="${escapeHtml(proj.repoUrl || '')}" placeholder="https://github.com/..." />
          </div>
        </div>

        <div>
          <label class="block text-[11px] font-mono text-theme-muted mb-1">Description & Impact</label>
          <textarea class="input-field w-full h-16 resize-none font-mono text-xs proj-field leading-relaxed" data-field="description" data-idx="${idx}" placeholder="A 100% client-side developer toolbox...">${escapeHtml(proj.description || '')}</textarea>
        </div>
      </div>
    `).join('');

    const btnAddProj = document.getElementById('btn-add-proj');
    if (btnAddProj) {
      btnAddProj.onclick = () => {
        this.data.projects = this.data.projects || [];
        this.data.projects.push({ id: 'proj-' + Date.now(), title: '', description: '', liveUrl: '', repoUrl: '', tags: [] });
        this.saveAndRender();
        this.renderProjectsList();
      };
    }

    container.querySelectorAll('.proj-field').forEach(input => {
      input.oninput = (e) => {
        const idx = Number(e.target.dataset.idx);
        const field = e.target.dataset.field;
        this.data.projects[idx][field] = e.target.value;
        this.saveAndRender();
      };
    });

    container.querySelectorAll('.btn-remove-proj').forEach(btn => {
      btn.onclick = (e) => {
        const idx = Number(e.target.dataset.idx);
        this.data.projects.splice(idx, 1);
        this.saveAndRender();
        this.renderProjectsList();
      };
    });
  },

  // =========================================================================
  // REPEATABLE SECTIONS: CERTIFICATIONS & LANGUAGES
  // =========================================================================
  renderCertificationsList() {
    const container = document.getElementById('certifications-list-container');
    if (!container) return;

    container.innerHTML = (this.data.certifications || []).map((cert, idx) => `
      <div class="p-3 rounded-2xl bg-theme-surface-alt/70 border border-theme-line grid grid-cols-1 sm:grid-cols-3 gap-2 items-center text-xs">
        <input type="text" class="input-field cert-field" data-field="name" data-idx="${idx}" value="${escapeHtml(cert.name || '')}" placeholder="AWS Solutions Architect" />
        <input type="text" class="input-field cert-field" data-field="issuer" data-idx="${idx}" value="${escapeHtml(cert.issuer || '')}" placeholder="Amazon Web Services" />
        <div class="flex items-center gap-2">
          <input type="text" class="input-field cert-field flex-1" data-field="date" data-idx="${idx}" value="${escapeHtml(cert.date || '')}" placeholder="2024" />
          <button type="button" class="btn-remove-cert p-1 hover:text-red-400 text-theme-muted" data-idx="${idx}">✕</button>
        </div>
      </div>
    `).join('');

    const btnAddCert = document.getElementById('btn-add-cert');
    if (btnAddCert) {
      btnAddCert.onclick = () => {
        this.data.certifications = this.data.certifications || [];
        this.data.certifications.push({ id: 'cert-' + Date.now(), name: '', issuer: '', date: '' });
        this.saveAndRender();
        this.renderCertificationsList();
      };
    }

    container.querySelectorAll('.cert-field').forEach(input => {
      input.oninput = (e) => {
        const idx = Number(e.target.dataset.idx);
        const field = e.target.dataset.field;
        this.data.certifications[idx][field] = e.target.value;
        this.saveAndRender();
      };
    });

    container.querySelectorAll('.btn-remove-cert').forEach(btn => {
      btn.onclick = (e) => {
        const idx = Number(e.target.dataset.idx);
        this.data.certifications.splice(idx, 1);
        this.saveAndRender();
        this.renderCertificationsList();
      };
    });
  },

  renderLanguagesList() {
    const container = document.getElementById('languages-list-container');
    if (!container) return;

    container.innerHTML = (this.data.languages || []).map((lang, idx) => `
      <div class="p-3 rounded-2xl bg-theme-surface-alt/70 border border-theme-line flex items-center gap-2 text-xs">
        <input type="text" class="input-field lang-field flex-1" data-field="name" data-idx="${idx}" value="${escapeHtml(lang.name || '')}" placeholder="English" />
        <select class="input-field lang-field w-40" data-field="level" data-idx="${idx}">
          <option value="Native / Bilingual" ${lang.level === 'Native / Bilingual' ? 'selected' : ''}>Native / Bilingual</option>
          <option value="Professional Working" ${lang.level === 'Professional Working' ? 'selected' : ''}>Professional Working</option>
          <option value="Intermediate" ${lang.level === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
          <option value="Elementary" ${lang.level === 'Elementary' ? 'selected' : ''}>Elementary</option>
        </select>
        <button type="button" class="btn-remove-lang p-1 hover:text-red-400 text-theme-muted" data-idx="${idx}">✕</button>
      </div>
    `).join('');

    const btnAddLang = document.getElementById('btn-add-lang');
    if (btnAddLang) {
      btnAddLang.onclick = () => {
        this.data.languages = this.data.languages || [];
        this.data.languages.push({ id: 'lang-' + Date.now(), name: '', level: 'Fluent' });
        this.saveAndRender();
        this.renderLanguagesList();
      };
    }

    container.querySelectorAll('.lang-field').forEach(input => {
      input.onchange = (e) => {
        const idx = Number(e.target.dataset.idx);
        const field = e.target.dataset.field;
        this.data.languages[idx][field] = e.target.value;
        this.saveAndRender();
      };
    });

    container.querySelectorAll('.btn-remove-lang').forEach(btn => {
      btn.onclick = (e) => {
        const idx = Number(e.target.dataset.idx);
        this.data.languages.splice(idx, 1);
        this.saveAndRender();
        this.renderLanguagesList();
      };
    });
  },

  // =========================================================================
  // AI ACTION HANDLERS
  // =========================================================================
  async triggerAiSummary() {
    this.showToast('Generating AI summary...');
    try {
      const prompt = `Write a professional 2-3 sentence resume summary for a ${this.data.title || 'professional'}. Key skills: ${(this.data.skills || []).join(', ')}.`;
      const result = await Utils.callAI({ prompt });
      this.openAiReviewModal(this.data.summary || '', result, (accepted) => {
        this.data.summary = accepted;
        document.getElementById('input-summary').value = accepted;
        this.saveAndRender();
      });
    } catch (err) {
      this.showToast('AI Error: ' + err.message);
    }
  },

  async triggerAiImproveSummary() {
    const current = this.data.summary;
    if (!current) {
      this.showToast('Please enter a summary to improve first.');
      return;
    }
    this.showToast('Polishing summary with AI...');
    try {
      const prompt = `Rewrite and polish this resume summary to be achievement-oriented, concise, and impactful:\n\n"${current}"`;
      const result = await Utils.callAI({ prompt });
      this.openAiReviewModal(current, result, (accepted) => {
        this.data.summary = accepted;
        document.getElementById('input-summary').value = accepted;
        this.saveAndRender();
      });
    } catch (err) {
      this.showToast('AI Error: ' + err.message);
    }
  },

  async triggerAiImproveBullet(currentText, callback) {
    this.showToast('Enhancing bullet points with AI...');
    try {
      const prompt = `Improve this work experience bullet point into strong, quantifiable, action-verb driven bullets for a ${this.data.title || 'professional'}:\n\n"${currentText}"`;
      const result = await Utils.callAI({ prompt });
      this.openAiReviewModal(currentText, result, (accepted) => {
        callback(accepted);
      });
    } catch (err) {
      this.showToast('AI Error: ' + err.message);
    }
  },

  async triggerAiSuggestSkills() {
    this.showToast('Analyzing role for skill suggestions...');
    try {
      const prompt = `Suggest relevant technical and soft skills for a ${this.data.title || 'Software Engineer'}. Return as a JSON array of strings.`;
      const result = await Utils.callAI({ prompt });
      let skillsArr = [];
      try {
        skillsArr = JSON.parse(result);
      } catch (e) {
        skillsArr = result.split(',').map(s => s.trim().replace(/^["'\[\]]+|["'\[\]]+$/g, '')).filter(Boolean);
      }

      if (Array.isArray(skillsArr) && skillsArr.length) {
        const newSkills = skillsArr.filter(s => !this.data.skills.includes(s));
        if (newSkills.length) {
          this.data.skills.push(...newSkills);
          this.saveAndRender();
          this.renderSkillsTags();
          this.showToast(`Added ${newSkills.length} AI-suggested skills!`);
        } else {
          this.showToast('All suggested skills are already in your list.');
        }
      }
    } catch (err) {
      this.showToast('AI Error: ' + err.message);
    }
  },

  async runJobTailor() {
    const jobDesc = this.inputJobDescription.value.trim();
    if (!jobDesc) {
      this.showToast('Please paste a job description first.');
      return;
    }

    this.jobTailorResults.innerHTML = '<div class="p-6 text-center text-cyan-400 font-mono text-xs">Analyzing job description match...</div>';
    try {
      const prompt = `Analyze this job description against the candidate profile (${this.data.title}, skills: ${(this.data.skills || []).join(', ')}). Give keyword match score, missing skills, and tailored suggestions:\n\n${jobDesc}`;
      const result = await Utils.callAI({ prompt });
      this.jobTailorResults.innerHTML = `
        <div class="p-4 rounded-2xl bg-theme-surface-alt border border-theme-line text-xs font-mono whitespace-pre-wrap leading-relaxed">
          ${escapeHtml(result)}
        </div>
      `;
    } catch (err) {
      this.jobTailorResults.innerHTML = `<div class="p-4 text-red-400 text-xs">Error: ${escapeHtml(err.message)}</div>`;
    }
  },

  openAiReviewModal(original, suggested, onAccept) {
    this.aiOriginalText.innerText = original || '(Empty)';
    this.aiSuggestedText.value = suggested;
    this.pendingAIAction = onAccept;
    this.modalAiReview.classList.remove('hidden');
  },

  applyAiSuggestion() {
    const finalVal = this.aiSuggestedText.value.trim();
    if (this.pendingAIAction && finalVal) {
      this.pendingAIAction(finalVal);
    }
    this.modalAiReview.classList.add('hidden');
    this.showToast('Applied AI suggestion!');
  },

  // =========================================================================
  // AI SETTINGS & CONFIG
  // =========================================================================
  openAiSettings() {
    const cfg = Utils.getAIConfig();
    this.selectAiProvider.value = cfg.provider || 'built-in';
    this.inputAiApiKey.value = cfg.apiKey || '';
    this.inputAiModel.value = cfg.model || '';
    this.modalAiSettings.classList.remove('hidden');
  },

  saveAiSettings() {
    const config = {
      provider: this.selectAiProvider.value,
      apiKey: this.inputAiApiKey.value.trim(),
      model: this.inputAiModel.value.trim()
    };
    Utils.saveAIConfig(config);
    this.modalAiSettings.classList.add('hidden');
    this.showToast('AI Settings saved locally.');
  },

  // =========================================================================
  // JSON IMPORT / EXPORT
  // =========================================================================
  openImportExport() {
    this.textareaJsonData.value = JSON.stringify(this.data, null, 2);
    this.modalImportExport.classList.remove('hidden');
  },

  downloadJsonFile() {
    const blob = new Blob([JSON.stringify(this.data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(this.data.fullName || 'resume').replace(/\s+/g, '_')}_data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast('Downloaded JSON backup!');
  },

  applyJsonFromTextarea() {
    try {
      const parsed = JSON.parse(this.textareaJsonData.value);
      this.data = parsed;
      this.saveAndRender();
      this.renderForm();
      this.modalImportExport.classList.add('hidden');
      this.showToast('Imported resume data successfully!');
    } catch (e) {
      alert('Invalid JSON format: ' + e.message);
    }
  },

  handleJsonFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        this.data = parsed;
        this.saveAndRender();
        this.renderForm();
        this.modalImportExport.classList.add('hidden');
        this.showToast(`Imported ${file.name}!`);
      } catch (err) {
        alert('Failed to parse JSON file: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  },

  downloadPortfolioFile() {
    const html = Templates.renderPortfolioHTML(this.data, this.data.color);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast('Downloaded self-contained portfolio.html!');
  },

  showToast(msg) {
    if (!this.toast || !this.toastMessage) return;
    this.toastMessage.innerText = msg;
    this.toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
      this.toast.classList.add('translate-y-20', 'opacity-0');
    }, 2800);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
