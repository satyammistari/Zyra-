# Deployment Guide for Zyra Product Search Engine

Your application is ready for deployment! Here are multiple deployment options:

## 🚀 Option 1: Vercel (Recommended for Next.js)

### Automatic Deployment from GitHub:
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with your GitHub account
3. Click "New Project"
4. Import your `satyammistari/Zyra-` repository
5. Vercel will automatically detect Next.js and deploy

### Manual Deployment:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? N
# - Project name: zyra-product-search
# - Directory: ./
# - Override settings? N
```

## 🌐 Option 2: Netlify

### From GitHub:
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect to GitHub and select `satyammistari/Zyra-`
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Manual Deployment:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=.next
```

## 📦 Option 3: GitHub Pages (Static Export)

Add to `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

Then:
```bash
npm run build
# Upload the 'out' folder to GitHub Pages
```

## 🐳 Option 4: Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Deploy to any cloud provider that supports Docker.

## Environment Variables

If you need environment variables, create them in your deployment platform:
- `NEXT_PUBLIC_API_URL` (for future API integrations)
- `NODE_ENV=production`

## Post-Deployment

After deployment:
1. Test all functionality
2. Update README with live URL
3. Set up custom domain (optional)
4. Configure analytics (optional)

## Troubleshooting

- **Build fails**: Check Node.js version (use 18+)
- **Images not loading**: Ensure image optimization is configured
- **Routing issues**: Check `vercel.json` or `netlify.toml` configuration

Your app is optimized and ready for production! 🎉
