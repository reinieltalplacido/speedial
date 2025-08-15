# SpeedDial Deployment Guide

This guide will help you deploy your SpeedDial application so you can access your links from any device (computer, phone, laptop, etc.).

## Option 1: Deploy to Vercel (Recommended)

### Prerequisites
- A GitHub account
- A Vercel account (free tier available)

### Steps:
1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/speedial.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Access your app:**
   - Vercel will provide you with a URL like `https://your-app.vercel.app`
   - You can now access your SpeedDial from any device using this URL

## Option 2: Deploy to Netlify

### Steps:
1. **Push your code to GitHub** (same as above)

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with your GitHub account
   - Click "New site from Git"
   - Choose your repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`
   - Click "Deploy site"

## Option 3: Deploy to Railway

### Steps:
1. **Push your code to GitHub** (same as above)

2. **Deploy to Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select your repository
   - Railway will automatically detect it's a Next.js app and deploy it

## Option 4: Self-hosted (Advanced)

### Prerequisites:
- A VPS or cloud server (DigitalOcean, AWS, etc.)
- Domain name (optional but recommended)

### Steps:
1. **Set up your server:**
   ```bash
   # Install Node.js and npm
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2 for process management
   sudo npm install -g pm2
   ```

2. **Deploy your app:**
   ```bash
   # Clone your repository
   git clone https://github.com/yourusername/speedial.git
   cd speedial

   # Install dependencies
   npm install

   # Build the app
   npm run build

   # Start with PM2
   pm2 start npm --name "speedial" -- start
   pm2 startup
   pm2 save
   ```

3. **Set up Nginx (optional but recommended):**
   ```bash
   sudo apt-get install nginx
   sudo nano /etc/nginx/sites-available/speedial
   ```

   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/speedial /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## Environment Variables (Optional)

For production, you might want to set environment variables:

```bash
# Create .env.local file
NEXT_PUBLIC_API_URL=https://your-domain.com
```

## Data Persistence

The current implementation uses a JSON file for data storage. For production use, consider:

1. **Database Integration:**
   - PostgreSQL with Prisma
   - MongoDB with Mongoose
   - Supabase (PostgreSQL with real-time features)

2. **Cloud Storage:**
   - Firebase Firestore
   - AWS DynamoDB
   - Google Cloud Firestore

## Security Considerations

1. **Add authentication** to prevent others from accessing your links
2. **Use HTTPS** (automatic with Vercel/Netlify/Railway)
3. **Rate limiting** to prevent abuse
4. **Input validation** (already implemented)

## Mobile Access

Once deployed, you can:
1. **Add to home screen** on mobile devices
2. **Bookmark** the URL in your browser
3. **Share** the URL with yourself via email/messaging

## Troubleshooting

### Common Issues:
1. **Build fails:** Check if all dependencies are in `package.json`
2. **API errors:** Ensure the API routes are working
3. **Data not syncing:** Check if the data directory is writable

### Support:
- Check the deployment platform's documentation
- Review the Next.js deployment guide
- Check the console for error messages

## Next Steps

After deployment, consider adding:
1. **User authentication** (NextAuth.js)
2. **Real-time sync** (WebSockets or Server-Sent Events)
3. **Offline support** (Service Workers)
4. **Mobile app** (React Native or PWA)
