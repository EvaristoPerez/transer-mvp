# Development Commands Quick Reference

## Getting Started

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push database schema to Supabase
npm run db:push
```

## Development

```bash
# Run all apps (admin + mobile)
npm run dev

# Run admin web app only
cd apps/transer-central && npm run dev

# Run mobile app only
cd apps/mobile && npm start
```

## Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Open Prisma Studio (database GUI)
npm run db:studio
```

## Building

```bash
# Build all apps
npm run build

# Build admin app only
cd apps/transer-central && npm run build

# Type check all packages
npm run type-check

# Lint all packages
npm run lint
```

## Mobile App

```bash
cd apps/mobile

# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Clear cache and restart
npx expo start -c
```

## Cleaning

```bash
# Clean all build artifacts and node_modules
npm run clean

# Clean and reinstall
npm run clean && npm install
```

## Useful Turborepo Commands

```bash
# Run specific task in specific package
npx turbo run build --filter=transer-central

# Run task with dependencies
npx turbo run build --filter=@transer/ui...

# Clear Turborepo cache
npx turbo clean
```

## Environment Setup

```bash
# Copy example env files
cp packages/db/.env.example packages/db/.env
cp apps/transer-central/.env.example apps/transer-central/.env.local
cp apps/mobile/.env.example apps/mobile/.env

# Edit with your Supabase credentials
# Then run db:push
```
