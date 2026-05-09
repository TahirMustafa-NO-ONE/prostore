# ProStore - Deployment Guide

## Deployment Options

Choose the best deployment platform for your needs.

## Vercel (Recommended)

Vercel is the platform built by the creators of Next.js and offers the best experience for Next.js applications.

### Steps

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/prostore.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - In Vercel dashboard, go to "Settings" → "Environment Variables"
   - Add the following:
     ```
     DATABASE_URL=your_mongodb_url
     JWT_SECRET=your_secret_key
     NEXTAUTH_SECRET=your_nextauth_secret
     NEXT_PUBLIC_API_URL=https://yourdomain.com
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel automatically builds and deploys

### Domain Configuration
- Go to Settings → Domains
- Add your custom domain
- Follow DNS instructions

---

## Netlify

### Setup

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build for production**
   ```bash
   pnpm build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Configure Environment Variables**
   - Site settings → Build & deploy → Environment
   - Add your variables

### Note
Netlify requires Firebase for server-side functionality or serverless functions.

---

## AWS (EC2 or Elastic Beanstalk)

### Using EC2

1. **Launch Node.js instance**
   - Use Ubuntu 22.04 LTS
   - Configure security groups

2. **SSH into instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ip
   ```

3. **Install dependencies**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Clone and setup**
   ```bash
   git clone your-repo
   cd prostore
   npm install
   ```

5. **Setup environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with production values
   ```

6. **Build and run**
   ```bash
   npm run build
   npm start
   ```

7. **Use PM2 for process management**
   ```bash
   npm install -g pm2
   pm2 start npm --name "prostore" -- start
   pm2 startup
   pm2 save
   ```

8. **Setup reverse proxy (Nginx)**
   ```bash
   sudo apt-get install nginx
   # Configure as reverse proxy for localhost:3000
   ```

---

## Docker Deployment

### Dockerfile

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    depends_on:
      - mongodb

  mongodb:
    image: mongo:5.0
    volumes:
      - mongo_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: password

volumes:
  mongo_data:
```

### Run with Docker

```bash
docker-compose up -d
```

---

## Railway

### Simple Deployment

1. Connect GitHub repository
2. Railway auto-detects Next.js
3. Add environment variables
4. Auto-deploys on push

---

## Heroku (Legacy)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Add MongoDB
heroku addons:create mongolab:sandbox

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

---

## Environment Variables for Production

All deployments require these variables:

```env
# Database
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/prostore

# Authentication
JWT_SECRET=your-very-long-random-secret-key-here
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# API
NEXT_PUBLIC_API_URL=https://yourdomain.com

# Optional - Payment
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

---

## Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migration complete
- [ ] Build passes without errors
- [ ] All tests passing
- [ ] No console errors in production
- [ ] SEO metadata configured
- [ ] Security headers set
- [ ] CORS configured correctly
- [ ] API rate limiting configured
- [ ] Logging configured
- [ ] Backups configured for database
- [ ] Monitoring/alerting setup

---

## Post-Deployment Verification

1. **Test critical paths**
   - User registration
   - Product browsing
   - Add to cart
   - Checkout flow

2. **Check performance**
   - Page load times
   - API response times
   - Database queries

3. **Verify connectivity**
   - Database access
   - API endpoints
   - Payment processor (if integrated)

4. **Monitor errors**
   - Application logs
   - Error tracking service
   - Performance metrics

---

## Monitoring & Maintenance

### Recommended Services

- **Monitoring**: DataDog, New Relic, or Sentry
- **Analytics**: Google Analytics, Mixpanel
- **Error Tracking**: Sentry, Rollbar
- **Performance**: Vercel Analytics, Web Vitals

### Regular Maintenance

```bash
# Update dependencies
npm update
npm audit fix

# Check for security vulnerabilities
npm audit

# Run unit tests
npm test

# Build verification
npm run build
```

---

## Rollback Procedure

### Vercel
- Go to Deployments
- Click "..." on previous deployment
- Select "Promote to Production"

### GitHub
- Revert commit
- Push to main
- Automatic redeploy

### Docker
- Pull previous image
- Restart container

---

## Performance Optimization

### Before Deployment

1. Enable compression
2. Optimize images
3. Minify CSS/JS
4. Set cache headers
5. Enable CDN

### Next.js Optimizations

```javascript
// next.config.ts
const nextConfig = {
  compress: true,
  productionBrowserSourceMaps: false,
  swcMinify: true,
};
```

### Database Optimization

- Add indexes
- Regular backups
- Monitor query performance
- Archive old data

---

## Disaster Recovery

### Backup Strategy

- Daily database backups
- Code repository backups
- Environment configuration backups
- Version control history

### Recovery Plan

1. Identify issue
2. Restore from backup
3. Test restoration
4. Deploy recovery
5. Monitor for issues

---

## Support & Help

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **MongoDB Docs**: https://docs.mongodb.com

---

**Always test deployments in a staging environment first!**
