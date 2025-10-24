# Transer MVP Project Instructions

This is a Turborepo monorepo containing:
- **apps/transer-central**: Next.js admin app for video content management
- **apps/mobile**: React Native mobile app with video viewing and flashlight sync features
- **packages/db**: Prisma database package connected to Supabase
- **packages/ui**: Shared UI components with Tailwind CSS v4

## Technology Stack
- Turborepo for monorepo management
- TypeScript for type safety
- Supabase for backend and authentication
- Prisma ORM for database access
- Tailwind CSS v4 for styling
- Next.js 14+ for admin web app
- React Native with Expo for mobile app

## Development Guidelines
- Use TypeScript strict mode
- Follow ESLint and Prettier configurations
- Share components through packages/ui when applicable
- Use Supabase Auth for both applications
- Maintain consistent code style across all packages
