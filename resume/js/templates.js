// AI Resume & Portfolio Builder - Template Rendering Engine

const Templates = {
  // Theme Color Palettes
  colors: {
    sky: { primary: '#0284c7', hover: '#0369a1', light: '#e0f2fe', text: '#0369a1', border: '#bae6fd' },
    emerald: { primary: '#059669', hover: '#047857', light: '#d1fae5', text: '#047857', border: '#a7f3d0' },
    indigo: { primary: '#4f46e5', hover: '#4338ca', light: '#e0e7ff', text: '#3730a3', border: '#c7d2fe' },
    violet: { primary: '#7c3aed', hover: '#6d28d9', light: '#ede9fe', text: '#5b21b6', border: '#ddd6fe' },
    rose: { primary: '#e11d48', hover: '#be123c', light: '#ffe4e6', text: '#9f1239', border: '#fecdd3' },
    amber: { primary: '#d97706', hover: '#b45309', light: '#fef3c7', text: '#92400e', border: '#fde68a' },
    slate: { primary: '#334155', hover: '#1e293b', light: '#f1f5f9', text: '#0f172a', border: '#cbd5e1' }
  },

  // Font Configurations
  fonts: {
    inter: "'Inter', sans-serif",
    roboto: "'Roboto', sans-serif",
    merriweather: "'Merriweather', Georgia, serif",
    jetbrains: "'JetBrains Mono', monospace",
    outfit: "'Outfit', sans-serif",
    playfair: "'Playfair Display', Georgia, serif"
  },

  // Spacing / Density Configurations
  spacing: {
    compact: { sectionGap: '12px', itemGap: '8px', lineHeight: '1.35', fontSize: '12px' },
    normal: { sectionGap: '18px', itemGap: '12px', lineHeight: '1.5', fontSize: '13px' },
    relaxed: { sectionGap: '24px', itemGap: '16px', lineHeight: '1.65', fontSize: '14px' }
  },

  getColor(key) {
    return this.colors[key] || this.colors.sky;
  },

  getFont(key) {
    return this.fonts[key] || this.fonts.inter;
  },

  getSpacing(key) {
    return this.spacing[key] || this.spacing.normal;
  },

  // Render Resume based on chosen template
  renderResume(data, options = {}) {
    const templateKey = options.template || data.template || 'ats';
    const colorKey = options.color || data.color || 'sky';
    const fontKey = options.font || data.font || 'inter';
    const spacingKey = options.spacing || data.spacing || 'normal';

    const color = this.getColor(colorKey);
    const font = this.getFont(fontKey);
    const spacing = this.getSpacing(spacingKey);

    const sectionOrder = data.sectionOrder || ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages'];
    const hiddenSections = new Set(data.hiddenSections || []);

    switch (templateKey) {
      case 'modern':
        return this.renderModern(data, color, font, spacing, sectionOrder, hiddenSections);
      case 'minimal':
        return this.renderMinimal(data, color, font, spacing, sectionOrder, hiddenSections);
      case 'classic':
        return this.renderClassic(data, color, font, spacing, sectionOrder, hiddenSections);
      case 'creative':
        return this.renderCreative(data, color, font, spacing, sectionOrder, hiddenSections);
      case 'ats':
      default:
        return this.renderATS(data, color, font, spacing, sectionOrder, hiddenSections);
    }
  },

  // 1. MODERN PRO TEMPLATE
  renderModern(data, color, font, sp, order, hidden) {
    const sectionsHTML = order.map(secKey => {
      if (hidden.has(secKey)) return '';
      return this.renderSectionContent(secKey, data, color, sp, 'modern');
    }).join('');

    return `
      <div class="resume-document modern-template" style="font-family: ${font}; font-size: ${sp.fontSize}; line-height: ${sp.lineHeight}; color: #1e293b; background: #ffffff; padding: 36px 40px; box-sizing: border-box; min-height: 100%;">
        
        <!-- Header -->
        <header style="border-bottom: 2px solid ${color.border}; padding-bottom: 16px; margin-bottom: ${sp.sectionGap}; display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
          <div style="flex: 1;">
            <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">${escapeHtml(data.fullName || 'Your Full Name')}</h1>
            <p style="margin: 4px 0 0 0; font-size: 15px; font-weight: 600; color: ${color.primary};">${escapeHtml(data.title || 'Professional Title')}</p>
            
            <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 10px; font-size: 11.5px; color: #64748b;">
              ${data.email ? `<span>✉ ${escapeHtml(data.email)}</span>` : ''}
              ${data.phone ? `<span>📱 ${escapeHtml(data.phone)}</span>` : ''}
              ${data.location ? `<span>📍 ${escapeHtml(data.location)}</span>` : ''}
              ${data.website ? `<span>🔗 <a href="${escapeHtml(data.website)}" target="_blank" style="color: ${color.primary}; text-decoration: none;">${escapeHtml(data.website.replace(/^https?:\/\//, ''))}</a></span>` : ''}
              ${data.linkedin ? `<span>💼 <a href="${escapeHtml(data.linkedin)}" target="_blank" style="color: ${color.primary}; text-decoration: none;">LinkedIn</a></span>` : ''}
              ${data.github ? `<span>🐙 <a href="${escapeHtml(data.github)}" target="_blank" style="color: ${color.primary}; text-decoration: none;">GitHub</a></span>` : ''}
            </div>
          </div>

          ${data.photoUrl ? `
            <img src="${escapeHtml(data.photoUrl)}" alt="Profile" style="width: 72px; height: 72px; border-radius: 50%; object-fit: cover; border: 2px solid ${color.primary}; flex-shrink: 0;" />
          ` : ''}
        </header>

        <!-- Dynamic Sections -->
        <main style="display: flex; flex-col; gap: ${sp.sectionGap};">
          ${sectionsHTML}
        </main>
      </div>
    `;
  },

  // 2. MINIMALIST CLEAN TEMPLATE
  renderMinimal(data, color, font, sp, order, hidden) {
    const sectionsHTML = order.map(secKey => {
      if (hidden.has(secKey)) return '';
      return this.renderSectionContent(secKey, data, color, sp, 'minimal');
    }).join('');

    return `
      <div class="resume-document minimal-template" style="font-family: ${font}; font-size: ${sp.fontSize}; line-height: ${sp.lineHeight}; color: #27272a; background: #ffffff; padding: 40px 44px; box-sizing: border-box; min-height: 100%;">
        
        <!-- Header -->
        <header style="margin-bottom: ${sp.sectionGap}; text-align: left;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #09090b; letter-spacing: -0.5px;">${escapeHtml(data.fullName || 'Your Full Name')}</h1>
          <p style="margin: 3px 0 8px 0; font-size: 14px; font-weight: 500; color: #71717a;">${escapeHtml(data.title || 'Professional Title')}</p>
          
          <div style="display: flex; flex-wrap: wrap; gap: 10px; font-size: 11px; color: #a1a1aa; border-top: 1px solid #f4f4f5; padding-top: 8px;">
            ${data.email ? `<span>${escapeHtml(data.email)}</span>` : ''}
            ${data.phone ? `<span>• ${escapeHtml(data.phone)}</span>` : ''}
            ${data.location ? `<span>• ${escapeHtml(data.location)}</span>` : ''}
            ${data.website ? `<span>• <a href="${escapeHtml(data.website)}" style="color: ${color.primary}; text-decoration: none;">${escapeHtml(data.website.replace(/^https?:\/\//, ''))}</a></span>` : ''}
            ${data.linkedin ? `<span>• <a href="${escapeHtml(data.linkedin)}" style="color: ${color.primary}; text-decoration: none;">LinkedIn</a></span>` : ''}
            ${data.github ? `<span>• <a href="${escapeHtml(data.github)}" style="color: ${color.primary}; text-decoration: none;">GitHub</a></span>` : ''}
          </div>
        </header>

        <!-- Dynamic Sections -->
        <main style="display: flex; flex-col; gap: ${sp.sectionGap};">
          ${sectionsHTML}
        </main>
      </div>
    `;
  },

  // 3. CLASSIC / EXECUTIVE TEMPLATE
  renderClassic(data, color, font, sp, order, hidden) {
    const sectionsHTML = order.map(secKey => {
      if (hidden.has(secKey)) return '';
      return this.renderSectionContent(secKey, data, color, sp, 'classic');
    }).join('');

    return `
      <div class="resume-document classic-template" style="font-family: ${font}; font-size: ${sp.fontSize}; line-height: ${sp.lineHeight}; color: #1f2937; background: #ffffff; padding: 40px 45px; box-sizing: border-box; min-height: 100%;">
        
        <!-- Header -->
        <header style="text-align: center; border-bottom: 2px solid #1f2937; padding-bottom: 14px; margin-bottom: ${sp.sectionGap};">
          <h1 style="margin: 0; font-size: 26px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #111827;">${escapeHtml(data.fullName || 'Your Full Name')}</h1>
          <p style="margin: 4px 0 8px 0; font-size: 14px; font-style: italic; color: #4b5563;">${escapeHtml(data.title || 'Professional Title')}</p>
          
          <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; font-size: 11.5px; color: #4b5563;">
            ${data.location ? `<span>${escapeHtml(data.location)}</span>` : ''}
            ${data.phone ? `<span>| ${escapeHtml(data.phone)}</span>` : ''}
            ${data.email ? `<span>| ${escapeHtml(data.email)}</span>` : ''}
            ${data.linkedin ? `<span>| <a href="${escapeHtml(data.linkedin)}" style="color: #111827;">LinkedIn</a></span>` : ''}
            ${data.website ? `<span>| <a href="${escapeHtml(data.website)}" style="color: #111827;">Portfolio</a></span>` : ''}
          </div>
        </header>

        <!-- Dynamic Sections -->
        <main style="display: flex; flex-col; gap: ${sp.sectionGap};">
          ${sectionsHTML}
        </main>
      </div>
    `;
  },

  // 4. CREATIVE TECH TEMPLATE
  renderCreative(data, color, font, sp, order, hidden) {
    const mainSections = ['summary', 'experience', 'projects'].filter(k => !hidden.has(k));
    const sideSections = ['skills', 'education', 'certifications', 'languages'].filter(k => !hidden.has(k));

    return `
      <div class="resume-document creative-template" style="font-family: ${font}; font-size: ${sp.fontSize}; line-height: ${sp.lineHeight}; color: #1e293b; background: #ffffff; box-sizing: border-box; min-height: 100%; display: grid; grid-template-columns: 200px 1fr; min-height: 100%;">
        
        <!-- Left Sidebar -->
        <aside style="background: #f8fafc; border-right: 1px solid #e2e8f0; padding: 30px 20px; display: flex; flex-direction: column; gap: ${sp.sectionGap};">
          
          ${data.photoUrl ? `
            <div style="text-align: center; margin-bottom: 8px;">
              <img src="${escapeHtml(data.photoUrl)}" alt="Profile" style="width: 84px; height: 84px; border-radius: 50%; object-fit: cover; border: 3px solid ${color.primary}; margin: 0 auto;" />
            </div>
          ` : ''}

          <!-- Contact Section -->
          <div>
            <h3 style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: ${color.primary}; letter-spacing: 0.5px; margin: 0 0 8px 0; border-bottom: 1.5px solid ${color.border}; padding-bottom: 4px;">CONTACT</h3>
            <div style="display: flex; flex-direction: column; gap: 6px; font-size: 11px; color: #475569;">
              ${data.email ? `<div><span style="color:#94a3b8;">Email:</span><br/><span style="word-break: break-all;">${escapeHtml(data.email)}</span></div>` : ''}
              ${data.phone ? `<div><span style="color:#94a3b8;">Phone:</span><br/>${escapeHtml(data.phone)}</div>` : ''}
              ${data.location ? `<div><span style="color:#94a3b8;">Location:</span><br/>${escapeHtml(data.location)}</div>` : ''}
              ${data.website ? `<div><span style="color:#94a3b8;">Web:</span><br/><a href="${escapeHtml(data.website)}" style="color: ${color.primary}; text-decoration: none;">${escapeHtml(data.website.replace(/^https?:\/\//, ''))}</a></div>` : ''}
              ${data.linkedin ? `<div><span style="color:#94a3b8;">LinkedIn:</span><br/><a href="${escapeHtml(data.linkedin)}" style="color: ${color.primary}; text-decoration: none;">Profile Link</a></div>` : ''}
              ${data.github ? `<div><span style="color:#94a3b8;">GitHub:</span><br/><a href="${escapeHtml(data.github)}" style="color: ${color.primary}; text-decoration: none;">GitHub Link</a></div>` : ''}
            </div>
          </div>

          <!-- Sidebar Sections -->
          ${sideSections.map(secKey => this.renderSectionContent(secKey, data, color, sp, 'creative-sidebar')).join('')}
        </aside>

        <!-- Right Main Content -->
        <div style="padding: 32px 30px; display: flex; flex-direction: column; gap: ${sp.sectionGap};">
          <header style="margin-bottom: 4px;">
            <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">${escapeHtml(data.fullName || 'Your Full Name')}</h1>
            <p style="margin: 3px 0 0 0; font-size: 14px; font-weight: 600; color: ${color.primary};">${escapeHtml(data.title || 'Professional Title')}</p>
          </header>

          ${mainSections.map(secKey => this.renderSectionContent(secKey, data, color, sp, 'creative-main')).join('')}
        </div>
      </div>
    `;
  },

  // 5. ATS-OPTIMIZED TEMPLATE
  renderATS(data, color, font, sp, order, hidden) {
    const sectionsHTML = order.map(secKey => {
      if (hidden.has(secKey)) return '';
      return this.renderSectionContent(secKey, data, color, sp, 'ats');
    }).join('');

    return `
      <div class="resume-document ats-template" style="font-family: Arial, Helvetica, sans-serif; font-size: 11pt; line-height: 1.45; color: #000000; background: #ffffff; padding: 36px 40px; box-sizing: border-box; min-height: 100%;">
        
        <!-- Header -->
        <header style="text-align: center; border-bottom: 1.5px solid #000000; padding-bottom: 10px; margin-bottom: 16px;">
          <h1 style="margin: 0; font-size: 18pt; font-weight: bold; text-transform: uppercase;">${escapeHtml(data.fullName || 'Your Full Name')}</h1>
          <p style="margin: 3px 0 6px 0; font-size: 11pt; font-weight: bold;">${escapeHtml(data.title || 'Professional Title')}</p>
          
          <div style="font-size: 10pt;">
            ${[data.location, data.phone, data.email, data.website, data.linkedin].filter(Boolean).map(escapeHtml).join(' | ')}
          </div>
        </header>

        <!-- Dynamic Sections -->
        <main style="display: flex; flex-direction: column; gap: 14px;">
          ${sectionsHTML}
        </main>
      </div>
    `;
  },

  // HELPER: Section Content Renderer
  renderSectionContent(secKey, data, color, sp, styleMode) {
    switch (secKey) {
      case 'summary':
        if (!data.summary) return '';
        return `
          <section>
            <h2 style="${this.getHeaderStyle(color, styleMode)}">PROFESSIONAL SUMMARY</h2>
            <p style="margin: 6px 0 0 0; color: #334155; line-height: ${sp.lineHeight};">${escapeHtml(data.summary)}</p>
          </section>
        `;

      case 'experience':
        if (!data.experience || !data.experience.length) return '';
        return `
          <section>
            <h2 style="${this.getHeaderStyle(color, styleMode)}">WORK EXPERIENCE</h2>
            <div style="display: flex; flex-direction: column; gap: ${sp.itemGap}; margin-top: 8px;">
              ${data.experience.map(exp => `
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: baseline; font-size: 13px;">
                    <strong style="color: #0f172a; font-size: 13.5px;">${escapeHtml(exp.position || '')}</strong>
                    <span style="font-size: 11px; color: #64748b; font-weight: 500;">${escapeHtml(exp.startDate || '')} – ${exp.current ? 'Present' : escapeHtml(exp.endDate || '')}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: 12px; color: ${color.primary}; font-weight: 600; margin-top: 1px;">
                    <span>${escapeHtml(exp.company || '')}</span>
                    ${exp.location ? `<span style="color: #94a3b8; font-weight: normal; font-size: 11px;">${escapeHtml(exp.location)}</span>` : ''}
                  </div>
                  ${exp.description ? `
                    <div style="margin-top: 4px; color: #334155; font-size: 12px;">
                      ${this.formatBulletPoints(exp.description)}
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </section>
        `;

      case 'education':
        if (!data.education || !data.education.length) return '';
        return `
          <section>
            <h2 style="${this.getHeaderStyle(color, styleMode)}">EDUCATION</h2>
            <div style="display: flex; flex-direction: column; gap: ${sp.itemGap}; margin-top: 8px;">
              ${data.education.map(edu => `
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <strong style="color: #0f172a; font-size: 13px;">${escapeHtml(edu.degree || '')}${edu.field ? `, ${escapeHtml(edu.field)}` : ''}</strong>
                    <span style="font-size: 11px; color: #64748b;">${escapeHtml(edu.graduationYear || '')}</span>
                  </div>
                  <div style="font-size: 12px; color: ${color.primary}; font-weight: 500;">
                    ${escapeHtml(edu.school || '')} ${edu.gpa ? `• GPA: ${escapeHtml(edu.gpa)}` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        `;

      case 'skills':
        if (!data.skills || !data.skills.length) return '';
        return `
          <section>
            <h2 style="${this.getHeaderStyle(color, styleMode)}">SKILLS & EXPERTISE</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
              ${data.skills.map(sk => `
                <span style="background: ${color.light}; color: ${color.text}; border: 1px solid ${color.border}; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 500;">
                  ${escapeHtml(sk)}
                </span>
              `).join('')}
            </div>
          </section>
        `;

      case 'projects':
        if (!data.projects || !data.projects.length) return '';
        return `
          <section>
            <h2 style="${this.getHeaderStyle(color, styleMode)}">KEY PROJECTS</h2>
            <div style="display: flex; flex-direction: column; gap: ${sp.itemGap}; margin-top: 8px;">
              ${data.projects.map(proj => `
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <strong style="color: #0f172a; font-size: 13px;">${escapeHtml(proj.title || '')}</strong>
                    <div style="display: flex; gap: 8px; font-size: 11px;">
                      ${proj.liveUrl ? `<a href="${escapeHtml(proj.liveUrl)}" target="_blank" style="color: ${color.primary}; text-decoration: none;">Live Demo ↗</a>` : ''}
                      ${proj.repoUrl ? `<a href="${escapeHtml(proj.repoUrl)}" target="_blank" style="color: #64748b; text-decoration: none;">Code ↗</a>` : ''}
                    </div>
                  </div>
                  ${proj.description ? `<p style="margin: 3px 0 0 0; color: #334155; font-size: 12px;">${escapeHtml(proj.description)}</p>` : ''}
                  ${proj.tags && proj.tags.length ? `
                    <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px;">
                      ${proj.tags.map(t => `<span style="font-size: 10px; color: #64748b; background: #f1f5f9; padding: 1px 5px; border-radius: 3px;">#${escapeHtml(t)}</span>`).join('')}
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </section>
        `;

      case 'certifications':
        if (!data.certifications || !data.certifications.length) return '';
        return `
          <section>
            <h2 style="${this.getHeaderStyle(color, styleMode)}">CERTIFICATIONS</h2>
            <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px;">
              ${data.certifications.map(cert => `
                <div style="display: flex; justify-content: space-between; font-size: 12px;">
                  <div>
                    <strong style="color: #0f172a;">${escapeHtml(cert.name || '')}</strong>
                    <span style="color: #64748b;"> – ${escapeHtml(cert.issuer || '')}</span>
                  </div>
                  ${cert.date ? `<span style="font-size: 11px; color: #94a3b8;">${escapeHtml(cert.date)}</span>` : ''}
                </div>
              `).join('')}
            </div>
          </section>
        `;

      case 'languages':
        if (!data.languages || !data.languages.length) return '';
        return `
          <section>
            <h2 style="${this.getHeaderStyle(color, styleMode)}">LANGUAGES</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 8px; font-size: 12px;">
              ${data.languages.map(lang => `
                <div style="display: flex; gap: 4px;">
                  <strong style="color: #0f172a;">${escapeHtml(lang.name || '')}:</strong>
                  <span style="color: #64748b;">${escapeHtml(lang.level || 'Fluent')}</span>
                </div>
              `).join('')}
            </div>
          </section>
        `;

      default:
        return '';
    }
  },

  getHeaderStyle(color, styleMode) {
    if (styleMode === 'ats') {
      return 'margin: 0; font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 2px; color: #000;';
    }
    if (styleMode === 'classic') {
      return `margin: 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1.5px solid #1f2937; padding-bottom: 3px; color: #111827;`;
    }
    if (styleMode === 'minimal') {
      return `margin: 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #09090b; border-bottom: 1px solid #e4e4e7; padding-bottom: 4px;`;
    }
    if (styleMode === 'creative-sidebar') {
      return `font-size: 11px; font-weight: 800; text-transform: uppercase; color: ${color.primary}; letter-spacing: 0.5px; margin: 0 0 6px 0; border-bottom: 1.5px solid ${color.border}; padding-bottom: 3px;`;
    }
    // modern default
    return `margin: 0; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: ${color.primary}; border-bottom: 1.5px solid ${color.border}; padding-bottom: 4px;`;
  },

  formatBulletPoints(text) {
    if (!text) return '';
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 1 && !lines[0].startsWith('•') && !lines[0].startsWith('-')) {
      return `<p style="margin: 0; line-height: 1.45;">${escapeHtml(lines[0])}</p>`;
    }
    return `
      <ul style="margin: 4px 0 0 16px; padding: 0; list-style-type: disc; line-height: 1.45;">
        ${lines.map(line => `<li style="margin-bottom: 3px;">${escapeHtml(line.replace(/^[•\-*]\s*/, ''))}</li>`).join('')}
      </ul>
    `;
  },

  // =========================================================================
  // PORTFOLIO WEBSITE GENERATOR (Self-Contained Single-Page HTML)
  // =========================================================================
  renderPortfolioHTML(data, colorKey = 'sky') {
    const color = this.getColor(colorKey);
    const fullName = data.fullName || 'Professional Developer';
    const title = data.title || 'Full Stack Engineer & Creator';

    return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(fullName)} — Portfolio</title>
  <meta name="description" content="${escapeHtml(data.summary || title)}" />
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  <style>
    body { font-family: 'Inter', sans-serif; }
    .bg-grid {
      background-size: 40px 40px;
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen selection:bg-cyan-500 selection:text-black">

  <!-- Sticky Navbar -->
  <header class="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="#hero" class="text-lg font-black tracking-tight flex items-center gap-2">
        <span class="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-slate-950">
          ${escapeHtml((fullName[0] || 'P').toUpperCase())}
        </span>
        <span>${escapeHtml(fullName)}</span>
      </a>

      <nav class="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-400">
        <a href="#about" class="hover:text-cyan-400 transition-colors">About</a>
        <a href="#experience" class="hover:text-cyan-400 transition-colors">Experience</a>
        <a href="#projects" class="hover:text-cyan-400 transition-colors">Projects</a>
        <a href="#skills" class="hover:text-cyan-400 transition-colors">Skills</a>
        <a href="#contact" class="hover:text-cyan-400 transition-colors">Contact</a>
      </nav>

      <div class="flex items-center gap-3">
        ${data.email ? `
          <a href="mailto:${escapeHtml(data.email)}" class="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20 active:scale-95">
            Get in Touch
          </a>
        ` : ''}
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="hero" class="relative py-24 md:py-32 px-6 overflow-hidden bg-grid">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-slate-950 pointer-events-none"></div>
    
    <div class="max-w-4xl mx-auto text-center relative z-10 space-y-6">
      
      ${data.photoUrl ? `
        <div class="w-28 h-28 mx-auto rounded-3xl p-1 bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-2xl shadow-cyan-500/20">
          <img src="${escapeHtml(data.photoUrl)}" alt="${escapeHtml(fullName)}" class="w-full h-full object-cover rounded-[22px]" />
        </div>
      ` : ''}

      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold">
        <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
        <span>Available for New Opportunities</span>
      </div>

      <h1 class="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
        Hi, I'm <span class="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">${escapeHtml(fullName)}</span>
      </h1>

      <p class="text-xl md:text-2xl text-slate-300 font-medium max-w-2xl mx-auto">
        ${escapeHtml(title)}
      </p>

      <p class="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
        ${escapeHtml(data.summary || 'Building innovative, high-impact digital experiences and software systems.')}
      </p>

      <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
        ${data.email ? `
          <a href="mailto:${escapeHtml(data.email)}" class="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 active:scale-95">
            Email Me Directly
          </a>
        ` : ''}
        ${data.linkedin ? `
          <a href="${escapeHtml(data.linkedin)}" target="_blank" class="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold text-sm transition-all active:scale-95">
            LinkedIn Profile ↗
          </a>
        ` : ''}
        ${data.github ? `
          <a href="${escapeHtml(data.github)}" target="_blank" class="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold text-sm transition-all active:scale-95">
            GitHub ↗
          </a>
        ` : ''}
      </div>

    </div>
  </section>

  <!-- Experience Section -->
  ${data.experience && data.experience.length ? `
  <section id="experience" class="py-20 px-6 border-t border-slate-900 bg-slate-950/50">
    <div class="max-w-4xl mx-auto space-y-12">
      <div class="text-center space-y-2">
        <h2 class="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">Career Journey</h2>
        <p class="text-3xl font-black text-white">Work Experience</p>
      </div>

      <div class="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-slate-800">
        ${data.experience.map((exp, i) => `
          <div class="relative flex flex-col md:flex-row items-start gap-6 group">
            <div class="w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-500 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold z-10 shrink-0">
              ${i + 1}
            </div>

            <div class="flex-1 p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-3 shadow-xl">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 class="text-lg font-bold text-white">${escapeHtml(exp.position || '')}</h3>
                <span class="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20 w-fit">
                  ${escapeHtml(exp.startDate || '')} – ${exp.current ? 'Present' : escapeHtml(exp.endDate || '')}
                </span>
              </div>
              <p class="text-sm font-semibold text-slate-400">${escapeHtml(exp.company || '')} ${exp.location ? `• ${escapeHtml(exp.location)}` : ''}</p>
              ${exp.description ? `
                <p class="text-sm text-slate-300 whitespace-pre-line leading-relaxed">${escapeHtml(exp.description)}</p>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- Featured Projects Section -->
  ${data.projects && data.projects.length ? `
  <section id="projects" class="py-20 px-6 border-t border-slate-900">
    <div class="max-w-5xl mx-auto space-y-12">
      <div class="text-center space-y-2">
        <h2 class="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">Portfolio Work</h2>
        <p class="text-3xl font-black text-white">Featured Projects</p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        ${data.projects.map(proj => `
          <div class="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xl">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-bold text-white">${escapeHtml(proj.title || '')}</h3>
                <div class="flex items-center gap-3 text-xs font-mono">
                  ${proj.liveUrl ? `<a href="${escapeHtml(proj.liveUrl)}" target="_blank" class="text-cyan-400 hover:underline">Live Demo ↗</a>` : ''}
                  ${proj.repoUrl ? `<a href="${escapeHtml(proj.repoUrl)}" target="_blank" class="text-slate-400 hover:underline">GitHub ↗</a>` : ''}
                </div>
              </div>

              ${proj.description ? `<p class="text-sm text-slate-300 leading-relaxed">${escapeHtml(proj.description)}</p>` : ''}
            </div>

            ${proj.tags && proj.tags.length ? `
              <div class="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
                ${proj.tags.map(tag => `
                  <span class="px-2.5 py-0.5 rounded-lg bg-slate-950 text-slate-400 text-xs font-mono border border-slate-800">
                    #${escapeHtml(tag)}
                  </span>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- Skills Section -->
  ${data.skills && data.skills.length ? `
  <section id="skills" class="py-20 px-6 border-t border-slate-900 bg-slate-950/50">
    <div class="max-w-4xl mx-auto space-y-8 text-center">
      <div class="space-y-2">
        <h2 class="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">Core Competencies</h2>
        <p class="text-3xl font-black text-white">Skills & Technologies</p>
      </div>

      <div class="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        ${data.skills.map(sk => `
          <span class="px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 text-sm font-semibold hover:border-cyan-500/50 hover:text-cyan-400 transition-all shadow-md">
            ${escapeHtml(sk)}
          </span>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- Education & Certifications -->
  ${(data.education && data.education.length) || (data.certifications && data.certifications.length) ? `
  <section class="py-20 px-6 border-t border-slate-900">
    <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
      
      ${data.education && data.education.length ? `
        <div class="space-y-6">
          <h3 class="text-xl font-bold text-white flex items-center gap-2">
            <span>🎓</span>
            <span>Education</span>
          </h3>
          <div class="space-y-4">
            ${data.education.map(edu => `
              <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <h4 class="font-bold text-white text-base">${escapeHtml(edu.degree || '')}${edu.field ? `, ${escapeHtml(edu.field)}` : ''}</h4>
                <p class="text-xs font-semibold text-cyan-400">${escapeHtml(edu.school || '')}</p>
                <div class="flex justify-between text-xs text-slate-400 font-mono pt-1">
                  <span>${escapeHtml(edu.graduationYear || '')}</span>
                  ${edu.gpa ? `<span>GPA: ${escapeHtml(edu.gpa)}</span>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${data.certifications && data.certifications.length ? `
        <div class="space-y-6">
          <h3 class="text-xl font-bold text-white flex items-center gap-2">
            <span>🏆</span>
            <span>Certifications</span>
          </h3>
          <div class="space-y-4">
            ${data.certifications.map(cert => `
              <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <h4 class="font-bold text-white text-base">${escapeHtml(cert.name || '')}</h4>
                <p class="text-xs font-semibold text-cyan-400">${escapeHtml(cert.issuer || '')}</p>
                ${cert.date ? `<span class="text-xs text-slate-400 font-mono">${escapeHtml(cert.date)}</span>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

    </div>
  </section>
  ` : ''}

  <!-- Contact & Footer -->
  <footer id="contact" class="py-20 px-6 border-t border-slate-900 bg-slate-950 text-center space-y-6">
    <div class="max-w-2xl mx-auto space-y-4">
      <h2 class="text-3xl font-black text-white">Let's Connect</h2>
      <p class="text-slate-400 text-sm">Have a question or interested in collaborating? Send a message or connect on social media.</p>
      
      <div class="flex flex-wrap justify-center gap-4 pt-2">
        ${data.email ? `<a href="mailto:${escapeHtml(data.email)}" class="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs">Email: ${escapeHtml(data.email)}</a>` : ''}
        ${data.phone ? `<span class="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs">${escapeHtml(data.phone)}</span>` : ''}
      </div>
    </div>

    <div class="pt-12 text-xs font-mono text-slate-500 border-t border-slate-900/60 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <span>© ${new Date().getFullYear()} ${escapeHtml(fullName)}. All rights reserved.</span>
      <span>Generated with AI Resume & Portfolio Studio</span>
    </div>
  </footer>

</body>
</html>`;
  }
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
