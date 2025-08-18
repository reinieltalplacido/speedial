# SpeedDial - Personal Link Dashboard


A modern, responsive web application for managing and accessing your favorite links from any device. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **Cross-Device Sync**: Access your links from computer, phone, laptop, or any device
- **QR Code Sharing**: Generate QR codes to quickly access your SpeedDial on mobile devices
- **Data Backup**: Export and import your links as JSON files for backup and transfer
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with dark/light mode support
- **PWA Support**: Install as a mobile app on your phone or tablet
- **Real-time Updates**: Changes sync instantly across all devices

## 🚀 Quick Start

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/speedial.git
   cd speedial
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

### Deploy to Production

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

**Quick deployment options:**
- **Vercel** (Recommended): Connect your GitHub repo to Vercel for automatic deployments
- **Netlify**: Deploy with one click from your GitHub repository
- **Railway**: Simple deployment with automatic scaling

## 📱 Access from Any Device

### Method 1: Deploy and Share URL
1. Deploy your app to a hosting service (Vercel, Netlify, etc.)
2. Share the URL with yourself via email, messaging, or bookmark
3. Access from any device using the same URL

### Method 2: QR Code Sharing
1. Click the "Share" button in the app
2. Scan the generated QR code with your phone's camera
3. Open the link on your mobile device

### Method 3: Data Backup/Import
1. Export your links using the "Backup" button
2. Transfer the JSON file to another device
3. Import the file on the new device

### Method 4: Install as Mobile App
1. Open the app on your mobile device
2. Add to home screen (iOS) or install as PWA (Android)
3. Access like a native app

## 🛠️ How It Works

### Data Storage
- **Development**: JSON file-based storage in the `data/` directory
- **Production**: Can be easily upgraded to use databases like PostgreSQL, MongoDB, or cloud services

### API Endpoints
- `GET /api/links` - Fetch all links
- `POST /api/links` - Create a new link
- `PUT /api/links` - Update an existing link
- `DELETE /api/links?id=<id>` - Delete a link

### Cross-Device Synchronization
The app uses a centralized API to store and retrieve links, ensuring that:
- All devices access the same data
- Changes are immediately reflected across devices
- No local storage conflicts

## 📋 Usage Guide

### Adding Links
1. Click the "Add Link" button
2. Enter the title, URL, and category
3. Click "Add Link" to save

### Editing Links
1. Click the edit icon on any link card
2. Modify the title, URL, or category
3. Click "Save Changes"

### Deleting Links
1. Click the delete icon on any link card
2. Confirm the deletion

### Sharing Your SpeedDial
1. Click the "Share" button
2. Choose from:
   - Scan QR code with phone
   - Share URL directly
   - Download QR code image

### Backup and Restore
1. Click the "Backup" button
2. Export: Download your links as JSON
3. Import: Upload a previously exported file

## 🔧 Customization

### Styling
The app uses Tailwind CSS for styling. Modify `src/app/globals.css` and component files to customize the appearance.

### Categories
Add predefined categories by modifying the category input or implementing a dropdown with common categories.

### Features
- Add authentication for private access
- Implement real-time sync with WebSockets
- Add link analytics and usage tracking
- Create custom themes and layouts

## 🏗️ Project Structure

```
speedial/
├── src/
│   ├── app/
│   │   ├── api/links/          # API routes
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Main page
│   ├── components/
│   │   ├── ui/                 # UI components
│   │   ├── DataBackup.tsx      # Backup/restore functionality
│   │   ├── LinkCard.tsx        # Individual link display
│   │   ├── LinkForm.tsx        # Add/edit link form
│   │   ├── LinkGrid.tsx        # Grid layout for links
│   │   └── QRCodeShare.tsx     # QR code generation
│   └── lib/
│       ├── api.ts              # API client functions
│       └── utils.ts            # Utility functions
├── public/
│   ├── manifest.json           # PWA manifest
│   └── favicon-32x32.ico       # App icon
└── data/                       # JSON data storage (created automatically)
```

## 🚀 Deployment Options

### Vercel (Recommended)
- Free tier available
- Automatic deployments from GitHub
- Built-in analytics and performance monitoring
- Global CDN

### Netlify
- Free tier available
- Easy deployment from Git
- Form handling and serverless functions

### Railway
- Simple deployment process
- Automatic scaling
- Database integration

### Self-hosted
- Full control over your data
- Custom domain support
- Database of your choice

## 🔒 Security Considerations

- **HTTPS**: Always use HTTPS in production
- **Authentication**: Consider adding user authentication for private access
- **Rate Limiting**: Implement rate limiting to prevent abuse
- **Input Validation**: All user inputs are validated
- **CORS**: Configure CORS properly for cross-origin requests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:
1. Check the [deployment guide](./DEPLOYMENT.md)
2. Review the console for error messages
3. Ensure all dependencies are installed
4. Verify the API endpoints are working

## 🎯 Roadmap

- [ ] User authentication and private links
- [ ] Real-time synchronization
- [ ] Link analytics and usage tracking
- [ ] Custom themes and layouts
- [ ] Browser extension integration
- [ ] Mobile app (React Native)
- [ ] Advanced search and filtering
- [ ] Link categories and tags
- [ ] Import from browser bookmarks
- [ ] Social sharing features

---

**Happy SpeedDialing! 🚀** 

