# Housework Tracker App

This is a modern web application for managing household tasks and tracking plant care schedules. Built with React and Vite, featuring a responsive mobile-friendly interface powered by Material-UI.

## Features

- **Task Cards**: View tasks organized by categories with visual progress indicators
- **Task Details**: Access comprehensive task information through an expandable drawer interface
- **Plant Care Guide**: Browse plant care instructions organized by categories (watering frequency, location, maintenance tips)
- **Responsive Design**: Optimized for mobile and desktop devices with bottom navigation
- **Settings Page**: Additional information for household need.

## Technology Stack

- **React** 19.2.0 - UI framework
- **Vite** 7.2.4 - Build tool and dev server
- **Material-UI (MUI)** 7.3.6 - Component library
- **Emotion** 11.14.0 - CSS-in-JS styling
- **React DOM** 19.2.0 - DOM rendering

## Project Structure

```
src/
├── App.jsx                 # Main application component with routing logic
├── App.css                 # Global application styles
├── index.css              # Base CSS reset and typography
├── main.jsx               # Application entry point
├── api/
│   └── dataService.js     # API data fetching and transformation
├── components/
│   ├── Housework/
│   │   ├── TaskCard.jsx         # Individual task card component
│   │   └── TaskDetailDrawer.jsx      # Task details side drawer
│   └── Layout/
│       └── BottomNav.jsx    # Bottom navigation component
├── pages/
│   ├── Home.jsx           # Main task management page
│   ├── PlantGuide.jsx     # Plant care guide page
│   └── Settings.jsx       # Settings and information page
└── utils/
    └── dataTransformer.js # Data transformation utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js 14+ and npm/yarn installed

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd housework-tracker-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or your configured host)

## 📦 Available Scripts

- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run deploy` - Deploy to GitHub Pages

## 🎨 Design Theme

The application uses a custom Material-UI theme with:
- **Primary Color**: Green (#4caf50) - representing growth and household care
- **Secondary Color**: Orange (#ff9800) - for accent elements
- **Background**: Light gray (#f4f6f8) - for better readability

## Main Pages

### Home Page
Displays household tasks with task cards showing:
- Task name and description
- Associated items/subtasks
- Completion status
- Expandable details drawer with full information

### Plant Guide
Browse plant care information organized by:
- Plant categories
- Watering frequency
- Location requirements
- Care instructions and tips

### Settings
Configuration and application information page

## Deployment

The application is deployed to GitHub Pages. To deploy:

1. Build the application:
```bash
npm run build
```

2. Deploy:
```bash
npm run deploy
```

Visit: https://abe9284.github.io/house-care-app/

## 🔧 Development

### Component Hierarchy

- **App** (Main app with theme and routing)
  - **Home** (Task management and data fetching)
    - TaskCard (Individual task display)
    - TaskDetailDrawer (Detailed task information)
  - **PlantGuide** (Plant care information)
  - **Settings** (House amenties setting page)
  - **BottomNav** (Navigation between pages)

### State Management

The application uses React hooks for state management:
- `currentTab` - Tracks the active page in navigation
- `allData` - Stores fetched housework and plant data
- `tasks` - Manages task completion status
- `selectedTask` - Stores the currently selected task for detail view

## Key Features Implementation

### Task Tracking
Tasks can be marked as completed individually. Each task contains items that can also be tracked separately.

### Data Transformation
The `dataTransformer.js` utility handles API response transformation and data normalization.

### Responsive Navigation
Bottom navigation component allows seamless switching between Home, Plant Guide, and Settings pages.

## 📝 License

This project is private and not open for public use.

---

