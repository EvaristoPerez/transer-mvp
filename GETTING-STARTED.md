# 🚀 Getting Started with Transer MVP

## ✅ Pre-Setup Checklist

Your project structure is ready! Follow these steps to get everything running.

### 1. ✅ COMPLETED: Project Scaffolding
- ✅ Turborepo monorepo structure created
- ✅ Next.js admin app (`apps/transer-central`)
- ✅ React Native mobile app (`apps/mobile`)
- ✅ Prisma database package (`packages/db`)
- ✅ Shared UI components (`packages/ui`)
- ✅ Dependencies installed
- ✅ Prisma client generated

## 📋 Next Steps (Your Action Items)

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: transer-mvp
   - **Database Password**: (create a strong password and save it!)
   - **Region**: Choose closest to you
5. Wait 2-3 minutes for provisioning

### Step 2: Get Supabase Credentials
Once your project is ready:

1. Go to **Project Settings** > **API**
   - Copy **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - Copy **anon/public** key

2. Go to **Project Settings** > **Database**
   - Scroll to **Connection String**
   - Copy **URI** (for pooler connection)
   - Copy **Direct connection** string
   - Replace `[YOUR-PASSWORD]` with your database password

### Step 3: Configure Environment Variables

#### For Database Package
Create `packages/db/.env`:
```bash
cd packages/db
copy .env.example .env
```

Edit `packages/db/.env` with your credentials:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@xxxxx.supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:YOUR_PASSWORD@xxxxx.supabase.co:5432/postgres"
```

#### For Admin Web App
Create `apps/transer-central/.env.local`:
```bash
cd apps/transer-central
copy .env.example .env.local
```

Edit `apps/transer-central/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@xxxxx.supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:YOUR_PASSWORD@xxxxx.supabase.co:5432/postgres"
```

#### For Mobile App
Create `apps/mobile/.env`:
```bash
cd apps/mobile
copy .env.example .env
```

Edit `apps/mobile/.env`:
```env
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 4: Initialize Database
From the root directory:
```powershell
npm run db:push
```

This will create the `users` and `videos` tables in your Supabase database.

### Step 5: Run Development Servers

#### Option A: Run Everything at Once
```powershell
npm run dev
```

This starts:
- **Admin app**: http://localhost:3000
- **Mobile app**: Follow terminal instructions

#### Option B: Run Apps Separately

**Terminal 1 - Admin Web App:**
```powershell
cd apps/transer-central
npm run dev
```
Open: http://localhost:3000

**Terminal 2 - Mobile App:**
```powershell
cd apps/mobile
npm start
```

Then:
- Press `i` for iOS Simulator (Mac only)
- Press `a` for Android Emulator
- Scan QR code with Expo Go app on your phone

## 🎯 Quick Verification

### Verify Admin App
1. Open http://localhost:3000
2. You should see the "Transer Central - Admin Dashboard"
3. Three cards: Videos, Upload, Settings

### Verify Mobile App
1. After `npm start`, scan QR with Expo Go
2. You should see 3 tabs: Videos, Flashlight, Profile
3. Flashlight tab has toggle between Flashlight/Screen modes

### Verify Database
```powershell
npm run db:studio
```
Opens Prisma Studio at http://localhost:5555
You should see empty `users` and `videos` tables.

## 🔧 Troubleshooting

### "Cannot find module '@prisma/client'"
```powershell
npm run db:generate
```

### Database connection failed
- Verify your `.env` files have correct credentials
- Check Supabase project is active (not paused)
- URL-encode special characters in password

### Mobile app won't start
```powershell
cd apps/mobile
npm install
npx expo start -c
```

### TypeScript errors
The CSS `@tailwind` warnings are normal - they'll work at runtime.
The mobile NativeWind types should be configured now.

## 📱 Testing Mobile Features

### Test Flashlight Feature
**Important:** Must use physical device (simulators don't have flashlight)

1. Install Expo Go on your phone
2. Run `cd apps/mobile && npm start`
3. Scan QR code
4. Grant camera and microphone permissions
5. Go to Flashlight tab
6. Tap "Start Flashing"

## 📚 Useful Commands

```powershell
# View all commands
npm run

# Database commands
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:studio      # Open database GUI

# Development
npm run dev            # Run all apps
npm run build          # Build all apps
npm run lint           # Lint all packages
npm run type-check     # Type check all packages

# Clean and restart
npm run clean          # Remove build artifacts
npm install            # Reinstall dependencies
```

## 🎉 You're Ready!

Once you've completed Steps 1-5 above, your full-stack application will be running!

**Admin App Features:**
- Dashboard with overview cards
- Styled with Tailwind CSS v4
- Connected to Supabase

**Mobile App Features:**
- Video browsing tab
- Flashlight sync feature
- Profile tab
- NativeWind styling

## 📖 Next Development Steps

See `SETUP.md` for detailed information on:
- Setting up authentication
- Implementing video upload
- Enhancing beat detection algorithm
- Deployment guides

## 💡 Tips

1. Keep both terminal windows open when developing
2. Use Prisma Studio to inspect database changes
3. Test mobile app on real device for full functionality
4. Check `COMMANDS.md` for quick command reference

---

Need help? Check:
- `README.md` - Full project documentation
- `SETUP.md` - Detailed setup guide
- `COMMANDS.md` - Command reference

Happy coding! 🚀
