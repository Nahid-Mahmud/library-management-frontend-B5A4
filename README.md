# 📚 Library Management System - Client

A modern, full-featured library management system built with React, TypeScript, and cutting-edge web technologies. This client application provides an intuitive interface for managing books, tracking borrowing activities, and maintaining library operations.

## 🚀 Features

### 📖 Book Management

- **Add New Books**: Easy-to-use form with validation for adding books to the library
- **Edit Books**: Update book information with real-time validation
- **View All Books**: Browse through the complete book collection with search and filter options
- **Book Details**: Detailed view of individual books with comprehensive information

### 🏠 User Experience

- **Modern UI**: Clean, responsive design built with Tailwind CSS
- **Interactive Modals**: Smooth dialog interactions for better user experience
- **Real-time Updates**: Instant feedback and updates across the application
- **Mobile Responsive**: Fully optimized for all device sizes

### 📊 Borrowing System

- **Borrow Books**: Streamlined book borrowing process
- **Borrowing Summary**: Comprehensive overview of all borrowing activities

## 🛠️ Tech Stack

### Frontend Framework

- **React 19.1.0** - Modern React with latest features
- **TypeScript** - Type-safe development experience
- **Vite 7.0.0** - Lightning-fast build tool and dev server

### State Management & Data Fetching

- **Redux Toolkit 2.8.2** - Predictable state management
- **RTK Query** - Powerful data fetching and caching

### UI & Styling

- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **React Icons** - Popular icon library
- **ShadCn** - Component Library

### Form Management & Validation

- **React Hook Form 7.59.0** - Performant, flexible forms
- **Zod 3.25.71** - TypeScript-first schema validation
- **@hookform/resolvers** - Seamless integration between RHF and Zod

### Routing & Navigation

- **React Router 7.6.3** - Declarative routing for React

### Developer Experience

- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Prettier Integration** - Consistent code formatting

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm/yarn

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Nahid-Mahmud/library-management-frontend-B5A4
   # go to the project folder
   cd library-management-frontend-B5A4
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🚀 Available Scripts

| Script         | Description                              |
| -------------- | ---------------------------------------- |
| `pnpm dev`     | Start development server with hot reload |
| `pnpm build`   | Build for production                     |
| `pnpm preview` | Preview production build locally         |
| `pnpm lint`    | Run ESLint for code quality checks       |

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── borrow-book/    # Borrowing-related components
│   ├── home/           # Home page components
│   ├── shared/         # Shared utility components
│   └── ui/             # Base UI components (buttons, inputs, etc.)
├── layout/             # Layout components
├── lib/                # Utility functions and configurations
├── pages/              # Page-level components
│   ├── add-books/      # Add books functionality
│   ├── allBooks/       # Book listing and management
│   ├── borrow-books-summary/ # Borrowing overview
│   ├── editBooks/      # Book editing functionality
│   └── home/           # Landing page
├── providers/          # Context providers
├── redux/              # State management
│   ├── api/            # API layer
│   ├── features/       # Feature-specific slices
│   └── store/          # Store configuration
├── routes/             # Routing configuration
└── types/              # TypeScript type definitions
```

## 🎨 UI Components

The application uses a comprehensive set of reusable UI components built with Radix UI primitives:

- **Forms**: Input, Label, Select, Textarea, Checkbox
- **Feedback**: Alert, Badge, Loader
- **Layout**: Card, Separator, Table
- **Interaction**: Button, Dialog, Modal
- **Navigation**: Responsive NavBar and Footer

## 🔧 Configuration

### Production Build

```bash
pnpm run build
# or
npm run build
```

### Deployment Platforms

The application is ready for deployment on:

- **Vercel** (recommended - config included)
- **Netlify**
- **AWS S3 + CloudFront**
- **Any static hosting platform**

## 🙏 Acknowledgments

- React team for the amazing framework
- Vercel team for Vite and deployment platform
- Radix UI team for accessible components
- Tailwind CSS team for the utility-first CSS framework

---