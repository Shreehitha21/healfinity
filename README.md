A modern, full-stack health management platform built with React, TypeScript, and Supabase. Healfinity combines traditional remedies with modern healthcare to provide a holistic approach to wellness.
\
***link to view the app:
https://brilliant-gumption-5d7b87.netlify.app/

## 🚀 Features

### Core Functionality
- **User Authentication & Profiles** - Secure signup/login with personalized health profiles
- **Health Data Tracking** - Real-time monitoring of steps, heart rate, sleep, hydration, and weight
- **Disease Search & Treatment** - Comprehensive database of diseases with both traditional remedies and modern treatments
- **Video Consultations** - Book and join virtual appointments with healthcare professionals
- **Yoga Sessions** - Schedule live yoga sessions with certified instructors
- **Diet & Nutrition** - Location-based meal recommendations with detailed recipes
- **Favorites System** - Save and organize remedies, recipes, and yoga sessions
- **Smart Dashboard** - Dynamic health score calculation based on user activity

### Advanced Features
- **Real-time Data Persistence** - All user data stored securely in Supabase
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Interactive Health Metrics** - Visual progress tracking with charts and achievements
- **Location-based Recommendations** - Cuisine and meal plans adapted to user location
- **Comprehensive Search** - Find diseases, symptoms, remedies, and treatments
- **Notification System** - Smart alerts for appointments, medications, and health tips

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with full IntelliSense
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Lucide React** - Beautiful, customizable icons
- **Vite** - Fast build tool and development server

### Backend & Database
- **Supabase** - PostgreSQL database with real-time subscriptions
- **Row Level Security (RLS)** - Secure data access policies
- **Authentication** - Built-in user management with email/password
- **Real-time Updates** - Live data synchronization across devices

### Architecture
- **Component-based Architecture** - Modular, reusable React components
- **Custom Hooks** - Centralized data management and API calls
- **Context API** - Global state management for user authentication
- **TypeScript Interfaces** - Strongly typed data models
- **Responsive Design** - Mobile-first approach with Tailwind breakpoints

## 📊 Database Schema

### Tables
- **users** - User profiles and basic information
- **health_data** - Daily health metrics (steps, heart rate, sleep, etc.)
- **favorites** - User's saved remedies, recipes, and yoga sessions
- **consultations** - Scheduled and completed medical consultations
- **yoga_sessions** - Booked yoga sessions with instructors
- **symptoms** - User-logged symptoms and health observations

### Security
- Row Level Security (RLS) enabled on all tables
- User-specific data access policies
- Secure authentication with Supabase Auth

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Supabase project and get credentials
4. Configure environment variables
5. Run migrations to set up database schema
6. Start development server: `npm run dev`

### Environment Variables
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Friendly** - Adapted layouts for medium screens
- **Desktop Enhanced** - Full feature set on large screens
- **Touch Optimized** - Proper touch targets and gestures

## 🔒 Security Features

- **Authentication** - Secure email/password login
- **Data Privacy** - User data isolated with RLS
- **Input Validation** - Client and server-side validation
- **Secure API** - Protected endpoints with authentication
- **HTTPS Only** - Encrypted data transmission

This comprehensive health management system represents the future of integrated wellness platforms, combining the best of traditional and modern healthcare approaches in a beautiful, functional, and secure application.

