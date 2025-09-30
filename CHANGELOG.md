# Changelog

All notable changes to TypeMaster will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-09-30

### Added
- **Keyboard Sound System** - 6 different sound types with volume control
  - Mechanical (Cherry MX Blue style)
  - Typewriter (Vintage mechanical)
  - ASMR (Soft pink noise)
  - Soft (Membrane keyboard)
  - Clicky (Tactile switches)
  - Silent (Subtle feedback)
- **Volume Control** - Adjustable slider (0-100%) with real-time preview
- **Web Audio API Integration** - Real-time sound generation without external files
- **Sound Preview** - Test sounds when changing type or adjusting volume

### Changed
- Improved settings panel layout for better organization
- Enhanced user experience with audio feedback
- Updated help modal with keyboard sound documentation

### Technical
- Implemented Web Audio API for sound generation
- Added audio context initialization and management
- Created 6 distinct sound generation functions
- Integrated volume multiplier across all sounds
- Added event listeners for sound controls

---

## [1.5.0] - 2025-09-15

### Added
- **Curriculum Mode** - Structured learning path with progressive lessons
- **Numbers Only Mode** - Practice typing numbers and special characters
  - Random, Sequential, Decimal, and Phone number formats
- **Prediction Challenge Mode** - Type predicted text to improve flow
- **AI Practice Mode** - Personalized practice based on weaknesses

### Changed
- Improved game mode selector UI
- Enhanced mode-specific settings display
- Better organization of practice modes

### Fixed
- Word generation issues in survival mode
- Timer display bugs in custom time mode

---

## [1.0.0] - 2025-09-01

### Added
- **Core Typing Test** - Timed typing test with real-time stats
- **Survival Mode** - Continue until max mistakes or time limit
- **Multiple Difficulty Levels** - Easy, Medium, Hard word lists
- **Language Support** - English and Bangla
- **Punctuation Toggle** - Enable/disable punctuation and capitals
- **Real-time Statistics**
  - WPM (Words Per Minute)
  - Accuracy percentage
  - Correct/Incorrect word count
  - Keystroke tracking
  - Time remaining
- **Visual Feedback**
  - Color-coded character highlighting
  - Current word emphasis
  - Word completion indicators
- **On-Screen Keyboard** - Visual keyboard with key highlighting
- **5 Color Themes**
  - Light (default)
  - Dark
  - Blue
  - Pink
  - Green
- **4 Font Options**
  - Default (Segoe UI)
  - Monospace
  - Serif
  - Sans-Serif
- **Firebase Integration**
  - User authentication (Email/Password)
  - Google Sign-In
  - Cloud Firestore data storage
  - Profile management
- **Achievement System**
  - Speed achievements
  - Accuracy achievements
  - Endurance achievements
  - Special achievements
- **Analytics & Charts**
  - Progress over time (Chart.js)
  - Accuracy by character
  - Typing heatmap
  - Error breakdown
  - AI performance analysis
- **Results Modal** - Detailed test results with sharing options
- **Tutorial System** - First-time user guide
- **Help Modal** - Comprehensive help documentation
- **Keyboard Shortcuts**
  - Tab: Start/Restart test
  - Escape: Stop test
  - Auto-start on typing
- **Responsive Design** - Mobile and desktop support
- **Accessibility Features**
  - Keyboard navigation
  - ARIA labels
  - Focus indicators

### Technical
- Vanilla JavaScript (ES6+)
- HTML5 semantic markup
- CSS3 with CSS variables for theming
- Firebase Authentication
- Cloud Firestore
- Chart.js for data visualization
- Font Awesome icons
- Web Audio API foundation

---

## [0.5.0] - 2025-08-15 (Beta)

### Added
- Basic typing test functionality
- Timer system
- Word generation
- Input validation
- Simple statistics (WPM, Accuracy)
- Basic UI layout

### Changed
- Improved word highlighting
- Better input handling
- Enhanced visual feedback

### Fixed
- Timer accuracy issues
- Word generation bugs
- Input field focus problems

---

## [0.1.0] - 2025-08-01 (Alpha)

### Added
- Initial project setup
- Basic HTML structure
- CSS styling foundation
- JavaScript framework
- Firebase configuration
- Word lists (English)

---

## Upcoming Features

### [2.1.0] - Planned
- [ ] Multiplayer racing mode
- [ ] Global leaderboards
- [ ] Friends system
- [ ] Custom text import
- [ ] More keyboard sound types
- [ ] Sound pack library
- [ ] Advanced statistics dashboard
- [ ] Export test history

### [2.2.0] - Planned
- [ ] Mobile app (iOS/Android)
- [ ] Offline mode improvements
- [ ] More languages (Spanish, French, German)
- [ ] Team/Organization features
- [ ] Typing certificates
- [ ] Advanced curriculum lessons
- [ ] Video tutorials
- [ ] Community features

### [3.0.0] - Future
- [ ] AI typing coach with voice feedback
- [ ] VR typing practice
- [ ] Gamification enhancements
- [ ] Seasonal events
- [ ] Premium features
- [ ] API for third-party integrations

---

## Version History Summary

| Version | Date | Major Changes |
|---------|------|---------------|
| 2.0.0 | 2025-09-30 | Keyboard sounds, volume control |
| 1.5.0 | 2025-09-15 | New game modes (Curriculum, Numbers, Prediction, AI Practice) |
| 1.0.0 | 2025-09-01 | Initial release with core features |
| 0.5.0 | 2025-08-15 | Beta version |
| 0.1.0 | 2025-08-01 | Alpha version |

---

## Migration Guides

### Upgrading from 1.x to 2.0

**New Features**:
- Keyboard sounds are now available in settings
- Default sound is "Mechanical" at 70% volume
- Volume control slider added to settings panel

**Breaking Changes**:
- None - fully backward compatible

**Data Migration**:
- No data migration required
- User preferences will be preserved

**Action Required**:
- None - automatic upgrade

---

## Contributors

- **Taafeef Bin Montaquim** - Lead Developer

---

## License

This project is licensed under the MIT License - see LICENSE.md for details.

---

*For detailed feature documentation, see FEATURES.md*
*For user instructions, see USER_GUIDE.md*
*For development information, see DEVELOPER_GUIDE.md*
