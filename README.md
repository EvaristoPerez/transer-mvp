# Transer MVP - Turborepo Monorepo

A full-stack video content management and mobile viewing platform built with modern technologies.

## Project Structure

```
transer-mvp/
├── apps/
│   ├── transer-central/    # Next.js admin web app
│   └── mobile/             # React Native mobile app (Expo)
├── packages/
│   ├── db/                 # Prisma database package
│   ├── ui/                 # Shared UI components
│   └── tsconfig/           # Shared TypeScript configs
└── turbo.json              # Turborepo configuration
```

## Technology Stack

- **Turborepo** - Monorepo build system
- **TypeScript** - Type-safe development
- **Supabase** - Backend, database, and authentication
- **Prisma** - Type-safe database ORM
- **Tailwind CSS v4** - Utility-first CSS framework
- **Next.js 14+** - React framework for admin app
- **React Native + Expo** - Mobile app framework

## Apps

### transer-central (Admin Web App)
Next.js application for administrators to manage video content:
- Upload and organize videos
- Manage video metadata
- User management
- Content publishing controls

### mobile (React Native App)
Mobile app for end users with:
- Video browsing and playback
- Music-synced flashlight feature
- Screen flash mode synchronized to audio
- Supabase authentication

## Packages

### @transer/db
Prisma database package with:
- PostgreSQL schema
- Supabase connection
- Type-safe database client
- Shared across both apps

### @transer/ui
Shared React components:
- Button
- Card
- Input
- Styled with Tailwind CSS v4

### @transer/tsconfig
Shared TypeScript configurations for:
- Base config
- Next.js projects
- React Native projects

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- For mobile: Expo CLI and mobile development setup

### Installation

1. **Clone and install dependencies:**

```bash
cd transer-mvp
npm install
```

2. **Setup Supabase:**

Create a Supabase project at https://supabase.com

3. **Configure environment variables:**

For `packages/db`:
```bash
cp packages/db/.env.example packages/db/.env
```
Edit `packages/db/.env` with your Supabase database URLs.

For `apps/transer-central`:
```bash
cp apps/transer-central/.env.example apps/transer-central/.env.local
```
Edit with your Supabase URL and anon key.

For `apps/mobile`:
```bash
cp apps/mobile/.env.example apps/mobile/.env
```
Edit with your Supabase URL and anon key.

4. **Initialize database:**

```bash
npm run db:push
```

This will push the Prisma schema to your Supabase database.

### Development

**Run all apps in development mode:**
```bash
npm run dev
```

**Run specific app:**
```bash
# Web admin app
cd apps/transer-central
npm run dev

# Mobile app
cd apps/mobile
npm start
```

**Database commands:**
```bash
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Prisma Studio
```

### Building

**Build all apps:**
```bash
npm run build
```

**Build specific app:**
```bash
cd apps/transer-central
npm run build
```

## Features

### Admin App (transer-central)
- 🎥 Video content management
- 📊 Dashboard with analytics
- 👥 User management
- 🔐 Supabase authentication
- 🎨 Tailwind CSS v4 styling

### Mobile App
- 📱 Cross-platform (iOS & Android)
- 🎬 Video library browsing
- ⚡ Music-synced flash feature:
  - Flashlight mode (device torch)
  - Screen flash mode (display)
  - Real-time audio detection
  - Beat synchronization
- 🔐 Supabase authentication
- 🎨 NativeWind (Tailwind for React Native)

## Database Schema

### User Model
- Email-based authentication
- Role-based access (USER, ADMIN)
- Linked to created videos

### Video Model
- Title, description, URLs
- Thumbnail support
- Duration tracking
- Publish status
- Creator relationship

## Environment Variables

### Supabase Configuration
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `DATABASE_URL` - PostgreSQL connection string (pooler)
- `DIRECT_URL` - Direct PostgreSQL connection (for migrations)

## Scripts

Root package.json scripts:
- `npm run dev` - Start all apps in development
- `npm run build` - Build all apps
- `npm run lint` - Lint all packages
- `npm run type-check` - Type check all packages
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database changes
- `npm run db:studio` - Open Prisma Studio

## Deployment

### Admin App (transer-central)
Deploy to Vercel:
```bash
cd apps/transer-central
vercel
```

Configure environment variables in Vercel dashboard.

### Mobile App
Build and submit:
```bash
cd apps/mobile
eas build --platform all
eas submit
```

## Contributing

This is an MVP project. Future enhancements:
- Advanced beat detection algorithm
- Video streaming optimization
- Enhanced analytics
- Social features
- Content recommendations

## License

Private project - All rights reserved

## Support

For issues or questions, please contact the development team.
