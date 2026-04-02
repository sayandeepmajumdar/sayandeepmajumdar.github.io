# AI Resume & Portfolio Builder

A modern, feature-rich web application that helps users create professional resumes and portfolios with ease.

## Features

✨ **Key Features:**
- 📝 **Multi-step Form** - Easy-to-use step-by-step form interface
- 🎨 **Multiple Templates** - Choose from Modern, Classic, and Creative resume templates
- 📄 **PDF Download** - Generate and download professional PDF resumes
- 🌐 **Portfolio Generation** - Auto-generate a personal portfolio website
- 🤖 **AI Suggestions** - Get intelligent suggestions to enhance your content
- 💾 **Auto-save** - All data is automatically saved to local storage
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Smooth Animations** - Modern UI with smooth transitions and animations
- 🎯 **Progress Tracking** - Visual progress indicator as you fill out the form

## Sections Included

1. **Personal Information** - Name, email, phone, location, title, and professional summary
2. **Education** - Add multiple education entries with degree, school, field, and graduation year
3. **Work Experience** - Add multiple work experiences with position, company, dates, and description
4. **Skills** - Add professional skills as tags
5. **Projects** - Showcase your projects with title, description, and links
6. **Review & Customize** - Select template, generate AI suggestions, and prepare your resume

## How to Use

1. **Open the Application** - Navigate to the resume builder at `/resume-generator`
2. **Fill Out Your Information** - Follow the step-by-step form
3. **Select a Template** - Choose your preferred resume format
4. **Preview Your Resume** - Click "Preview Resume" to see how it looks
5. **Download PDF** - Download your completed resume as a PDF file
6. **Generate Portfolio** - Create an auto-generated portfolio website
7. **Save Draft** - Your data is automatically saved; you can return anytime

## Resume Templates

### Modern Template
Clean, contemporary design with gradient elements and organized sections.

### Classic Template
Professional, traditional layout suitable for formal positions.

### Creative Template
Two-column layout with color accents, ideal for creative professionals.

## Technologies Used

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Vanilla JavaScript** - Pure JavaScript for interactivity (no dependencies)
- **html2pdf.js** - PDF generation library
- **Font Awesome** - Icon library
- **Local Storage API** - Client-side data persistence

## File Structure

```
resume-generator/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Custom CSS styles and animations
├── js/
│   ├── app.js              # Main application logic
│   ├── templates.js        # Resume template definitions
│   └── utils.js            # Utility functions
└── README.md               # This file
```

## Key Components

### HTML Structure
- Navigation bar with links to Home and Builder
- Landing page with hero section and features
- Multi-step form for data entry
- Preview modal for resume preview
- Success modal for completion feedback

### JavaScript Modules

#### app.js
- Main application controller
- Form step management
- Data binding and updates
- Event handling

#### templates.js
- Resume template definitions
- Template rendering functions
- HTML generation for PDFs and portfolios

#### utils.js
- PDF generation utilities
- Portfolio website generation
- AI suggestion engine
- Local storage management
- Loading and success modals

### CSS Styling
- Responsive grid layouts
- Smooth animations and transitions
- Modern dark theme with gradient accents
- Mobile-first approach
- Accessible color contrasts

## Data Persistence

All user data is stored in the browser's Local Storage under the key `resumeData`. This means:
- Data persists between sessions
- No backend server required
- Data is not synchronized across browsers
- Clearing browser data will remove saved resumes

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features in Detail

### Auto-save
- All form inputs are automatically saved to Local Storage
- Changes are saved on blur and change events
- No need to manually save

### AI Suggestions
- Get intelligent suggestions for professional summary
- Context-aware skill recommendations
- One-click implementation of suggestions

### PDF Generation
- High-quality PDF output
- Maintains formatting from selected template
- All sections are included in the PDF
- Suitable for professional use

### Portfolio Website
- Single-page portfolio website
- Responsive design
- Smooth scrolling navigation
- Contact information display
- Project showcase section

### Progress Tracking
- Visual progress indicator
- Tracks completion of key sections
- Encourages users to fill out more information

## Tips for Best Results

1. **Fill out all sections** - The more complete your information, the better your resume
2. **Use clear descriptions** - Be specific about your achievements and responsibilities
3. **Choose appropriate template** - Select a template that fits your industry
4. **Preview before downloading** - Check how your resume looks before finalizing
5. **Use the AI suggestions** - They can help enhance your content

## Offline Usage

This application works completely offline! Once loaded, all features are available without internet connection. Only portfolio downloads require internet for icon loading.

## Privacy

- All data remains on your device
- No data is sent to any server
- No tracking or analytics
- Completely private and secure

## Future Enhancements

Planned features for future versions:
- More resume templates
- Advanced formatting options
- Custom color schemes
- Multi-language support
- Resume sharing via link
- Import data from LinkedIn
- Additional export formats

## License

MIT License - Feel free to use and modify as needed.

## Support

For issues or suggestions, please create an issue or contact the developers.

---

**Created with ❤️ by the AI Resume Builder Team**

Visit us at: [/resume-generator]
