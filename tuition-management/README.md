# Tuition Management System

A full-stack web application for managing students, tutors, courses, and payments in a tuition center.

## Features

- **Student Management**: Add, edit, delete, and view students
- **Tutor Management**: Manage tutor information and subjects
- **Course Management**: Create and manage courses with tutor assignments
- **Payment Management**: Track student payments and fees

## Tech Stack

### Backend
- Node.js with Express.js
- SQLite database
- RESTful API endpoints

### Frontend
- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

### Tutors
- `GET /api/tutors` - Get all tutors
- `POST /api/tutors` - Create a new tutor
- `PUT /api/tutors/:id` - Update a tutor
- `DELETE /api/tutors/:id` - Delete a tutor

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create a new course
- `PUT /api/courses/:id` - Update a course
- `DELETE /api/courses/:id` - Delete a course

### Payments
- `GET /api/payments` - Get all payments
- `POST /api/payments` - Create a new payment
- `PUT /api/payments/:id` - Update a payment
- `DELETE /api/payments/:id` - Delete a payment

## Database Schema

The application uses SQLite with the following tables:

- **students**: id, name, email, course
- **tutors**: id, name, subject
- **courses**: id, title, description, tutorId
- **payments**: id, studentId, amount, date

## Usage

1. Start both backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Navigate through the different sections using the navigation bar
4. Add, edit, or delete records as needed

## Development

The application is set up for development with:
- Hot reloading for both frontend and backend
- CORS enabled for cross-origin requests
- Proxy configuration for API calls
