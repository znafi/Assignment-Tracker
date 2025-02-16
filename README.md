# Assignment Dashboard

A modern, dark-themed assignment tracking application built with Next.js and Chakra UI. This application helps students manage their assignments with features like time tracking, due date management, and user authentication.

## Features

- 🌙 Dark Mode UI
- 🔐 User Authentication
- ⏰ Time Tracking for Assignments
- 📅 Due Date Management
- 🎨 Modern, Responsive Design
- 🚀 Fast Performance with Next.js
- 🎯 Intuitive Assignment Management

## Tech Stack

- **Framework**: [Next.js 13](https://nextjs.org/)
- **UI Library**: [Chakra UI](https://chakra-ui.com/)
- **Styling**: [Chakra UI + Custom Theme](https://chakra-ui.com/docs/styled-system/theme)
- **Authentication**: Custom JWT with HTTP-only cookies
- **Database**: SQLite with Prisma
- **Deployment**: [Vercel](https://vercel.com)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/znafi/hello.git
   cd assignment-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-secret-key"
   ```

4. **Initialize the database**
   ```bash
   npx prisma migrate dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Features in Detail

### User Authentication
- Secure login and registration system
- JWT-based authentication with HTTP-only cookies
- Protected routes and API endpoints

### Assignment Management
- Create, edit, and delete assignments
- Set due dates with time
- Track time remaining until due date
- Mark assignments as complete

### Dark Theme
- Built-in dark theme for reduced eye strain
- Custom Chakra UI theme configuration
- Consistent dark mode across all components

## Project Structure

```
assignment-dashboard/
├── src/
│   ├── app/                 # Next.js 13 app directory
│   │   ├── api/            # API routes
│   │   ├── providers.tsx   # Chakra UI providers
│   │   └── layout.tsx      # Root layout
│   ├── components/         # React components
│   ├── lib/                # Utility functions
│   └── middleware.ts       # Authentication middleware
├── prisma/                 # Database schema and migrations
└── public/                 # Static assets
```




