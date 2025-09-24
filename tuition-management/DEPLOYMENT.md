# Deployment Guide

This guide covers different deployment options for the Tuition Management System.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- A hosting service (Vercel, Netlify, Heroku, etc.)

## Environment Setup

### 1. Environment Variables

Create environment files for production:

**Backend (.env)**
```env
PORT=5001
NODE_ENV=production
DB_PATH=./database.db
CORS_ORIGIN=https://your-frontend-domain.com
JWT_SECRET=your-production-jwt-secret
```

**Frontend (.env)**
```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_APP_NAME=Tuition Management System
VITE_APP_VERSION=1.0.0
VITE_DEV_MODE=false
```

## Deployment Options

### Option 1: Vercel (Recommended for Frontend)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd frontend
   vercel
   ```

3. **Configure Environment Variables**
   - Go to Vercel dashboard
   - Add environment variables
   - Redeploy

### Option 2: Netlify

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop `dist` folder to Netlify
   - Or connect GitHub repository

3. **Configure Environment Variables**
   - Go to Site settings > Environment variables
   - Add your variables

### Option 3: Heroku (Backend)

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Configure Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set PORT=5001
   ```

4. **Deploy**
   ```bash
   git subtree push --prefix backend heroku main
   ```

### Option 4: Railway

1. **Connect Repository**
   - Go to Railway.app
   - Connect your GitHub repository

2. **Configure Services**
   - Create two services: backend and frontend
   - Set build commands and start commands

3. **Environment Variables**
   - Add environment variables in Railway dashboard

## Database Considerations

### SQLite (Development)
- Good for development and small deployments
- File-based database
- No additional setup required

### PostgreSQL (Production)
For production, consider migrating to PostgreSQL:

1. **Install PostgreSQL dependencies**
   ```bash
   cd backend
   npm install pg
   ```

2. **Update database configuration**
   ```javascript
   // Use PostgreSQL instead of SQLite
   const { Pool } = require('pg');
   const pool = new Pool({
     connectionString: process.env.DATABASE_URL
   });
   ```

## Security Considerations

### 1. Environment Variables
- Never commit `.env` files
- Use strong, unique secrets
- Rotate secrets regularly

### 2. CORS Configuration
- Set specific origins in production
- Avoid using wildcard (*) in production

### 3. Rate Limiting
- Implement rate limiting for API endpoints
- Use services like Cloudflare for DDoS protection

### 4. HTTPS
- Always use HTTPS in production
- Most hosting services provide SSL certificates

## Monitoring and Logging

### 1. Error Tracking
Consider integrating error tracking services:
- Sentry
- Bugsnag
- Rollbar

### 2. Analytics
- Google Analytics
- Mixpanel
- Custom analytics

### 3. Logging
- Use structured logging
- Consider services like LogRocket or LogDNA

## Performance Optimization

### 1. Frontend
- Enable gzip compression
- Use CDN for static assets
- Implement lazy loading
- Optimize images

### 2. Backend
- Enable compression middleware
- Implement caching
- Use connection pooling
- Optimize database queries

## Backup Strategy

### 1. Database Backups
- Regular automated backups
- Test restore procedures
- Store backups securely

### 2. Code Backups
- Use version control (Git)
- Regular commits
- Tag releases

## Maintenance

### 1. Updates
- Keep dependencies updated
- Monitor security advisories
- Test updates in staging

### 2. Monitoring
- Set up uptime monitoring
- Monitor performance metrics
- Track error rates

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CORS_ORIGIN configuration
   - Ensure frontend URL is correct

2. **Database Connection Issues**
   - Verify database URL
   - Check connection limits

3. **Build Failures**
   - Check Node.js version
   - Verify all dependencies are installed

### Support
- Check logs for error messages
- Review environment variables
- Test locally first

## Cost Optimization

### 1. Hosting Costs
- Use free tiers when possible
- Monitor usage and upgrade as needed
- Consider serverless options

### 2. Database Costs
- Use appropriate database size
- Implement data archiving
- Monitor query performance

Remember to test your deployment thoroughly before going live!
