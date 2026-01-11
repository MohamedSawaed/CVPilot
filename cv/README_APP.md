# CV Creator App - Complete Resume Builder

A professional, interactive resume builder application with AI-powered suggestions and profession-specific templates.

## Features

### 1. Multiple Profession Templates
- **Doctor** - Medical professionals with sections for licenses, publications
- **Engineer** - Software, mechanical, civil engineers with project showcases
- **Accountant** - Financial professionals with certifications emphasis
- **Teacher** - Educators with achievements and curriculum focus
- **Marketing Professional** - Digital marketers with campaign metrics
- **Designer** - Creative professionals with portfolio sections
- **Lawyer** - Legal professionals with practice areas and publications
- **Sales Professional** - Sales reps with achievement-focused layout

### 2. Intelligent Questionnaire
The app asks users about:
- Years of experience in their field
- Educational background and degree type
- Current or most recent role
- Career goals

This information helps the system:
- Arrange resume sections in the optimal order
- Provide relevant suggestions
- Customize the template to the user's experience level

### 3. Smart Suggestions System
As users fill out their resume, the app provides:
- **Real-time tips** based on profession-specific best practices
- **Content warnings** when sections need more detail
- **Suggested skills** relevant to their profession
- **Formatting advice** for better impact (e.g., use metrics, bullet points)

### 4. Dynamic Form Builder
- Section-by-section navigation
- Repeatable sections for multiple jobs, education entries, etc.
- Auto-save functionality
- Form validation
- Character counters

### 5. Live Preview
- Toggle preview on/off
- See changes in real-time
- Professional formatting
- Print-ready design
- PDF download option

## Project Structure

```
cv/
├── public/
├── src/
│   ├── components/
│   │   ├── CVPreview.js       # Live preview component
│   │   ├── CVPreview.css
│   │   ├── SuggestionBox.js   # AI suggestions display
│   │   └── SuggestionBox.css
│   ├── pages/
│   │   ├── TemplateSelection.js   # Profession selection
│   │   ├── TemplateSelection.css
│   │   ├── Questionnaire.js       # User profiling
│   │   ├── Questionnaire.css
│   │   ├── CVBuilder.js           # Main form builder
│   │   └── CVBuilder.css
│   ├── data/
│   │   └── templates.js           # Profession templates & data
│   ├── utils/
│   ├── App.js                     # Main app with routing
│   ├── App.css                    # Global styles
│   └── index.js
└── package.json
```

## How to Run

1. **Install dependencies:**
   ```bash
   cd cv
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## User Journey

1. **Select Profession**
   - User lands on the homepage
   - Views 8 profession cards with icons and descriptions
   - Clicks "Create My Resume" on their profession

2. **Answer Questions**
   - System asks about experience level
   - User provides education details
   - Optional career goal input
   - System prepares optimal resume structure

3. **Build Resume**
   - Navigate through sections using the section menu
   - Fill out personal information
   - Write professional summary with character count
   - Add work experience with date ranges
   - Input education details
   - List skills (technical, soft, languages)
   - Add optional sections (certifications, projects, etc.)

4. **Get Suggestions**
   - System provides tips as user types
   - Warnings appear for incomplete sections
   - Suggestions for quantifying achievements
   - Profession-specific skill recommendations

5. **Preview & Export**
   - Toggle live preview on/off
   - See formatted resume in real-time
   - Print directly from browser
   - Download as PDF

## Key Components Explained

### TemplateSelection Component
- Displays profession cards in a responsive grid
- Shows features of the app
- Handles profession selection

### Questionnaire Component
- Collects user profile information
- Radio buttons for experience level
- Dropdown for degree selection
- Validates required fields before proceeding

### CVBuilder Component
- Main form with section navigation
- Dynamic rendering based on profession
- Manages CV data state
- Generates context-aware suggestions
- Handles adding/removing repeatable items

### CVPreview Component
- Formats CV data into professional template
- Responsive design
- Print-optimized styling
- Placeholder for empty sections

### SuggestionBox Component
- Displays tips, warnings, and suggestions
- Color-coded by type (tip, warning, suggestion, success)
- Icon indicators for quick recognition

## Customization Options

### Adding New Professions
Edit `src/data/templates.js` and add a new profession object:

```javascript
{
  id: 'profession-id',
  name: 'Profession Name',
  icon: '🎯',
  description: 'Brief description',
  sections: ['personalInfo', 'summary', 'experience', ...],
  suggestedSkills: ['Skill 1', 'Skill 2', ...],
  tips: {
    section: 'Tip for this section',
    ...
  }
}
```

### Modifying Suggestion Logic
Edit the `generateSuggestions` function in `CVBuilder.js` to add custom rules:

```javascript
if (section === 'yourSection' && yourCondition) {
  newSuggestions.push({
    type: 'tip', // or 'warning', 'suggestion', 'success'
    message: 'Your helpful message'
  });
}
```

### Customizing Preview Template
Modify `CVPreview.js` and `CVPreview.css` to change the resume appearance.

## Technologies Used

- **React 19** - UI framework
- **React Router DOM** - Navigation
- **CSS3** - Styling with gradients and animations
- **JavaScript ES6+** - Modern JavaScript features

## Future Enhancements

Potential additions:
- Backend integration for saving resumes
- Multiple template styles to choose from
- AI integration for content suggestions (OpenAI, etc.)
- Export to multiple formats (DOCX, PDF)
- Resume scoring and ATS compatibility check
- LinkedIn import
- Cover letter generator
- Multi-language support

## Browser Compatibility

Works on all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Mobile Responsive

Fully responsive design that works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## License

This project is open source and available for personal and commercial use.

---

**Built with ❤️ for helping professionals create amazing resumes!**
