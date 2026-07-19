# Mahmoud Fattah Portfolio

A modern, animated portfolio website for a front-end engineer, built with React, Vite, Tailwind CSS, and Framer Motion. The project presents professional experience, education, skills, featured projects, and a contact experience with motion-rich interactions and responsive layouts.

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-0.0.1-blue.svg)](https://github.com/Mahmoudfattah/Mahmoud-Fattah-Front-End-Developer)

## ✨ Features

- Animated personal portfolio experience with reveal-on-scroll sections
- Responsive layout optimized for desktop and mobile devices
- Dark/light theme support with persisted preference
- Interactive project showcase with pagination and external links
- Physics-inspired contact section with animated “bubble” UI
- Contact form powered by EmailJS and toast notifications
- Accessible interactions including keyboard-friendly buttons and ARIA labels
- Lazy-loaded content sections to improve perceived performance
- SEO metadata and social sharing tags in the document head

## 📸 Screenshots

![Home](./screenshots/home.png)
![Projects](./screenshots/projects.png)
![Contact](./screenshots/contact.png)

## 🛠 Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS variables + Tailwind CSS

### Animation

- Framer Motion
- react-useanimations
- CSS transitions and custom motion effects

### Styling

- Tailwind CSS
- Custom CSS variables for theming
- Responsive utility classes

### State Management

- React Context for theme state
- Local component state with React hooks

### Integrations

- EmailJS for the contact form
- React GA4 for pageview tracking
- react-hot-toast for notifications

### Deployment

- Netlify-ready build output
- Netlify headers configuration included

### Development Tools

- PostCSS and Autoprefixer
- Rollup visualizer for bundle analysis

## 📂 Project Structure

```text
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── public/
│   ├── cursor.cur
│   ├── google4161273e01b45dc0.html
│   ├── exp/
│   ├── imagesProjects/
│   └── Lifeinsequares/
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── assets/
│   │   ├── icons/
│   │   ├── images/
│   │   └── styles/
│   ├── components/
│   │   ├── PageReveal.jsx
│   │   └── pages/
│   └── context/
│       └── ThemeContext.jsx
└── netlify.toml
```

### What each area contains

- public/: static assets, images, and deployment-related files
- src/components/pages/: page sections such as Hero, About, Projects, Skills, and Contact
- src/context/: shared theme context for light/dark mode
- src/assets/: local images, icons, and styles
- src/index.css/: global styling, theme variables, and Tailwind entry points

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or newer
- npm or pnpm

### Installation

```bash
git clone https://github.com/Mahmoudfattah/Mahmoud-Fattah-Front-End-Developer.git
cd Mahmoud-Fattah-Front-End-Developer
npm install
```

### Run locally

```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## ⚙ Environment Variables

The project uses one optional environment variable for analytics:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

If this variable is not provided, the app falls back to the existing measurement ID configured in the source.

## 📜 Available Scripts

- npm run dev: starts the Vite development server
- npm run build: creates a production build in the dist folder
- npm run preview: serves the production build locally

## 🏗 Architecture Overview

The application is a single-page portfolio built around a root App component that composes a sequence of section components. The layout is driven by React and Tailwind, with section-level reveal animations handled by Framer Motion. The app uses lazy loading for several sections to reduce initial payload, and the theme is managed through a shared React context so the light/dark toggle remains consistent across the UI.

Key implementation details:

- The main experience is composed from discrete page sections rather than a client-side router.
- Several sections are lazy-loaded to reduce initial bundle cost.
- The contact experience uses a physics-based canvas layer and a modal form.
- The app includes custom background rendering and animated navigation patterns.

## 🎨 Design System

### Typography

The site uses font imports from Fontshare and Google Fonts, with emphasis on modern sans-serif styles for headlines and body copy.

### Spacing

Spacing is primarily handled through Tailwind utility classes and component-specific layout wrappers.

### Color palette

The design uses CSS custom properties for a light/dark theme system, including accent colors for primary actions and muted surfaces.

### Icons

Icons are provided through lucide-react and react-useanimations.

### Animations

Motion is used for reveal effects, hover states, button transitions, and the contact interaction layer.

### Responsive breakpoints

The layout relies on Tailwind’s responsive utilities for stacking, scaling, and spacing adjustments across breakpoints.

### Accessibility considerations

The UI includes semantic section structure, descriptive alt text, focusable controls, and reduced-motion-aware animation logic.

## ⚡ Performance Optimizations

The project includes several practical performance-oriented choices:

- Lazy loading for non-critical sections
- Optimized image loading with lazy decoding and async image handling
- Manual chunking for large dependencies in the Vite build config
- Production bundle visualization via rollup-plugin-visualizer
- Reduced-motion support for users who prefer less animation
- Static asset caching rules configured for Netlify

## ♿ Accessibility

The codebase includes a number of accessibility-focused patterns:

- ARIA labels on key interactive elements
- Semantic sectioning and headings
- Modal dialog behavior with ARIA attributes
- Keyboard-accessible selection buttons in the contact form
- Screen-reader-friendly live status messaging for paginated project content
- Alt text on presentation images

## 📱 Responsive Design

The portfolio is built to adapt across small and large screens. Content shifts from a more compact single-column layout on mobile to larger multi-column arrangements on wider screens, while interactive controls remain accessible and legible.

## 🔧 Deployment

The project is configured for deployment to Netlify. A Netlify configuration file is included, and the Vite build output is set to the standard dist directory.

Typical deployment flow:

1. Push changes to your repository.
2. Connect the repository to Netlify.
3. Set the build command to npm run build.
4. Set the publish directory to dist.

## 🤝 Contributing

Contributions are welcome. If you would like to improve the project, please open an issue or submit a pull request with a clear description of the change.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Mahmoud Fattah

- Portfolio: https://mahmoudfattah.netlify.app
- LinkedIn: https://www.linkedin.com/in/mahmoud-fattah-a541b0262/
- GitHub: https://github.com/Mahmoudfattah
- Email: mahmoudfattahdeveloper@gmail.com

## ⭐ Future Improvements

Potential next steps for the project include:

- Adding automated tests
- Introducing a small CMS or content-driven content model for projects and experience entries
- Expanding the portfolio with more case studies and richer project detail
- Improving performance further with more aggressive image optimization and asset compression
- Adding a lightweight blog or articles section
