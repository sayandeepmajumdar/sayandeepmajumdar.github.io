// Resume Templates

const templates = {
    modern: {
        name: 'Modern',
        render: (data) => {
            return `
                <div class="resume-container">
                    <div class="resume-header">
                        <h1 style="margin: 0; font-size: 2em;">${data.fullName || 'Your Name'}</h1>
                        <p style="color: #3b82f6; margin: 0.5rem 0 0 0; font-weight: 600;">${data.title || ''}</p>
                        <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 0.5rem; font-size: 0.9em; color: #64748b;">
                            ${data.email ? `<span>${data.email}</span>` : ''}
                            ${data.phone ? `<span>${data.phone}</span>` : ''}
                            ${data.location ? `<span>${data.location}</span>` : ''}
                        </div>
                        ${data.linkedin || data.website ? `
                            <div style="margin-top: 0.5rem; font-size: 0.9em;">
                                ${data.linkedin ? `<span><a href="${data.linkedin}" style="color: #3b82f6;">${data.linkedin}</a></span>` : ''}
                                ${data.website ? `<span style="margin-left: 1rem;"><a href="${data.website}" style="color: #3b82f6;">${data.website}</a></span>` : ''}
                            </div>
                        ` : ''}
                    </div>

                    ${data.summary ? `
                        <div class="resume-section">
                            <h2>Professional Summary</h2>
                            <p>${data.summary}</p>
                        </div>
                    ` : ''}

                    ${data.experience && data.experience.length > 0 ? `
                        <div class="resume-section">
                            <h2>Work Experience</h2>
                            ${data.experience.map(exp => `
                                <div style="margin-bottom: 1rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                                        <h3>${exp.position}</h3>
                                        <span style="color: #64748b; font-size: 0.9em;">${exp.startDate} - ${exp.endDate}</span>
                                    </div>
                                    <p style="color: #3b82f6; margin: 0.25rem 0; font-weight: 500;">${exp.company}</p>
                                    <p style="margin: 0.5rem 0; color: #334155;">${exp.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    ${data.education && data.education.length > 0 ? `
                        <div class="resume-section">
                            <h2>Education</h2>
                            ${data.education.map(edu => `
                                <div style="margin-bottom: 1rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                                        <h3>${edu.degree}</h3>
                                        <span style="color: #64748b; font-size: 0.9em;">${edu.graduationYear}</span>
                                    </div>
                                    <p style="color: #3b82f6; margin: 0.25rem 0; font-weight: 500;">${edu.school}</p>
                                    ${edu.field ? `<p style="margin: 0.25rem 0; color: #64748b;">Field: ${edu.field}</p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    ${data.skills && data.skills.length > 0 ? `
                        <div class="resume-section">
                            <h2>Skills</h2>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                ${data.skills.map(skill => `
                                    <span style="background: #e0f2fe; color: #0369a1; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.9em;">${skill}</span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${data.projects && data.projects.length > 0 ? `
                        <div class="resume-section">
                            <h2>Projects</h2>
                            ${data.projects.map(proj => `
                                <div style="margin-bottom: 1rem;">
                                    <h3>${proj.title}</h3>
                                    <p style="color: #64748b; font-size: 0.9em; margin: 0.25rem 0;">${proj.description}</p>
                                    ${proj.link ? `<p style="margin: 0.25rem 0;"><a href="${proj.link}" style="color: #3b82f6;">${proj.link}</a></p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }
    },

    classic: {
        name: 'Classic',
        render: (data) => {
            return `
                <div class="resume-container" style="font-family: Georgia, serif;">
                    <div style="text-align: center; border-bottom: 3px solid #1e293b; padding-bottom: 1rem; margin-bottom: 1.5rem;">
                        <h1 style="margin: 0; font-size: 2.5em; color: #1e293b;">${data.fullName || 'Your Name'}</h1>
                        <p style="margin: 0.5rem 0 0 0; color: #64748b;">${data.title || ''}</p>
                        <div style="margin-top: 0.5rem; font-size: 0.9em; color: #64748b;">
                            ${data.email ? `<span>${data.email}</span>` : ''}
                            ${data.phone ? `${data.email ? ' | ' : ''}<span>${data.phone}</span>` : ''}
                            ${data.location ? `${data.email || data.phone ? ' | ' : ''}<span>${data.location}</span>` : ''}
                        </div>
                    </div>

                    ${data.summary ? `
                        <div style="margin-bottom: 1.5rem;">
                            <h2 style="color: #1e293b; border-bottom: 2px solid #1e293b; padding-bottom: 0.5rem;">PROFESSIONAL SUMMARY</h2>
                            <p style="color: #334155; line-height: 1.6;">${data.summary}</p>
                        </div>
                    ` : ''}

                    ${data.experience && data.experience.length > 0 ? `
                        <div style="margin-bottom: 1.5rem;">
                            <h2 style="color: #1e293b; border-bottom: 2px solid #1e293b; padding-bottom: 0.5rem;">WORK EXPERIENCE</h2>
                            ${data.experience.map(exp => `
                                <div style="margin-bottom: 1rem;">
                                    <p style="margin: 0; font-weight: bold; color: #1e293b;">${exp.position} at ${exp.company}</p>
                                    <p style="margin: 0; color: #64748b; font-style: italic;">${exp.startDate} - ${exp.endDate}</p>
                                    <p style="margin: 0.5rem 0 0 0; color: #334155;">${exp.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    ${data.education && data.education.length > 0 ? `
                        <div style="margin-bottom: 1.5rem;">
                            <h2 style="color: #1e293b; border-bottom: 2px solid #1e293b; padding-bottom: 0.5rem;">EDUCATION</h2>
                            ${data.education.map(edu => `
                                <div style="margin-bottom: 1rem;">
                                    <p style="margin: 0; font-weight: bold; color: #1e293b;">${edu.degree}</p>
                                    <p style="margin: 0; color: #64748b;">${edu.school}</p>
                                    <p style="margin: 0; color: #334155;">${edu.graduationYear}${edu.field ? ` - ${edu.field}` : ''}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    ${data.skills && data.skills.length > 0 ? `
                        <div style="margin-bottom: 1.5rem;">
                            <h2 style="color: #1e293b; border-bottom: 2px solid #1e293b; padding-bottom: 0.5rem;">SKILLS</h2>
                            <p style="margin: 0; color: #334155;">${data.skills.join(', ')}</p>
                        </div>
                    ` : ''}

                    ${data.projects && data.projects.length > 0 ? `
                        <div style="margin-bottom: 1.5rem;">
                            <h2 style="color: #1e293b; border-bottom: 2px solid #1e293b; padding-bottom: 0.5rem;">PROJECTS</h2>
                            ${data.projects.map(proj => `
                                <div style="margin-bottom: 1rem;">
                                    <p style="margin: 0; font-weight: bold; color: #1e293b;">${proj.title}</p>
                                    <p style="margin: 0; color: #334155;">${proj.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }
    },

    creative: {
        name: 'Creative',
        render: (data) => {
            return `
                <div class="resume-container" style="display: grid; grid-template-columns: 1fr 2fr;">
                    <div style="background: #f1f5f9; padding: 2rem; grid-column: 1;">
                        <div style="margin-bottom: 2rem;">
                            <h2 style="color: #1e293b; border-bottom: 3px solid #3b82f6; padding-bottom: 0.5rem; margin-bottom: 1rem;">CONTACT</h2>
                            ${data.email ? `<p style="margin: 0.5rem 0; font-size: 0.9em;"><strong>Email:</strong><br>${data.email}</p>` : ''}
                            ${data.phone ? `<p style="margin: 0.5rem 0; font-size: 0.9em;"><strong>Phone:</strong><br>${data.phone}</p>` : ''}
                            ${data.location ? `<p style="margin: 0.5rem 0; font-size: 0.9em;"><strong>Location:</strong><br>${data.location}</p>` : ''}
                        </div>

                        ${data.skills && data.skills.length > 0 ? `
                            <div style="margin-bottom: 2rem;">
                                <h2 style="color: #1e293b; border-bottom: 3px solid #3b82f6; padding-bottom: 0.5rem; margin-bottom: 1rem;">SKILLS</h2>
                                ${data.skills.map(skill => `
                                    <p style="margin: 0.5rem 0; font-size: 0.9em; padding: 0.5rem; background: white; border-radius: 0.25rem;">• ${skill}</p>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>

                    <div style="padding: 2rem; grid-column: 2;">
                        <div style="margin-bottom: 2rem;">
                            <h1 style="margin: 0; font-size: 2em; color: #3b82f6;">${data.fullName || 'Your Name'}</h1>
                            <p style="margin: 0.5rem 0; color: #64748b; font-size: 1.1em;">${data.title || ''}</p>
                        </div>

                        ${data.summary ? `
                            <div style="margin-bottom: 1.5rem;">
                                <h2 style="color: #1e293b; border-bottom: 3px solid #3b82f6; padding-bottom: 0.5rem;">ABOUT</h2>
                                <p style="color: #334155; line-height: 1.6;">${data.summary}</p>
                            </div>
                        ` : ''}

                        ${data.experience && data.experience.length > 0 ? `
                            <div style="margin-bottom: 1.5rem;">
                                <h2 style="color: #1e293b; border-bottom: 3px solid #3b82f6; padding-bottom: 0.5rem;">EXPERIENCE</h2>
                                ${data.experience.map(exp => `
                                    <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0;">
                                        <h3 style="margin: 0; color: #3b82f6;">${exp.position}</h3>
                                        <p style="margin: 0.25rem 0; color: #64748b; font-weight: 500;">${exp.company}</p>
                                        <p style="margin: 0.25rem 0; color: #64748b; font-size: 0.9em;">${exp.startDate} - ${exp.endDate}</p>
                                        <p style="margin: 0.5rem 0 0 0; color: #334155;">${exp.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}

                        ${data.education && data.education.length > 0 ? `
                            <div style="margin-bottom: 1.5rem;">
                                <h2 style="color: #1e293b; border-bottom: 3px solid #3b82f6; padding-bottom: 0.5rem;">EDUCATION</h2>
                                ${data.education.map(edu => `
                                    <div style="margin-bottom: 1rem;">
                                        <h3 style="margin: 0; color: #3b82f6;">${edu.degree}</h3>
                                        <p style="margin: 0.25rem 0; color: #64748b; font-weight: 500;">${edu.school}</p>
                                        <p style="margin: 0.25rem 0; color: #334155;">${edu.graduationYear}${edu.field ? ` - ${edu.field}` : ''}</p>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}

                        ${data.projects && data.projects.length > 0 ? `
                            <div>
                                <h2 style="color: #1e293b; border-bottom: 3px solid #3b82f6; padding-bottom: 0.5rem;">PROJECTS</h2>
                                ${data.projects.map(proj => `
                                    <div style="margin-bottom: 1rem;">
                                        <h3 style="margin: 0; color: #3b82f6;">${proj.title}</h3>
                                        <p style="margin: 0.5rem 0; color: #334155;">${proj.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }
    },
    
    ats: {
        name: 'ATS Optimized',
        render: (data) => {
            const formatDescription = (text) => {
                if (!text) return '';
                const lines = text.split('\n').filter(line => line.trim().length > 0);
                if (lines.length === 1) return `<p style="margin: 0.25rem 0; color: #000;">${lines[0]}</p>`;
                return `<ul style="margin: 0.25rem 0 0.5rem 1.5rem; padding: 0; color: #000; list-style-type: disc;">
                    ${lines.map(line => `<li style="margin-bottom: 0.25rem;">${line.replace(/^[-\*•]\s*/, '').trim()}</li>`).join('')}
                </ul>`;
            };

            return `
                <div class="resume-container ats-template" style="font-family: Arial, Helvetica, sans-serif; color: #000; max-width: 800px; margin: 0 auto; background: #fff; padding: 2rem;">
                    <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 1rem; margin-bottom: 1.5rem;">
                        <h1 style="margin: 0; font-size: 24pt; font-weight: bold; text-transform: uppercase;">${data.fullName || 'Your Name'}</h1>
                        <p style="margin: 0.5rem 0 0 0; font-size: 14pt;">${data.title || ''}</p>
                        <div style="margin-top: 0.5rem; font-size: 11pt;">
                            ${data.phone ? `<span>${data.phone}</span>` : ''}
                            ${data.email ? `${data.phone ? ' | ' : ''}<span>${data.email}</span>` : ''}
                            ${data.location ? `${data.phone || data.email ? ' | ' : ''}<span>${data.location}</span>` : ''}
                        </div>
                        ${data.linkedin || data.website ? `
                            <div style="margin-top: 0.25rem; font-size: 11pt;">
                                ${data.linkedin ? `<span>${data.linkedin}</span>` : ''}
                                ${data.website ? `<span style="margin-left: 0.5rem;">${data.linkedin ? '| ' : ''}${data.website}</span>` : ''}
                            </div>
                        ` : ''}
                    </div>

                    ${data.summary ? `
                        <div style="margin-bottom: 1.5rem;">
                            <h2 style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; margin-bottom: 0.5rem; padding-bottom: 0.25rem; color: #000;">Professional Summary</h2>
                            <p style="margin: 0; font-size: 11pt; line-height: 1.5; color: #000;">${data.summary}</p>
                        </div>
                    ` : ''}

                    ${data.experience && data.experience.length > 0 ? `
                        <div style="margin-bottom: 1.5rem;">
                            <h2 style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; margin-bottom: 0.5rem; padding-bottom: 0.25rem; color: #000;">Work Experience</h2>
                            ${data.experience.map(exp => `
                                <div style="margin-bottom: 1rem; font-size: 11pt;">
                                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                                        <h3 style="margin: 0; font-size: 11pt; font-weight: bold; color: #000;">${exp.company}</h3>
                                        <span style="font-size: 11pt; font-weight: bold;">${exp.startDate} - ${exp.endDate}</span>
                                    </div>
                                    <p style="margin: 0.25rem 0; font-style: italic; color: #000;">${exp.position}</p>
                                    ${formatDescription(exp.description)}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    ${data.education && data.education.length > 0 ? `
                        <div style="margin-bottom: 1.5rem;">
                            <h2 style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; margin-bottom: 0.5rem; padding-bottom: 0.25rem; color: #000;">Education</h2>
                            ${data.education.map(edu => `
                                <div style="margin-bottom: 0.75rem; font-size: 11pt;">
                                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                                        <h3 style="margin: 0; font-size: 11pt; font-weight: bold; color: #000;">${edu.school}</h3>
                                        <span style="font-size: 11pt; font-weight: bold;">${edu.graduationYear}</span>
                                    </div>
                                    <p style="margin: 0.25rem 0; font-style: italic; color: #000;">${edu.degree}${edu.field ? `, ${edu.field}` : ''}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    ${data.skills && data.skills.length > 0 ? `
                        <div style="margin-bottom: 1.5rem;">
                            <h2 style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; margin-bottom: 0.5rem; padding-bottom: 0.25rem; color: #000;">Skills</h2>
                            <p style="margin: 0; font-size: 11pt; line-height: 1.5; color: #000;">${data.skills.join(', ')}</p>
                        </div>
                    ` : ''}

                    ${data.projects && data.projects.length > 0 ? `
                        <div style="margin-bottom: 1.5rem;">
                            <h2 style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; margin-bottom: 0.5rem; padding-bottom: 0.25rem; color: #000;">Projects</h2>
                            ${data.projects.map(proj => `
                                <div style="margin-bottom: 1rem; font-size: 11pt;">
                                    <h3 style="margin: 0; font-size: 11pt; font-weight: bold; color: #000;">${proj.title}</h3>
                                    ${formatDescription(proj.description)}
                                    ${proj.link ? `<p style="margin: 0.25rem 0; color: #000;">URL: ${proj.link}</p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }
    }
};
