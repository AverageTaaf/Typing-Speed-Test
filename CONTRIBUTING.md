# Contributing to TypeMaster

First off, thank you for considering contributing to TypeMaster! It's people like you that make TypeMaster such a great tool.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Community](#community)

---

## 📜 Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
**Examples of behavior that contributes to creating a positive environment:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Examples of unacceptable behavior:**
- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

---

## 🤝 How Can I Contribute?

### Reporting Bugs
Bugs are tracked as GitHub issues. When creating a bug report, please include:
- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Environment details** (browser, OS, version)
- **Error messages** or console logs

### Suggesting Features
Feature requests are welcome! When suggesting a feature:
- **Use a clear and descriptive title**
- **Provide detailed description** of the suggested feature
- **Explain why this feature would be useful** to most users
- **Include mockups or examples** if possible

### Improving Documentation
Documentation improvements are always appreciated:
- Fix typos or clarify existing documentation
- Add examples or tutorials
- Translate documentation to other languages
- Create video tutorials or guides

### Writing Code
Code contributions can include:
- Bug fixes
- New features
- Performance improvements
- Code refactoring
- Test coverage improvements

---

## 🚀 Getting Started

### Prerequisites
- Git
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Basic knowledge of HTML, CSS, JavaScript
- Firebase account (for backend features)

### Fork and Clone
1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/typemaster.git
   cd typemaster
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/typemaster.git
   ```

### Set Up Development Environment
1. **Open the project** in your editor
2. **Open `index.html`** in your browser
3. **Open browser DevTools** (F12) for debugging
4. **Make changes** and refresh to see updates

### Firebase Setup (Optional)
If working on backend features:
1. Create a Firebase project
2. Enable Authentication and Firestore
3. Update Firebase config in `script.js`
4. Set up security rules

---

## 🔄 Development Workflow

### Branch Naming
Use descriptive branch names:
- `feature/add-multiplayer-mode`
- `fix/timer-accuracy-bug`
- `docs/update-user-guide`
- `refactor/improve-sound-system`

### Making Changes
1. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Write clean, readable code
   - Follow the style guidelines
   - Add comments where necessary
   - Test your changes thoroughly

3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add feature: your feature description"
   ```

4. **Keep your branch updated**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

### Testing Your Changes
Before submitting:
- [ ] Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on different screen sizes (desktop, tablet, mobile)
- [ ] Verify no console errors
- [ ] Check that existing features still work
- [ ] Test with and without user authentication
- [ ] Verify accessibility (keyboard navigation, screen readers)

---

## 📝 Style Guidelines

### JavaScript Style
```javascript
// Use camelCase for variables and functions
let currentWordIndex = 0;
function calculateWPM() { }

// Use UPPER_SNAKE_CASE for constants
const MAX_WORD_COUNT = 100;

// Use descriptive names
// ✅ Good
const userTypingSpeed = calculateWPM();

// ❌ Bad
const x = calc();

// Add comments for complex logic
/**
 * Calculates words per minute based on correct words and time elapsed
 * @returns {number} WPM value
 */
function calculateWPM() {
  // Implementation
}

// Use ES6+ features
const words = [...state.words]; // Spread operator
const { wpm, accuracy } = calculateStats(); // Destructuring

// Prefer const over let, avoid var
const fixedValue = 100;
let changingValue = 0;
```

### HTML Style
```html
<!-- Use semantic HTML -->
<header>
  <h1>TypeMaster</h1>
</header>

<!-- Use meaningful IDs and classes -->
<div class="settings-panel" id="main-settings">
  <button class="start-btn" id="start-test-btn">Start</button>
</div>

<!-- Include ARIA labels for accessibility -->
<button aria-label="Start typing test" id="start-btn">
  Start
</button>

<!-- Proper indentation (2 spaces) -->
<div class="container">
  <div class="content">
    <p>Text</p>
  </div>
</div>
```

### CSS Style
```css
/* Use CSS variables for theming */
:root {
  --primary-color: #6366f1;
  --text-color: #1f2937;
}

/* Use meaningful class names */
.typing-input { }
.word-container { }

/* Group related properties */
.button {
  /* Positioning */
  position: relative;
  
  /* Box model */
  display: flex;
  padding: 1rem;
  margin: 0.5rem;
  
  /* Typography */
  font-size: 1rem;
  color: var(--text-color);
  
  /* Visual */
  background: var(--primary-color);
  border-radius: 8px;
  
  /* Animation */
  transition: all 0.3s ease;
}

/* Use mobile-first approach */
.container {
  width: 100%;
}

@media (min-width: 768px) {
  .container {
    width: 90%;
  }
}
```

---

## 💬 Commit Messages

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no code change)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples
```bash
# Good commit messages
feat(sounds): add ASMR keyboard sound type
fix(timer): correct timer accuracy in survival mode
docs(readme): update installation instructions
refactor(state): simplify state management logic

# Bad commit messages
update stuff
fix bug
changes
asdf
```

### Detailed Example
```
feat(multiplayer): add real-time multiplayer racing mode

- Implement WebSocket connection for real-time sync
- Add lobby system for creating/joining rooms
- Display opponent progress bars
- Add post-race comparison screen

Closes #123
```

---

## 🔀 Pull Request Process

### Before Submitting
1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**
4. **Update CHANGELOG.md** with your changes
5. **Rebase on latest main** branch

### Submitting PR
1. **Create pull request** from your fork to main repository
2. **Fill out PR template** completely
3. **Link related issues** (e.g., "Closes #123")
4. **Request review** from maintainers
5. **Respond to feedback** promptly

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested on mobile
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] CHANGELOG.md updated
```

### Review Process
1. **Maintainer review** - Code quality, style, functionality
2. **Feedback** - Address any requested changes
3. **Approval** - At least one maintainer approval required
4. **Merge** - Maintainer will merge your PR

---

## 🐛 Reporting Bugs

### Bug Report Template
```markdown
**Bug Description**
Clear and concise description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Type '...'
4. See error

**Expected Behavior**
What you expected to happen

**Actual Behavior**
What actually happened

**Screenshots**
If applicable, add screenshots

**Environment**
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- TypeMaster Version: [e.g., 2.0.0]

**Console Errors**
```
Paste any console errors here
```

**Additional Context**
Any other relevant information
```

---

## 💡 Suggesting Features

### Feature Request Template
```markdown
**Feature Title**
Clear, descriptive title

**Problem Statement**
What problem does this solve?

**Proposed Solution**
Detailed description of the feature

**Alternatives Considered**
Other solutions you've thought about

**Benefits**
- Benefit 1
- Benefit 2

**Mockups/Examples**
Visual examples if applicable

**Additional Context**
Any other relevant information
```

---

## 🌟 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in documentation
- Invited to contributor Discord (coming soon)

---

## 📞 Community

### Getting Help
- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Email**: [your-email@example.com]
- **Discord**: [Coming soon]

### Communication Guidelines
- Be respectful and professional
- Stay on topic
- Provide context and details
- Be patient with responses
- Help others when you can

---

## 📚 Additional Resources

### Learning Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Web Audio API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

### Tools
- [VS Code](https://code.visualstudio.com/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Git Documentation](https://git-scm.com/doc)

---

## ❓ Questions?

If you have questions about contributing, feel free to:
- Open a GitHub Discussion
- Email the maintainers
- Ask in the community Discord

---

**Thank you for contributing to TypeMaster! 🎉**

*Every contribution, no matter how small, makes a difference!*
