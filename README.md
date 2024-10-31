# OpsCanvas IDP (Internal Developer Platform)

A modern, cloud-native platform for managing and monitoring development resources, services, and infrastructure.

## Project Overview

OpsCanvas IDP is a web-based platform that provides:
- Centralized service management
- Resource monitoring and configuration
- Team collaboration tools
- API and component lifecycle management

### Features Implemented
- ✅ User Authentication
- ✅ Modern Dashboard Interface
- ✅ Resource Management
- ✅ Service Monitoring
- ✅ Team Management
- ✅ Search Functionality
- ✅ User Profile Management

### Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **UI Components**: Lucide React Icons
- **Routing**: React Router Dom
- **Styling**: Tailwind CSS

## Project Structure
```plaintext
frontend/
├── src/
│   ├── components/
│   │   ├── header/
│   │   │   └── Header.jsx
│   │   ├── profile/
│   │   │   └── UserProfileDropdown.jsx
│   │   └── Layout.jsx
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── Dashboard.jsx
│   │   └── Resources.jsx
│   ├── App.jsx
│   └── index.jsx
├── public/
│   └── index.html
├── package.json
└── tailwind.config.js
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Local Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd OpsCanvas-IDP
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Start the development server:
```bash
npm start
```

4. Access the application:
- Open your browser and navigate to `http://localhost:3000`
- Use the following demo credentials:
  - Email: demo@opscanvas.dev
  - Password: demo123

### Available Scripts
- `npm start` - Runs the development server
- `npm build` - Creates a production build
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App

## Features and Pages

### 1. Authentication
- Login page with email/password
- Session management
- Protected routes

### 2. Dashboard
- Overview of services and resources
- Quick stats and metrics
- Recent activity feed

### 3. Resource Management
- List of all resources
- Resource type filtering
- Status monitoring

### 4. Navigation
- Sidebar navigation
- Top navigation bar
- User profile dropdown

## Upcoming Features
- [ ] Dark mode support
- [ ] Advanced search functionality
- [ ] Real-time notifications
- [ ] Team collaboration features
- [ ] API documentation integration
- [ ] Resource deployment automation
- [ ] Metrics and analytics dashboard
- [ ] User role management

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use Tailwind CSS for styling
- Maintain component modularity

### Project Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.11.2",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.2",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24"
  }
}
```

## Contributing
1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Follow the code review process

## Troubleshooting

### Common Issues
1. Module not found errors:
   - Verify file paths and imports
   - Check for proper file extensions

2. Styling issues:
   - Ensure Tailwind CSS is properly configured
   - Check class names for typos

3. Routing issues:
   - Verify route definitions in App.jsx
   - Check authentication state

### Solutions
- Clear npm cache: `npm cache clean --force`
- Delete node_modules: `rm -rf node_modules package-lock.json`
- Reinstall dependencies: `npm install`

## Resources
- [React Documentation](https://reactjs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Lucide Icons](https://lucide.dev/)

## License
MIT License - Feel free to use this project for personal or commercial purposes.

## Contact
For support or queries, please contact:
- Email: support@opscanvas.dev
- GitHub Issues: [Create an issue](https://github.com/yourusername/opscanvas-idp/issues)