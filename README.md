# Pterodactyl Free Hosting Platform

A production-ready Minecraft hosting solution where users earn coins to create servers.

## Stack
- **Backend**: Node.js, TypeScript, Express, Mongoose, MongoDB Atlas
- **Frontend**: React, Vite, TypeScript, TailwindCSS, Zustand, React Query

## Prerequisites
- Node.js 18+
- Pterodactyl Panel (API Key required)
- MongoDB Atlas Cluster
- Redis (optional, for Queues/Caching)

## Setup

### Backend
1. Navigate to `backend/`
2. Install dependencies: `npm install`
3. Create `.env` file (or rely on defaults in `src/config/env.ts`):
   ```
   MONGODB_URI="mongodb+srv://lord:admin@cluster0.kbrgism.mongodb.net/?appName=Cluster0"
   JWT_SECRET=your_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   PTERODACTYL_URL=https://panel.yourdomain.com
   PTERODACTYL_API_KEY=ptla_your_admin_api_key
   ```
4. Build: `npm run build`
5. Start: `npm start` (or dev: `npm run dev`)

### Frontend
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Configure `frontend/.env`:
   ```
   VITE_API_URL=http://localhost:3000
   ```
4. Build: `npm run build`
5. Preview: `npm run preview`

## Deployment

### PM2 (Ecosystem)
Use the provided `ecosystem.config.js` in the root.
```bash
pm2 start ecosystem.config.js
```

## Admin Instructions
- To create plans, use Postman or Curl to POST `/admin/plans` (requires Admin role).
- To create redeem codes, POST `/admin/redeem-codes`.
- First user registration is role 'user'. Manually update role to 'admin' in MongoDB to access admin routes.

## API Documentation
See `backend/src/routes` for all endpoints.
- Auth: `/auth/login`, `/auth/register`
- Servers: `/servers`, `/servers/create`
- Coins: `/coins/redeem`
