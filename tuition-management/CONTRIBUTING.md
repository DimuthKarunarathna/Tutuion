# Contributing to Tuition Management System

Thank you for your interest in contributing to the Tuition Management System! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Development Setup

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/tuition-management.git
   cd tuition-management
   ```

3. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # Copy example environment files
   cp backend/env.example backend/.env
   cp frontend/env.example frontend/.env
   
   # Edit the .env files with your configuration
   ```

5. **Start the development servers**
   ```bash
   # Backend (Terminal 1)
   cd backend
   npm run dev
   
   # Frontend (Terminal 2)
   cd frontend
   npm run dev
   ```

## Development Guidelines

### Code Style

- Use consistent indentation (2 spaces)
- Follow existing code patterns
- Write meaningful variable and function names
- Add comments for complex logic

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add student search functionality
fix: resolve payment calculation bug
docs: update API documentation
style: format code according to style guide
refactor: simplify dashboard component
test: add unit tests for payment module
```

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, tested code
   - Update documentation if needed
   - Add tests for new features

3. **Test your changes**
   ```bash
   # Backend tests
   cd backend
   npm test
   
   # Frontend tests
   cd frontend
   npm test
   ```

4. **Submit a pull request**
   - Provide a clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes

## Project Structure

```
tuition-management/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Areas for Contribution

### Backend
- API endpoint improvements
- Database optimization
- Authentication & authorization
- Data validation
- Error handling

### Frontend
- UI/UX improvements
- Component optimization
- State management
- Responsive design
- Accessibility

### Documentation
- API documentation
- User guides
- Code comments
- README updates

## Reporting Issues

When reporting issues, please include:

1. **Description**: Clear description of the problem
2. **Steps to reproduce**: Detailed steps to reproduce the issue
3. **Expected behavior**: What should happen
4. **Actual behavior**: What actually happens
5. **Environment**: OS, Node.js version, browser version
6. **Screenshots**: If applicable

## Feature Requests

For feature requests, please:

1. Check existing issues first
2. Provide a clear description
3. Explain the use case
4. Consider implementation complexity

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

## Questions?

Feel free to open an issue for questions or reach out to the maintainers.

Thank you for contributing! 🎉
