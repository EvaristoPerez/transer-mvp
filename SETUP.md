# Transer MVP Setup Guide

This guide will help you set up and run the Transer MVP project.

## Quick Start

### 1. Prerequisites Check

Ensure you have installed:
- ✅ Node.js 18+ (`node --version`)
- ✅ npm 10+ (`npm --version`)
- ✅ Git

For mobile development:
- ✅ Expo CLI (`npm install -g expo-cli`)
- ✅ iOS Simulator (Mac) or Android Studio
- ✅ Expo Go app on your physical device (optional)

### 2. Supabase Setup

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Wait for the database to be provisioned (~2 minutes)
4. Get your credentials from Project Settings > API:
   - Project URL
   - Anon/public key
   - Database connection strings (from Database settings)

### 3. Environment Configuration

#### For Database (packages/db)

Create `packages/db/.env`:
```bash
DATABASE_URL="postgresql://postgres:[PASSWORD]@[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres"
```

Replace:
- `[PASSWORD]` with your database password
- `[PROJECT-REF]` with your Supabase project reference

#### For Admin App (apps/transer-central)

Create `apps/transer-central/.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]

DATABASE_URL="postgresql://postgres:[PASSWORD]@[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres"
```

#### For Mobile App (apps/mobile)

Create `apps/mobile/.env`:
```bash
EXPO_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
```

### 4. Initialize Database

Push the Prisma schema to Supabase:
```bash
npm run db:push
```

This creates the tables defined in `packages/db/prisma/schema.prisma`.

### 5. Run Development Servers

#### Option A: Run Everything
```bash
npm run dev
```

This starts:
- Admin web app on http://localhost:3000
- Mobile app (follow terminal instructions)

#### Option B: Run Individually

**Admin Web App:**
```bash
cd apps/transer-central
npm run dev
```
Visit http://localhost:3000

**Mobile App:**
```bash
cd apps/mobile
npm start
```
Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your device

## Common Issues & Solutions

### Issue: "Cannot find module '@prisma/client'"

**Solution:** Generate Prisma client:
```bash
npm run db:generate
```

### Issue: Database connection errors

**Solution:**
1. Verify your Supabase project is active
2. Check DATABASE_URL and DIRECT_URL are correct
3. Ensure database password is URL-encoded if it contains special characters

### Issue: Mobile app not loading

**Solution:**
1. Ensure you're in the correct directory (`apps/mobile`)
2. Clear Expo cache: `npx expo start -c`
3. Reinstall dependencies: `rm -rf node_modules && npm install`

### Issue: Tailwind styles not working

**Solution:**
1. Restart development server
2. Clear build cache
3. Ensure `global.css` is imported in layout files

## Mobile App Features Setup

### Flashlight Feature (iOS/Android)

The flashlight sync feature requires:

**iOS:**
- Camera permission (automatically requested)
- Physical device (simulator doesn't have flashlight)

**Android:**
- Camera permission
- Flashlight permission
- Physical device

To test on physical device:
1. Install Expo Go from App Store/Play Store
2. Run `npm start` in `apps/mobile`
3. Scan QR code with Expo Go

### Audio Recording for Beat Detection

Currently uses placeholder implementation. To enhance:
1. Implement FFT analysis for beat detection
2. Use Web Audio API or native audio processing
3. Add beat detection library (e.g., `aubiojs`)

## Database Management

### View Database with Prisma Studio
```bash
npm run db:studio
```
Opens at http://localhost:5555

### Make Schema Changes

1. Edit `packages/db/prisma/schema.prisma`
2. Push changes: `npm run db:push`
3. Generate client: `npm run db:generate`

### Create Migration (Production)
```bash
cd packages/db
npx prisma migrate dev --name migration_name
```

## Building for Production

### Admin Web App

Build locally:
```bash
cd apps/transer-central
npm run build
npm start
```

Deploy to Vercel:
```bash
cd apps/transer-central
npx vercel
```

### Mobile App

Using EAS (Expo Application Services):

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login to Expo:
```bash
eas login
```

3. Configure project:
```bash
cd apps/mobile
eas build:configure
```

4. Build:
```bash
eas build --platform all
```

## Project Structure Explained

```
transer-mvp/
├── apps/
│   ├── transer-central/     # Next.js admin dashboard
│   │   ├── src/
│   │   │   ├── app/         # Next.js 14+ app directory
│   │   │   └── lib/         # Utilities (Supabase client)
│   │   └── package.json
│   │
│   └── mobile/              # React Native mobile app
│       ├── app/             # Expo Router file-based routing
│       │   ├── (tabs)/      # Tab navigation screens
│       │   └── _layout.tsx  # Root layout
│       ├── src/lib/         # Utilities (Supabase client)
│       └── package.json
│
├── packages/
│   ├── db/                  # Prisma database package
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── index.ts         # Prisma client export
│   │
│   ├── ui/                  # Shared React components
│   │   ├── components/
│   │   └── index.ts
│   │
│   └── tsconfig/            # TypeScript configs
│       ├── base.json
│       ├── nextjs.json
│       └── react-native.json
│
├── package.json             # Root workspace config
├── turbo.json               # Turborepo pipeline
└── README.md
```

## Next Steps

1. **Setup Authentication:**
   - Configure Supabase Auth providers
   - Implement login/signup flows
   - Add protected routes

2. **Video Upload:**
   - Setup Supabase Storage bucket
   - Implement video upload in admin app
   - Add thumbnail generation

3. **Beat Detection:**
   - Integrate audio analysis library
   - Implement real-time beat detection
   - Sync flashlight/screen flashes

4. **Testing:**
   - Add unit tests (Jest)
   - Add integration tests
   - Test on real devices

5. **Deployment:**
   - Deploy admin app to Vercel
   - Build mobile apps with EAS
   - Submit to App Store/Play Store

## Resources

- [Turborepo Docs](https://turbo.build/repo/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Expo Docs](https://docs.expo.dev)
- [Prisma Docs](https://www.prisma.io/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)

## Support

For questions or issues, refer to:
- Project README.md
- Individual package README files
- Official documentation links above

Happy coding! 🚀
